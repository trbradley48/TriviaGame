

$(document).ready(function () {

    // variables
    isStarted = false;
    isCorrect = false;
    var questionNum = 0;

    // variable object
    var trivia = [{
        question: "what is 2 + 2?",
        choices: ['2', '4', '6', '8'],
        answer: '4'
    }, {
        question: "what comes after b?",
        choices: ['a', 'c', 'd', 'e'],
        answer: 'c'
    }, {
        question: "which animal starts with an a?",
        choices: ['alligator', 'bat', 'cat', 'dog'],
        answer: 'alligator'
    }];

    // console.log(trivia);

    // Display question
    // $(".questionRow").html(trivia[0].question);

    function startGame() {
        var startBtn = $("<button type='button' class='btn btn-primary start'>");
        $(startBtn).text("Start");
        $(".startRow").append(startBtn);
    }

    // display answers
    function createBoard() {
        $(".questionRow").text(trivia[questionNum].question);
        for (var i = 0; i < 4; i++) {
            var newBox = $("<button type='button' class='btn btn-light answerButtonStyle'>");
            $(newBox).attr("id", "a" + i);
            $(".answerRow").append(newBox);
            $("#a" + i).text(trivia[questionNum].choices[i]);
            $("#a" + i).attr("value", trivia[questionNum].choices[i]);
        }

        // event handler for answer buttons
        $(".answerButtonStyle").on("click", function () {
            selectedAnswer = $(this).attr("value");
            answerButton(selectedAnswer, trivia[questionNum].answer);
        })
    }
    
    
    startGame();


    // countdown
    var time = 3;
    $(".start").on("click", function() {
        $(".startRow").remove();
    }, start);

    

    function start() {

        isStarted = true;
        intervalId = setInterval(count, 1000);
        if (isStarted === true) {
            createBoard();
        }
    }

    function count() {
        time--;

        // display time here
        $(".timerRow").html("Time remaining: " + time + " seconds");
        if (time < 1) {
            time = 3;
        }
    }

    // logic to check user answer
    function answerButton(guess, answer) {

        if (guess == answer) {
            // debugger;
            console.log("Correct");
            isCorrect = true;
            questionNum++;
        }
        else {
            console.log("Incorrect");
        }
        if (isCorrect === true) {
            $(".answerRow").empty();
            createBoard();
            isCorrect = false;
        }
    }



})
