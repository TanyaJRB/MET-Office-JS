function onSubmitGetForecast(form){
    let location = form.location.value.replace(/\s/g, '');
    fetch(`http://localhost:3000/forecast?location=${location}`) //calls router.js as a web service
    .then(async function(response) {
        let forecastData = await response.json();

        let day = forecastData.SiteRep.DV.Location.Period;

        document.getElementById("locName").innerHTML = "Weather Forecast: " + forecastData.SiteRep.DV.Location.name;

        document.getElementById("day1").innerHTML = "Forecast Date: " + day[0].value.slice(0,10);

        document.getElementById("Dtype").innerHTML = "Forecast Type: " + day[0].Rep[0].$;
        document.getElementById("dayTemp").innerHTML = "Temperature: " + day[0].Rep[0].Dm;
        document.getElementById("flDayTemp").innerHTML = "Feels Like Temperature: " + day[0].Rep[0].FDm;

        document.getElementById("Ntype").innerHTML = "Forecast Type: " + day[0].Rep[1].$;
        document.getElementById("nightTemp").innerHTML = "Temperature: " + day[0].Rep[1].Nm;
        document.getElementById("flNightTemp").innerHTML = "Feels Like Temperature: " + day[0].Rep[1].FNm;


        //day.forEach((period)=>{
            //   console.log(" ");
            //   console.log("Forecast Date: " + period.value.slice(0,10));

            //   console.log(" ");

            //   console.log("Forecast Type: " + period.Rep[0].$);
            //   console.log("Temperature: " + period.Rep[0].Dm);
            //   console.log("Feels Like Temperature: " + period.Rep[0].FDm);

            //   console.log(" ");

            //   console.log("Forecast Type: " + period.Rep[1].$);
            //   console.log("Temperature: " + period.Rep[1].Nm);
            //   console.log("Feels Like Temperature: " + period.Rep[1].FNm);
            //})
        document.getElementById("weatherForecast").style.display="block";
    });
}
