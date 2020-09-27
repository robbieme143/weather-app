const input = document.querySelector("#inputCity");
const apiid = "4d8fb5b93d4af21d66a2948710284366";

  document.addEventListener("submit", event => {
    event.preventDefault();

    let inputValue = input.value;
      
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiid}&units=metric`)
      .then(response => response.json())
      .then(data => {

        const {main, name, sys, weather} = data;

        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const createHtml = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>,  <span>${sys.country}</span>
        </h2>
        <h2 class="city-temp">${Math.round(main.temp)}<span>°C</span></h2>
        <figure>
          <img class="city-icon" src="${icon}" >
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        <audio src="tada.mp3"></audio> `;

        document.querySelector("#weather-output").innerHTML = createHtml;
        document.querySelector("audio").play();
      })
      
      .catch(() => {
        alert("No city found. Please enter the correct city name.");
      });
  });