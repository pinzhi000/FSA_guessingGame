/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/



// 1

function generateWinningNumber (min, max) {
    min = 1;
    max = 100;
    
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

// 2

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }



  // 3

  class Game {

    constructor () {
      // hold the player's number guess
      this.playersGuess = null; 
      // will be an array, and holds all of the player's past guesses
      this.pastGuesses = []
      // winningNumber property, which calls generateWinningNumber
      this.winningNumber = generateWinningNumber()
    }

    // methods 
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower(){
        if (this.playersGuess < this.winningNumber){
            return true;
        }
        else {
            return false;
        }
    }

    playersGuessSubmission(num){
      this.playersGuess = num;

      if (typeof num !== 'number' || num < 1 || num > 100) throw 'That is an invalid guess.';
      return this.checkGuess(num);
    }


    checkGuess(num){

      // player won
      if (this.playersGuess === this.winningNumber){
        return "You Win!"
      }

      // player lost 
      if (this.pastGuesses.length >= 5){
        return 'You Lose'
      }

      // player guesses duplicate number
      if (this.pastGuesses.includes(this.playersGuess)){
        return "You have already guessed that number.";
      } 

      // player wrong guess or already guessed number
      if (this.playersGuess !== this.winningNumber || this.pastGuesses.includes(this.playersGuess)){
        this.pastGuesses.push(this.playersGuess)
      }      

      // off by less than 10
      if (Math.abs(this.playersGuess - this.winningNumber) < 10){
        return "You\'re burning up!"
      }

      // off by less than 25
      if (Math.abs(this.playersGuess - this.winningNumber) < 25){
        return "You\'re lukewarm."
      }

      // off by less than 50
      if (Math.abs(this.playersGuess - this.winningNumber) < 50){
        return "You\'re a bit chilly."
      }

      // off by less than 100
      if (Math.abs(this.playersGuess - this.winningNumber) < 100){
        return "You\'re ice cold!"
      }

    }

    // provide hint 
    provideHint() {
    
      let arrayHints = [generateWinningNumber(), generateWinningNumber(), generateWinningNumber(), this.winningNumber, generateWinningNumber()]
      return shuffle(arrayHints)
    }
}



// newGame function returns an empty, new game instance //

function newGame () {
  const startGame = new Game();
  return startGame;
}


/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

// PLAY GUESSING GAME 

function makeGuess () {

  // create a new instance of Guessing Game using newGame function from previous code 
  let game = newGame();

  // player inputs numerical guess into input box and clicks on Submit button 
  const submitButton = document.getElementById('submitBtn');

  // add event listener for clicking
  submitButton.addEventListener('click', function(){
    
    // take input value
    const numGuess = Number(document.querySelector('input').value);
    console.log(numGuess);

    // get output message associated with guess
    const guessMessage = game.playersGuessSubmission(numGuess)
    console.log('game message:', guessMessage, ' winning number:', game.winningNumber, 'past guesses:', game.pastGuesses);
  
    // reset input box after submission
    document.querySelector('input').value = '';

    // set game messages produced by checkGuess method 
    document.querySelector('#messages>h2').innerHTML = guessMessage;
    document.querySelector(`#guess-list li:nth-child(${game.pastGuesses.length})`).innerHTML = game.playersGuess;
    
    // RESET & HINT

    // enable reset button to work
    const resetButton = document.getElementById('resetBtn')
    
    // add eventListener 
    resetButton.addEventListener('click', function() {
      console.log('Reset Everything')
      
      
      document.querySelector('#messages>h2').innerHTML = 'Game Over!';
      game = newGame();
    });

    // enable hint button to work
    const hintButton = document.getElementById('hintBtn')

    // add eventListener 
    hintButton.addEventListener('click', function() {
      console.log('Give Hint')

    // display hint where messages normally show 
    document.querySelector('#messages>h2').innerHTML = `correct value is in: ${(new Game).provideHint()}`
    
    });
    
    
  });
}



/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

// PLAY GAME!  

makeGuess()