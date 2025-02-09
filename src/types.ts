export interface Place extends google.maps.places.PlaceResult {
  geometry: {
    location: google.maps.LatLng;
  };
}