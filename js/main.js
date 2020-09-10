
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
  speed: 3,
  traffic: 3
}

// Functions

function startGame() {
  start.classList.add('hide');
  gameArea.innerHTML = '';

  for(let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for(let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = 'transparent url("../images/car-white.png") center / cover no-repeat'
    gameArea.appendChild(enemy);
  }
  
  settings.score = 0;
  settings.start = true;
  gameArea.appendChild(car);
  car.style.left = '125px';
  car.style.top = 'auto';
  car.style.bottom = '10px';
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if(settings.start) {

    settings.score += settings.speed;
    score.innerHTML = 'score<br/>' + settings.score;

    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && settings.x > 0) {
      settings.x -= settings.speed;
    }
    if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
      settings.x += settings.speed;
    }
    if (keys.ArrowUp && settings.y > 0) {
      settings.y -= settings.speed;
    }
    if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
      settings.y += settings.speed;
    }

    car.style.left = settings.x + 'px';
    car.style.top = settings.y + 'px';

      requestAnimationFrame(playGame);
  }
}

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startRun(e) {
  e.preventDefault();
  keys[event.key] = true;
}

function stopRun(e) {
  e.preventDefault();
  keys[event.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(line => {
    line.y += settings.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  })
}

function moveEnemy() {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    if(carRect.top <= enemyRect.bottom &&
       carRect.right >= enemyRect.left &&
       carRect.left <= enemyRect.right &&
       carRect.bottom >= enemyRect.top ) {
        settings.start = false;
        start.classList.remove('hide');
        start.style.top = score.offsetHeight;
    }

    enemy.y += settings.speed / 2;
    enemy.style.top = enemy.y + 'px';

    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * settings.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  })
}
// Listeners

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);