const apiKey = 'c15da146876e7175d5ae6ec57cb7f08b'; // Replace with your OpenWeatherMap API Key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    document.getElementById('weatherDisplay').innerHTML = '<p>Please enter a city name.</p>';
  }
});

// Add Enter key support
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = e.target.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});

function fetchWeather(city) {
  const display = document.getElementById('weatherDisplay');
  display.innerHTML = '<p>Loading weather data...</p>';
  
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => showWeather(data))
    .catch(error => {
      console.error('Error fetching weather:', error);
      showWeather(null);
    });
}

function showWeather(data) {
  const display = document.getElementById('weatherDisplay');
  if (!data || data.cod !== 200) {
    display.innerHTML = '<p>City not found or error fetching data. Please check the city name and try again.</p>';
    return;
  }
  display.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  `;
}
