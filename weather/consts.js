export function getClouds() {
  const cloud1 = document.createElement("img");
  cloud1.id = "weather_visibility";
  cloud1.className = "weather__header-clouds";
  cloud1.src = "Clouds.png";
  const cloud2 = document.createElement("img");
  cloud2.id = "weather_visibility";
  cloud2.className = "weather__header-clouds-2";
  cloud2.src = "Clouds.png";

  return [cloud1, cloud2];
}

export function getRain(){
  const rain = document.createElement("img");
  rain.id = "weather_visibility";
  rain.className = "weather__header-rain";
  rain.src = "rain.gif";
  
  return rain;
}