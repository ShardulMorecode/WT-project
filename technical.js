const quizData = [
  {
    question: 'In React, what does JSX stand for?',
    options: ['Javascript Syntax Extension',
    'Java Syntax Extra',
    'JavaScript XML',
    'Just Simple XML'],
    answer: 'JavaScript XML',
  },
  {
    question: 'Which of the following port is the default where webpack-dev-server runs?',
    options: ['3000', '6060', '3306', '8080'],
    answer: '8080',
  },
  {
    question: 'Which of the following is not a difference between HTML and XHTML?',
    options: ['Charset in both html and xhtml is “text/html”',
     'Tags and attributes are case-insensitive in HTML but not in XHTML     ',
      'Special characters must be escaped using character entities in XHTML unlike HTML      ', 
      'Charset in html is “text/html” where as in xhtml it is “application/xml+xhtml'],
    answer: 'Charset in both html and xhtml is “text/html',
  },
  {
    question: 'Which of the following is an appropriate value for the overflow element?',
    options: ['scroll', 'hidden','auto', 'all of the mentioned'],
    answer: 'all of the mentioned',
  },
  {
    question: 'Which of the following data structure can provide efficient searching of the elements?',
    options: ['binary search tree','unordered lists','2-3 tree','treap',],
    answer: '2-3 tree',
  },
  {
    question: 'What is the time complexity for searching a key or integer in Van Emde Boas data structure?',
    options: ['O (M!)', 'O (log M!)', 'O (log (log M))', 'O (M2)'],
    answer: 'O (log (log M))',
  },
  {
    question: ' Which of the following is the self-adjusting binary search tree?',
    options: ['Pablo  AVL Tree',' Splay Tree','Top Tree',' Ternary Tree',],
    answer: ' Splay Tree',
  },
  {
    question: 'What is the correct fqdn for service "nginx" in namespace "app"?',
    options: ['nginx.local', 'nginx.svc.cluster.local', 'nginx.app.cluster.local', 'nginx.app.svc.cluster.local'],
    answer: 'nginx.app.svc.cluster.local',
  },
  {
    question: 'Which of the following command displays all of the pictures that are presently installed on the system?',
    options: [
      'See images','Docker see images','Docker images','Docker pictures',],
    answer: 'Docker images',
  },
  {
    question: 'Once the container has stopped, which of the following command you will use to remove a container?',
    options: ['Docker remove', 'Docker destroy', 'Docker rm', 'Docker del'],
    answer: 'Docker rm',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
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
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
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
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();