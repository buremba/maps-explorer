import React, { useState, useEffect } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { VenueType, defaultColors, defaultVenueTypes } from '../types/venues';
import { allVenues } from './ui/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface VenueTypeManagerProps {
  venueTypes: VenueType[];
  onVenueTypesChange: (types: VenueType[]) => void;
}

interface EditingVenue extends VenueType {}

export default function VenueTypeManager({ venueTypes, onVenueTypesChange }: VenueTypeManagerProps) {
  const [editingVenue, setEditingVenue] = useState<EditingVenue | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [colorPickerVenue, setColorPickerVenue] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const venuesParam = params.get('venues');
    if (!venuesParam && venueTypes.length === 0) {
      // Set default venue type (parking)
      const defaultVenue = defaultVenueTypes[0];
      onVenueTypesChange([defaultVenue]);
      params.set('venues', defaultVenue.id);
      window.history.replaceState({}, '', `?${params.toString()}`);
    } else if (venuesParam) {
      const venueIds = venuesParam.split(',');
      const newVenues = venueIds.map(id => {
        const venue = allVenues[id];
        if (!venue) return null;
        return {
          id,
          name: venue.label,
          icon: venue.icon,
          color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
          query: venue.label.toLowerCase(),
          enabled: true,
        };
      }).filter((v): v is VenueType => v !== null);
      
      if (newVenues.length > 0) {
        onVenueTypesChange(newVenues);
      }
    }
  }, []);



  const handleToggleEnabled = (id: string) => {
    const newTypes = venueTypes.map((type) =>
      type.id === id ? { ...type, enabled: !type.enabled } : type
    );
    onVenueTypesChange(newTypes);
  };

  const handleDelete = (id: string) => {
    const newTypes = venueTypes.filter((type) => type.id !== id);
    onVenueTypesChange(newTypes);
    // Update URL parameter
    const params = new URLSearchParams(window.location.search);
    params.set('venues', newTypes.map(v => v.id).join(','));
    window.history.replaceState({}, '', `?${params.toString()}`);
  };

  const handleSave = (venue: EditingVenue) => {
    const selectedVenue = allVenues[venue.id];
    if (!selectedVenue) return;

    const newVenue: VenueType = {
      ...venue,
      name: selectedVenue.label,
      icon: selectedVenue.icon,
    };

    const newTypes = editingVenue
      ? venueTypes.map((type) => (type.id === editingVenue.id ? newVenue : type))
      : [...venueTypes, newVenue];

    onVenueTypesChange(newTypes);
    // Update URL parameter
    const params = new URLSearchParams(window.location.search);
    params.set('venues', newTypes.map(v => v.id).join(','));
    window.history.replaceState({}, '', `?${params.toString()}`);
    setEditingVenue(null);
    setIsAddingNew(false);
  };

  const handleColorSelect = (venue: VenueType, color: string) => {
    const newTypes = venueTypes.map((type) =>
      type.id === venue.id ? { ...type, color } : type
    );
    onVenueTypesChange(newTypes);
    setColorPickerVenue(null);
  };

  const VenueForm = ({ venue }: { venue: EditingVenue }) => (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <label className="text-sm font-medium">Venue Type</label>
        <Select
          value={venue.id}
          onValueChange={(value) => {
            const selectedVenue = allVenues[value];
            if (selectedVenue) {
              setEditingVenue({
                ...venue,
                id: value,
                name: selectedVenue.label,
                icon: selectedVenue.icon
              });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a venue type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(allVenues).map(([id, venue]) => (
              <SelectItem key={id} value={id}>
                {venue.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Search Query</label>
        <input
          type="text"
          value={venue.query}
          onChange={(e) => setEditingVenue({ ...venue, query: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="flex gap-2">
          {defaultColors.map((color) => (
            <button
              key={color}
              onClick={() => setEditingVenue({ ...venue, color })}
              className={`w-8 h-8 rounded-full ${venue.color === color ? 'ring-2 ring-offset-2 ring-ring' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingVenue(null)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSave(venue)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {venueTypes.map((venue) =>
        editingVenue?.id === venue.id ? (
          <VenueForm key={venue.id} venue={editingVenue} />
        ) : (
          <div
            key={venue.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => handleToggleEnabled(venue.id)}
                className={`w-5 h-5 rounded flex items-center justify-center ${
                  venue.enabled ? 'bg-blue-600' : 'border border-gray-300'
                }`}
              >
                {venue.enabled && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="relative inline-block">
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"
                >
                  {React.createElement(venue.icon, {
                    className: "w-5 h-5",
                    style: { color: venue.color },
                    strokeWidth: 2,
                    fill: "none"
                  })}
                </div>

              </div>
              <div className="relative">

                <button
                  onClick={() => handleColorClick(venue)}
                  className="w-5 h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: venue.color }}
                />
                {colorPickerVenue === venue.id && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg p-3 z-10 w-[200px]">
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {defaultColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(venue, color)}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${venue.color === color ? 'border-blue-500 scale-110' : 'border-transparent hover:border-gray-300'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Custom Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={venue.color}
                          onChange={(e) => handleColorSelect(venue, e.target.value)}
                          className="w-10 h-10 p-1 rounded border border-gray-200"
                        />
                        <input
                          type="text"
                          value={venue.color}
                          onChange={(e) => handleColorSelect(venue, e.target.value)}
                          className="flex-1 px-2 py-1 text-sm rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="flex-1 font-medium">{venue.name}</span>
            </div>
            <button
              onClick={() => handleDelete(venue.id)}
              className="p-1 text-gray-500 hover:text-red-600 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      )}

      <div 
        className={`flex items-center p-3 ${!isAddingNew ? 'cursor-pointer hover:bg-accent' : ''} rounded-lg`}
        onClick={() => !isAddingNew && setIsAddingNew(true)}
      >
        {isAddingNew ? (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-5 h-5 border border-input rounded" />
            <Select
              value=""
              onValueChange={(value) => {
                const selectedVenue = allVenues[value];
                if (selectedVenue) {
                  const newVenue: VenueType = {
                    id: value,
                    name: selectedVenue.label,
                    icon: selectedVenue.icon,
                    color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    query: selectedVenue.label.toLowerCase(),
                    enabled: true,
                  };
                  onVenueTypesChange([...venueTypes, newVenue]);
                  setIsAddingNew(false);
                }
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a venue type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allVenues).map(([id, venue]) => (
                  <SelectItem key={id} value={id}>
                    {venue.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-1 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-dashed border-input rounded flex items-center justify-center">
              <Plus className="w-3 h-3" />
            </div>
            <span>Click to add venue</span>
          </div>
        )}
      </div>
    </div>
  );
}
