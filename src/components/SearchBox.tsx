import { MapPin } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface SearchBoxProps {
  onPlaceSelect: (location: google.maps.LatLngLiteral, query: string) => void;
  initialValue?: string;
}

function SearchBox({ onPlaceSelect, initialValue = "" }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (initialValue) {
        inputRef.current.value = initialValue;
      }

      searchBoxRef.current = new google.maps.places.SearchBox(inputRef.current);

      searchBoxRef.current.addListener("places_changed", () => {
        const places = searchBoxRef.current?.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          const location = place.geometry?.location;
          if (location) {
            onPlaceSelect(
              {
                lat: location.lat(),
                lng: location.lng(),
              },
              place.formatted_address || inputRef.current?.value || ""
            );
          }
        }
      });
    }

    return () => {
      if (searchBoxRef.current) {
        google.maps.event.clearInstanceListeners(searchBoxRef.current);
      }
    };
  }, [onPlaceSelect, initialValue]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg font-bold text-gray-900">Places Nearby</h1>
        </div>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search location..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
