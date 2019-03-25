

$(document).ready(function () {

    // variable object
    var trivia = [{
        question: "what is 2 + 2?",
        choices: ['2', '4', '6', '8'],
        answer: '4'
    }, {
        question: "what comes after b?",
        choices: ['a', 'c', 'd', 'e'],
        answer: 'c'
    }];

    console.log(trivia);
    
    // Display question
    $(".questionRow").html(trivia[0].question);
    
    // display answers
    for (var i=0; i < 4; i++) {
        $("#a" + i).html(trivia[0].choices[i]);
        $("#a" + i).attr("value", trivia[0].choices[i]);

    }

    // event handler for answer buttons
    $(".answerButtonStyle").on("click", function() {
        selectedAnswer = $(this).attr("value")
        answerButton(selectedAnswer, trivia[0].answer);
    })

    // countdown
    var time = 3;
    $(".start").on("click", start);
    function start() {
        intervalId = setInterval(count, 1000);
    }

    function count() {
        time--;

        // display time here
        console.log(time);
        $(".timerRow").html("Time remaining: " + time + " seconds");
        if (time < 1) {
            time = 3;
        }
    }

    // logic to check user answer
    function answerButton(guess, answer) {

        if (guess == answer) {
            console.log("Correct");
        }
        else {
            console.log("Incorrect");
        }
    }
   


})
