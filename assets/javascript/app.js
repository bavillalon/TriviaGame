//List of questions. this is an array of objects. I wasn't as ambitious as last time and didn't put everything in one 
//overall object. sorry.

var questions=[
        {
            q:"Which of these is NOT a meal that hobbits eat?",
            a1:"Second Breakfast",
            a2:"Afternoon Tea",
            a3:"Brunch",
            a4:"Dinner",
            correct: "Brunch"
        },
        {
            q:"Who is Tom Bombadil's wife?",
            a1:"Arwen",
            a2:"Goldberry",
            a3:"Eowyn",
            a4:"Galadriel",
            correct: "Goldberry"
        },
        {
            q:"Which of these are not or ever were Maiar?",
            a1:"Balrogs",
            a2:"Istari",
            a3:"Wizards",
            a4:"Ainur",
            correct: "Ainur"
        },
        {
            q:"What was Galadriel's gift to Gimli",
            a1:"A silver nut from a Mallorn Tree",
            a2:"Three strands of hair",
            a3:"A sword",
            a4:"The Elfstone",
            correct: "Three strands of hair"
        },
        {
            q:"In the Silmarilion, who was responsible for the creation of dwarves?",
            a1:"Aule",
            a2:"Eru",
            a3:"Illuvatar",
            a4:"Melkor",
            correct: "Aule"
        },
        {
            q:"How many of Sauron's rings went to Men?",
            a1:"One",
            a2:"Nine",
            a3:"Three",
            a4:"Seven",
            correct: "Nine"
        }
    ];
//timer to get time, questionIntervl to keep track of the timer. on question to keep track of the index of the question we are on.
//logical to check if the clock is running. and counters fo rthe answers.
var timer;
var questionInterval;
var onQuestion=0;
var clockRunning=false;
var correctAnswers=0;
var wrongAnswers=0;
var unanswered=0;

//reset timer to reset the timer and clear the element of the the text

function resetTimer() {
    clearInterval(questionInterval);
    clockRunning=false;
    timer = 20;
    $("#timer").empty();
  };

  //starting the timer to keep track of the time left and display the initial time remaining. the rest of the time remaining will be displayed in the count funciton.
  function startTimer() {
    if (!clockRunning) {
        $("#timer").show();
        $("#timer").text(timer + " seconds remaining");
      questionInterval = setInterval(count, 1000);
      clockRunning = true;
      
    }
  };

  //count decrements the timer by one when called bu the set interval funciton.
  //I am also keeping track of whether the time is up and displaying the correct response and clearing the game screen accordingly.
  //there is also logic here to end the game should it get there. I should ahve added the end game stuff to a function but alas I am too lazy.
  //there is ALSOo logic to go to the next question after a delay which also should have gone in another function.
  function count() {

    // DONE: decrement time by 1.
    timer--;
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#timer").text(timer + " seconds remaining");
    if(timer===0){
        unanswered++;
        clearInterval(questionInterval);
        $("#question").empty();
        $("#answers").empty();
        $("#status").text("You did not answer. The correct answer was " + questions[onQuestion].correct + ".");
        if(onQuestion===(questions.length-1)){
            resetTimer();
            $("#status").append(" The game has ended.");
            $("#status").append("<p>Correct: " + correctAnswers + "&nbsp Incorrect: " + wrongAnswers + "&nbsp Unanswered: " + unanswered + "</p>");
            $("#status").append("<div class='d-block'> <img class='img-fluid' src='./assets/images/gandalf.gif'></div>");
            $("#answers").empty();
            $("#question").empty();
            $("#reset").show();
            $("#reset").append("<p>Please click Reset to play again.</p>");
        }
        else{
            setTimeout(nextQuestion,5000);
        };
    }
  };

//starting the game and clearing the screen of the start button.
 function startGame(){
     onQuestion=0;
     correctAnswers=0;
     wrongAnswers=0;
     unanswered=0;
    $("#status").empty();
    resetTimer();
    startTimer();
    displayQuestionAnswers(onQuestion);
};

//function to display the question and aswers.
function displayQuestionAnswers(index){
    $("#answers").show();
    $("#question").show();
    $("#question").html("<h4>" + questions[onQuestion].q + "</h4>");
    $("#answers").empty();
    $("#answers").append("<p class='answer p-2' answer='a1'>"+questions[index].a1 + "</p>");
    $("#answers").append("<p class='answer p-2' answer='a2'>"+questions[index].a2 + "</p>");
    $("#answers").append("<p class='answer p-2' answer='a3'>"+questions[index].a3 + "</p>");
    $("#answers").append("<p class='answer p-2' answer='a4'>"+questions[index].a4 + "</p>");
}

//function to go to the next question/ 
function nextQuestion(){
    onQuestion++;
    $("#status").empty();
    resetTimer();
    startTimer();
    displayQuestionAnswers(onQuestion);
}
//hide the reseet button before the program loads. should be early enough to keep the user from seeing.
$("#reset").hide();

//when the document is ready, we display the start button.
$(document).ready(function() {
    $("#reset").hide();
    //on clifk of the strt button we hide it and start the game.
    $("#startButton").on("click","button",function(){
        $("#startButton").hide();
        startGame();
    });
    //on click of anything in the answer area, we pass that along to the class and get the element attribute of the selected answer.
    //from this we decide if it wass the correct answer or not and increment the counter
    $("#answers").on("click", ".answer", function(){
        resetTimer();
        $("#answers").empty();
        $("#question").empty();
        if(questions[onQuestion][$(this).attr("answer")]===questions[onQuestion].correct){
            $("#status").text("You answered correctly!");
            correctAnswers++;
        }
        else{
            $("#status").text("You answered incorrectly. the correct answer was " + questions[onQuestion].correct + ".");
            wrongAnswers++;
        };

        //check to see if we are on teh last question and clean up the screen or not. if it is we display the neg game stuff and if not we wait5s to display the next question
        if(onQuestion===(questions.length-1)){
            $("#status").append(" The game has ended.");
            $("#status").append("<p>Correct: " + correctAnswers + "&nbsp Incorrect: " + wrongAnswers + "&nbsp Unanswered: " + unanswered + "</p>");
            $("#status").append("<div class='d-block'> <img class='img-fluid' src='./assets/images/gandalf.gif'></div>");
            $("#answers").empty();
            $("#question").empty();
            $("#reset").show();
            $("#reset").append("<p>Please click Reset to play again.</p>");
        }
        else{
            setTimeout(nextQuestion,5000);
        };


    });

    //reset to clear the game screen and display the start button.

    $("#reset").on("click","button",function(){
        $("#reset").hide();
        $("#status").empty();
        $("#startButton").show();
    });


});