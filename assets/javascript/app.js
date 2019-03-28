$(document).ready(function () {

    // variables
    isStarted = false;
    isCorrect = false;
    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var intervalId;
    var time = 5;
    var clockRunning = false;

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

    // This function will create the initial page layout with the title and start button
    function startGame() {
        var startButtonRow = $("<div class='row startBtnRow'>");
        var startBtn = $("<button type='button' class='btn btn-primary startButton'>");
        $(".gameContainer").append(startButtonRow);
        $(startButtonRow).append(startBtn);
        $(startBtn).text("Start");

        // Event handler for the start button
        $(".startButton").on("click", start);
    }

    // This function will create the question and answers
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

    // This function will clear every div created excpet the title and time remaining divs
    function clearBoard() {
        $(".answerRow").remove();
        $(".questionRow").remove();
        $(".startBtnRow").remove();
        $(".correctAnswerDisplay").remove();
        $(".resultsTitle").remove();
        $(".resultsShown").remove();
        $(".playAgainButton").remove();
    }

    // This function will display the correct answer for each question
    function displayCorrectAnswer() {
        clearBoard();
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

    // This function will restart the timer upon timing out on previous question
    function restartTimer() {
        unanswered++;
        stop();
        displayCorrectAnswer();
        time = 5;
        if (questionNum < (trivia.length - 1)) {
            questionNum++;
            setTimeout(createBoard, 1000);
            setTimeout(start, 1000);
        }
        else {
            displayCorrectAnswer();
            setTimeout(endGame, 2000);
        }
    }

    // This function will display the end game results and create the play again button
    function endGame() {
        clearBoard();
        var resultsTitleBox = $("<div class='resultsTitle'>");
        var resultsBox = $("<div class='resultsShown'>");
        $(resultsBox).append("<p class='correctAnswers'>");
        $(resultsBox).append("<p class='incorrectAnswers'>");
        $(resultsBox).append("<p class='unanswered'>");
        var againBox = $("<button type='button' class='btn btn-primary playAgainButton'>");
        $(resultsTitleBox).text("All done! Here's how you did:");
        $(".gameContainer").append(resultsTitleBox);
        $(".gameContainer").append(resultsBox);
        $(".gameContainer").append(againBox);
        $(againBox).text("Play again");
        $(".correctAnswers").text("Correct answers: " + correct);
        $(".incorrectAnswers").text("Incorrect answers: " + incorrect);
        $(".unanswered").text("Unanswered: " + unanswered);

        // Event handler for the play again button
        $(".playAgainButton").on("click", function () {
            questionNum = 0;
            correct = 0;
            incorrect = 0;
            unanswered = 0;
            time = 5;
            createBoard();
            start();
        })
    }

    // This function will start the timer
    function start() {
        $(".timerRow").html("Time remaining: " + time + " seconds");

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

    // This function will stop the timer
    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
        time = 5;
    }

    // This function will be the actual counting part for the timer
    function count() {
        time--;
        $(".timerRow").html("Time remaining: " + time + " seconds");
        if (time < 1) {
            restartTimer();
        }
    }

    // This function will check the user's guess with the actual answer for each question
    function answerButton(guess, answer) {

        if (guess == answer) {
            correct++;
            clearInterval(intervalId);
            stop();
            isCorrect = true;
            displayCorrectAnswer();
            isCorrect = false;
            if (questionNum < (trivia.length - 1)) {
                questionNum++;
                setTimeout(createBoard, 2000);
                setTimeout(start, 2000);
            }
            else {
                isCorrect = true;
                displayCorrectAnswer();
                isCorrect = false;
                setTimeout(endGame, 2000);
            }
        }
        else {
            incorrect++;
            clearInterval(intervalId);
            stop();
            displayCorrectAnswer();
            if (questionNum < (trivia.length - 1)) {
                questionNum++;
                setTimeout(createBoard, 2000);
                setTimeout(start, 2000);
            }
            else {
                displayCorrectAnswer();
                setTimeout(endGame, 2000);
            }
        }
        if (questionNum == trivia.length) {
            stop();
            endGame();

        }
    }

    // Start the game by calling this function
    startGame();


})
