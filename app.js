var questions = [new Question("first", [1, 2, 3, 4], 4), new Question("second", [5, 6, 7, 8], 6), new Question("third", [2, 3, 4, 5], 4)];

var quiz = new Quiz(questions);

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show Question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionindex().text;
        var choices = quiz.getQuestionindex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick= function() {
        quiz.guess(guess);
        populate();
       
    }
}
function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id=scores>your score is" + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}
populate();

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of" + quiz.questions.length;
}
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'questionList.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}