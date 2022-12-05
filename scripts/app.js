// DOM manipulation of the app

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) =>{
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;
};

const updateCity = async (city) =>{
  console.log(city);
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return{
    cityDetails: cityDetails,
    weather: weather
  };

  // object shorthand notation
  return{
    cityDetails,
    weather
  }
}

cityForm.addEventListener('submit', e=>{
  // prevent default (refreshing page)
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update city ui
  updateCity(city).then(data=>{
    updateUI(data);
  }).catch(err=>{
    console.log(err);
  });

})