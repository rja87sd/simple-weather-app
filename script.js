"use strict";

const API_KEY = "ee743d8da1a047949743a755b68bd79a";
const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/";

class Weather {
  constructor(city, weatherDay) {
    this.temperature = weatherDay.temp;
    this.description = weatherDay.weather.description;
    this.city = city;
    this.date = weatherDay.datetime;
    this.icon = weatherDay.weather.icon;
    this.hightemp = weatherDay.high_temp;
    this.lowtemp = weatherDay.low_temp;
    this.winddir = weatherDay.wind_cdir_full;
    this.windspeed = weatherDay.wind_spd;
  }

  displayToDom(weatherData) {
    const weatherContainer = document.getElementById("weather-display");
    weatherContainer.innerHTML += `
    
    <div>
        <h3>
            Date: ${weatherData.date}
        </h3>
        <h4>
            City: ${weatherData.city}
        </h4>
        <div class="row">
            <p>
              Temperature: ${weatherData.temperature}°F 
            </p>
            <p>
              High: ${weatherData.hightemp}°F
            </p>
            <p>
              Low: ${weatherData.lowtemp}°F
            </p>
              <img height="50" width="50" src="https://cdn.weatherbit.io/static/img/icons/${weatherData.icon}.png" alt="weather icon"> 
            <p>
              Description: ${weatherData.description}
            </p>
            <p>
              Wind Speed: ${weatherData.windspeed}mph
            </p>
            <p>
              Wind Direction: ${weatherData.winddir}
            </p>
        </div>
        <hr>
    </div>

    `;
  }
}

async function fetchWeatherData(zip) {
  try {
    const response = await fetch(
      BASE_URL + `daily?postal_code=${zip}&key=${API_KEY}&units=I&days=7`
    );

    // const response = await fetch("weatherData.json");
    const weatherData = await response.json();
    const cityName = weatherData.city_name;

    const weatherDays = weatherData.data.map(
      (weatherDay) => new Weather(cityName, weatherDay)
    );

    weatherDays.forEach((day) => day.displayToDom(day));
  } catch (error) {
    console.log(error);
  }
}

const form = document.getElementById("zipcode-input");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("weather-display").innerHTML = "";
  fetchWeatherData(form.zip.value);
});
