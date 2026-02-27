let map;
let autocompleteTo;
let placesService;
let markers = [];
let currentLocationMarker = null;
let currentPosition = null;
let geocoder;
const markerMap = {};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 13,
  });

  geocoder = new google.maps.Geocoder();

  autocompleteTo = new google.maps.places.Autocomplete(
    document.getElementById("to"),
    { types: ["geocode"] }
  );

  placesService = new google.maps.places.PlacesService(map);

  document.getElementById("search")
    .addEventListener("click", searchPlaces);

  document.getElementById("current-location-btn")
    .addEventListener("click", zoomToCurrentLocation);
}
