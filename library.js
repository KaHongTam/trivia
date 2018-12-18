var questionData;

fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=boolean')
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
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

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
        document.getElementById("showAnswer").innerHTML = "You answered correctly, congratulations!";
    }
    else {
        document.getElementById("showAnswer").innerHTML = "Alas, this is the wrong answer, try again!";
    }
    $("input[type=radio]").attr('disabled', true);
    $("#submitButton").hide();
    $("#nextQuestionButton").show();
    if (i + 1 == questionData.results.length) {
      // window.open("https://www.google.nl","_self");
      $("#nextQuestionButton").hide();
      $("#scoreBoardButton").show();
    }
  }
}

function nextQuestion() {
    i++;
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
    
  console.log ("i=", i , "totaal aantal vragen=",  questionData.results.length);
}