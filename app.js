window.onload = init;
function init() {
    $.getJSON("data.json",
       function (data) {
           var questionList = data.items;
           var questions=[];
           for (var i = 0; i <questionList.length; i++) {
               questions.push(new Question(questionList[i].title,
                   questionList[i].choices,
                   questionList[i].correctAnswer));
           }
           var quiz = new Quiz(questions);
           populate(quiz);
       });
}
function populate(quiz) {
    if (quiz.isEnded()) {
        showScores(quiz);
    } else {
        // show Question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionindex().text;
        var choices = quiz.getQuestionindex().choices;
        for (var i = 0; i < choices.length; i++) {
            element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess(quiz,"btn" + i, choices[i]);
        }
        showProgress(quiz);
    }
}
function guess(quiz,id, guess) {
    var button = document.getElementById(id);
    button.onclick= function() {
        quiz.guess(guess);
        populate(quiz);
       
    }
}
function showScores(quiz) {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id=scores>your score is" + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}
//populate();

function showProgress(quiz) {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of" + quiz.questions.length;
}
