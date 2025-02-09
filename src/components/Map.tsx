import React, { useEffect, useRef, useState } from 'react';
import * as icons from 'lucide-static';
import { Place } from '../types';
import { VenueType } from '../types/venues';
import { Marker, OverlayView } from '@react-google-maps/api';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  places: Place[];
  venueTypes: VenueType[];
  homeMarker: google.maps.LatLngLiteral | null;
  hoveredMarkerId: string | null;
  selectedMarkerIds: string[];
  onMapMove: (center: google.maps.LatLngLiteral) => void;
  onMarkerHover: (placeId: string | null) => void;
  onMarkerSelect: (placeId: string) => void;
  onHomeMarkerDrag: (position: google.maps.LatLngLiteral) => void;
}

// Get icon SVG data
const getIconSvg = (name: string | React.ComponentType) => {
  // If name is a string (for backward compatibility)
  if (typeof name === 'string') {
    const iconKey = name.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('') as keyof typeof icons;
    const svgContent = icons[iconKey] || icons.Circle;
    return svgContent.replace(/fill="currentColor"/g, 'fill="white"');
  }
  
  // If name is a component reference
  const componentName = name.name;
  const svgContent = icons[componentName as keyof typeof icons] || icons.Circle;
  return svgContent.replace(/fill="currentColor"/g, 'fill="white"');
};

function Map({
  center,
  zoom,
  places,
  venueTypes,
  homeMarker,
  hoveredMarkerId,
  selectedMarkerIds,
  onMapMove,
  onMarkerHover,
  onMarkerSelect,
  onHomeMarkerDrag,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const homeMarkerRef = useRef<google.maps.Marker | null>(null);
  const moveTimeoutRef = useRef<number | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [routeMidpoint, setRouteMidpoint] = useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const newMap = new google.maps.Map(mapContainerRef.current, {
        center,
        zoom,
      });

      mapRef.current = newMap;

      // Function to update map styles
      const updateMapStyles = (isDark: boolean) => {
        if (mapRef.current) {
          mapRef.current.setOptions({});
        }
      };

      // Listen for system color scheme changes
      mediaQuery.addEventListener('change', (e) => updateMapStyles(e.matches));

      // Set up map event listeners
      newMap.addListener('center_changed', () => {
        if (moveTimeoutRef.current) {
          window.clearTimeout(moveTimeoutRef.current);
        }
        moveTimeoutRef.current = window.setTimeout(() => {
          const center = newMap.getCenter();
          if (center) {
            onMapMove({
              lat: center.lat(),
              lng: center.lng()
            });
          }
        }, 100);
      });

      newMap.addListener('click', () => onMarkerSelect(null));

      // Clean up on unmount
      return () => {
        if (moveTimeoutRef.current) {
          window.clearTimeout(moveTimeoutRef.current);
        }
        google.maps.event.clearInstanceListeners(newMap);
      };
    }
  }, [center, zoom, onMapMove]);

  // Update markers when places change
  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (!mapRef.current) return;

    // Create new markers
    const newMarkers = places.map(place => {
      const venueType = venueTypes.find(type => type.id === place.venueTypeId);

      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: venueType?.enabled ? mapRef.current : null,
        title: place.name,
        animation: google.maps.Animation.DROP,
        icon: venueType ? {
          url: `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="${venueType.color}" stroke="white" stroke-width="1" />
              <g transform="scale(0.6) translate(8,8)" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                ${getIconSvg(venueType.icon)}
              </g>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        } : undefined,
      });

      const createInfoWindowContent = (place: Place, venueType: VenueType | undefined) => `
        <div class="p-2 max-w-xs">
          <h3 class="font-semibold text-gray-900">${place.name}</h3>
          ${place.vicinity ? `<p class="text-sm text-gray-600 mt-1">${place.vicinity}</p>` : ''}
          ${place.rating ? `
            <div class="flex items-center gap-1 mt-2">
              <div class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                ⭐️ ${place.rating} (${place.user_ratings_total?.toLocaleString() || 0})
              </div>
            </div>
          ` : ''}
          ${place.opening_hours?.open_now !== undefined ? `
            <p class="text-sm mt-2 ${place.opening_hours.open_now ? 'text-green-600' : 'text-red-600'}">
              ${place.opening_hours.open_now ? 'Open now' : 'Closed'}
            </p>
          ` : ''}
          <p class="text-sm text-blue-600 mt-2">${venueType?.name || ''}</p>
        </div>
      `;

      marker.addListener('mouseover', () => {
        if (!selectedMarkerIds.includes(place.id)) {
          onMarkerHover(place.id);

          // Create and show InfoWindow
          if (!infoWindowRef.current) {
            infoWindowRef.current = new google.maps.InfoWindow();
          }

          const venueType = venueTypes.find(type => type.id === place.venueTypeId);
          infoWindowRef.current.setContent(createInfoWindowContent(place, venueType));
          infoWindowRef.current.open(mapRef.current, marker);
        }
      });

      marker.addListener('mouseout', () => {
        if (!selectedMarkerIds.includes(place.id)) {
          onMarkerHover(null);
          infoWindowRef.current?.close();
        }
      });

      marker.addListener('click', () => {
        onMarkerSelect(place.id);

        if (homeMarker) {
          // Show InfoWindow for selected place with route details
          if (!infoWindowRef.current) {
            infoWindowRef.current = new google.maps.InfoWindow();
          }
          const venueType = venueTypes.find(type => type.id === place.venueTypeId);
          
          // Calculate route and update info window
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: homeMarker,
              destination: { lat: place.lat, lng: place.lng },
              travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result) {
                if (!directionsRendererRef.current) {
                  directionsRendererRef.current = new google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: venueType?.color || '#4A5568',
                      strokeWeight: 4,
                    },
                  });
                }

                directionsRendererRef.current.setMap(mapRef.current);
                directionsRendererRef.current.setDirections(result);

                // Calculate and display the midpoint
                const route = result.routes[0];
                if (route && route.legs[0]) {
                  const leg = route.legs[0];
                  const steps = leg.steps;
                  let totalDistance = 0;
                  const targetDistance = leg.distance.value / 2;

                  for (let i = 0; i < steps.length; i++) {
                    const step = steps[i];
                    if (totalDistance + step.distance.value > targetDistance) {
                      const remainingDistance = targetDistance - totalDistance;
                      const ratio = remainingDistance / step.distance.value;
                      const path = step.path;
                      const midpointIndex = Math.floor(path.length * ratio);
                      const midpoint = path[midpointIndex];
                      
                      setRouteMidpoint({
                        lat: midpoint.lat(),
                        lng: midpoint.lng(),
                      });
                      setDistance(Math.round(leg.duration.value / 60));
                      break;
                    }
                    totalDistance += step.distance.value;
                  }
                }

                // Update InfoWindow content with route details
                infoWindowRef.current.setContent(createInfoWindowContent(place, venueType));
                infoWindowRef.current.open(mapRef.current, marker);
              }
            }
          );
        } else {
          // Close InfoWindow and clear directions when deselecting
          infoWindowRef.current?.close();
          directionsRendererRef.current?.setMap(null);
          setRouteMidpoint(null);
          setDistance(null);
        }
      });

      return marker;
    });

    markersRef.current = newMarkers;
  }, [places, venueTypes, homeMarker, selectedMarkerIds]);

  // Update home marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (homeMarker) {
      if (!homeMarkerRef.current) {
        homeMarkerRef.current = new google.maps.Marker({
          position: homeMarker,
          map: mapRef.current,
          icon: {
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#2563EB" stroke="white" stroke-width="1" />
                <g transform="scale(0.6) translate(8,8)" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  ${getIconSvg(icons.Home)}
                </g>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16),
          },
          draggable: true,
        });

        homeMarkerRef.current.addListener('dragend', () => {
          const position = homeMarkerRef.current?.getPosition();
          if (position) {
            onHomeMarkerDrag({
              lat: position.lat(),
              lng: position.lng(),
            });
          }
        });
      } else {
        homeMarkerRef.current.setPosition(homeMarker);
      }
    } else {
      if (homeMarkerRef.current) {
        homeMarkerRef.current.setMap(null);
        homeMarkerRef.current = null;
      }
      // Clear directions when no place is selected
      directionsRendererRef.current?.setDirections({ routes: [] });
    }
  }, [selectedMarkerIds, places, homeMarker]);

  // Update InfoWindow when selected places change
  useEffect(() => {
    if (selectedMarkerIds.length === 0) {
      infoWindowRef.current?.close();
      return;
    }

    const selectedPlace = places.find(place => place.id === selectedMarkerIds[selectedMarkerIds.length - 1]);
    if (!selectedPlace || !mapRef.current) return;

    const marker = markersRef.current.find(
      marker => marker.getTitle() === selectedPlace.name
    );
    if (!marker) return;

    const venueType = venueTypes.find(type => type.id === selectedPlace.venueTypeId);

    infoWindowRef.current.setContent(createInfoWindowContent(selectedPlace, venueType));
    infoWindowRef.current.open(mapRef.current, marker);
  }, [selectedMarkerIds, places, venueTypes]);

  const handleMarkerClick = (marker: { id: string, lat: number, lng: number }) => {
    if (selectedMarkerIds.includes(marker.id)) {
      onMarkerSelect(null);
      directionsRendererRef.current?.setMap(null);
      setRouteMidpoint(null);
      setDistance(null);
    } else {
      onMarkerSelect(marker.id);
    }
  };

  // Find last selected place
  const selectedPlace = places.find(place => place.id === selectedMarkerIds[selectedMarkerIds.length - 1]);

  return (
    <>
      <div ref={mapContainerRef} className="fixed inset-0 w-full h-full" />
      {routeMidpoint !== null && (
        <OverlayView
          position={routeMidpoint}
          mapPaneName="floatPane"
        >
          <div style={{ background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            <icons.Walking size={16} style={{ marginRight: '4px' }} />
            <span>{distance} min</span>
          </div>
        </OverlayView>
      )}
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-md">
          <h3 className="font-medium text-gray-900">{selectedPlace.name}</h3>
        </div>
      )}
      {places.map(place => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => handleMarkerClick({ id: place.id, lat: place.lat, lng: place.lng })}
        />
      ))}
    </>
  );
}

export default React.memo(Map);
