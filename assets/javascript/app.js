

$(document).ready(function () {

    // variables
    isStarted = false;
    isCorrect = false;
    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var intervalId;
    var time = 5;
    var startBtn;
    var startButtonRow;
    var newCorrectAnswer;
    // var newAnswerRow;

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

    // Display question
    // $(".questionRow").html(trivia[0].question);

    function startGame() {
        // debugger;
        var startButtonRow = $("<div class='row'>");
        var startBtn = $("<button type='button' class='btn btn-primary startButton'>");
        $(".gameContainer").append(startButtonRow);
        $(startButtonRow).append(startBtn);
        $(startBtn).text("Start");
        // $(".gameContainer").append(startBtn);

        $(".startButton").on("click", function () {
            // debugger;
            $(this).hide();
            // $(startButtonRow).hide();
        }, start);
    }

    // display answers
    function createBoard() {
        // debugger;
        $(startBtn).hide();
        $(".correctAnswerDisplay").remove();
        console.log("Removed start button");
        var newAnswerRow = $("<div class='row'>");
        var newAnswer = $("<div class='answerRow'>");
        var newQuestionRow = $("<div class='row'>");
        var newQuestion = $("<div class='questionRow'>");
        $(".gameContainer").append(newQuestionRow);
        $(newQuestionRow).append(newQuestion);
        $(".questionRow").text(trivia[questionNum].question);
        $(".gameContainer").append(newAnswerRow);
        $(newAnswerRow).append(newAnswer);
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

    function displayCorrectAnswer() {
        var newCorrectAnswerRow = $("<div class='row'>");
        var newCorrectAnswer = $("<div class='correctAnswerDisplay'>");
        $(".gameContainer").append(newCorrectAnswerRow);
        $(newCorrectAnswerRow).append(newCorrectAnswer);
        if (isCorrect) {
            $(newCorrectAnswer).text("You are correct!");
        }
        else {
            $(newCorrectAnswer).text("Oops! The correct answer is: " + trivia[questionNum].answer);
        }
        
    }


    startGame();


    // countdown
    // var time = 5;
    // $(".start").on("click", start);



    function start() {

        isStarted = true;
        var intervalId = setInterval(count, 1000);
        if (isStarted === true) {
            createBoard();
        }
    }

    function count() {
        time--;

        // display time here
        $(".timerRow").html("Time remaining: " + time + " seconds");
        if (time < 1) {
            time = 5;
        }
    }

    // logic to check user answer
    function answerButton(guess, answer) {

        if (guess == answer) {
            clearInterval(intervalId);
            // debugger;
            console.log("Correct");
            isCorrect = true;
            $(".answerRow").remove();
            // $(newAnswerRow).remove();
            $(".questionRow").remove();
            displayCorrectAnswer();
            isCorrect = false;
            questionNum++;
            setTimeout(createBoard, 1000);
        }
        else {
            console.log("Incorrect");
            $(".answerRow").remove();
            // $(newAnswerRow).remove();
            $(".questionRow").remove();
            displayCorrectAnswer();
            questionNum++;
            setTimeout(createBoard, 1000);
        }
    }




})
