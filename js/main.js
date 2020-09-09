
// Vars

const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea  = document.querySelector('.gameArea'),
      car = document.createElement('div');
      car.classList.add('car');

// Objects

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}

const settings = {
  start: false,
  score: 0,
  speed: 3
}

console.dir(keys)
// Functions

function startGame() {
  start.classList.add('hide');
  settings.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
}

function playGame() {
  if(settings.start) {
      requestAnimationFrame(playGame);
  }
}

function startRun(e) {
  e.preventDefault();
  keys[event.key] = true;
}

function stopRun(e) {
  e.preventDefault();
  keys[event.key] = false;
}

// Listeners

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);