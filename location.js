function zoomToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        currentPosition = pos;

        document.getElementById("to").value =
          `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`;

        map.setCenter(pos);
        map.setZoom(15);

        if (!currentLocationMarker) {
          currentLocationMarker = new google.maps.Marker({
            map: map,
            position: pos,
          });
        } else {
          currentLocationMarker.setPosition(pos);
        }
      },
      () => alert("Enable location access")
    );
  }
}
