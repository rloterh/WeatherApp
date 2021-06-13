import './css/styles.css';
import * as el from './components/elements';
import Temp from './helpers/convertTemperature';
import { weatherKey } from './key';

let weather = {
  apiKey: weatherKey, 
  getWeatherData: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert('No weather found.');
          throw new Error('No weather found.');
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    el.city.innerText = 'Weather in ' + name;
    el.weatherIcon.src ='https://openweathermap.org/img/wn/' + icon + '.png';
    el.weatherDescription.innerText = description;
    el.temperature.innerText = temp + '°C/ ' + `${Temp(Math.round(temp))}°F`;
    el.humidity.innerText = 'Humidity: ' + humidity + '%';
    el.wind.innerText = 'Wind speed: ' + speed + ' km/h';
    el.weather.classList.remove('loading');
    el.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?' + name + '')";
  },
  search: function () {
    this.getWeatherData(el.searchBar.value);
  },
};

el.searchButton.addEventListener('click', function () {
  weather.search();
});

el.searchBar.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

weather.getWeatherData('Accra');