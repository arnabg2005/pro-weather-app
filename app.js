var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var cityOutput = document.querySelector("#cityoutput");
var descriptionOutput = document.querySelector('#description');
var tempOutput = document.querySelector('#temp');
var windOutput = document.querySelector('#wind');
var apik = "af4017a8a1272ddd36c8b22bc864d46a"; 

function convertion(val) {
    return (val - 273.15).toFixed(1); 
}


function getWeatherIconAndEmoji(description) {
    let iconClass = 'fas fa-question-circle'; 
    let emoji = '❓'; 

    if (description.includes('clear sky')) {
        iconClass = 'fas fa-sun';
        emoji = '☀️';
    } else if (description.includes('clouds')) {
        iconClass = 'fas fa-cloud';
        emoji = '☁️';
    } else if (description.includes('rain') || description.includes('drizzle')) {
        iconClass = 'fas fa-cloud-showers-heavy';
        emoji = '🌧️';
    } else if (description.includes('thunderstorm')) {
        iconClass = 'fas fa-bolt';
        emoji = '⛈️';
    } else if (description.includes('snow')) {
        iconClass = 'fas fa-snowflake';
        emoji = '🌨️';
    } else if (description.includes('mist') || description.includes('fog')) {
        iconClass = 'fas fa-smog';
        emoji = '🌫️';
    } else if (description.includes('wind')) {
        iconClass = 'fas fa-wind';
        emoji = '🌬️';
    }

    return { iconClass, emoji };
}

btn.addEventListener('click', function() {
    // Clear previous data and add loading state
    cityOutput.innerHTML = `Loading...`;
    descriptionOutput.innerHTML = '';
    tempOutput.innerHTML = '';
    windOutput.innerHTML = '';


    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
        .then(res => {
            if (!res.ok) { 
                throw new Error('City not found or network error.');
            }
            return res.json();
        })
        .then(data => {
            var nameval = data['name'];
            var descriptionText = data['weather']['0']['description'];
            var temperatureValue = data['main']['temp'];
            var windspeedValue = data['wind']['speed'];

            const { iconClass, emoji } = getWeatherIconAndEmoji(descriptionText.toLowerCase());

            cityOutput.innerHTML = `<i class="fas fa-city"></i> Weather of <span class="value">${nameval}</span>`;
            tempOutput.innerHTML = `<i class="fas fa-thermometer-half"></i> Temperature: <span class="value">${convertion(temperatureValue)} °C</span>`;
            descriptionOutput.innerHTML = `<i class="${iconClass}"></i> Sky Conditions: <span class="value">${descriptionText} <span class="emoji">${emoji}</span></span>`;
            windOutput.innerHTML = `<i class="fas fa-wind"></i> Wind Speed: <span class="value">${windspeedValue} m/s</span>`; 
        })
        .catch(err => {
            alert(err.message || 'An error occurred. Please try again.');
            cityOutput.innerHTML = `City Not Found`;
            descriptionOutput.innerHTML = '';
            tempOutput.innerHTML = '';
            windOutput.innerHTML = '';
        });

});
