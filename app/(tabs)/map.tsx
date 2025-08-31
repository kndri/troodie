/**
 * MAP SCREEN - V1.0 Design Implementation
 * Split view with map and listings (Zillow-style)
 * Interactive map with restaurant pins and list view
 */

import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { boardService } from '@/services/boardService';
import { restaurantService } from '@/services/restaurantService';
import { restaurantLocationService } from '@/services/restaurantLocationService';
import { Restaurant } from '@/types/restaurant';
import * as Location from 'expo-location';
import { 
  geocodeAddress, 
  calculateDistance as calcDistance, 
  formatDistance, 
  formatWalkingTime,
  isValidCoordinate,
  getDefaultCoordinates,
  Coordinates 
} from '@/utils/geocoding';
import { useRouter } from 'expo-router';
import {
  Bookmark,
  ChevronRight,
  Flame,
  Navigation,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X
} from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 44 + 52; // Search bar + filters
const MAP_HEIGHT = (SCREEN_HEIGHT - HEADER_HEIGHT - 80) * 0.5; // Half of remaining space minus tab bar

// Map styles for clean look
const mapStyle = [
  {
    "featureType": "poi.business",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  }
];

// Filter options
const QUICK_FILTERS = [
  { id: 'all', label: 'All', icon: '🍽️' },
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'new', label: 'New', icon: '✨' },
  { id: 'saved', label: 'Saved', icon: '📍' },
  { id: 'friends', label: 'Friends', icon: '👥' },
];

const CUISINE_FILTERS = [
  { id: 'all', label: 'All Cuisines' },
  { id: 'american', label: 'American' },
  { id: 'italian', label: 'Italian' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'asian', label: 'Asian' },
  { id: 'seafood', label: 'Seafood' },
];

const PRICE_FILTERS = [
  { id: 'all', label: 'Any' },
  { id: '$', label: '$' },
  { id: '$$', label: '$$' },
  { id: '$$$', label: '$$$' },
  { id: '$$$$', label: '$$$$' },
];

interface MapRestaurant extends Restaurant {
  distance?: number;
  coordinates?: Coordinates;
  isSaved?: boolean;
  friendsSaved?: number;
  isTrending?: boolean;
  hasActiveCampaign?: boolean;
  isNew?: boolean;
}

export default function MapScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { userState } = useApp();
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList>(null);

  // State
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<MapRestaurant | null>(null);
  const [restaurants, setRestaurants] = useState<MapRestaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<MapRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [quickFilter, setQuickFilter] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  
  // Map region
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 35.2271, // Charlotte default
    longitude: -80.8431,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to show nearby restaurants');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  // Load restaurants
  const loadRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      const allRestaurants = await restaurantService.getAllRestaurants(100);
      
      // Get user's saved restaurants if authenticated
      let savedRestaurantIds: string[] = [];
      if (isAuthenticated && user?.id) {
        const userBoards = await boardService.getUserBoards(user.id);
        savedRestaurantIds = userBoards.flatMap(board => 
          board.restaurants?.map(r => r.restaurant_id) || []
        );
      }

      // Process restaurants with geocoding and additional data
      const processedRestaurants = await Promise.all(
        allRestaurants.map(async (restaurant) => {
          const processed: MapRestaurant = {
            ...restaurant,
            isSaved: savedRestaurantIds.includes(restaurant.id),
            friendsSaved: Math.floor(Math.random() * 8), // Mock data for now
            isTrending: Math.random() > 0.85, // Mock data for now
            hasActiveCampaign: userState.isCreator && Math.random() > 0.8, // Mock data for now
            isNew: Math.random() > 0.9, // Mock data for now
          };

          // Geocode address if we don't have coordinates
          if (!restaurant.latitude || !restaurant.longitude) {
            if (restaurant.address) {
              // Use cached geocoding to reduce API calls
              const coords = await restaurantLocationService.getCachedCoordinates(restaurant.address);
              if (coords) {
                processed.coordinates = coords;
                processed.latitude = coords.latitude;
                processed.longitude = coords.longitude;
                
                // Update database asynchronously (don't wait)
                restaurantLocationService.updateRestaurantCoordinates(
                  restaurant.id, 
                  coords
                ).catch(console.error);
              } else {
                // Fallback to default Charlotte coordinates with some randomization
                const defaultCoords = getDefaultCoordinates();
                // Add small random offset to avoid all markers being in same spot
                processed.coordinates = {
                  latitude: defaultCoords.latitude + (Math.random() - 0.5) * 0.02,
                  longitude: defaultCoords.longitude + (Math.random() - 0.5) * 0.02
                };
                processed.latitude = processed.coordinates.latitude;
                processed.longitude = processed.coordinates.longitude;
              }
            } else {
              // No address, use default with randomization
              const defaultCoords = getDefaultCoordinates();
              processed.coordinates = {
                latitude: defaultCoords.latitude + (Math.random() - 0.5) * 0.02,
                longitude: defaultCoords.longitude + (Math.random() - 0.5) * 0.02
              };
              processed.latitude = processed.coordinates.latitude;
              processed.longitude = processed.coordinates.longitude;
            }
          } else {
            // Use existing coordinates
            processed.coordinates = {
              latitude: restaurant.latitude,
              longitude: restaurant.longitude
            };
          }

          // Calculate actual distance if user location available
          if (userLocation && processed.coordinates) {
            const distance = calcDistance(
              { 
                latitude: userLocation.coords.latitude, 
                longitude: userLocation.coords.longitude 
              },
              processed.coordinates
            );
            processed.distance = distance;
          }

          return processed;
        })
      );

      // Sort by distance by default
      processedRestaurants.sort((a, b) => (a.distance || 999) - (b.distance || 999));

      setRestaurants(processedRestaurants);
      setFilteredRestaurants(processedRestaurants);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      Alert.alert('Error', 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, userLocation, userState.isCreator]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // Apply filters
  useEffect(() => {
    let filtered = [...restaurants];

    // Quick filters
    switch (quickFilter) {
      case 'trending':
        filtered = filtered.filter(r => r.isTrending);
        break;
      case 'new':
        filtered = filtered.filter(r => r.isNew);
        break;
      case 'saved':
        filtered = filtered.filter(r => r.isSaved);
        break;
      case 'friends':
        filtered = filtered.filter(r => r.friendsSaved && r.friendsSaved > 0);
        break;
    }

    // Cuisine filter
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(r => 
        r.cuisine_types?.some(c => c.toLowerCase().includes(selectedCuisine))
      );
    }

    // Price filter
    if (selectedPrice !== 'all') {
      filtered = filtered.filter(r => r.price_range === selectedPrice);
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name?.toLowerCase().includes(query) ||
        r.cuisine_types?.some(c => c.toLowerCase().includes(query)) ||
        r.neighborhood?.toLowerCase().includes(query)
      );
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, quickFilter, selectedCuisine, selectedPrice, searchQuery]);

  // Get marker color based on state
  const getMarkerColor = (restaurant: MapRestaurant) => {
    if (restaurant.isSaved) return DS.colors.primaryOrange;
    if (restaurant.friendsSaved && restaurant.friendsSaved > 0) return '#3B82F6';
    if (restaurant.isTrending) return '#EF4444';
    if (restaurant.hasActiveCampaign) return '#8B5CF6';
    if (restaurant.isNew) return '#10B981';
    return '#6B7280';
  };

  // Handle restaurant selection
  const handleRestaurantSelect = (restaurant: MapRestaurant, fromMap: boolean = false) => {
    setSelectedRestaurant(restaurant);
    
    if (fromMap && listRef.current) {
      // Scroll list to selected restaurant
      const index = filteredRestaurants.findIndex(r => r.id === restaurant.id);
      if (index !== -1) {
        listRef.current.scrollToIndex({ index, animated: true });
      }
    } else if (!fromMap && mapRef.current) {
      // Center map on selected restaurant
      mapRef.current.animateToRegion({
        latitude: restaurant.latitude || 35.2271,
        longitude: restaurant.longitude || -80.8431,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  // Center map on user location
  const centerOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    }
  };

  // Render filter modal
  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.filterModal}>
        <View style={styles.filterContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <X size={24} color={DS.colors.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Cuisine Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Cuisine</Text>
              <View style={styles.filterOptions}>
                {CUISINE_FILTERS.map(cuisine => (
                  <TouchableOpacity
                    key={cuisine.id}
                    style={[
                      styles.filterChip,
                      selectedCuisine === cuisine.id && styles.filterChipActive
                    ]}
                    onPress={() => setSelectedCuisine(cuisine.id)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedCuisine === cuisine.id && styles.filterChipTextActive
                    ]}>
                      {cuisine.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price</Text>
              <View style={styles.filterOptionsRow}>
                {PRICE_FILTERS.map(price => (
                  <TouchableOpacity
                    key={price.id}
                    style={[
                      styles.priceChip,
                      selectedPrice === price.id && styles.priceChipActive
                    ]}
                    onPress={() => setSelectedPrice(price.id)}
                  >
                    <Text style={[
                      styles.priceChipText,
                      selectedPrice === price.id && styles.priceChipTextActive
                    ]}>
                      {price.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterFooter}>
            <TouchableOpacity
              style={styles.filterResetButton}
              onPress={() => {
                setSelectedCuisine('all');
                setSelectedPrice('all');
                setQuickFilter('all');
              }}
            >
              <Text style={styles.filterResetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterApplyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.filterApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render restaurant list item
  const renderRestaurantItem = ({ item }: { item: MapRestaurant }) => {
    const isSelected = selectedRestaurant?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.listItem, isSelected && styles.listItemSelected]}
        onPress={() => handleRestaurantSelect(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: restaurantService.getRestaurantImage(item) }}
          style={styles.listItemImage}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemName} numberOfLines={1}>
            {item.name}
          </Text>
          
          <View style={styles.listItemDetails}>
            <Text style={styles.listItemDetailsText} numberOfLines={1}>
              {item.cuisine_types?.[0] || 'Restaurant'} • {item.price_range || '$$'}
            </Text>
            {item.distance !== undefined && (
              <Text style={styles.listItemDistance}>
                {formatDistance(item.distance)} • {formatWalkingTime(item.distance)}
              </Text>
            )}
          </View>
          
          <View style={styles.listItemMeta}>
            {item.google_rating && (
              <View style={styles.listItemRating}>
                <Star size={12} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
                <Text style={styles.listItemRatingText}>{item.google_rating}</Text>
              </View>
            )}
            
            {item.isSaved && (
              <View style={styles.listItemBadge}>
                <Bookmark size={12} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
                <Text style={styles.listItemBadgeText}>Saved</Text>
              </View>
            )}
            
            {item.friendsSaved && item.friendsSaved > 0 && (
              <View style={[styles.listItemBadge, { backgroundColor: '#EBF5FF' }]}>
                <Users size={12} color="#3B82F6" />
                <Text style={[styles.listItemBadgeText, { color: '#3B82F6' }]}>
                  {item.friendsSaved} friends
                </Text>
              </View>
            )}
            
            {item.isTrending && (
              <View style={[styles.listItemBadge, { backgroundColor: '#FEF2F2' }]}>
                <Flame size={12} color="#EF4444" />
                <Text style={[styles.listItemBadgeText, { color: '#EF4444' }]}>Hot</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.listItemAction}
          onPress={() => router.push({
            pathname: '/restaurant/[id]',
            params: { id: item.id }
          })}
        >
          <ChevronRight size={20} color={DS.colors.textGray} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DS.colors.primaryOrange} />
          <Text style={styles.loadingText}>Finding restaurants near you...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Profile Avatar */}
      <View style={styles.header}>
        <ProfileAvatar size={36} style={styles.profileAvatar} />
        <View style={styles.searchBar}>
          <Search size={18} color={DS.colors.textGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={DS.colors.textGray}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color={DS.colors.textGray} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <SlidersHorizontal size={18} color={DS.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}


      {/* Split View Container */}
      <View style={styles.splitContainer}>
        {/* Map View - Top Half */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={mapRegion}
            onRegionChangeComplete={setMapRegion}
            customMapStyle={mapStyle}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {filteredRestaurants.map(restaurant => (
              <Marker
                key={restaurant.id}
                coordinate={{
                  latitude: restaurant.coordinates?.latitude || restaurant.latitude || 35.2271,
                  longitude: restaurant.coordinates?.longitude || restaurant.longitude || -80.8431,
                }}
                onPress={() => handleRestaurantSelect(restaurant, true)}
              >
                <View style={[
                  styles.marker,
                  { backgroundColor: getMarkerColor(restaurant) },
                  selectedRestaurant?.id === restaurant.id && styles.markerSelected
                ]}>
                  <View style={styles.markerInner} />
                </View>
              </Marker>
            ))}
          </MapView>

          {/* Location Button */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={centerOnUser}
          >
            <Navigation size={20} color={DS.colors.textWhite} fill={DS.colors.textWhite} />
          </TouchableOpacity>

          {/* Results Count */}
          <View style={styles.resultsCount}>
            <Text style={styles.resultsCountText}>
              {filteredRestaurants.length} restaurants
            </Text>
          </View>
        </View>

        {/* List View - Bottom Half */}
        <View style={styles.listContainer}>
          <FlatList
            ref={listRef}
            data={filteredRestaurants}
            keyExtractor={item => item.id}
            renderItem={renderRestaurantItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            onScrollToIndexFailed={() => {}}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🍽️</Text>
                <Text style={styles.emptyTitle}>No restaurants found</Text>
                <Text style={styles.emptyText}>
                  Try adjusting your filters or search
                </Text>
              </View>
            }
          />
        </View>
      </View>

      {/* Filter Modal */}
      {renderFilterModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginTop: DS.spacing.md,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    gap: DS.spacing.sm,
    backgroundColor: DS.colors.surface,
    alignItems: 'center',
  },
  profileAvatar: {
    marginRight: DS.spacing.xs,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    paddingHorizontal: DS.spacing.md,
    height: 40,
    borderRadius: DS.borderRadius.md,
    gap: DS.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...DS.typography.body,
    color: DS.colors.textDark,
    padding: 0,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: DS.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickFilters: {
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  quickFiltersContent: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.xs,
    gap: DS.spacing.xs,
    alignItems: 'center',
  },
  quickFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.md,
    paddingVertical: 8,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surfaceLight,
    gap: 6,
  },
  quickFilterChipActive: {
    backgroundColor: '#FFAD27',
  },
  quickFilterIcon: {
    fontSize: 14,
  },
  quickFilterText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    fontWeight: '600',
    fontSize: 13,
  },
  quickFilterTextActive: {
    color: DS.colors.textWhite,
  },
  splitContainer: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  mapContainer: {
    height: MAP_HEIGHT,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DS.colors.surface,
    ...DS.shadows.sm,
  },
  markerSelected: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
  },
  markerInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DS.colors.surface,
  },
  locationButton: {
    position: 'absolute',
    bottom: DS.spacing.xl,
    right: DS.spacing.md,
    width: 48,
    height: 48,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...DS.shadows.lg,
    elevation: 4,
  },
  resultsCount: {
    position: 'absolute',
    top: DS.spacing.md,
    left: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.xs,
    borderRadius: DS.borderRadius.full,
    ...DS.shadows.sm,
  },
  resultsCountText: {
    ...DS.typography.caption,
    color: DS.colors.textDark,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    backgroundColor: DS.colors.surface,
    borderTopWidth: 1,
    borderTopColor: DS.colors.borderLight,
  },
  listContent: {
    paddingBottom: DS.spacing.lg,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
    backgroundColor: DS.colors.surface,
    minHeight: 88,
  },
  listItemSelected: {
    backgroundColor: '#FFF9F5',
  },
  listItemImage: {
    width: 64,
    height: 64,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.surfaceLight,
  },
  listItemContent: {
    flex: 1,
    marginLeft: DS.spacing.md,
    justifyContent: 'center',
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.xs,
  },
  listItemName: {
    ...DS.typography.button,
    color: DS.colors.textDark,
    flex: 1,
  },
  listItemDistance: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginLeft: DS.spacing.sm,
  },
  listItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.xs,
  },
  listItemDetailsText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    flex: 1,
  },
  listItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
  },
  listItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  listItemRatingText: {
    ...DS.typography.caption,
    color: DS.colors.textDark,
    fontWeight: '600',
  },
  listItemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: DS.spacing.xs,
    paddingVertical: 2,
    borderRadius: DS.borderRadius.sm,
    backgroundColor: '#FFF4ED',
  },
  listItemBadgeText: {
    ...DS.typography.caption,
    color: DS.colors.primaryOrange,
    fontWeight: '600',
    fontSize: 11,
  },
  listItemAction: {
    justifyContent: 'center',
    paddingLeft: DS.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DS.spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: DS.spacing.md,
  },
  emptyTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  emptyText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
  },
  filterModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterContent: {
    backgroundColor: DS.colors.surface,
    borderTopLeftRadius: DS.borderRadius.xl,
    borderTopRightRadius: DS.borderRadius.xl,
    maxHeight: SCREEN_HEIGHT * 0.6,
    paddingBottom: DS.spacing.xl,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: DS.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  filterTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  filterSection: {
    padding: DS.spacing.lg,
  },
  filterSectionTitle: {
    ...DS.typography.button,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DS.spacing.sm,
  },
  filterOptionsRow: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surfaceLight,
  },
  filterChipActive: {
    backgroundColor: DS.colors.primaryOrange,
  },
  filterChipText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
    fontSize: 13,
  },
  filterChipTextActive: {
    color: DS.colors.textWhite,
  },
  priceChip: {
    flex: 1,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.surfaceLight,
    alignItems: 'center',
  },
  priceChipActive: {
    backgroundColor: DS.colors.primaryOrange,
  },
  priceChipText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },
  priceChipTextActive: {
    color: DS.colors.textWhite,
  },
  filterFooter: {
    flexDirection: 'row',
    gap: DS.spacing.md,
    paddingHorizontal: DS.spacing.lg,
    paddingTop: DS.spacing.lg,
  },
  filterResetButton: {
    flex: 1,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    borderWidth: 1,
    borderColor: DS.colors.border,
    alignItems: 'center',
  },
  filterResetText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  filterApplyButton: {
    flex: 1,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.primaryOrange,
    alignItems: 'center',
  },
  filterApplyText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});