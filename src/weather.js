const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = '9c0c95b85a284820f0ef551734674859';


function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response){
    return response.json();
  }).then(function(json) {
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    const weatherIcon = json.weather[0].icon;
    const weatherCondition = json.weather[0].main;
    weather.innerHTML = `<img src=" http://openweathermap.org/img/wn/${weatherIcon}.png">${place} ${temperature} °C`;
    console.log(weather);
console.log(`${place} ${temperature} °C`);
    PaintImate(weatherCondition); //bg.js
  });

}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  console.log(position);
  const latitude = position.coords.latitude,
        longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();