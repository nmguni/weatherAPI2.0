let appID = "8229bc8a46575ed3c39b9df4f9e6cdfa";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }

}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units${units}`).then((result) => {
        return result.json();
    }).then(result => {
        init(result);
    })
    function init(resultFromServer) {
        // console.log(resultFromServer);
        switch (resultFromServer.weather[0].main) {
            case 'Clear':
                document.body.style.backgroundImage = "url('/images/default.jpg')";
                break;

            case 'Clouds':
                document.body.style.backgroundImage = "url('/images/default.jpg')";
                break;

            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                document.body.style.backgroundColor = "url('/images/default.jpg')";
                break;

            case 'Thunderstorm':
                document.body.style.backgroundImage = "url('/images/default.jpg')";
                break;

            case 'Snow':
                document.body.style.backgroundImage = "url('/images/default.jpg')";
                break;

            default:
                break;

        }

        let weatherDescriptonHeader = document.getElementById('weatherDiscriptionHeader');
        let tempretureElement = document.getElementById('temperature')
        let humidityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');

        let weatherIcon = document.getElementById('documentIconImg');
        weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
        let resultDescrption = resultFromServer.weather[0].description;
        weatherDescriptonHeader.innerText = resultDescrption.charAt(0).toUpperCase() + resultDescrption.slice(1);

        tempretureElement.innerHTML = Math.floor(resultFromServer.main.temp - 273) + '&#176;';
        windSpeedElement.innerHTML = Math.floor(resultFromServer.wind.speed) + 'm/s';
        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + '%';

        setPositionForWeatherInfo();
    }

    function setPositionForWeatherInfo() {
        let weatherContainer = document.getElementById('weatherContainer');
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
        weatherContainer.style.visibility = 'visible';
    }
}


// add enter funtion 
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;

    if (searchTerm)
        searchWeather(searchTerm)

})