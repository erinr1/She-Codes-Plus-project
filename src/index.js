function search(city) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  if (city.length === 0) {
    alert("Please enter a city");
  }
  search(city);
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    " August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let dateNum = date.getDate();
  return `Last updated: ${day}, ${month} ${dateNum} | ${hour}:${mins}`;
}

function showTemperature(response) {
  console.log(response);
  let currentCityTemp = document.querySelector("#current-city-temp");
  fahrenheitTemperature = Math.round(response.data.main.temp);
  currentCityTemp.innerHTML = `${fahrenheitTemperature}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#date-time").innerHTML = formatTime(
    response.data.dt * 1000
  );

  document
    .querySelector("#condition-image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#condition-image")
    .setAttribute("alt", response.data.weather[0].description);
}

function logLocation(postion) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let lat = postion.coords.latitude;
  let lon = postion.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logLocation);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-city-temp");
  celciusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let celciusTemperature = (fahrenheitTemperature - 32) * 0.55555555555;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-city-temp");
  celciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSearchCity);

let searchCurrentCity = document.querySelector("#current-location");
searchCurrentCity.addEventListener("click", getLocation);

search("New York");

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", displayCelciusTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemp);
