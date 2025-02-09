
export interface VenueType {
  id: string;
  name: string;
  icon: string;
  color: string;
  query: string;
  enabled: boolean;
}

export const defaultColors = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
];

export const defaultVenueTypes: VenueType[] = [
  {
    id: 'parking',
    name: 'Parking',
    icon: 'Car',
    color: defaultColors[0],
    query: 'parking',
    enabled: true,
  },
];
