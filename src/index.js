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
  currentTemp.innerHTML = "19°";
}
let changeToCels = document.querySelector("#celsius");
changeToCels.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "66°";
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
  let cityName = response.data.name;
  mainCity.innerHTML = `${cityName}`;
  let temp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;
  let skyCondition = document.querySelector("#sky-look");
  let skyLook = response.data.weather[0].description;
  skyCondition.innerHTML = `${skyLook}`;
}
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let units = "metric";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiRoot}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("submit", searchNewCity);

function defaultCity() {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiRoot}q=Rome&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

defaultCity();
