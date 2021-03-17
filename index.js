const axios = require('axios');

var options = {
  responseType: 'json'
};

//SAVE INITIAL MET OFFICE LINKS IN TO VARIABLES 

const baseUrl = "http://datapoint.metoffice.gov.uk/public/data/";
const apiKey = "ecce5697-a2e1-4515-b819-61d664569ec9";

const siteListLink = "val/wxfcs/all/json/sitelist?&key=";

//GET SITELIST AND SAVE LOCATIONS IN TO AN OBJECT WITH KEYS OF LOC NAMES AND VALUES OF THEIR IDs

async function getSiteListData() {
  try{

    //Getting the data from the API through Axios
    const response = await axios.get((baseUrl + siteListLink + apiKey));
    const responseBody = response.data;

    //Saving the location names and their location IDs in to an object
    let locationz = {}; 

      for (let i=0; i<responseBody.Locations.Location.length; i++){
        locationz[responseBody.Locations.Location[i].name] = responseBody.Locations.Location[i].id;
      } 
    
    return locationz;

  }
  catch (error){
    console.log(error);
  }
}

//GET WEATHER FORECAST ONCE USER INPUT HAS BEEN GATHERED FROM USER INPUT FILE
async function getWeatherForecast(locId, timeIncrement) {
  try{

    let weatherForecastLocLink = `val/wxfcs/all/json/${locId}?res=${timeIncrement}&key=`; 
    console.log(weatherForecastLocLink);

    const weather = await axios.get((baseUrl + weatherForecastLocLink + apiKey));
    const weatherForecast = weather.data;

    console.log(" ");
    console.log(`${weatherForecast.SiteRep.DV.Location.name} Weather Forecast`)

    let day = weatherForecast.SiteRep.DV.Location.Period;

    day.forEach((period)=>{
      console.log(" ");
      console.log("Forecast Date: " + period.value.slice(0,10));
      
      console.log(" ");

      console.log("Forecast Type: " + period.Rep[0].$);
      console.log("Temperature: " + period.Rep[0].Dm);
      console.log("Feels Like Temperature: " + period.Rep[0].FDm);

      console.log(" ");

      console.log("Forecast Type: " + period.Rep[1].$);
      console.log("Temperature: " + period.Rep[1].Nm);
      console.log("Feels Like Temperature: " + period.Rep[1].FNm);
    })
  }
  catch (error){
    console.log(error);
  }
}

module.exports = { getSiteListData, getWeatherForecast };