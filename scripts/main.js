let body = document.querySelector('body')
let container = document.querySelector('.container-fluid')
let button = document.querySelector('button')
let searchText = document.querySelector('#text-input')
let iconDiv = document.querySelector('.icon')
let descriptionClass = document.querySelector('.description')
let humid = document.querySelector('.humid')
let searchedCityClass = document.querySelector('.searched-city')
let temp = document.querySelector('.temp')

function changeWeather(obj){
    let kelvin = obj.main.temp;
    //convert to cel
    let degC = kelvin - 273.15;
    //conver cel => far
    let degF = Math.floor((degC * 1.8) + 32);
    temp.textContent = `Temp: ${degF}°F`
    let humidity = obj.main.humidity
    humid.textContent = `Humidity: ${humidity}%`
    let icon = obj.weather[0].icon
    let iconImg = `https://openweathermap.org/img/wn/${icon}@2x.png`
    let image = document.createElement('img')
    image.setAttribute('src', iconImg)
    iconDiv.innerHTML = ''
    iconDiv.appendChild(image)
    let description = obj.weather[0].description
    descriptionClass.textContent = description
}

function backgroundCheck(idNumber, data){
    if (idNumber < 300){
        container.className = 'container-fluid thunderstorm'
        changeWeather(data)
    }
    else if (idNumber < 400){
        container.className = 'container-fluid drizzle'
        changeWeather(data)
    }
    else if (idNumber < 600){
        container.className = 'container-fluid rain'
        changeWeather(data)
    }
    else if (idNumber < 700){
        container.className = 'container-fluid snow'
        changeWeather(data)
    }
    else if (idNumber < 799){
        container.className = 'container-fluid atmosphere'
        changeWeather(data)
    }
    else if (idNumber < 801){
        container.className = 'container-fluid clear'
        console.log(container.className);
        changeWeather(data)
    }
    else if (idNumber < 802){
        container.className = 'container-fluid cloud1'
        changeWeather(data)
    }
    else if (idNumber < 803){
        container.className = 'container-fluid cloud2'
        changeWeather(data)
    }
    else if (idNumber < 804){
        container.className = 'container-fluid cloud3'
        changeWeather(data)
    }
    else if (idNumber < 805){
        container.className = 'container-fluid cloud4'
        changeWeather(data)
    }
    else{
        console.log("that's not good");
    }
}
let apiKey //place api key here
function dataFetch(searchedName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchedName}&appid=${apiKey}`)
    .then(response => response.json() )
    .then(data =>{
        console.log(data);
        searchedCityClass.innerText = data.name.toUpperCase() 
        let weatherArr =data.weather[0]
        let idNumber = weatherArr.id
        console.log(idNumber);
        backgroundCheck(idNumber, data)
    })
}

button.addEventListener('click', (e) => {
    let searchedName = searchText.value
    searchText.value = ""
    dataFetch(searchedName)
})

searchText.addEventListener('keydown', (e) => {
    if (e.keyCode == 13){
        let searchedName = searchText.value
        searchText.value = ""
        dataFetch(searchedName)
    }
})