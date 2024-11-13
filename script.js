const apiKey = '2e46577c8ba42881e421dee83179419e'; // Replace with your actual API key

// Fetch weather data based on the city
async function fetchWeatherData(city) {
    try {
        console.log(`Fetching weather data for ${city}...`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data); // Check if data is being fetched

        displayHourlyForecast(data);
        displayDailyForecast(data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please check the city name.");
    }
}

// Function to fetch weather data from the API
async function fetchWeatherdata(city = "Lahore") { // Default to "Lahore" if no city is provided
    const apiKey = "2e46577c8ba42881e421dee83179419e"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = await response.json();

        // Update the HTML elements with the fetched data
        document.querySelector(".temp-value").textContent = Math.round(data.main.temp); // Current temperature
        document.querySelector(".location").textContent = data.name; // City name
        document.querySelector(".details").innerHTML =
            `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | H:${Math.round(data.main.temp_max)}° | L:${Math.round(data.main.temp_min)}°`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


// Call the function to fetch and display the data when the page loads
fetchWeatherdata();

// Search weather for a specific city
function searchWeather() {
    const locationInput = document.getElementById('location2').value;
    if (!locationInput) {
        alert("Please enter a city name!");
        return;
    }
    fetchWeatherData(locationInput);
    fetchWeatherdata(locationInput);
}

// Display hourly forecast
function displayHourlyForecast(data) {
    const hourlyContainer = document.getElementById('hourly-data');
    hourlyContainer.innerHTML = ''; // Clear previous data

    for (let i = 0; i < 6; i++) {
        const hourData = data.list[i];
        const time = new Date(hourData.dt * 1000).getHours();
        const temp = Math.round(hourData.main.temp);
        const icon = hourData.weather[0].icon;

        const forecastItem = `
            <div class="forecast-item">
                <p>${time}:00</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p>${temp}°C</p>
            </div>
        `;
        hourlyContainer.innerHTML += forecastItem;
    }
}

// Display daily forecast
function displayDailyForecast(data) {
    const dailyContainer = document.getElementById('daily-data');
    dailyContainer.innerHTML = ''; // Clear previous data

    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const minTemp = Math.round(dayData.main.temp_min);
        const maxTemp = Math.round(dayData.main.temp_max);
        const icon = dayData.weather[0].icon;

        const forecastItem = `
            <div class="forecast-item1">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" class="img2">
                <div class="temp-range">
                    <span>${minTemp}°C</span>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${(maxTemp - minTemp) * 5}%"></div>
                    </div>
                    <span>${maxTemp}°C</span>
                </div>
            </div>
        `;
        dailyContainer.innerHTML += forecastItem;
    }
}

// Initial fetch for a default city
fetchWeatherData('Lahore');
