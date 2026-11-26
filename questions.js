const ALL_QUESTIONS = [
  { q: "What does HTML stand for?", choices: ["HyperText Markup Language", "High Transfer Markup Language", "HyperText Making Language", "Home Tool Markup Language"], answer: 0 },
  { q: "Which language runs in a web browser?", choices: ["Python", "Java", "JavaScript", "C++"], answer: 2 },
  { q: "What is the value of π (pi) to 2 decimal places?", choices: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
  { q: "Which planet is closest to the Sun?", choices: ["Venus", "Earth", "Mars", "Mercury"], answer: 3 },
  { q: "What is 12 × 12?", choices: ["124", "144", "132", "148"], answer: 1 },
  { q: "What does CSS stand for?", choices: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style System"], answer: 0 },
  { q: "Which data structure uses LIFO?", choices: ["Queue", "Stack", "Linked List", "Tree"], answer: 1 },
  { q: "What is the capital of Japan?", choices: ["Beijing", "Seoul", "Bangkok", "Tokyo"], answer: 3 },
  { q: "In Python, which keyword defines a function?", choices: ["func", "function", "def", "define"], answer: 2 },
  { q: "What is 2^10?", choices: ["512", "1024", "2048", "256"], answer: 1 },
  { q: "Which company created the React library?", choices: ["Google", "Microsoft", "Meta (Facebook)", "Apple"], answer: 2 },
  { q: "What HTTP status code means 'Not Found'?", choices: ["200", "301", "403", "404"], answer: 3 },
  { q: "What is the largest ocean on Earth?", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { q: "Which symbol is used for single-line comments in Python?", choices: ["//", "/*", "#", "--"], answer: 2 },
  { q: "SQL stands for?", choices: ["Structured Query Language", "Simple Query Logic", "System Query Language", "Sequential Query Lib"], answer: 0 },
];

function getRandomQuestions(n = 10) {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
