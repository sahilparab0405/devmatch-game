// =============================================
// DevMatch — game.js
// Memory Match Game (Developer Edition)
// =============================================

// ===== Tech Card Definitions =====
const TECH_CARDS_SMALL = [
  { id: 'html',       name: 'HTML',   icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="13" fill="currentColor">&lt;/&gt;</text></svg>' },
  { id: 'css',        name: 'CSS',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="14" fill="currentColor">{ }</text></svg>' },
  { id: 'javascript', name: 'JS',     icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="14" fill="currentColor">JS</text></svg>' },
  { id: 'react',      name: 'React',  icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="22" fill="currentColor">⚛️</text></svg>' },
  { id: 'git',        name: 'Git',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="22" r="3"/><circle cx="24" cy="10" r="3"/><circle cx="8" cy="10" r="3"/><line x1="8" y1="13" x2="8" y2="19"/><path d="M11 10 L21 10"/><line x1="24" y1="13" x2="24" y2="22"/></svg>' },
  { id: 'docker',     name: 'Docker', icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="22">🐳</text></svg>' },
  { id: 'api',        name: 'API',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 16h20"/><polyline points="20 10 26 16 20 22"/><polyline points="12 10 6 16 12 22"/></svg>' },
  { id: 'database',   name: 'DB',     icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="16" cy="8" rx="10" ry="4"/><path d="M6 8v16c0 2.2 4.5 4 10 4s10-1.8 10-4V8"/><path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4"/></svg>' },
];

const TECH_CARDS_LARGE = [
  ...TECH_CARDS_SMALL,
  { id: 'typescript', name: 'TS',     icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="14" fill="currentColor">TS</text></svg>' },
  { id: 'nodejs',     name: 'Node',   icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="10" fill="currentColor">Node</text></svg>' },
  { id: 'python',     name: 'Py',     icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="20">🐍</text></svg>' },
  { id: 'vue',        name: 'Vue',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 16 26 28 6"/><polyline points="10 6 16 16 22 6"/></svg>' },
  { id: 'angular',    name: 'Ng',     icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="16 3 4 8 6 24 16 29 26 24 28 8"/><polyline points="11 18 16 7 21 18"/><line x1="13" y1="15" x2="19" y2="15"/></svg>' },
  { id: 'aws',        name: 'AWS',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="20">☁️</text></svg>' },
  { id: 'linux',      name: 'Linux',  icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="20">🐧</text></svg>' },
  { id: 'graphql',    name: 'GQL',    icon: '<svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2"><polygon points="16 4 27 10 27 22 16 28 5 22 5 10"/><circle cx="16" cy="4" r="2" fill="currentColor"/><circle cx="27" cy="10" r="2" fill="currentColor"/><circle cx="27" cy="22" r="2" fill="currentColor"/><circle cx="16" cy="28" r="2" fill="currentColor"/><circle cx="5" cy="22" r="2" fill="currentColor"/><circle cx="5" cy="10" r="2" fill="currentColor"/></svg>' },
  { id: 'redis',      name: 'Redis',  icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="7" fill="currentColor">REDIS</text></svg>' },
  { id: 'mongodb',    name: 'Mongo',  icon: '<svg viewBox="0 0 32 32" width="100%" height="100%"><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="20">🍃</text></svg>' },
];

// ===== Game State =====
const state = {
  gridSize: 4,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  totalPairs: 0,
  moves: 0,
  timerSeconds: 0,
  timerInterval: null,
  timerStarted: false,
  boardLocked: false,
  gameOver: false,
};

// ===== DOM References =====
const boardEl       = document.getElementById('board');
const moveCountEl   = document.getElementById('moveCount');
const timerEl       = document.getElementById('timer');
const bestScoreEl   = document.getElementById('bestScore');
const bestScoreValEl= document.getElementById('bestScoreValue');
const winOverlay    = document.getElementById('winOverlay');
const winMovesEl    = document.getElementById('winMoves');
const winTimeEl     = document.getElementById('winTime');
const winPlayerEl   = document.getElementById('winPlayer');
const newBestBadge  = document.getElementById('newBestBadge');
const restartBtn    = document.getElementById('restartBtn');
const playAgainBtn  = document.getElementById('playAgainBtn');
const menuBtn       = document.getElementById('menuBtn');
const homeBtn       = document.getElementById('homeBtn');
const themeToggle   = document.getElementById('themeToggle');
const diffBtns      = document.querySelectorAll('.diff-btn');
const playerTagEl   = document.getElementById('playerTag');

// ===== Player name =====
const playerName = sessionStorage.getItem('devmatch_player') || 'Guest';
if (playerTagEl) playerTagEl.textContent = '@ ' + playerName;
if (winPlayerEl) winPlayerEl.textContent = playerName;

// ===== Utilities =====
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ===== Best Score (localStorage) =====
function getBestKey() {
  return `devmatch_best_${state.gridSize}`;
}

function getBestScore() {
  const raw = localStorage.getItem(getBestKey());
  return raw ? JSON.parse(raw) : null;
}

function saveBestScore(moves, time) {
  const prev = getBestScore();
  if (!prev || moves < prev.moves || (moves === prev.moves && time < prev.time)) {
    localStorage.setItem(getBestKey(), JSON.stringify({ moves, time }));
    return true;
  }
  return false;
}

function displayBestScore() {
  const best = getBestScore();
  if (best) {
    bestScoreEl.style.display = 'inline-block';
    bestScoreValEl.textContent = `${best.moves} / ${formatTime(best.time)}`;
  } else {
    bestScoreEl.style.display = 'none';
  }
}

// ===== Timer =====
function startTimer() {
  if (state.timerStarted) return;
  state.timerStarted = true;
  state.timerInterval = setInterval(() => {
    state.timerSeconds++;
    timerEl.textContent = formatTime(state.timerSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
}

function resetTimer() {
  stopTimer();
  state.timerSeconds = 0;
  state.timerStarted = false;
  timerEl.textContent = '0:00';
}

// ===== Card Back Pattern =====
const cardBackSVG = `<svg class="card-back-pattern" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 8h4v4H8zM20 8h4v4h-4zM14 14h4v4h-4zM8 20h4v4H8zM20 20h4v4h-4z"/></svg>`;

// ===== Build Cards =====
function buildCards() {
  const pool = state.gridSize === 4 ? TECH_CARDS_SMALL : TECH_CARDS_LARGE;
  const pairCount = (state.gridSize * state.gridSize) / 2;
  const selected = pool.slice(0, pairCount);
  return shuffle([...selected, ...selected]);
}

// ===== Render Board =====
function renderBoard() {
  boardEl.innerHTML = '';
  boardEl.setAttribute('data-size', state.gridSize);

  state.cards = buildCards();
  state.totalPairs = state.cards.length / 2;

  state.cards.forEach((tech, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-tech', tech.id);
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <div class="card-face card-back">${cardBackSVG}</div>
      <div class="card-face card-front">
        <div class="card-icon">${tech.icon}</div>
        <div class="card-name">${tech.name}</div>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card, index));
    boardEl.appendChild(card);
  });
}

// ===== Card Click =====
function handleCardClick(cardEl, index) {
  if (state.boardLocked) return;
  if (state.gameOver) return;
  if (cardEl.classList.contains('flipped')) return;
  if (cardEl.classList.contains('matched')) return;
  if (state.flippedCards.length >= 2) return;

  startTimer();

  cardEl.classList.add('flipped');
  state.flippedCards.push({ el: cardEl, index, tech: state.cards[index] });

  if (state.flippedCards.length === 2) {
    state.moves++;
    moveCountEl.textContent = state.moves;

    const [first, second] = state.flippedCards;
    if (first.tech.id === second.tech.id) {
      handleMatch(first, second);
    } else {
      handleMismatch(first, second);
    }
  }
}

// ===== Match =====
function handleMatch(first, second) {
  state.boardLocked = true;
  setTimeout(() => {
    first.el.classList.add('matched', 'match-anim');
    second.el.classList.add('matched', 'match-anim');
    state.matchedPairs++;
    state.flippedCards = [];
    state.boardLocked = false;
    if (state.matchedPairs === state.totalPairs) handleWin();
  }, 300);
}

// ===== Mismatch =====
function handleMismatch(first, second) {
  state.boardLocked = true;
  setTimeout(() => {
    first.el.classList.add('mismatch-anim');
    second.el.classList.add('mismatch-anim');
  }, 400);
  setTimeout(() => {
    first.el.classList.remove('flipped', 'mismatch-anim');
    second.el.classList.remove('flipped', 'mismatch-anim');
    state.flippedCards = [];
    state.boardLocked = false;
  }, 900);
}

// ===== Win =====
function handleWin() {
  state.gameOver = true;
  stopTimer();

  const isNewBest = saveBestScore(state.moves, state.timerSeconds);
  displayBestScore();

  setTimeout(() => {
    winMovesEl.textContent = state.moves;
    winTimeEl.textContent = formatTime(state.timerSeconds);
    newBestBadge.style.display = isNewBest ? 'inline-block' : 'none';
    winOverlay.classList.add('active');
  }, 600);
}

// ===== Restart =====
function restartGame() {
  stopTimer();
  state.flippedCards = [];
  state.matchedPairs = 0;
  state.moves = 0;
  state.timerSeconds = 0;
  state.timerStarted = false;
  state.boardLocked = false;
  state.gameOver = false;

  moveCountEl.textContent = '0';
  timerEl.textContent = '0:00';
  winOverlay.classList.remove('active');

  displayBestScore();
  renderBoard();
}

// ===== Theme =====
function initTheme() {
  const saved = localStorage.getItem('devmatch_theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('devmatch_theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.getElementById('themeIconMoon').style.display = isDark ? 'block' : 'none';
  document.getElementById('themeIconSun').style.display  = isDark ? 'none'  : 'block';
}

// ===== Difficulty =====
function changeDifficulty(size) {
  state.gridSize = parseInt(size);
  diffBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.size) === state.gridSize);
  });
  restartGame();
}

// ===== Events =====
restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);
themeToggle.addEventListener('click', toggleTheme);

if (homeBtn) homeBtn.addEventListener('click', () => { window.location.href = 'index.html'; });
if (menuBtn) menuBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

diffBtns.forEach(btn => {
  btn.addEventListener('click', () => changeDifficulty(btn.dataset.size));
});

// ===== Init =====
initTheme();
displayBestScore();
renderBoard();
