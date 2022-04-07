// OpenWeather API KEY: 4dbb43246a043fc03198de34a46d252d
let searchFormEl = document.getElementById("city-search-form");
let searchTermEl = document.querySelector("#search-city");
let searchHistoryContainerEl = document.querySelector("#search-history-container");
let weatherContainerEl = document.querySelector("#weather-container");

var searchHistoryArray = [];


function retrieveSearchHistory() {
    searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray"))
    console.log(searchHistoryArray);

    if (!searchHistoryArray) {
        searchHistoryArray = [];

        console.log("Array is being cleared")
    } else {
        
    console.log("Beginning for loop")
    for (var i = 0; i < searchHistoryArray.length; i++) {
        console.log(searchHistoryArray[i]);
                    let historyButtonEl = document.createElement('button');
                    historyButtonEl.setAttribute('type', 'button');
                    historyButtonEl.setAttribute('class', 'btn btn-outline-info mt-1 mb-1 w-100 history-item-button');
                    historyButtonEl.textContent = searchHistoryArray[i];

                    searchHistoryContainerEl.appendChild(historyButtonEl);
    }

    }
}

function setSearchHistory() {


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



                    console.log("Inside IF condition");

                    let historyButtonEl = document.createElement('button');
                    historyButtonEl.setAttribute('type', 'button');
                    historyButtonEl.setAttribute('class', 'btn btn-outline-info mt-1 mb-1 w-100 history-item-button');
                    historyButtonEl.textContent = cityName;

                    searchHistoryContainerEl.appendChild(historyButtonEl);
                    searchHistoryArray.push(cityName);
                    localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));

                



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
                let forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + locationID + "&units=imperial&appid=" + apiKey;

                fetch(forecastApiURL)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                            let projectedForecastContainerEl = document.getElementById("projected-forecast");
                            projectedForecastContainerEl.innerHTML = '';

                            for (i = 0; i < 5; i++) {
                                console.log(i);
                                //TODO:Figure out forecast

                                var indexForDate = i * 8 + 4;

                                let dayCardEl = document.createElement("div");
                                dayCardEl.setAttribute('class', 'card border-info col-lg-2 m-auto');
                                let dayCardDateEl = document.createElement("p");

                                let dayCardDate = new Date(data.list[indexForDate].dt_txt);

                                console.log(dayCardDate);

                                dayCardDateEl.innerText = dayCardDate;


                                let dayCardPictureEl = document.createElement("img");
                                let dayCardPicture = data.list[i].weather[0].icon;
                                dayCardPictureEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayCardPicture + "@4x.png");
                                dayCardPictureEl.setAttribute("alt", data.list[i].weather[0].description);

                                let dayCardTemperatureEl = document.createElement("p");
                                dayCardTemperatureEl.textContent = "Temperature: " + (data.list[i].main.temp) + " Degrees Fahrenheit";
                
                                let dayCardHumidityEl = document.createElement("p");
                                dayCardHumidityEl.textContent = "Humidity Percentage: " + (data.list[i].main.humidity) + "%";
                
                                let dayCardWindEl = document.createElement("p");
                                dayCardWindEl.textContent = "Wind Speed: " + (data.list[i].wind.speed) + " MPH";

                
                                dayCardEl.appendChild(dayCardDateEl);
                                dayCardEl.appendChild(dayCardPictureEl);
                                dayCardEl.appendChild(dayCardTemperatureEl);
                                dayCardEl.appendChild(dayCardHumidityEl);
                                dayCardEl.appendChild(dayCardWindEl);

                                projectedForecastContainerEl.appendChild(dayCardEl);

                                weatherContainerEl.classList.remove('d-none');



                                // let dayCardDate = new Date(data.list[i].dt * 1000);
                                // dayCardDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                                // dayCardDateEl.text(dayCardDate);
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
        searchTermEl.value = "";
    } else {
        alert("Please Enter the Name of a City to Search");
    }
}

retrieveSearchHistory();
searchFormEl.addEventListener("submit", formSubmitHandler);

$(".history-item-button").click(function () {
    let searchTerm = $(this).text();
    fetchWeatherData(searchTerm);
});
