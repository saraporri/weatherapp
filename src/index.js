function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
}
function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}${degree}${"C"}`;
  changeToCels.classList.add("active");
  changeToFahr.classList.remove("active");
}
let changeToCels = document.querySelector("#celsius");
changeToCels.addEventListener("click", changeToCelsius);
let celsiusTemp = null;
let degree = "°";

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  changeToCels.classList.remove("active");
  changeToFahr.classList.add("active");

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
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let skyCondition = document.querySelector("#sky-look");
  let skyLook = response.data.condition.description;
  skyCondition.innerHTML = `${skyLook}`;
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemp = response.data.temperature.current;
  getForecast(response.data.coordinates);
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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8b07dt8e17fee9f438eo54a03e745179";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${forecastDate(
                  forecastDay.time
                )}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="45"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-min-temp">${Math.round(
                    forecastDay.temperature.minimum
                  )}</span>
                  <span class="weather-forecast-max-temp">${Math.round(
                    forecastDay.temperature.maximum
                  )}</span>
                </div>
              </div>
            `;
    }
  });
  forecast.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
displayForecast();
