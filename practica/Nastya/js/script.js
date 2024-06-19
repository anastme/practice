const quizContainer = document.getElementById('quiz-container');
const nextButton = document.getElementById('next-btn');
const resultModal = document.getElementById('result-modal');
const resultText = document.getElementById('result-text');
const closeButton = document.getElementsByClassName('close-button')[0];

let currentQuestionIndex = 0;
let totalCorrect = 0;

const questions = [{
        question: 'Что является столицей моды?',
        answers: ['Москва', 'Милан', 'Лиссабон'],
        correctAnswers: ['Милан']
    },
    {
        question: 'Откуда родом была Мерилин Монро?',
        answers: ['США', 'Франция', 'Италия', 'Англия'],
        correctAnswers: ['США']
    },
    {
        question: 'Нравится ли вам музыка TheWeeknd?',
        answers: ['Да', 'Безусловно', 'Конечно'],
        correctAnswers: ['Конечно']
    }
];

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
    <div class="question">
      <h3>${question.question}</h3>
      ${question.answers.map(answer => `
        <div class="answer" onclick="checkAnswer('${answer}')">${answer}</div>
      `).join('')}
    </div>
  `;
  nextButton.disabled = true;
}

function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestionIndex];
  const answerElements = document.getElementsByClassName('answer');

  for (let i = 0; i < answerElements.length; i++) {
    const answerElement = answerElements[i];
    const answer = answerElement.textContent;

    if (question.correctAnswers.includes(answer)) {
      answerElement.classList.add(answer === selectedAnswer ? 'correct' : 'incorrect');
    } else {
      answerElement.classList.add(answer === selectedAnswer ? 'incorrect' : '');
    }
  }

  nextButton.disabled = false;

  if (question.correctAnswers.includes(selectedAnswer)) {
    totalCorrect++;
  }
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  resultText.textContent = `Вы ответили правильно на ${totalCorrect} из ${questions.length} вопросов.`;
  resultModal.style.display = 'block';
}

closeButton.onclick = function() {
  resultModal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == resultModal) {
    resultModal.style.display = 'none';
  }
};

displayQuestion();