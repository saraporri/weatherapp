let now = new Date();
now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsneday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];

let currentDay = document.querySelector("#today");
currentDay.innerHTML = `${today} <br> ${hour}.${minutes}`;

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}${degree}${"C"}`;
}
let changeToCels = document.querySelector("#celsius");
changeToCels.addEventListener("click", changeToCelsius);
let celsiusTemp = null;
let degree = "°";

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}${degree}${"F"}`;
}
let changeToFahr = document.querySelector("#fahrenheit");
changeToFahr.addEventListener("click", changeToFahrenheit);

function enterCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#load-city");
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = `${newCity.value}`;
}
let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", enterCity);

function showTemperature(response) {
  let mainCity = document.querySelector("#main-city");
  let cityName = response.data.city;
  mainCity.innerHTML = `${cityName}`;
  let temp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.temperature.current);
  temp.innerHTML = `${temperature}°C`;
  let skyCondition = document.querySelector("#sky-look");
  let skyLook = response.data.condition.description;
  skyCondition.innerHTML = `${skyLook}`;
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemp = response.data.temperature.current;
}
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8b07dt8e17fee9f438eo54a03e745179";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);

function searchNewCity(event) {
  event.preventDefault();

  let city = document.querySelector("#load-city").value;
  let apiKey = "8b07dt8e17fee9f438eo54a03e745179";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("submit", searchNewCity);

function defaultCity() {
  let apiKey = "8b07dt8e17fee9f438eo54a03e745179";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=rome&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

defaultCity();
