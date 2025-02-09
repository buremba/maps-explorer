import React, { useState, useCallback, useEffect } from "react";
import { MapPin, Settings2 } from "lucide-react";
import Map from "./components/Map";
import SearchBox from "./components/SearchBox";
import PlacesList from "./components/PlacesList";
import VenueTypeManager from "./components/VenueTypeManager";
import { Place } from "./types";
import { VenueType, defaultVenueTypes } from "./types/venues";

function App() {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get("lat") || "51.5074");
    const lng = parseFloat(params.get("lng") || "-0.1278");
    const validLat = !isNaN(lat) && lat >= -90 && lat <= 90;
    const validLng = !isNaN(lng) && lng >= -180 && lng <= 180;
    return {
      lat: validLat ? lat : 51.5074,
      lng: validLng ? lng : -0.1278,
    };
  });
  const [places, setPlaces] = useState<Place[]>([]);
  const [venueTypes, setVenueTypes] = useState<VenueType[]>(defaultVenueTypes);
  const [showSettings, setShowSettings] = useState(true);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [selectedMarkerIds, setSelectedMarkerIds] = useState<string[]>([]);
  const [homeMarker, setHomeMarker] =
    useState<google.maps.LatLngLiteral | null>(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("lat") && params.has("lng")) {
        const lat = parseFloat(params.get("lat") || "");
        const lng = parseFloat(params.get("lng") || "");
        const validLat = !isNaN(lat) && lat >= -90 && lat <= 90;
        const validLng = !isNaN(lng) && lng >= -180 && lng <= 180;
        if (validLat && validLng) {
          return { lat, lng };
        }
      }
      return null;
    });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return new URLSearchParams(window.location.search).get("q") || "";
  });

  // Update URL when location or search changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (homeMarker) {
      params.set("lat", homeMarker.lat.toFixed(6));
      params.set("lng", homeMarker.lng.toFixed(6));
    } else {
      params.delete("lat");
      params.delete("lng");
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, [homeMarker, searchQuery]);

  // Initialize search if query parameter is present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query && !homeMarker) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: query }, (results, status) => {
        if (status === "OK" && results?.[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          setHomeMarker({
            lat: location.lat(),
            lng: location.lng(),
          });
          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      });
    }
  }, []);

  const handlePlaceSelect = useCallback(
    (location: google.maps.LatLngLiteral, query: string) => {
      setCenter(location);
      setHomeMarker(location);
      setSearchQuery(query);
    },
    []
  );

  const handleHomeMarkerDrag = useCallback(
    (location: google.maps.LatLngLiteral) => {
      setHomeMarker(location);
      setCenter(location);
      // Get address from coordinates
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setSearchQuery(results[0].formatted_address);
        }
      });
    },
    []
  );

  const handleMapMove = useCallback((newCenter: google.maps.LatLngLiteral) => {
    setCenter(newCenter);
  }, []);

  const handleMarkerHover = useCallback((placeId: string | null) => {
    setHoveredMarkerId(placeId);
  }, []);

  const handleMarkerSelect = useCallback((placeId: string) => {
    setSelectedMarkerIds(prev => {
      const isSelected = prev.includes(placeId);
      return isSelected ? prev.filter(id => id !== placeId) : [...prev, placeId];
    });
  }, []);

  const handleVenueTypesChange = useCallback((newTypes: VenueType[]) => {
    setVenueTypes(newTypes);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Full-screen map */}
      <Map
        center={center}
        zoom={15}
        places={places}
        onMapMove={handleMapMove}
        onMarkerHover={handleMarkerHover}
        onMarkerSelect={handleMarkerSelect}
        hoveredMarkerId={hoveredMarkerId}
        selectedMarkerIds={selectedMarkerIds}
        homeMarker={homeMarker}
        onHomeMarkerDrag={handleHomeMarkerDrag}
        venueTypes={venueTypes}
      />


      {/* Places panel */}
      <div className="absolute top-24 left-2 w-96 pointer-events-auto space-y-4">
        <SearchBox
          onPlaceSelect={handlePlaceSelect}
          initialValue={searchQuery}
        />
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium">Places</h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
          <div className={`p-4 ${showSettings ? "" : "hidden"}`}>
            <VenueTypeManager
              venueTypes={venueTypes}
              onVenueTypesChange={handleVenueTypesChange}
            />
          </div>
          <div className="p-4">
            <PlacesList
              places={places}
              setPlaces={setPlaces}
              center={center}
              venueTypes={venueTypes}
              hoveredMarkerId={hoveredMarkerId}
              selectedMarkerIds={selectedMarkerIds}
              onRowHover={handleMarkerHover}
              onRowSelect={handleMarkerSelect}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
