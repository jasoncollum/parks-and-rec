console.log('main.js');

const parkDisplay = document.querySelector('.park-display');

fetch(`https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json`)
    .then(response => response.json())
    .then(data => {
        renderParkNames(data);
    })

function renderParkNames(parksData) {
    parksData.parks.forEach(park => {
        const parkArticle = document.createElement('article');
        const parkH3 = document.createElement('h3');
        const parkP = document.createElement('p');

        parkH3.textContent = park.name;
        parkArticle.append(parkH3);
        parkP.textContent = park.state;
        parkArticle.append(parkP);

        if (park.visited) {
            parkArticle.classList.add('visited');
        } else {
            parkArticle.classList.add('not-visited');
        }

        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSky}/${park.latitude},${park.longitude}`)
            .then(response => response.json())
            .then(weather => {
                let weatherElement = createWeatherComponent(weather);
                parkArticle.append(weatherElement);
                parkDisplay.append(parkArticle);
            })
    })
}

function createWeatherComponent(weather) {
    const weatherUl = document.createElement('ul');
    const currentlyLi = document.createElement('li');
    const todayLi = document.createElement('li');
    const weekLi = document.createElement('li');

    currentlyLi.textContent = weather.currently.summary;
    todayLi.textContent = weather.hourly.summary;
    weekLi.textContent = weather.daily.summary;

    weatherUl.append(currentlyLi);
    weatherUl.append(todayLi);
    weatherUl.append(weekLi);

    return weatherUl
}