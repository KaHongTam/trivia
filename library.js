function startQuiz() {
  var questionAmount = document.getElementById("formTotalQuestions").value;
  var questionDifficulty = document.getElementById("formDifficultyQuestions").value;
  localStorage.setItem('jsCookieTotal', questionAmount);
  localStorage.setItem('jsCookieDifficulty', questionDifficulty);
  window.open("vraag.html","_self");
}
var questionData;
var score = 0;

function generateQuiz(){
  questionAmount = localStorage.getItem('jsCookieTotal');
  questionDifficulty = localStorage.getItem('jsCookieDifficulty');
  console.log("Totaal aantal vragen: " + localStorage.getItem('jsCookieTotal'));
  console.log("Moeilijkheid: " + localStorage.getItem('jsCookieDifficulty'));
  fetch('https://opentdb.com/api.php?amount=' + questionAmount + '&difficulty=' + questionDifficulty + '&type=boolean')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          i = 0;
          questionData = data;
          document.getElementById("currentQuestionNumber").innerHTML = i + 1;
          document.getElementById("totalQuestionNumber").innerHTML = questionData.results.length;
          document.getElementById("question").innerHTML = data.results[i].question;
          document.getElementById("correctAnswer").innerHTML = data.results[i].correct_answer;
          question = document.getElementById("question").innerHTML;
          correct_answer = data.results[i].correct_answer;
          localStorage.setItem('jsCookieTotal', data.results.length);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

function displayAnswer(answer) {
  $("#finalAnswer").show();
  $("#noAnswer").hide();
  $("#submitButton").prop('disabled', false);
  document.getElementById("result").innerHTML = answer;
}

function checkAnswer() {
  if (document.getElementById("checker1").checked == false &&  document.getElementById("checker2").checked == false) {
    $("#noAnswer").show();
    $("#submitButton").prop('disabled', true);
  }
  else {
    var checker = document.getElementById("result").innerHTML;
    $("#showAnswer").show();
    if (checker == document.getElementById("correctAnswer").innerHTML) {
      score++;
      document.getElementById("showAnswer").innerHTML = "You answered correctly, congratulations!";
    }
    else {
      document.getElementById("showAnswer").innerHTML = "Alas, this is the wrong answer, try again!";
    }
    $("input[type=radio]").attr('disabled', true);
    $("#submitButton").hide();
    $("#nextQuestionButton").show();
    if (i + 1 == questionData.results.length) {
      localStorage.setItem('jsCookieScore', score);
      $("#nextQuestionButton").hide();
      $("#scoreBoardButton").show();
    }
  }
}

function nextQuestion() {
    i++;
    document.title = "TriviKa | Question " + (i + 1) + " out of 10";
    document.getElementById("question").innerHTML = questionData.results[i].question;
    document.getElementById("correctAnswer").innerHTML = questionData.results[i].correct_answer;
    document.getElementById("currentQuestionNumber").innerHTML = i + 1;
    $("#submitButton").show();
    $("#nextQuestionButton").hide();
    $("#finalAnswer").hide();
    $("#showAnswer").hide();
    document.getElementById("checker1").checked = false;
    document.getElementById("checker2").checked = false;
    $("input[type=radio]").attr('disabled', false);
  }

function scorePage() {
  var displayScore = localStorage.getItem('jsCookieScore');
  var totalQuestions = localStorage.getItem('jsCookieTotal');
  var percentageScore = (displayScore/totalQuestions)*100;
  console.log("displayScore = ", displayScore);
  console.log("total amount of questions = ", totalQuestions);
  document.getElementById("score").innerHTML = displayScore;
  document.getElementById("totalQuestions").innerHTML = totalQuestions;
  document.getElementById("percentage").innerHTML = percentageScore;
}

function openScoreBoard() {
  window.open("score.html","_self");
}