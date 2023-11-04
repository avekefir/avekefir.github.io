const api = {
  key: "f8434dffb8f56a03b56ef99f44a6f862",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const cloud1 = document.createElement("img");
cloud1.id = "weather_visibility";
cloud1.className = "weather__header-clouds";
cloud1.src = "Clouds.png";
const cloud2 = document.createElement("img");
cloud2.id = "weather_visibility";
cloud2.className = "weather__header-clouds-2";
cloud2.src = "Clouds.png";

if (localStorage.length > 3) {
  document.querySelector(
    ".weather__main-location-city"
  ).innerText = `${localStorage.getItem("city")}, ${localStorage.getItem(
    "country"
  )}`;
  document.querySelector(".weather__main-location-date").innerText =
    localStorage.getItem("date");
  document.querySelector(".weather__main-info-temp").innerText =
    localStorage.getItem("temperature");
  document.querySelector(".weather__main-info-weather").innerText =
    localStorage.getItem("weather");
  document.querySelector(".weather__main-info-hi-low").innerText =
    localStorage.getItem("hi-low");

  if (localStorage.getItem("weather") === "Clouds") {
    document.querySelector(".weather__header").prepend(cloud1);
    document.querySelector(".weather__header").prepend(cloud2);
  }
}
const search = document.querySelector(".weather__header-input-search");
// const button = document.querySelector(".weather__header-input-button");
const setQuery = (event) => {
  if (event.keyCode == 13) {
    getResults(search.value);
  }
};

const gif = document.createElement("img");
gif.className = "gif";
gif.src = "loading-loader.gif";
gif.width = 70;

const city_not_exist = document.createElement("div");
city_not_exist.className = "message";
const getResults = (query) => {
  document.querySelectorAll("#weather_visibility").forEach((element) => {
    document.querySelector("#weather_visibility").remove();
  });
  document.querySelector(".weather__header").append(gif);
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((weather) => {
      displayResults(weather);
      if (weather.weather[0].main === "Clouds") {
        document.querySelector(".weather__header").prepend(cloud1);
        document.querySelector(".weather__header").prepend(cloud2);
      }
      document.querySelector(".gif").remove();
      search.value = "";
      document.querySelector(".message").remove();
    })
    .catch((err) => {
      if (search.value !== "") {
        city_not_exist.innerText = `City '${search.value}' doesn't exist`;
        search.value = "";
        document.querySelector(".weather__header").append(city_not_exist);
      }

      document.querySelector(".gif").remove();
    });
};

const displayResults = (weather) => {
  let city = document.querySelector(".weather__main-location-city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".weather__main-location-date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".weather__main-info-temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

  let weather_el = document.querySelector(".weather__main-info-weather");
  weather_el.innerText = weather.weather[0].main;
  console.log(weather.weather[0].main);
  if (weather.weather[0].main === "Clouds") {
    console.log("yep");
  }

  let hilow = document.querySelector(".weather__main-info-hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  localStorage.setItem("city", weather.name);
  localStorage.setItem("country", weather.sys.country);
  localStorage.setItem("date", dateBuilder(now));
  localStorage.setItem("temperature", `${Math.round(weather.main.temp)}°c`);
  localStorage.setItem("weather", weather.weather[0].main);
  localStorage.setItem(
    "hi-low",
    `${Math.round(weather.main.temp_min)}°c / ${Math.round(
      weather.main.temp_max
    )}°c`
  );
};

search.addEventListener("keypress", setQuery);
// button.addEventListener("click", getResults(search.value));

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Webnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
