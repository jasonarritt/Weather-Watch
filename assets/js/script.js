// OpenWeather API KEY: 4dbb43246a043fc03198de34a46d252d

function fetchWeatherData(cityName) {
    let apiKey = "4dbb43246a043fc03198de34a46d252d"
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    console.log(apiURL);

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                let currentTime = new Date(data.dt * 1000);
                let currentTimeEl = $("#current-time");
                currentTimeEl.text(currentTime);

                let cityNameEl = $("#city-name");
                cityNameEl.text(data.name);

                let todayTemperatureEl = $("#today-temperature");
                todayTemperatureEl.text("Current Temperature: " + (data.main.temp) + " Degrees Fahrenheit");

                let todayHumidityEl = $("#today-humidity");
                todayHumidityEl.text("Current Humidity Percentage: " + (data.main.humidity) + "%");

                let todayWindEl = $("#today-wind-speed");
                todayWindEl.text("Current Wind Speed: " + (data.wind.speed) + " MPH");

                
                let lat = data.coord.lat;
                let long = data.coord.lon;
                let UVapiURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&cnt=1";

                fetch(UVapiURL)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data[0].value);

                            let UVIndexEl = document.createElement("span");
                        
                            if (data[0].value >= 8) {
                                UVIndexEl.classList.add("badge-danger");
                            }
                            else if (data[0].value >= 6) {
                                UVIndexEl.classList.add("badge-warning");
                            }
                            else {
                                UVIndexEl.classList.add("badge-success");
                            }
                            let todayUVEl = $("#today-uv-index");
                            UVIndexEl.innerHTML = data[0].value;
                            todayUVEl.text("Current UV Index: ");
                            todayUVEl.append(UVIndexEl);
                        });

                    } else {
                        alert("Error: Keyword did not return results");
                    }
                })
                .catch(function (error) {
                    alert("Unable to connect to server");
                });




            });
        } else {
            alert("Error: Search did not return results");
        }
    })
    .catch(function (error) {
        alert("Unable to connect to server");
    });
}


fetchWeatherData("raleigh")