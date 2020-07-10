
// Contains all the other functions. Is called at the end
function simon() {
  var squares = []; //Empty array to be used as the randomely generated square sequence
  var playerSquares = []; //Empty array that will be populated by the player and reset every round

  initialize(); //Will initialize the game, or reset it after a player loses and tries again

  //Will initialize the game, or reset it after a player loses and tries again
  //Pressing any key or clicking the screen will reset both arrays, change the heading to "Level 1", and begin the game
  function initialize() {
    $(document).keypress(function() {
      $("h2").text("Level 1");
      playerSquares = [];
      squares = [];
      $(".heading").off("click");
      simonGame();
    })
    $(".heading").click(function() {
      $("h2").text("Level 1");
      playerSquares = [];
      squares = [];
      $(".heading").off("click");
      simonGame();
    })

  }

  // Starts the game
  //Turns off the keypress or click event, then runs both main functions, one after the other
  function simonGame() {
    $(document).off("keypress");
    selectSquare();
    playerSelectSquare();
  }

  //Generates a random number 1-4, assigns it to a color, then selects the square that is that color, playing a sound and animation respective to the chosen classColor
  //Also pushes the number into the "squares" array to be used for comparison later
  function selectSquare() {
    var randomNum = Math.floor(Math.random() * 4 + 1);
    var currentColor;

    switch (randomNum) {
      case 1:
        currentColor = ".blue";
        var blueBeep = new Audio("sounds/blue-beep.mp3")
        blueBeep.play();
        break;
      case 2:
        currentColor = ".red";
        var redBeep = new Audio("sounds/red-beep.mp3")
        redBeep.play();
        break;
      case 3:
        currentColor = ".green";
        var greenBeep = new Audio("sounds/green-beep.mp3")
        greenBeep.play();
        break;
      case 4:
        currentColor = ".yellow";
        var yellowBeep = new Audio("sounds/yellow-beep.mp3")
        yellowBeep.play();
        break;
      default:
        console.log(randomNum);
    }
    squareAnimation(currentColor);
    squares.push(randomNum);
  }

  // Adds a click event to each of the four playerSquares
  // Performs animation/sound when that color is clicked, and pushes a number (respective to the color) into the playerSquares array
  // Then calls the "checkChoice" method, passing in the player's choice and the value being compared against in the "squares" arrays
  // Depending on the result and the current round, gameplay will either resume or cease here
  function playerSelectSquare() {
    var playerColorNum;
    var classColor;
    var correctChoice;
    $(".square").click(function(event) {
      var className = event.target.classList[1];
      switch (className) {
        case "blue":
          playerColorNum = 1;
          classColor = ".blue";
          var blueBeep = new Audio("sounds/blue-beep.mp3")
          blueBeep.play();
          break;
        case "red":
          playerColorNum = 2;
          classColor = ".red";
          var redBeep = new Audio("sounds/red-beep.mp3")
          redBeep.play();
          break;
        case "green":
          playerColorNum = 3;
          classColor = ".green";
          var greenBeep = new Audio("sounds/green-beep.mp3")
          greenBeep.play();
          break;
        case "yellow":
          playerColorNum = 4;
          classColor = ".yellow";
          var yellowBeep = new Audio("sounds/yellow-beep.mp3")
          yellowBeep.play();
          break;
        default:
          console.log(className);
      }
      squareAnimation(classColor);
      playerSquares.push(playerColorNum);
      correctChoice = squares[playerSquares.length - 1];
      checkChoice(playerColorNum, correctChoice);
    });
  }

  //Animation for when a square is clicked or seelcted randomly
  function squareAnimation(input) {
    $(input).addClass("clicked");
    setTimeout(function() {
      $(input).removeClass("clicked");
    }, 100);
  }

  // Will check if the player's selected square matches up with the correct square by comparing the results of both arrays
  function checkChoice(playerChoice, correctChoice) {
    // If player choice is wrong, plays animation/sound and resets game
    if (playerChoice !== correctChoice) {
      loseAnimation();
      reset();
    }
    // If player choice is correct, round continues until both arrays are the same length or the player loses
    // At end of round, SelectSquare() function is called again and the process repeats
    if (playerChoice === correctChoice) {
      // If the round is not yet over, playerSelectSquare() function is repeated until the round is over (both arrays being the same length)
      if (playerSquares.length < squares.length) {
        $(".square").off("click");
        playerSelectSquare();
      }
      // The round is over and the player has not yet failed
      // Player array is reset and SelectSquare() method is called again
      else {
        playerSquares = [];
        $(".square").off("click");
        setTimeout(selectSquare, 500);
        $("h2").text("Level " + (squares.length + 1));
        setTimeout(playerSelectSquare, 500);
      }
    }
  }

  // Plays an animation and sound if a player chooses incorrectly
  function loseAnimation() {
    setTimeout(function() {
      $(document.body).addClass("red");
      setTimeout(function() {
        $(document.body).removeClass("red"), 500
      });
      $("h2").text("You made it to round " + (squares.length) + "! Press Any Key or Tap Here to Try Again!");
      var loseSound = new Audio("sounds/lose-sound.mp3")
      loseSound.play();
    }, 100);

  }

  // Turns off click functionality and reinitializes the game
  function reset() {
    $(".square").off("click");
    initialize();
  }
}
simon();
