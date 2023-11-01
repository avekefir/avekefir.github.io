const api = {
  key: "f8434dffb8f56a03b56ef99f44a6f862",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector('.weather__header-search');

const setQuery = ((event) => {
  if (event.keyCode == 13) {
    getResults(search.value);
  }
})
const gif = document.createElement('img');
gif.className = 'gif';
gif.src = 'loading-loader.gif';
gif.width = 70;

const getResults = ((query) => {
  document.querySelector('.weather__header').append(gif)
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => { return weather.json(); })
    .then((weather)=>{
      displayResults(weather)
      document.querySelector('.gif').remove()
    })
})

const displayResults = ((weather) => {
  let city = document.querySelector('.weather__main-location-city')
  city.innerText = `${weather.name}, ${weather.sys.country}`;
 
  let now = new Date();
  let date = document.querySelector('.weather__main-location-date')
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.weather__main-info-temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

  let weather_el = document.querySelector('.weather__main-info-weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.weather__main-info-hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  localStorage.setItem('city', weather.name);
  localStorage.setItem('country', weather.sys.country);
  localStorage.setItem('date', dateBuilder(now));
  localStorage.setItem('temperature', Math.round(weather.main.temp));
  localStorage.setItem('weather', weather.weather[0].main);
  localStorage.setItem('hi-low', `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`)
})
search.addEventListener('keypress', setQuery);


function dateBuilder(d){
  let months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Webnesday", "Thursday",
  "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}