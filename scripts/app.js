// DOM manipulation of the app

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

const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e=>{
  // prevent default (refreshing page)
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update city ui
  updateCity(city).then(data=>{
    console.log(data);
  }).catch(err=>{
    console.log(err);
  });

})