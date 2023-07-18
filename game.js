var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green" , "red" , "blue" , "yellow"];

var started = false;
var level = 0;

// detecting a key when pressed
$(document).keydown(function(event) {
    if (!started) {
        // Changing h1 according to game
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").on("click",function(){
    // get clicked colour
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // play sound
    playSound(userChosenColour);
    // animate
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // restart the game
        startOver();
    }
}

function nextSequence() {  
    // reset user Pattern
    userClickedPattern = [];
    // increase level
    level++;
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    // selects a random number from 0 to 3
    var randomChosenColour = buttonColours[Math.floor(4 * Math.random())];
    gamePattern.push(randomChosenColour);
    
    // animate
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // play sound
    playSound(randomChosenColour);
}

function playSound(colourChosen){
    // play audio to button
    var audio = new Audio("sounds/" + colourChosen + ".mp3");
    audio.play();
}

function animatePress(colourChosen){
    // animate button by adding and removing class
    $("#" + colourChosen).addClass("pressed");
    setTimeout(function(){
        $("#" + colourChosen).removeClass("pressed");
    }, 100);
}

function startOver() {
    // reset the data
    level = 0;
    gamePattern = [];
    started = false;
  }