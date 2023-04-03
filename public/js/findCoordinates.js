function getLatLong() {
  const locationInput = document.getElementById("location");
  const location = locationInput.value;

  getLocationCoordinates(location);
}

async function getLocationCoordinates(location) {
  const baseUrl = "https://nominatim.openstreetmap.org/search";
  const format = "json";
  const address = encodeURIComponent(location);

  const url = `${baseUrl}?q=${address}&format=${format}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      displayCoordinates(latitude, longitude);
    } else {
      console.error("Location not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}