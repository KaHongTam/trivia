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

    var myVar = setInterval(myTimer, 100);
    timer = 0;

    function myTimer() {
        timer = timer + 0.1;
    }
  }

function displayAnswer(answer) {
  document.getElementById('submitButton').style.animation = 'pulse 1s infinite';
  $("#finalAnswer").show();
  if (answer == 'True') {
    console.log(answer);
    document.getElementById('checker1Label').style.border = 'thick solid #02b302';
    document.getElementById('checker2Label').style.border = 'solid #c20000ea';
  }
  else if (answer == 'False') {
    document.getElementById('checker2Label').style.border = 'thick solid #ff0303';
    document.getElementById('checker1Label').style.border = 'solid #007f00a6';
  }
  $("#noAnswer").hide();
  $("#submitButton").prop('disabled', false);
  document.getElementById("result").innerHTML = answer;
}

function checkAnswer() {
  if (document.getElementById('checker1').checked == false &&  document.getElementById("checker2").checked == false) {
    $("#noAnswer").show();
    $("#submitButton").prop('disabled', true);
    }
  else {
    var checker = document.getElementById("result").innerHTML;
    $("#showAnswer").show();
    if (checker == document.getElementById("correctAnswer").innerHTML) {
      score++;
      document.getElementById("showAnswer").innerHTML = "You answered correctly, congratulations!";
      correctSound = document.getElementById("myAudioCorrect");
      correctSound.play();
    }
    else {
      document.getElementById("showAnswer").innerHTML = "Sorry, wrong answer!";
      wrongSound = document.getElementById("myAudioWrong");
      wrongSound.play();
    }
    $("input[type=radio]").attr('disabled', true);
    $("#submitButton").hide();
    $("#nextQuestionButton").show();
    if (i + 1 == questionData.results.length) {
      $("#nextQuestionButton").hide();
      $("#scoreBoardButton").show();
      clearInterval(timer);
      endTime = timer.toFixed(1);
      localStorage.setItem('jsCookieScore', score);
      localStorage.setItem('jsCookieTimer', endTime);
      console.log("total time used=" + endTime);
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
    document.getElementById('checker1Label').style.border = 'solid #007f00a6';
    document.getElementById('checker2Label').style.border = 'solid #c20000ea';
    document.getElementById('submitButton').style.animation = 'none';
    $("input[type=radio]").attr('disabled', false);
  }

function scorePage() {
  var displayScore = localStorage.getItem('jsCookieScore');
  var totalQuestions = localStorage.getItem('jsCookieTotal');
  var totalTime = localStorage.getItem('jsCookieTimer');
    percentageScore = (displayScore/totalQuestions)*100;
  document.getElementById("score").innerHTML = displayScore;
  document.getElementById("totalQuestions").innerHTML = totalQuestions;
  document.getElementById("percentage").innerHTML = percentageScore.toFixed(1);
  document.getElementById("timeUsed").innerHTML = totalTime;
  displayQuote(percentageScore);
}

function openScoreBoard() {
  window.open("score.html","_self");
}

function displayQuote(percentage1) {
  percentage1 = percentage1.toFixed(1);
  if (percentage1 == 0) {
    document.getElementById("displayQuote").innerHTML = "Wow... 0%, how do you even do that...";
    document.getElementById("percentage").style.animationName = "pulseletterfail";
    quizFailed.play();
  }
  else if ( percentage1 > 0 && percentage1 <= 20 ) {
    document.getElementById("displayQuote").innerHTML = percentage1 + "%, you really should go outside.";
    document.getElementById("percentage").style.animationName = "pulseletterfail";
    quizFailed.play();
  }
  else if ( percentage1 > 20 && percentage1 <= 40 ) {
    document.getElementById("displayQuote").innerHTML = "You scored " + percentage1 + "%, you failed the test miserably.";
    quizFailed40.play();
  }
  else if ( percentage1 > 40 && percentage1 < 60 ) {
    document.getElementById("displayQuote").innerHTML = "Hm.. " + percentage1 + "%, you're almost there, keep trying!";
    quizFailed40.play();
  }
  else if ( percentage1 >= 60 && percentage1 < 80 ) {
    document.getElementById("displayQuote").innerHTML = percentage1 + "%, your average Joe.";
    quizCompleted.play();
  }
  else if ( percentage1 >= 80 && percentage1 < 100 ) {
    document.getElementById("displayQuote").innerHTML = "It's " + percentage1 + "% now, almost Einstein level. ";
    document.getElementById("percentage").style.animationName = "pulselettergood";
    quizCompleted.play();
  }
  else if (percentage1 == 100) {
    document.getElementById("displayQuote").innerHTML = "100%.. You really are a nerd!";
    document.getElementById("percentage").style.animationName = "pulselettergood";
    quizCompleted100.play();
  }
}




// 