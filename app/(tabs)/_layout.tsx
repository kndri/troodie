import { Tabs } from 'expo-router';
import { Bookmark, Home, MapPin, MoreHorizontal, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CreateModal } from '@/components/CreateModal';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { compactDesign, designTokens } from '@/constants/designTokens';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
            backgroundColor: '#FFFFFF',
          },
          default: {
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
            backgroundColor: '#FFFFFF',
          },
        }),
        tabBarLabelStyle: {
          fontSize: 10, // Reduced from 11
          fontFamily: 'Inter_500Medium',
          marginTop: -2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarTestID: 'tab-discover',
          tabBarIcon: ({ color, focused }) => (
            <Home size={compactDesign.icon.medium} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarTestID: 'tab-map',
          tabBarIcon: ({ color, focused }) => (
            <MapPin size={compactDesign.icon.medium} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide the old explore tab
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarTestID: 'tab-add',
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.addButtonWrapper}
              onPress={() => setShowCreateModal(true)}
              activeOpacity={0.8}
            >
              <View style={styles.floatingButton}>
                <Plus size={compactDesign.icon.medium} color="#FFFFFF" strokeWidth={3} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      
      <Tabs.Screen
        name="saves"
        options={{
          title: 'Saves',
          tabBarTestID: 'tab-saves',
          tabBarIcon: ({ color, focused }) => (
            <Bookmark size={compactDesign.icon.medium} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarTestID: 'tab-more',
          tabBarIcon: ({ color, focused }) => (
            <MoreHorizontal size={compactDesign.icon.medium} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      {/* Hidden tabs - accessible from More screen */}
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          href: null, // Hide from tab bar - accessible from More screen
        }}
      />
    </Tabs>
    
    {/* Create Modal */}
    <CreateModal 
      visible={showCreateModal} 
      onClose={() => setShowCreateModal(false)} 
    />
    </>
  );
}

const styles = StyleSheet.create({
  addButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    width: compactDesign.tabBar.height,
    height: compactDesign.tabBar.height,
    borderRadius: compactDesign.tabBar.height / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...designTokens.shadows.button,
  },
});
