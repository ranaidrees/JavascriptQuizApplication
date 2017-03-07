var questions = [
    new Question("Which of the following function of String object extracts a section of a string and returns a new string?", ['slice()', 'split()', 'replace()', 'search()'], 'slice()'),
    new Question("Which of the following is a valid type of function javascript supports?", ['named function', 'anonymous function', 'Both of the above', 'None of the above'], 'Both of the above'),
    new Question("Which of the following function of String object creates an HTML anchor that is used as a hypertext target?", ['anchor()', 'link()', 'blink()', 'big()'], 'anchor()'),
];
// courtesy of logicguns.   
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
            element = document.getElementById("choice" + i);
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