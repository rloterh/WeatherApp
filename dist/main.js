(()=>{"use strict";const e=document.querySelector(".city"),t=document.querySelector(".icon"),r=document.querySelector(".description"),n=document.querySelector(".temp"),c=document.querySelector(".wind"),a=document.querySelector(".weather"),{body:s}=document,o=document.querySelector(".search-bar"),i=document.querySelector(".search button"),d=document.querySelector(".humidity"),u=document.querySelector(".menu-celsius"),h=document.querySelector(".menu-fahrenhiet"),m={apiKey:"6cc39499b21c43c7fc630c0c52e1295f",async getWeatherData(e){await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=${this.apiKey}`).then((e=>e.json())).catch((e=>e)).then((e=>this.displayWeather(e)))},async displayWeather(o){const{name:i}=o,{icon:m,description:l}=o.weather[0],{temp:y,humidity:p}=o.main,{speed:b}=o.wind;e.innerText=`Weather in ${i}`,t.src=`https://openweathermap.org/img/wn/${m}.png`,r.innerText=l,n.innerText=`${y}°C`,d.innerText=`Humidity: ${p}%`,c.innerText=`Wind speed: ${b} km/h`,a.classList.remove("loading"),s.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+i+"')",u.addEventListener("click",(()=>{n.innerText=`${y}°C`,u.classList.add("button-border"),h.classList.remove("button-border")})),h.addEventListener("click",(()=>{n.innerText=9*Math.round(y)/5+32+"°F",h.classList.add("button-border"),u.classList.remove("button-border")}))},search(){this.getWeatherData(o.value),u.classList.add("button-border"),h.classList.remove("button-border")}};i.addEventListener("click",(()=>{m.search()})),o.addEventListener("keyup",(e=>{"Enter"===e.key&&m.search()})),u.classList.add("button-border"),m.getWeatherData("Accra")})();