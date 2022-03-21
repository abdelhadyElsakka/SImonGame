var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var click = 0;


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  buttonAnimationClick(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(".play").click(function() {
  playButton();
});

console.log(gamePattern);
console.log(userClickedPattern);

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    $("h1").text("Game Over press play to try again");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    if (gamePattern.length >= 0) {
      click = 0;
      level = 1;
      reset();
    } else {
      gamePattern = [];
    }
  }
}

function reset() {
  $("play").click(function() {
    playButton();

  });
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  buttonAnimationGame(randomChosenColour);
  makeSound(randomChosenColour);

  if (level == 1) {
    $("h1").text("Level " + 1);
  } else {
    $("h1").text("Level " + level);
  }
  level++;
}

function makeSound(key) {
  switch (key) {
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
  }
}

function buttonAnimationClick(userChosenColour){
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
}

function buttonAnimationGame(randomChosenColour){
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playButton(){
  if (click == 0 && level == 1) {
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    click++;
  } else {
    console.log(event.id);
  }
}
