const quizData = [
    {
      question: 'Who holds the record for the highest individual score in Test cricket?',
      options: ['Sachin Tendulkar', 'Ricky Ponting', 'Brian Lara', 'Virat Kohli'],
      answer: 'Brian Lara',
    },
    {
      question: 'Which country has won the most Cricket World Cups?',
      options: ['Australia', 'India', 'West Indies', 'England'],
      answer: 'Australia',
    },
    {
      question: 'Who is known as the "God of Cricket"?',
      options: ['Sachin Tendulkar', 'Ricky Ponting', 'Shane Warne', 'Jacques Kallis'],
      answer: 'Sachin Tendulkar',
    },
    {
      question: 'Which bowler has taken the most wickets in international cricket?',
      options: ['Wasim Akram', 'Shane Warne', 'Muttiah Muralitharan', 'Glenn McGrath'],
      answer: 'Muttiah Muralitharan',
    },
    {
      question: 'Which country hosted the first-ever Cricket World Cup?',
      options: ['England', 'India', 'Australia', 'West Indies'],
      answer: 'England',
    },
    {
      question: 'Who scored the fastest century in One Day International (ODI) cricket?',
      options: ['AB de Villiers', 'Virender Sehwag', 'Chris Gayle', 'Shahid Afridi'],
      answer: 'AB de Villiers',
    },
    {
      question: 'Which player has scored the most runs in T20 International cricket?',
      options: ['Virat Kohli', 'Rohit Sharma', 'Chris Gayle', 'Martin Guptill'],
      answer: 'Martin Guptill',
    },
    {
      question: 'Which team won the first-ever ICC T20 World Cup?',
      options: ['India', 'Pakistan', 'Sri Lanka', 'West Indies'],
      answer: 'India',
    },
    {
      question: 'Who was the first cricketer to score a double century in a One Day International (ODI) match?',
      options: ['Rohit Sharma', 'Sachin Tendulkar', 'Virender Sehwag', 'Martin Guptill'],
      answer: 'Sachin Tendulkar',
    },
    {
      question: 'Who has won the most ICC Cricket World Cup titles as a captain?',
      options: ['Ricky Ponting', 'MS Dhoni', 'Clive Lloyd', 'Steve Waugh'],
      answer: 'Ricky Ponting',
    },
  ];
  
  // Rest of the code remains the same...
  




  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const barChartContainer = document.getElementById('barChart');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      const correctAnswer = quizData[currentQuestion].answer;
      if (answer === correctAnswer) {
        score++;
        selectedOption.parentNode.style.backgroundColor = 'lightgreen'; // Green for correct answer
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: correctAnswer,
        });
        selectedOption.parentNode.style.backgroundColor = 'red'; // Red for incorrect answer
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        setTimeout(() => {
          displayQuestion();
          selectedOption.parentNode.style.backgroundColor = ''; // Reset background color
        }, 1000); // Delay to display next question after 1 second
      } else {
        displayResult();
      }
    }
  }

  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';

    // Calculate accuracy
    const accuracy = (score / quizData.length) * 100;

    // Display score and accuracy
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length} (${accuracy.toFixed(2)}% accuracy)`;

   
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    barChartContainer.innerHTML = '';
    displayQuestion();
  }

  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length} (${((score / quizData.length) * 100).toFixed(2)}% accuracy)!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);

  displayQuestion();
