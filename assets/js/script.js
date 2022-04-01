// OpenWeather API KEY: 4dbb43246a043fc03198de34a46d252d
let searchFormEl = document.getElementById("city-search-form");
let searchTermEl = document.querySelector("#search-city");


function retrieveSearchHistory() {

}

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

                let todayWeatherPictureEl = document.getElementById("today-weather-picture");
                let currentWeatherPicture = data.weather[0].icon;
                todayWeatherPictureEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeatherPicture + "@4x.png");
                todayWeatherPictureEl.setAttribute("alt", data.weather[0].description);


                


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
                    }
                })
                .catch(function (error) {
                });

                let locationID = data.id;
                let forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + locationID + "&appid=" + apiKey;

                fetch(forecastApiURL)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                            let projectedForecastContainerEl = document.getElementById("projected-forecast");

                            for (i = 1; i < 6; i++) {
                                console.log(i);
                                //TODO:Figure out forecast
                                // let dayCardEl = document.createElement("div");
                                // let dayCardDateEl = document.createElement("p");
                                // let dayCardDate = new Date(data.list[i].dt * 1000);
                                // dayCardDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                                // dayCardDateEl.text(dayCardDate)
                                // console.log(dayCardDate);
                            }


                        });
                    } else {
                    }
                })
                .catch(function (error) {
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



function formSubmitHandler(event) {
    event.preventDefault();
    let searchTerm = searchTermEl.value.trim();
    console.log(searchTerm);

    if (searchTerm) { 
        fetchWeatherData(searchTerm);
        // searchFormEl.value = "";
    } else {
        alert("Please Enter the Name of a City to Search");
    }
}


searchFormEl.addEventListener("submit", formSubmitHandler);
