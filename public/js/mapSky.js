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
      starMap(latitude, longitude);
      planteryMap(latitude, longitude);
    } else {
      console.error("Location not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function starMap(latitude, longitude) {
  // Get a reference to the iframe element
  const iframe = document.querySelector("#starMap");

  // Construct the new URL with the updated latitude and longitude
  const newSrc = `http://slowe.github.io/VirtualSky/embed?longitude=${longitude}&latitude=${latitude}&projection=polar&showstarlabels=true&showplanets=false&showplanetlabels=false&gridlines_az=true&gridlines_eq=true&gridlines_gal=true&live=true&az=191.75" allowTransparency="true`;

  // Update the iframe's src attribute with the new URL
  iframe.src = newSrc;
}

function planteryMap(latitude, longitude) {
  // Get a reference to the iframe element
  const iframe = document.querySelector("#planteryMap");

  // Construct the new URL with the updated latitude and longitude
  const newSrc = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&projection=polar&showstars=false&ecliptic=true&gridlines_az=true&gridlines_eq=true&gridlines_gal=true&live=true&az=185.25" allowTransparency="true"`;

  // Update the iframe's src attribute with the new URL
  iframe.src = newSrc;
}