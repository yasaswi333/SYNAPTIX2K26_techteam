async function getLocation(input) {
  return new Promise((resolve, reject) => {
    if (input.match(/^-?\d+\.\d+,\s*-?\d+\.\d+$/)) {
      const [lat, lng] = input.split(',').map(Number);
      resolve({ lat, lng });
    } else {
      geocoder.geocode({ address: input }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject("Invalid location");
        }
      });
    }
  });
}

async function searchPlaces() {
  const selectedType = document.getElementById("menu").value;
  const rating = document.getElementById("rating").value;
  const input = document.getElementById("to").value.trim();

  if (!input) {
    alert("Please enter a destination");
    return;
  }

  try {
    const { lat, lng } = await getLocation(input);
    const location = new google.maps.LatLng(lat, lng);

    map.setCenter(location);
    document.getElementById("results").innerHTML = "";
    clearMarkers();

    placesService.nearbySearch({
      location: location,
      radius: 10000,
      type: selectedType === "hotel" ? "lodging" : selectedType
    }, (results, status) => {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(place => {
          placesService.getDetails({ placeId: place.place_id }, (details) => {
            addRecommendation(details, selectedType);
            addMarker(details, selectedType);
          });
        });
      }
    });

  } catch {
    alert("Invalid location");
  }
}
