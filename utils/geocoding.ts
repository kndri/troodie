/**
 * Geocoding utilities for converting addresses to coordinates
 */

import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Simple in-memory cache for geocoding results
const geocodeCache = new Map<string, Coordinates>();

// Rate limiting configuration
const RATE_LIMIT_DELAY = 500; // ms between requests
let lastGeocodingTime = 0;

/**
 * Geocode an address to get coordinates with caching and rate limiting
 * @param address The address string to geocode
 * @returns Coordinates or null if geocoding fails
 */
export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  try {
    if (!address) return null;

    // Check cache first
    const cached = geocodeCache.get(address);
    if (cached) {
      return cached;
    }

    // Rate limiting: ensure minimum delay between API calls
    const now = Date.now();
    const timeSinceLastRequest = now - lastGeocodingTime;
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
    }
    lastGeocodingTime = Date.now();

    // Use Expo Location geocoding
    const geocoded = await Location.geocodeAsync(address);

    if (geocoded && geocoded.length > 0) {
      const coordinates = {
        latitude: geocoded[0].latitude,
        longitude: geocoded[0].longitude,
      };

      // Cache the result
      geocodeCache.set(address, coordinates);

      return coordinates;
    }

    return null;
  } catch (error: any) {
    // Check if it's a rate limit error
    if (error?.message?.includes('rate limit')) {
      console.warn('Geocoding rate limit hit, returning null for:', address);
      // Return null instead of throwing to prevent app crashes
      return null;
    }
    console.error('Geocoding error for address:', address, error);
    return null;
  }
}

/**
 * Batch geocode multiple addresses with rate limiting
 * @param addresses Array of address strings
 * @returns Array of coordinates (null for failed geocoding)
 */
export async function batchGeocodeAddresses(addresses: string[]): Promise<(Coordinates | null)[]> {
  const results: (Coordinates | null)[] = [];

  // Process sequentially to respect rate limits
  for (const address of addresses) {
    const coords = await geocodeAddress(address);
    results.push(coords);
  }

  return results;
}

/**
 * Calculate distance between two coordinates in miles
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in miles
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 3959; // Radius of Earth in miles
  const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
  const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Format distance for display
 * @param miles Distance in miles
 * @returns Formatted distance string
 */
export function formatDistance(miles: number): string {
  if (miles < 0.1) return 'Less than 0.1 mi';
  if (miles < 1) return `${(miles).toFixed(1)} mi`;
  if (miles < 10) return `${miles.toFixed(1)} mi`;
  return `${Math.round(miles)} mi`;
}

/**
 * Get walking time estimate based on distance
 * @param miles Distance in miles
 * @returns Estimated walking time in minutes
 */
export function getWalkingTime(miles: number): number {
  // Average walking speed is 3 mph
  return Math.round(miles * 20); // 20 minutes per mile
}

/**
 * Format walking time for display
 * @param miles Distance in miles
 * @returns Formatted walking time string
 */
export function formatWalkingTime(miles: number): string {
  const minutes = getWalkingTime(miles);
  if (minutes < 1) return '< 1 min walk';
  if (minutes === 1) return '1 min walk';
  if (minutes < 60) return `${minutes} min walk`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr walk`;
  return `${hours} hr ${remainingMinutes} min walk`;
}

/**
 * Check if coordinates are valid
 * @param coord Coordinates to check
 * @returns True if valid
 */
export function isValidCoordinate(coord: Coordinates | null | undefined): coord is Coordinates {
  return coord !== null && 
         coord !== undefined && 
         typeof coord.latitude === 'number' && 
         typeof coord.longitude === 'number' &&
         !isNaN(coord.latitude) && 
         !isNaN(coord.longitude) &&
         coord.latitude >= -90 && 
         coord.latitude <= 90 &&
         coord.longitude >= -180 && 
         coord.longitude <= 180;
}

/**
 * Get default coordinates for Charlotte, NC
 */
export function getDefaultCoordinates(): Coordinates {
  return {
    latitude: 35.2271,
    longitude: -80.8431
  };
}