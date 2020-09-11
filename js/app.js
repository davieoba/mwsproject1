const monthOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weatherInfo = document.querySelector(".weather__info");
const cityName = document.querySelector(".city__name");
const currentDate = document.querySelector(".current__date");
const tempValue = document.querySelector(".temp__value");
const humValue = document.querySelector(".hum__value");
const windValue = document.querySelector(".wind__value");
const weatherIcon = document.querySelector(".icon");
const inputForm = document.querySelector("form");
const weatherDesc = document.querySelector(".weather__desc h5");

// fetch the weather data using the city name
const apiKey = "34c4f3c6105742dcd5c9257bc47f855d";

const getCity = async (city) => {
  const base = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const response = await base;
  const data = await response.json();
  return data;
};

const updateApp = async (city) => {
  const weatherDets = await getCity(city);

  return {
    weatherDets: weatherDets,
  };
};

// interacting with the dom
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = inputForm.location.value.trim();
  updateApp(userInput)
    .then((data) => {
      updateAppUI(data);
    })
    .catch((err) => {
      alert("the city you entered is wrong");
    });

  localStorage.setItem("cityName", userInput);
});

if (localStorage.getItem("cityName")) {
  updateApp(localStorage.getItem("cityName")).then((data) => {
    updateAppUI(data);
  });
}

const updateAppUI = (data) => {
  const today = new Date();
  let daynum = today.getDate();
  let day = dayOfWeek[today.getDay()];
  let month = monthOfYear[today.getMonth()];
  let year = today.getFullYear();
  // const c = k - 273.15;
  const c = Math.round(data.weatherDets.main.temp - 273.15);

  weatherInfo.style.display = "block";
  cityName.textContent = String(data.weatherDets.name);
  currentDate.innerHTML = `<span>${daynum} ${day}, ${month} ${year}</span>`;
  tempValue.textContent = String(c);
  humValue.textContent = String(data.weatherDets.main.humidity);
  windValue.textContent = String(data.weatherDets.wind.speed);
  console.log(data.weatherDets);
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weatherDets.weather[0].icon}@2x.png`;
  weatherDesc.textContent = data.weatherDets.weather[0].description;
};
