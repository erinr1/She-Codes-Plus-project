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

search("New York");

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
  let tempInfo = Math.round(response.data.main.temp);
  currentCityTemp.innerHTML = `${tempInfo}`;

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

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSearchCity);

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

let searchCurrentCity = document.querySelector("#current-location");
searchCurrentCity.addEventListener("click", getLocation);

//function changeToF() {
//let tempF = document.querySelector("#current-city-temp");
//tempF.innerHTML = "66°";
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", changeToF);

//function changeToC() {
// let tempC = document.querySelector("#current-city-temp");
// tempC.innerHTML = "17°";
//}

//let celcius = document.querySelector("#celcius");
//celcius.addEventListener("click", changeToC);
