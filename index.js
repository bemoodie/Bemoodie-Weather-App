function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} | ${month} ${date},${year} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          
            <div class="col days">
              <p class="weekDay">${formatDay(forecastDay.dt)}</p>
              <img
                src="icons/${forecastDay.weather[0].icon}.png"
                alt=""
                class="wfIcon"
              />
              <br />
              <p class="dayTemp">${Math.round(forecastDay.temp.max)}°F</p>
            </div>
          
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "70ac119e9673d8efaba7774f355454f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "70ac119e9673d8efaba7774f355454f6";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputEmail1").value;
  search(city);

  let searchInput = document.querySelector("#exampleInputEmail1");
  let h1 = document.querySelector("h1");

  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    h2.innerHTML = formatDate();
  } else {
    h1.innerHTML = null;
    alert("Please enter a City");
    h1.innerHTML = "Please enter a City";
  }
}

function searchLocation(position) {
  let apiKey = "70ac119e9673d8efaba7774f355454f6";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrentLoaction(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemp = null;

let h2 = document.querySelector(".dateTime");
h2.innerHTML = formatDate();

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrentLoaction);

search("New york");
