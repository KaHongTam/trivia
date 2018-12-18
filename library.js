fetch('https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=boolean')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // console.log(data);
        // console.log(data.results);
        // console.log(data.results[0].question);
        // console.log(data.results[0].correct_answer);
        document.getElementById("question").innerHTML = data.results[0].question;
        document.getElementById("correctAnswer").innerHTML = data.results[0].correct_answer;
        var correct_answer = data.results[0].correct_answer;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function displayAnswer(answer) {
    document.getElementById("result").innerHTML = answer;
}

function checkAnswer() {
    var checker = document.getElementById("result").innerHTML;
    if (checker == document.getElementById("correctAnswer").innerHTML) {
        document.getElementById("showAnswer").innerHTML = "You answered correctly, congratulations!";
    }
    else {
        document.getElementById("showAnswer").innerHTML = "Alas, this is the wrong answer, try again!";
    }
    $("input[type=radio]").attr('disabled', true);
}

