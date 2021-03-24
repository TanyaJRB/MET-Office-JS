const index = require('./index.js');
var locsAndIds = undefined;
var names = undefined;

async function getSiteList(){
    locsAndIds = await index.getSiteListData();
    names = Object.keys(locsAndIds);
}

getSiteList();

function allByletter(names, letter){
    let letterNames = names.filter(name => name[0] === letter.toUpperCase());
    return letterNames;
}

function viewByLetter(names, letter, num1, num2){
    let letterNames = names.filter(name => name[0] === letter.toUpperCase());

    for (let i=num1; i<num2; i++){
        document.querySelector("#locationsListItem").innerHTML = letterNames[i];
    }
}

async function getLocationsByLetter(chosenLetter){
    viewByLetter(names, chosenLetter, 0, 20);
    //DOSOMETHINGTODISPLAYDIV
}

async function displayNext20(num1, num2){
    let allNamesByLetter = allByletter(names, chosenLetter);

    if (num2 > allNamesByLetter.Length){
        console.log("No more entries to display.")
    }
    else {
        viewByLetter(names, chosenLetter, num1, num2, 'next');
    }
}


async function getForecast(chosenLoc){

    let locId = 1;
    let timeIncrement = 'daily';

    // if (locsAndIds[chosenLoc] !== undefined){
    locId = locsAndIds[chosenLoc.replace(/\s/g, '')];
    // }
    // else {
    //     console.log('Oops. Looks like there may have been a typo there. Please can you try again, making sure capitals, punctuation and spaces match?');
    //     chosenLoc = readline.question('Type the name of the location you chose:')
    //     locId = locsAndIds[chosenLoc];
    // }

    return await index.getWeatherForecast(locId, timeIncrement);

}


module.exports = { getForecast };