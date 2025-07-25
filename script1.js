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
    const optionBtn = document.createElement('div');
    optionBtn.className = 'option';
    optionBtn.innerText = `${key}. ${q.options[key]}`;
    optionBtn.onclick = () => checkAnswer(optionBtn, key, q.answer, q.explanation, q.textbook, q.chapter, q.page);
    optionsContainer.appendChild(optionBtn);
  }

  document.getElementById('feedback').innerText = '';
  document.getElementById('explanation').innerHTML = '';
}

function checkAnswer(selectedBtn, selected, correct, explanation, textbook, chapter, page) {
  const optionButtons = document.querySelectorAll('.option');
  optionButtons.forEach(btn => {
    btn.classList.add('disabled');
    const optionKey = btn.innerText.charAt(0);
    if (optionKey === correct) {
      btn.classList.add('correct');
    } else if (optionKey === selected && optionKey !== correct) {
      btn.classList.add('incorrect');
    }
  });

  document.getElementById('feedback').innerText = `Correct answer: ${correct}`;
  document.getElementById('explanation').innerHTML = `
    <strong>Explanation:</strong> ${explanation}<br><br>
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
