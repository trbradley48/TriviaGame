
// TODO: timer fixes
// TODO: delete displayAnswer when last question is timed out -- then go to endGame() results
// TODO: display end game results (the actual stats)

$(document).ready(function () {

    // variables
    isStarted = false;
    isCorrect = false;
    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var intervalId;
    var time = 6;
    var startBtn;
    var startButtonRow;
    var newCorrectAnswer;
    // var newAnswerRow;
    var clockRunning = false;
    var playAgain = false;

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
        var startButtonRow = $("<div class='row startBtnRow'>");
        var startBtn = $("<button type='button' class='btn btn-primary startButton'>");
        $(".gameContainer").append(startButtonRow);
        $(startButtonRow).append(startBtn);
        $(startBtn).text("Start");
        // $(".gameContainer").append(startBtn);

        $(".startButton").on("click", function () {
            // debugger;
            // $(this).remove();
            // $(startButtonRow).hide();
        }, start);
    }

    // display answers
    function createBoard() {
        clearBoard();
        $(".correctAnswerDisplay").remove();
        var newAnswerRow = $("<div class='row'>");
        var newAnswer = $("<div class='answerRow'>");
        var newQuestionRow = $("<div class='row'>");
        var newQuestion = $("<div class='questionRow'>");
        $(".gameContainer").append(newQuestionRow);
        $(newQuestionRow).append(newQuestion);
        $(newQuestion).text(trivia[questionNum].question);
        $(".gameContainer").append(newAnswerRow);
        $(newAnswerRow).append(newAnswer);
        for (var i = 0; i < 4; i++) {
            var newBox = $("<button type='button' class='btn btn-light answerButtonStyle'>");
            $(newBox).attr("id", "a" + i);
            $(newAnswer).append(newBox);
            $("#a" + i).text(trivia[questionNum].choices[i]);
            $("#a" + i).attr("value", trivia[questionNum].choices[i]);
        }

        // event handler for answer buttons
        $(".answerButtonStyle").on("click", function () {
            selectedAnswer = $(this).attr("value");
            answerButton(selectedAnswer, trivia[questionNum].answer);
        })
    }

    function clearBoard() {
        $(".answerRow").remove();
        $(".questionRow").remove();
        $(".startBtnRow").remove();
        $(".correctAnswerDisplay").remove();
        $(".resultsTitle").remove();
        $(".resultsShown").remove();
        $(".playAgainButton").remove();
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

    // TODO: display results when game is over
    function endGame() {
        clearBoard();
        var resultsTitleBox = $("<div class='resultsTitle'>");
        var resultsBox = $("<div class='resultsShown'>");
        $(resultsBox).append("<p class='correctAnswers'>");
        $(resultsBox).append("<p class='incorrectAnswers'>");
        $(resultsBox).append("<p class='unanswered'>");
        var againBox = $("<button type='button' class='btn btn-primary playAgainButton'>");
        $(resultsTitleBox).text("All done! Here's how you did!");
        $(againBox).text("Play again");
        $(".correctAnswers").text("Correct answers: " + correct);
        $(".incorrectAnswers").text("Incorrect answers: " + incorrect);
        $(".unanswered").text("Unanswered: " + unanswered);
        $(".gameContainer").append(resultsTitleBox);
        $(".gameContainer").append(resultsBox);
        $(".gameContainer").append(againBox);

        $(".playAgainButton").on("click", function () {
            questionNum = 0;
            console.log("question num: " + questionNum);
            time = 6;
            createBoard();
        })
    }


    startGame();


    // countdown
    // var time = 5;
    // $(".start").on("click", start);



    // TODO: get timer to display immediately when game starts
    // TODO: get timer to refresh from top right when next question populates
    // TODO: get 
    function start() {

        isStarted = true;
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }

        if (isStarted === true) {
            createBoard();
            isStarted = false;
        }
    }

    function stop() {

        clearInterval(intervalId);
        clockRunning = false;
        time = 6;
    }

    function count() {
        time--;

        // display time here
        $(".timerRow").html("Time remaining: " + time + " seconds");
        if (time < 1) {

            unanswered++;
            clearInterval(intervalId);
            stop();
            if (questionNum < trivia.length) {
                displayCorrectAnswer();
            }
            questionNum++;
            setTimeout(createBoard, 1000);
            time = 6;

            // clearInterval(intervalId);
            // stop();
            // // isCorrect = true;
            // displayCorrectAnswer();
            // // isCorrect = false;
            // questionNum++;
            // if (questionNum < trivia.length) {
            //     setTimeout(createBoard, 1000);
            //     setTimeout(start, 1000);
            // }

            // setTimeout(start, 1000);
            // start();
        }
    }

    // logic to check user answer
    function answerButton(guess, answer) {

        if (guess == answer) {
            correct++;
            clearInterval(intervalId);
            stop();
            isCorrect = true;
            displayCorrectAnswer();
            isCorrect = false;
            questionNum++;
            if (questionNum < trivia.length) {
                setTimeout(createBoard, 1000);
                setTimeout(start, 1000);
            }
            // setTimeout(createBoard, 1000);
            // setTimeout(start, 1000);

            // start();
        }
        else {
            incorrect++;
            clearInterval(intervalId);
            stop();

            displayCorrectAnswer();
            questionNum++;
            setTimeout(createBoard, 1000);

            // setTimeout(start, 1000);
        }
        if (questionNum == trivia.length) {
            stop();
            endGame();

        }
    }




})
