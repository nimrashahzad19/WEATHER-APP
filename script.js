const apiKey = "bce410b67d15f51dbbe5f846cca73c18";
let useCelsius = true;

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");

  const units = useCelsius ? "metric" : "imperial";
  const unitSymbol = useCelsius ? "°C" : "°F";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" class="weather-icon" />
        <p><strong>${data.weather[0].description}</strong></p>
        <p>🌡 Temperature: ${data.main.temp} ${unitSymbol}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} ${useCelsius ? "m/s" : "mph"}</p>
      `;
      document.getElementById("weatherInfo").innerHTML = weatherHTML;
    })
    .catch((err) => {
      document.getElementById("weatherInfo").innerHTML = `<p>${err.message}</p>`;
    });
}

function toggleUnits() {
  useCelsius = !useCelsius;
  getWeather();
}
