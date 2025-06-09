// Wait for DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "915507cee39512bdd067af27487f08ed"; // << Replace with your OpenWeatherMap API key
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");

  // Function to fetch weather data
  async function getWeather(city) {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
      weatherResult.innerHTML = `<p>Loading weather data...</p>`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      // Extract and display required weather info
      weatherResult.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: <strong>${data.main.temp} °C</strong></p>
        <p>🌤️ Condition: <strong>${data.weather[0].main}</strong></p>
        <p>💨 Wind Speed: <strong>${data.wind.speed} m/s</strong></p>
        <p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>
      `;
    } catch (error) {
      weatherResult.innerHTML = `<p class="error">Error: ${error.message}. Please try again.</p>`;
    }
  }

  // Handle button click or enter key press
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    } else {
      weatherResult.innerHTML = `<p class="error">Please enter a city name.</p>`;
    }
  });

  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
});
