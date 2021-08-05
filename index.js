function formatDate(todaysDate) {
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["thu", "fri", "sat", "sun", "mon", "tues", "wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          
            <div class="col days">
              <p class="weekDay">Fri</p>
              <img
                src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                class="wfIcon"
              />
              <br />
              <p class="dayTemp">81°F</p>
            </div>
          
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  celsiusTemp = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "70ac119e9673d8efaba7774f355454f6";
  let units = "metric";
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

function fahDegrees(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempElement");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function celDegrees(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#tempElement");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fDegrees = document.querySelector("#fahrenheit");
fDegrees.addEventListener("click", fahDegrees);

let cDegrees = document.querySelector("#celsius");
cDegrees.addEventListener("click", celDegrees);

let h2 = document.querySelector(".dateTime");
let now = new Date();
h2.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrentLoaction);

search("New york");
displayForecast();
