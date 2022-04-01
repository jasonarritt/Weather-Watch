// OpenWeather API KEY: 4dbb43246a043fc03198de34a46d252d

function fetchWeatherData(cityName) {
    let apiKey = "4dbb43246a043fc03198de34a46d252d"
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    console.log(apiURL);

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);


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