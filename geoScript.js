var x = document.getElementById("demo");
var pressed = document.getElementById("btn");
var coords = {};
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(funct);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function funct(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  coords.lat = position.coords.latitude;
  coords.lng = position.coords.longitude;
  x.innerHTML =
    "latitude: " + coords.lat + "<br> " + "longitude: " + coords.lng;
}

pressed.addEventListener("click", getLocation);
console.log(lat, lng);
