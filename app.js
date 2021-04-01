// Variables & Phrases Array
//#region 
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
let missedGuess = 0;
const overlay = document.getElementById('overlay');
const phrases = [
    'no i said poker is an honest trade',
    'in vino veritas',
    'i have not yet begun to defile myself',
    'i have two guns one for each of you',
    'my hypocrisy goes only so far'
];
//#endregion


// Listen for the start game button to be clicked
//#region 
startGame.addEventListener('click', () => {
    if (startGame.textContent !== 'Click here to Start Game') {
        // url refresh for game reset
        location.reload();
    } else {
        // game start (hides home overlay to show keyboard and display)
        overlay.style.display = 'none';
    }

});
//#endregion


// Return a random phrase from the 'phrases' array
//#region 
const getRandomPhraseAsArray = arr => {
    // chooses random phrase and splits into characters
    return arr[Math.floor(Math.random() * arr.length)].split('');
}
//#endregion


// Adds the letters of a string to the Display
//#region 
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i += 1) {
        let listItem = document.createElement('li');   
        const ul = document.querySelector('#phrase ul');     
        listItem.textContent = arr[i];        
        if (arr[i] !== ' ') {
            // assigns 'letter' class if the li is not a space
            listItem.className = 'letter';
        } else {
            // assigns space if not li is not assigned 'letter' class
            listItem.className = 'space';
        }
        ul.appendChild(listItem);
    }
}
//#endregion


// Function call outs
//#region 
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
//#endregion


// Check if a letter is in the phrase
//#region 
const checkLetter = button => {
    const letterCheck = document.querySelectorAll('.letter');
    let isMatch = null;
    // assigns 'show' class to letter chosen if it matches display,
    // and displays it (css)
    for (let i = 0; i < letterCheck.length; i += 1) {
        if (button === letterCheck[i].textContent) {
            letterCheck[i].classList.add('show')
            isMatch = button;
        }
    }
    return isMatch;
};
//#endregion


// Listen for the onscreen keyboard to be clicked
//#region 
qwerty.addEventListener('click', e => {
    const qwertySelect = e.target;
    // filters out space clicks from button clicks
    if (qwertySelect.tagName === 'BUTTON') {
        qwertySelect.className = 'chosen';
        qwertySelect.disabled = true;
        const letterChosen = checkLetter(qwertySelect.textContent);
        // removes heart from counter
        if (letterChosen === null) {
          missedGuess++
          let img = document.querySelector('#scoreboard img');
          img.remove();
        }
        checkWin();
      }
});
//#endregion


// Check if the game has been won or lost
//#region 
const checkWin = () => {
    const letterClass = document.querySelectorAll('.letter');
    const showClass = document.querySelectorAll('.show');    
    const playAgain = document.querySelector('#overlay a');
    // Check to see if selected letters and shown letters match, goes to win
    if (letterClass.length === showClass.length) {
        const headlineWin = document.querySelector('#overlay h2');
        overlay.classList.add('win');
        headlineWin.textContent = 'Congratulations! You have won!';
        overlay.style.display = 'flex';
        playAgain.textContent = 'Play again?';
        let imageDF = document.createElement('img');
        imageDF.src = "images/friends.jpg";
        let src = document.getElementById('overlay');
        src.appendChild(imageDF);
        // Checks if counter is greater than four, goes to lose
    } else if (missedGuess > 4) {
        const headlinerLose = document.querySelector('#overlay h2');
        overlay.classList.add('lose');
        headlinerLose.textContent = 'Sorry, Game Over!';
        overlay.style.display = 'flex';
        playAgain.textContent = 'Play again?';
        let imageDoc = document.createElement('img');
        imageDoc.src = "images/not.jpg";
        let src = document.getElementById('overlay');
        src.appendChild(imageDoc);      
    }
}
//#endregion
