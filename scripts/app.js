// DOM manipulation of the app

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{

  // destructure properties (maintainable & cleaner way)
  const { cityDetails, weather} = data;

  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

  // update image and icon according to day night
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc = 'img/day.svg';
  }else{
    timeSrc = 'img/night.svg';
  }

  time.setAttribute('src', timeSrc);
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