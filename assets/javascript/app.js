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

var timer;
var questionInterval;
var timerInterval;
var onQuestion=0;
var clockRunning=false;
var correctAnswers=0;
var wrongAnswers=0;
var unanswered=0;

function resetTimer() {
    clearInterval(questionInterval);
    clockRunning=false;
    timer = 20;
    $("#timer").empty();
  };

  function startTimer() {
  
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        $("#timer").show();
        $("#timer").text(timer + " seconds remaining");
      questionInterval = setInterval(count, 1000);
      clockRunning = true;
      
    }
  };

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


function nextQuestion(){
    onQuestion++;
    $("#status").empty();
    resetTimer();
    startTimer();
    displayQuestionAnswers(onQuestion);
}

$("#reset").hide();

$(document).ready(function() {
    $("#reset").hide();
    $("#startButton").on("click","button",function(){
        $("#startButton").hide();
        startGame();
    });
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
        }
        
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

    $("#reset").on("click","button",function(){
        $("#reset").hide();
        $("#status").empty();
        $("#startButton").show();
    });


});