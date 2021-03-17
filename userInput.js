const index = require('./index.js');
var readline = require('readline-sync');

// DEFINE A FUNCTION WHICH TAKES FIRST SET OF USER INPUT AND FILTERS LOCATION NAMES

function allByletter(names, letter){
    let letterNames = names.filter(name => name[0] === letter.toUpperCase());
    return letterNames;
}

function viewByLetter(names, letter, num1, num2, firstornext){
    let letterNames = names.filter(name => name[0] === letter.toUpperCase());

    console.log(`Showing ${firstornext} 20 entries for locations beginning with ${letter}`);

    for (let i=num1; i<num2; i++){
        console.log(letterNames[i]);
    }
}

//FUNCTION GETS SITE DATA FIRST AND THEN GETS USER CHOICE OF LETTER AND LOC

async function getUserInput(){

    const locsAndIds = await index.getSiteListData();

    let names = Object.keys(locsAndIds);

    //GET USER INPUT FOR A LETTER CHOICE 

    let chosenLetter = readline.question('To get started, browse our locations by letter. Type a letter to see locations beginning with that letter:  ');
    
    let allNamesByLetter = allByletter(names, chosenLetter);

    viewByLetter(names, chosenLetter, 0, 20, 'first');

    let anyLuckQuestion = 'Any luck? Type Y if you found the location you were looking for, or N to see the next 20 entries:  ';

    let nextResponse = readline.question(anyLuckQuestion); 

    let num1 = 20;
    let num2 = 41;

    while (nextResponse.toUpperCase() === 'N'){
        if (num2 > allNamesByLetter.Length){
            console.log("No more entries to display.")
        }
        viewByLetter(names, chosenLetter, num1, num2, 'next');
        nextResponse = readline.question(anyLuckQuestion); 
        if (nextResponse.toUpperCase() === 'Y'){
            break;
        } else {
            num1 += 20; 
            num2 += 20;
        }
    }

    //FIND THE LOCATION IN OBJECT ARRAY AND PAIR IT UP TO THE KEY. 

    let locId = 1;
    let timeIncrement = 'daily';

    let chosenLoc = readline.question('Type the name of the location you chose: ') 
    
    if (locsAndIds[chosenLoc] !== undefined){
        locId = locsAndIds[chosenLoc];
    }
    else {
        console.log('Oops. Looks like there may have been a typo there. Please can you try again, making sure capitals, punctuation and spaces match?');
        chosenLoc = readline.question('Type the name of the location you chose:')
        locId = locsAndIds[chosenLoc];
    }

    timeIncrement = readline.question('Would you like a daily or three-hourly forecast? Type \'3hourly\' or \'daily\' to proceed.')

    //GENERATE LINK BASED ON THE USER'S RESPONSES

    await index.getWeatherForecast(locId, timeIncrement);

}

getUserInput()

module.exports = { getUserInput };