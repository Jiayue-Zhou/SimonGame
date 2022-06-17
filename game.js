var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var flag = false;

function startTheGame() {
  var randomChosenColour = buttonColours[nextSequence()];
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
}



// // $("#" + randomChosenColour).
// $("body").click(function() {
//   audio.play();
// })
$(document).on("keydown", function() {
  if (flag == false) {
    startTheGame();
    flag = true;
    $("h1").text("Level " + level);
  }
})

$(".btn").click(function() {
  if (flag == true) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if (checkAnswer(userClickedPattern.length - 1) == true) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          startTheGame();
          userClickedPattern = [];
          console.log("true");
        }, 1000);
      }
    }
    else {
      //end the game
       var audio3 = new Audio("sounds/wrong.mp3");
       audio3.play();
      console.log("end the game");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
  }
  }

});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("Level " + level);
  return randomNumber;
}

function playSound(name) {
  var audio2 = new Audio("sounds/" + name + ".mp3");
  audio2.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    return true;
  }
  else {
    console.log("wrong");
    return false;
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  flag = false;
}
