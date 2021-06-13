// import './css/styles.css';
import * as el from './components/elements';
import Temp from './helpers/convertTemperature';
import weatherKey from './key';

const weather = {
  apiKey: weatherKey,
  getWeatherData(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city
      }&units=metric&appid=${
        this.apiKey}`,
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
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    el.city.innerText = `Weather in ${name}`;
    el.weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    el.weatherDescription.innerText = description;
    el.temperature.innerText = `${temp}°C`;
    el.humidity.innerText = `Humidity: ${humidity}%`;
    el.wind.innerText = `Wind speed: ${speed} km/h`;
    el.weather.classList.remove('loading');
    el.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    el.celsiusButton.addEventListener('click', () => {
      el.temperature.innerText = `${temp}°C`;
      el.celsiusButton.classList.add('button-border');
      el.fahrenheitButton.classList.remove('button-border');
    });
    el.fahrenheitButton.addEventListener('click', () => {
      el.temperature.innerText = `${Temp(Math.round(temp))}°F`;
      el.fahrenheitButton.classList.add('button-border');
      el.celsiusButton.classList.remove('button-border');
    });
  },
  search() {
    this.getWeatherData(el.searchBar.value);
    el.celsiusButton.classList.add('button-border');
    el.fahrenheitButton.classList.remove('button-border');
  },
};

el.searchButton.addEventListener('click', () => {
  weather.search();
});

el.searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    weather.search();
  }
});
el.celsiusButton.classList.add('button-border');
weather.getWeatherData('Accra');