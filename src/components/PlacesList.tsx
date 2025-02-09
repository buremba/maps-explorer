import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Place } from '../types';
import { VenueType } from '../types/venues';
import { Star, ArrowUpDown } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

interface PlacesListProps {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  center: google.maps.LatLngLiteral;
  venueTypes: VenueType[];
  hoveredMarkerId?: string | null;
  selectedMarkerIds: string[];
  selectedVenueId?: string | null;
  onRowHover: (placeId: string | null) => void;
  onRowSelect: (placeId: string | null) => void;
}

interface PlaceWithDistance extends Place {
  distance?: number;
  venueTypeId?: string;
}

const PlacesList = React.memo(function PlacesList({ 
  places, 
  setPlaces, 
  center,
  venueTypes,
  hoveredMarkerId,
  selectedMarkerIds,
  selectedVenueId,
  onRowHover,
  onRowSelect
}: PlacesListProps) {
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'distance', desc: false }]);
  const [placesWithDistance, setPlacesWithDistance] = useState<PlaceWithDistance[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns: ColumnDef<PlaceWithDistance>[] = [
    {
      id: 'select',
      header: '',
      cell: ({ row }) => {
        const place = row.original;
        return (
          <input
            type="checkbox"
            checked={selectedMarkerIds.includes(place.id)}
            onChange={() => onRowSelect(place.id)}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
        );
      },
      size: 40,
    },
    {
      accessorKey: 'venueType',
      header: 'Venue',
      cell: ({ row }) => {
        const place = row.original;
        const venueType = venueTypes.find(v => v.id === place.venueTypeId && v.enabled);
        if (!venueType) return null;
        return (
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: venueType.color }}
            />
            <span>{venueType.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting()}
          className="flex items-center gap-1 font-semibold hover:text-blue-600 transition-colors"
        >
          Name
          <ArrowUpDown className={`w-4 h-4 ${column.getIsSorted() ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      ),
      cell: ({ row }) => {
        const place = row.original;
        return (
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {place.name}
          </a>
        );
      },
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting()}
          className="flex items-center gap-1 font-semibold hover:text-blue-600 transition-colors"
        >
          Rating
          <ArrowUpDown className={`w-4 h-4 ${column.getIsSorted() ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      ),
      cell: ({ row }) => {
        const place = row.original;
        if (!place.rating) return null;
        return (
          <div className="flex items-center gap-1 w-fit bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{place.rating}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'user_ratings_total',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting()}
          className="flex items-center gap-1 font-semibold hover:text-blue-600 transition-colors"
        >
          Reviews
          <ArrowUpDown className={`w-4 h-4 ${column.getIsSorted() ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      ),
      cell: ({ row }) => row.original.user_ratings_total?.toLocaleString() || 0,
    },
    {
      accessorKey: 'distance',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting()}
          className="flex items-center gap-1 font-semibold hover:text-blue-600 transition-colors"
        >
          Distance
          <ArrowUpDown className={`w-4 h-4 ${column.getIsSorted() ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      ),
      cell: ({ row }) => formatDistance(row.original.distance),
    },
  ];

  // Calculate distances when places or center changes
  useEffect(() => {
    const service = new google.maps.DistanceMatrixService();
    
    const calculateDistances = async () => {
      if (places.length === 0) return;

      const destinations = places.map(place => ({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }));

      try {
        const response = await service.getDistanceMatrix({
          origins: [center],
          destinations,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC
        });

        const newPlacesWithDistance = places.map((place, index) => ({
          ...place,
          distance: response.rows[0].elements[index].distance?.value
        }));

        setPlacesWithDistance(newPlacesWithDistance.filter(place => 
          place.business_status !== 'CLOSED_PERMANENTLY'
        ));
      } catch (error) {
        console.error('Error calculating distances:', error);
        setPlacesWithDistance(places.filter(place => 
          place.business_status !== 'CLOSED_PERMANENTLY'
        ));
      }
    };

    calculateDistances();
  }, [places, center]);

  const table = useReactTable({
    data: placesWithDistance,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });



  useEffect(() => {
    let mounted = true;
    const searchNearbyPlaces = async () => {
      setLoading(true);
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );

      const enabledVenues = venueTypes.filter(v => v.enabled);
      if (enabledVenues.length === 0) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      try {
        const allResults = await Promise.all(
          enabledVenues.map(async (venue) => {
            return new Promise<Place[]>((resolve) => {
              const request = {
                location: center,
                radius: 1500,
                type: venue.query as google.maps.places.PlaceType,
              };

              service.nearbySearch(
                request,
                (
                  results: google.maps.places.PlaceResult[] | null,
                  status: google.maps.places.PlacesServiceStatus
                ) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    const placesWithVenueType = results.map(result => ({
                      ...result,
                      venueTypeId: venue.id
                    }));
                    resolve(placesWithVenueType as Place[]);
                  } else {
                    resolve([]);
                  }
                }
              );
            });
          })
        );

        if (mounted) {
          const combinedPlaces = allResults.flat();
          setPlaces(combinedPlaces);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    searchNearbyPlaces();
    return () => {
      mounted = false;
    };
  }, [center.lat, center.lng, venueTypes]);

  const handleMouseEnter = useCallback((placeId: string) => {
    onRowHover(placeId);
  }, [onRowHover]);

  const handleMouseLeave = useCallback(() => {
    onRowHover(null);
  }, [onRowHover]);

  const handleRowClick = useCallback((placeId: string) => {
    onRowSelect(selectedMarkerIds.includes(placeId) ? null : placeId);
  }, [selectedMarkerIds, onRowSelect]);

  useEffect(() => {
    if ((hoveredMarkerId || selectedMarkerIds.length > 0) && tableRef.current) {
      const placeId = hoveredMarkerId || selectedMarkerIds[selectedMarkerIds.length - 1];
      const row = tableRef.current.querySelector(`[data-place-id="${placeId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [hoveredMarkerId, selectedMarkerIds]);

  const formatDistance = (meters?: number) => {
    if (meters === undefined) return 'N/A';
    if (meters < 1000) {
      return `${meters}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };


  if (loading) {
    return (
      <div className="animate-pulse space-y-4 h-[500px]">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-12 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div ref={tableRef} className="overflow-auto h-[500px]">
      <Table>
        <TableHeader className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const place = row.original;
            return (
              <TableRow
                key={place.place_id}
                data-place-id={place.place_id}
                onClick={() => handleRowClick(place.place_id)}
                className={`border-b border-gray-100 transition-colors cursor-pointer
                  ${selectedMarkerIds.includes(place.place_id) ? 'bg-blue-100' : 
                    hoveredMarkerId === place.place_id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                onMouseEnter={() => handleMouseEnter(place.place_id)}
                onMouseLeave={handleMouseLeave}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export default PlacesList;