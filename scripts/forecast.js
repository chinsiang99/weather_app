// fetch api

// api key for AccuWeather APIs - limited 50 api request per day
const key = "f8j2xjove6SPT7XbAJHG01DujzTmC5db"; 

// to get city code (key)
// url http://dataservice.accuweather.com/locations/v1/cities/search
// api documentaion - https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/search
const getCity = async (city) =>{
  const base_url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base_url + query);
  const data = await response.json();
  // console.log(response);
  // console.log(data);
  // console.log(data[0].Key);
  return data[0];
};

// getCity("kuala lumpur")
//   .then(data=>console.log(data))
//   .catch(err=>console.log(err));

// get current condition
// url http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
// api documentation - https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
const getWeather = async (id) =>{
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  // console.log(data);
  return data[0];
}

// getWeather(233776);

getCity('kuala lumpur')
  .then(data=>{
    return getWeather(data.Key);
  }).then(data=>{
    console.log(data);
  }).catch(err=>{
    console.log(err);
  });