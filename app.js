const base_URL =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const lan_long =
  "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
const API = "2fda959472d60dbe4cefbfdc2c1222a4";
function clearDefaultText(input) {
  if (input.value === "Default Text") {
    input.value = "";
  }
}
// Function to get the weather data from OpenWeatherMap
let search = document.querySelector("input");
document.querySelector("button").addEventListener("click", () => {
  let city = search.value;
  if (!city) alert("please Enter a City name");
  else console.log(city);

  main(city);
});
document.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    let city = search.value;
    main(city);
  }
});

async function main(city) {
  let latitude = await fetchlatitude(city);
  let longitude = await fetchlongitude(city);
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`; //This URL will be used for fetchong the Weather
  let data = await fetchweather(URL);
  let tempdata = data["main"]["temp"];
  let feeltemp = data["main"]["feels_like"];
  let humidity = data["main"]["humidity"];
  let windspeed = data["wind"]["speed"];
  let icon = data.weather[0].icon;
  console.log(data);
  console.log(tempdata);
  console.log(icon);
  let final_temp = Math.floor(tempdata - 273.15);
  let final_feel = Math.floor(feeltemp - 273.15);
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  var img = document.querySelector("#wicon");
  img.src = iconurl;
  document.querySelector("strong").textContent = final_temp;
  document.querySelector(".feelslike").textContent =
    "Feels Like" + ":" + " " + final_feel + "\u00B0" + "C";
  document.querySelector(".humidity1").textContent = humidity + "%";
  document.querySelector(".pressure1").textContent =
    Math.floor(windspeed * 3.6) + "km/hr";
  document.querySelector(".city-name").textContent = city;
}
async function fetchweather(URL) {
  let dt = await fetch(URL);
  let dtjson = await dt.json();
  return dtjson;
}
async function fetchlatitude(city) {
  let URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${API}`;
  let data = await fetch(URL);
  let datajson = await data.json();
  let latvalue = datajson[0]["lat"];
  return latvalue;
}
async function fetchlongitude(city) {
  let URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${API}`;
  let data = await fetch(URL);
  let datajson = await data.json();
  let lonvalue = datajson[0]["lon"];
  return lonvalue;
}
