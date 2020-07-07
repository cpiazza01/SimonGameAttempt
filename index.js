//Next step is likely to generate two arrays, one for the player's clicks and one for the randomely selected squares, and compare the last results of each.

function simon() {
  var gameInProgress = false;
  var squares = [];
  var nextSquare;

  if (!gameInProgress) {
    $(document).keypress(function() {
      $("h2").text("Level 1");
      gameInProgress = true;
      simonGame();
    })
  }

  function simonGame() {
    // $(document).off("keypress");
      nextSquare = selectSquare();
      squares.push(nextSquare);
      console.log(squares);
  }

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
    $(currentColor).addClass("clicked");
    setTimeout(function() {
      $(currentColor).removeClass("clicked");
    }, 100);

    return randomNum;
  }

}
simon();
