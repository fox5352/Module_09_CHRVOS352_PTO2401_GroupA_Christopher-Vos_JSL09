

function loadBackground() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space")
        .then(res => res.json())
        .then(data => {
            console.log(data.urls.full)
            document.body.style.backgroundImage = `url(${data.urls.full})`
            document.getElementById("author").textContent = `By: ${data.user.name}`
        })
        .catch(err => {
            document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1497122123454-d63853ca2d39?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjA3MjI4NjZ8&ixlib=rb-4.0.3&q=85)"
        })   
}

function getCryptoData() {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("crypto-top").innerHTML =  `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        // add prices
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err=>console.log(err))
}

function getTime() {
    return setInterval(() =>{
        const timeNow = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
        document.querySelector(".time").textContent = timeNow;
    }, 1000)
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        // success message
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=$metric`)
            .then(res=>{
                if(!res.ok){
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data =>{
                console.log(data.weather[0]);
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather").innerHTML = `
                    <img src=${iconUrl} />
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                    <p class="weather-city">${data.name}</p>
                `

            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
            })           
    });
}

function main() {
    // load the backgroundImage
    loadBackground();
    // get crypto data
    getCryptoData();
    // get current time
    const interval = getTime();
    // get weather
    getWeather();
}

main();