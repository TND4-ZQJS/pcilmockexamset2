let currentQuestion = 1;
let questions = [];

fetch('set2_full_100.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion(currentQuestion);
  });

function displayQuestion(num) {
  const q = questions[num - 1];
  if (!q) return;

  document.getElementById('question-number').innerText = `Question ${q.questionNumber}`;
  document.getElementById('question-text').innerText = q.question;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  for (let key in q.options) {
    const btn = document.createElement('button');
    btn.innerText = `${key}. ${q.options[key]}`;
    btn.onclick = () => checkAnswer(key, q.answer, q.explanation, q.textbook, q.chapter, q.page);
    optionsContainer.appendChild(btn);
  }

  document.getElementById('feedback').innerText = '';
  document.getElementById('explanation').innerHTML = '';
}

function checkAnswer(selected, correct, explanation, textbook, chapter, page) {
  const buttons = document.querySelectorAll('#options-container button');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText.startsWith(correct)) {
      btn.classList.add('correct');
    }
    if (btn.innerText.startsWith(selected) && selected !== correct) {
      btn.classList.add('incorrect');
    }
  });

  document.getElementById('feedback').innerText = `Correct answer: ${correct}`;
  document.getElementById('explanation').innerHTML = `
    <strong>Explanation:</strong><br>${explanation}<br><br>
    <em>Reference: ${textbook}, ${chapter}, page ${page}</em>
  `;
}

function nextQuestion() {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    displayQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    displayQuestion(currentQuestion);
  }
}

function goToQuestion() {
  const num = parseInt(document.getElementById('jump-input').value);
  if (num >= 1 && num <= questions.length) {
    currentQuestion = num;
    displayQuestion(currentQuestion);
  } else {
    alert(`Please enter a valid question number (1–${questions.length})`);
  }
}
