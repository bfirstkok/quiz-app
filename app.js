const TIME_PER_Q = 15;

let questions = [];
let current = 0;
let score = 0;
let results = [];
let timerInterval = null;
let timeLeft = TIME_PER_Q;

const startScreen  = document.getElementById('startScreen');
const quizScreen   = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('retryBtn').addEventListener('click', startQuiz);

function startQuiz() {
  questions = getRandomQuestions(10);
  current = 0;
  score = 0;
  results = [];
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById('questionNum').textContent = `Question ${current + 1} / ${questions.length}`;
  document.getElementById('progressFill').style.width = `${(current / questions.length) * 100}%`;
  document.getElementById('questionText').textContent = q.q;

  const grid = document.getElementById('choicesGrid');
  grid.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    grid.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_PER_Q;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(-1, null); // time out
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timer');
  el.textContent = `⏱ ${timeLeft}s`;
  el.classList.toggle('urgent', timeLeft <= 5);
}

function selectAnswer(index, clickedBtn) {
  clearInterval(timerInterval);
  const q = questions[current];
  const correct = q.answer;
  const isCorrect = index === correct;

  if (isCorrect) score++;

  results.push({ q: q.q, correct: isCorrect, correctAnswer: q.choices[correct] });

  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (btn === clickedBtn) btn.classList.add('wrong');
  });

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 900);
}

function showResult() {
  document.getElementById('progressFill').style.width = '100%';
  showScreen(resultScreen);

  const pct = Math.round((score / questions.length) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : pct >= 40 ? '😐' : '😢';
  const title = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Practicing' : 'Better Luck Next Time';

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = `You scored ${score} / ${questions.length} (${pct}%)`;

  const bd = document.getElementById('resultBreakdown');
  bd.innerHTML = results.map((r, i) =>
    `<div class="${r.correct ? 'correct-item' : 'wrong-item'}">
      ${r.correct ? '✔' : '✘'} Q${i+1}: ${r.q.substring(0, 50)}${r.q.length > 50 ? '…' : ''}
      ${!r.correct ? `<br><small>→ ${r.correctAnswer}</small>` : ''}
    </div>`
  ).join('');
}

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}
