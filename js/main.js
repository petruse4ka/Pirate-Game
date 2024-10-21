/* Shuffle array of with the Fisher–Yates */

const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {  
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; 
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

/* Pirate quotes */

const pirateQuotes = [
    'Arrr, I be a pirate and this be me rum!',
    'Shiver me timbers, that be a mighty fine treasure!',
    'Yo ho ho and a bottle of rum, let’s sail the seven seas!',
    'Avast ye scallywags, prepare to be boarded!',
    'This ship be cursed, but I like it that way!',
    'Aye, matey, I’d trade me left leg for a piece of gold!',
    'Ye can’t be serious, that be a chicken, not a parrot!',
    'I lost me eye in a battle, but it was worth the treasure!',
    'The only thing worse than a mutiny is running out of rum!',
    'Sailing without treasure be like a ship without a captain!',
    'What be the pirate’s favorite letter? Rrrrrrrrr!',
    'Arrr, I see the landlubbers are back at it again!',
    'I’d rather be sailing than stuck in this port any day!',
    'Why did the pirate go to school? To improve his ’arrrticulation’!',
    'Ye call that a sword? I’ve seen sharper cutlasses in me kitchen!',
    'Every pirate needs a trusty map, or at least a good compass!',
    'This treasure better not be cursed, or I’ll be walking the plank!',
    'When life gives ye lemons, make lemonades and sell em for doubloons!',
    'Ahoy! Who be the captain of this sorry crew?',
    'The sea be my home, but this ship be my true love!',
    'Don’t make me unleash the kraken on ye!',
    'Ye best start believing in ghost ships, ye’re on one!',
    'If ye ain’t got rum, we ain’t got no deal!',
    'Arrr, the tide be turning, just like me luck!',
    'A pirate’s favorite music? Heavy arrrrtillery!',
    'I’ve seen rougher seas in a fishbowl, matey!',
    'The captain goes down with the ship, but I’m swimmin’!',
    'I don’t need a map, I’ve got the stars and me gut!',
    'There be no wifi in Davy Jones locker, mate!',
    'Keep yer doubloons close, but keep yer parrot closer!',
    'Dead men tell no tales... but I do!',
    'Aye, I be too old for plank-walking, let’s negotiate!',
    'Never trust a pirate with two good eyes!',
    'Blimey! That be no treasure, that be me lunch!',
    'I smell treasure... or maybe that’s just me socks.',
    'Scurvy dogs! Who be takin the last biscuit?',
    'Arrr, even pirates need naps sometimes!',
    'That cannonball missed? I be needing new glasses!',
    'I’ve got sea legs, but they ain’t what they used to be!',
    'The plank be shorter than ye think, matey!',
    'Me parrot speaks more sense than most of me crew!',
  ];

/* Randomize quote */

const pirateQuote = document.querySelector('.pirate-quote');
const quoteButton = document.querySelector('.quote-button')

const randomizeQuote = (array) => {
  let quotes = shuffle(array);
  pirateQuote.innerHTML = quotes[0];
}

randomizeQuote(pirateQuotes);

quoteButton.addEventListener('click', () => {
  randomizeQuote(pirateQuotes);
});

/* Game over titles */

const pirateGameOverPhrases = [
  "Ye be sunk! Time to walk the plank!",
  "Arrr! Yer ship's in Davy Jones' Locker!",
  "Blimey! The cannonballs got ye good!",
  "Aye, matey, ye fought well... but the sea took ye!",
  "Shiver me timbers! Ye be fish food now!"
];

let randomGameOverPhrase = [];

/* Canvas with the game */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 675;

const background = new Image();
background.src = 'assets/images/background-sea4.jpg';

const rectX = 480;
const rectY = 270;
const rectWidth = 320;
const rectHeight = 160; 

let playerIcon = 'assets/svg/pirate-ship.png';
const player = new Image();
player.src = playerIcon;
player.width = 90;
player.height = 90;
let playerX = 600;
let playerY = 100;
let playerSpeed = 1;

const palmTree = new Image();
palmTree.src = 'assets/svg/palm-tree.png';
palmTree.width = 60;
palmTree.height = 60;

const cannonRight = new Image();
cannonRight.src = 'assets/svg/cannon.png';
cannonRight.width = 50;
cannonRight.height = 50;

const cannonLeft = new Image();
cannonLeft.src = 'assets/svg/cannon-left.png';
cannonLeft.width = 50;
cannonLeft.height = 50;

const catPirate = new Image();
catPirate.src = 'assets/svg/kitty.png';
catPirate.width = 50;
catPirate.height = 50;

const parrotPirate = new Image();
parrotPirate.src = 'assets/svg/parrot-pirate.png';
parrotPirate.width = 50;
parrotPirate.height = 50;

const treasures = new Image();
treasures.src = 'assets/svg/treasure.png';
treasures.width = 40;
treasures.height = 40;

const boom = new Image();
boom.src = 'assets/svg/boom.png';
boom.width = 90;
boom.height = 90;
let boomX = null;
let boomY = null;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let gameOver;

let startTime = null;
let elapsedTime = 0;
const gameTime = document.getElementById('timeValue');

const cannonballsCount = document.getElementById('cannonballsValue')

let totalDistance = 0;
const distanceCount = document.getElementById('distanceValue')

const explosionSound = new Audio();
explosionSound.src = 'assets/audio/explosion.mp3'

const cannonShot = new Audio();
cannonShot.src = 'assets/audio/cannonshot.mp3'

const soundtrack = new Audio();
soundtrack.src = 'assets/audio/soundtrack.mp3'

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();
  if (event.key === 'ArrowUp') upPressed = true;
  if (event.key === 'ArrowDown') downPressed = true;
  if (event.key === 'ArrowLeft') leftPressed = true;
  if (event.key === 'ArrowRight') rightPressed = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') upPressed = false;
  if (event.key === 'ArrowDown') downPressed = false;
  if (event.key === 'ArrowLeft') leftPressed = false;
  if (event.key === 'ArrowRight') rightPressed = false;
});

const updatePlayerLocation = () => {
  const prevPlayerX = playerX;
  const prevPlayerY = playerY;

  if (playerX < 0) {
    playerX = 0;
  }
  if (playerX + player.width > canvas.width) {
    playerX = canvas.width - player.width;
  }
  if (playerY < 0) {
    playerY = 0;
  }
  if (playerY + player.height > canvas.height) {
    playerY = canvas.height - player.height;
  }

  if (upPressed) {
    playerY -= playerSpeed;
  }
  if (downPressed) {
    playerY += playerSpeed;
  }
  if (leftPressed) {
    playerX -= playerSpeed;
  }
  if (rightPressed) {
    playerX += playerSpeed;
  }

  if (playerX < rectX + rectWidth && playerX + player.width > rectX && playerY < rectY + rectHeight && playerY + player.height > rectY) {
    if (playerY + player.height > rectY && prevPlayerY + player.height <= rectY) {
      playerY = rectY - player.height;
    }  
    if (playerY < rectY + rectHeight && prevPlayerY >= rectY + rectHeight) {
      playerY = rectY + rectHeight;
    }
    if (playerX + player.width > rectX && prevPlayerX + player.width <= rectX) {
      playerX = rectX - player.width;
    }
    if (playerX < rectX + rectWidth && prevPlayerX >= rectX + rectWidth) {
      playerX = rectX + rectWidth;
    }
  }
  
  totalDistance += ((Math.pow(playerX - prevPlayerX, 2) + Math.pow(playerY - prevPlayerY, 2)) / 10);
};

let cannonballsRight = [];
let cannonballsLeft = [];
let cannonballsCombined = [];

const shootCannonballRight = (startX, startY) => {
  cannonShot.play();
  cannonballsRight.push({
    x: startX,
    y: startY,
    radius: 5,
    speedX: 2,
    speedY: -2,
    inside: true,
  });
  cannonballsCombined.push('cannonball');
}

const shootCannonballLeft = (startX, startY) => {
  cannonShot.play();
  cannonballsLeft.push({
    x: startX,
    y: startY,
    radius: 5,
    speedX: -2,
    speedY: -2,
    inside: true,
  });
  cannonballsCombined.push('cannonball');
}

let cannonballColor = 'gold';

const updateCannonballsRight = () => {
  for (let i = 0; i < cannonballsRight.length; i++) {
    const cannonball = cannonballsRight[i];
    cannonball.x += cannonball.speedX;
    cannonball.y += cannonball.speedY;
    ctx.beginPath();
    ctx.arc(cannonball.x, cannonball.y, cannonball.radius, 0, Math.PI * 2);
    ctx.fillStyle = cannonballColor;
    ctx.fill();
    ctx.closePath();

    if (cannonball.x + cannonball.radius > canvas.width || cannonball.x - cannonball.radius < 0) {
      cannonball.speedX *= -1;
    }
    if (cannonball.y + cannonball.radius > canvas.height || cannonball.y - cannonball.radius < 0) {
      cannonball.speedY *= -1;
    }

    setTimeout(() => {
      cannonball.inside = false;
    }, 400);
  
    if (cannonball.x + cannonball.radius > rectX && cannonball.x - cannonball.radius < rectX + rectWidth && cannonball.y + cannonball.radius > rectY && cannonball.y - cannonball.radius < rectY + rectHeight && cannonball.inside === false) {
      if (cannonball.x - cannonball.radius < rectX || cannonball.x + cannonball.radius > rectX + rectWidth) {
        cannonball.speedX *= -1;
      }
  
      if (cannonball.y - cannonball.radius < rectY || cannonball.y + cannonball.radius > rectY + rectHeight) {
        cannonball.speedY *= -1;
      }
    }

    if (cannonball.x + cannonball.radius > playerX && cannonball.x - cannonball.radius < playerX + player.width && cannonball.y + cannonball.radius > playerY && cannonball.y - cannonball.radius < playerY + player.height) {
      soundtrack.currentTime = 0;
      soundtrack.pause();
      explosionSound.play();
      boomX = playerX;
      boomY = playerY;
      ctx.drawImage(boom, boomX, boomY, boom.width, boom.height);
      gameOver = true;
      startGameButton.disabled = false;
      showSettingsButton.disabled = false;
      clearTimeout(rightCannonTimeout);
      clearTimeout(leftCannonTimeout);
      clearInterval(rightCannonInterval);
      clearInterval(leftCannonInterval);
      setTimeout(() => {
        showGameOver();
      }, 500);
    }
  }
}

const updateCannonballsLeft = () => {
  for (let i = 0; i < cannonballsLeft.length; i++) {
    const cannonball = cannonballsLeft[i];
    cannonball.x += cannonball.speedX;
    cannonball.y += cannonball.speedY;
    ctx.beginPath();
    ctx.arc(cannonball.x, cannonball.y, cannonball.radius, 0, Math.PI * 2);
    ctx.fillStyle = cannonballColor;
    ctx.fill();
    ctx.closePath();

    if (cannonball.x + cannonball.radius > canvas.width || cannonball.x - cannonball.radius < 0) {
      cannonball.speedX *= -1;
    }
    if (cannonball.y + cannonball.radius > canvas.height || cannonball.y - cannonball.radius < 0) {
      cannonball.speedY *= -1;
    }

    setTimeout(() => {
      cannonball.inside = false;
    }, 400);

    if (cannonball.x + cannonball.radius > rectX && cannonball.x - cannonball.radius < rectX + rectWidth && cannonball.y + cannonball.radius > rectY && cannonball.y - cannonball.radius < rectY + rectHeight && cannonball.inside === false) {
      if (cannonball.x - cannonball.radius < rectX || cannonball.x + cannonball.radius > rectX + rectWidth) {
        cannonball.speedX *= -1;
      }

      if (cannonball.y - cannonball.radius < rectY || cannonball.y + cannonball.radius > rectY + rectHeight) {
        cannonball.speedY *= -1;
      }
    }

    if (cannonball.x + cannonball.radius > playerX && cannonball.x - cannonball.radius < playerX + player.width && cannonball.y + cannonball.radius > playerY && cannonball.y - cannonball.radius < playerY + player.height) {
      soundtrack.currentTime = 0;
      soundtrack.pause();
      explosionSound.play();
      boomX = playerX;
      boomY = playerY;
      ctx.drawImage(boom, boomX, boomY, boom.width, boom.height);
      gameOver = true;
      startGameButton.disabled = false;
      showSettingsButton.disabled = false;
      clearTimeout(rightCannonTimeout);
      clearTimeout(leftCannonTimeout);
      clearInterval(rightCannonInterval);
      clearInterval(leftCannonInterval);
      setTimeout(() => {
        showGameOver();
      }, 500);
    }
  }
}

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(rectX, rectY, rectWidth, rectHeight);
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.drawImage(player, playerX, playerY, player.width, player.height);
  ctx.drawImage(palmTree, 685, 330, palmTree.width, palmTree.height);
  ctx.drawImage(cannonRight, 675, 275, cannonRight.width, cannonRight.height);
  ctx.drawImage(parrotPirate, 630, 275, cannonRight.width, cannonRight.height);
  ctx.drawImage(cannonLeft, 505, 365, cannonLeft.width, cannonLeft.height);
  ctx.drawImage(catPirate, 555, 350, catPirate.width, catPirate.height);
  ctx.drawImage(treasures, 645, 360, treasures.width, treasures.height);

  updatePlayerLocation();
  updateCannonballsRight();
  updateCannonballsLeft();

  if (!startTime) startTime = Date.now();
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  gameTime.innerHTML = `${elapsedTime}s`;

  cannonballsCount.innerHTML = `${cannonballsCombined.length}`;
  distanceCount.innerHTML = `${Math.ceil(totalDistance)}m`

  if (!gameOver) {
    requestAnimationFrame(drawGame);
  } else {
    saveResult(elapsedTime, cannonballsCombined.length, Math.ceil(totalDistance));
  }
}

let rightCannonInterval
let leftCannonInterval
let rightCannonTimeout
let leftCannonTimeout;

const ShootingRight = (x, y) => {
  shootCannonballRight(x, y);
  rightCannonInterval = setInterval(() => {
    shootCannonballRight(x, y);
  }, 20000)
}

const ShootingLeft = (x, y) => {
  shootCannonballLeft(x, y);
  leftCannonInterval = setInterval(() => {
    shootCannonballLeft(x, y);
  }, 20000);
}

/* Game start & restart */

const startGameButton = document.getElementById('gameStart')
const showSettingsButton = document.getElementById('showSettings');
const settingsPanel = document.getElementById('settings');

startGameButton.addEventListener('click', () => {
  settingsPanel.classList.add('game-settings_hidden');
  startGameButton.disabled = true;
  showSettingsButton.disabled = true;
  gameOver = false;
  cannonballsRight = [];
  cannonballsLeft = [];
  cannonballsCombined = [];
  totalDistance = 0;
  playerX = 600;
  playerY = 100;
  startTime = null;
  elapsedTime = 0;
  soundtrack.play();
  clearTimeout(rightCannonTimeout);
  clearTimeout(leftCannonTimeout);
  clearInterval(rightCannonInterval);
  clearInterval(leftCannonInterval);
  
  rightCannonTimeout = setTimeout(() => {
    ShootingRight(720, 290);
  }, 5000);

  leftCannonTimeout = setTimeout(() => {
    ShootingLeft(510, 385);
  }, 15000);

  drawGame();
});

/* Game over screen */

const showGameOver = () => {
  randomGameOverPhrase = shuffle(pirateGameOverPhrases);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#CD7F32';
  ctx.font = '60px Pirata One';
  ctx.textAlign = 'center';
  ctx.fillText(randomGameOverPhrase[0], canvas.width / 2, canvas.height / 2 - 150);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '40px Pirata One';
  ctx.textAlign = 'center';
  ctx.fillText(`Time Survived: ${elapsedTime}s`, canvas.width / 2, canvas.height / 2);
  ctx.fillText(`Cannonballs Shot: ${cannonballsCombined.length}`, canvas.width / 2, canvas.height / 2 + 50);
  ctx.fillText(`Distance Traveled: ${Math.ceil(totalDistance)}m`, canvas.width / 2, canvas.height / 2 + 100);
};

/* Handle game results */

let results = JSON.parse(localStorage.getItem('gameResults')) || [];
let topResult = JSON.parse(localStorage.getItem('topResult')) || {gameTime: 0, cannonballsShot: 0, totalDistance: 0,};
const resultsList = document.querySelector('.results-list');
const noResultsBlock = document.getElementById('noResults');
const topResultBlock = document.getElementById('topResult');
const topResultTime = document.getElementById('topResultTime');
const topResultCannonballs = document.getElementById('topResultCannonballs');
const topResultDistance = document.getElementById('topResultDistance');

const updateResults = () => {
  resultsList.innerHTML = '';

  if (results.length > 0) {
    noResultsBlock.style.display = 'none';
  } else {
    noResultsBlock.style.display = 'flex';
  }

  results.forEach((result) => {
    const resultItem = document.createElement('li');
    resultItem.classList.add('results-item');

    const resultContainerTime = document.createElement('div');
    resultContainerTime.classList.add('result__container');

    const resultContainerCannon = document.createElement('div');
    resultContainerCannon.classList.add('result__container');

    const resultContainerDistance = document.createElement('div');
    resultContainerDistance.classList.add('result__container');

    const timerIcon = document.createElement('img');
    timerIcon.src = 'assets/svg/timer.png';
    timerIcon.alt = 'Timer Icon';
    timerIcon.classList.add('stat-icon');

    const timeResult = document.createElement('p');
    timeResult.classList.add('result');
    timeResult.innerText = `${result.gameTime}s`;

    const cannonballIcon = document.createElement('img');
    cannonballIcon.src = 'assets/svg/cannonball.png';
    cannonballIcon.alt = 'Cannonball Icon';
    cannonballIcon.classList.add('stat-icon');

    const cannonballsResult = document.createElement('p');
    cannonballsResult.classList.add('result');
    cannonballsResult.innerText = `${result.cannonballsShot}`;

    const distanceIcon = document.createElement('img');
    distanceIcon.src = 'assets/svg/distance.png';
    distanceIcon.alt = 'Distance Icon';
    distanceIcon.classList.add('stat-icon');

    const distanceResult = document.createElement('p');
    distanceResult.classList.add('result');
    distanceResult.innerText = `${result.totalDistance}m`;

    resultContainerTime.appendChild(timerIcon);
    resultContainerTime.appendChild(timeResult);
    resultContainerCannon.appendChild(cannonballIcon);
    resultContainerCannon.appendChild(cannonballsResult);
    resultContainerDistance.appendChild(distanceIcon);
    resultContainerDistance.appendChild(distanceResult);

    resultItem.appendChild(resultContainerTime);
    resultItem.appendChild(resultContainerCannon);
    resultItem.appendChild(resultContainerDistance);
    resultsList.appendChild(resultItem);
  });

  updateTopResult();
}

const updateTopResult = () => {
  if (topResult.gameTime > 0) {
    topResultBlock.style.display = 'flex';
    topResultTime.innerText = topResult.gameTime;
    topResultCannonballs.innerText = topResult.cannonballsShot;
    topResultDistance.innerText = topResult.totalDistance;
  } else {
    topResultBlock.style.display = 'none';
  }
}

const saveResult = (time, cannonballs, distance) => {
  const gameResult = {
    gameTime: time,
    cannonballsShot: cannonballs,
    totalDistance: distance,
  };
  
  results.unshift(gameResult);

  if (results.length > 10) {
    results.pop();
  }

  localStorage.setItem('gameResults', JSON.stringify(results));

  if (time > topResult.gameTime) {
    topResult = gameResult;
    localStorage.setItem('topResult', JSON.stringify(topResult));
  }

  updateResults();
}

window.onload = () => {
  updateResults();
};

/* Handle game settings */

const shipIconsSelect = document.querySelectorAll('input[name="shipIcon"]');
const shipSpeedSelect = document.getElementById('shipSpeed');
const cannonballColorSelect = document.getElementById('cannonballColor');

showSettingsButton.addEventListener('click', () => {
  settingsPanel.classList.toggle('game-settings_hidden');
});

shipIconsSelect.forEach(icon => {
  icon.addEventListener('change', (event) => {
    playerIcon = `assets/svg/${event.target.value}.png`;
    player.src = playerIcon;
  });
});

shipSpeedSelect.addEventListener('change', (event) => {
  playerSpeed = parseInt(event.target.value, 10);
});

cannonballColorSelect.addEventListener('change', (event) => {
  cannonballColor = event.target.value;
});

/* Show/close dialog window with Rules*/

const rulesPopup = document.getElementById('rules');
const rulesPopupOpen = document.getElementById('rules-open');
const rulesPopupClose = document.getElementById('close-rules');
const websiteBody = document.querySelector('.body');

rulesPopupOpen.addEventListener('click', () => {
  rulesPopup.showModal();
  websiteBody.classList.add('no-scroll');
});

rulesPopupClose.addEventListener('click', () => {
  rulesPopup.close();
  websiteBody.classList.remove('no-scroll');
});

rulesPopup.addEventListener('click', (event) => {
  if (event.clientX < rulesPopup.getBoundingClientRect().left || event.clientX > rulesPopup.getBoundingClientRect().right || event.clientY < rulesPopup.getBoundingClientRect().top || event.clientY > rulesPopup.getBoundingClientRect().bottom) {
    rulesPopup.close();
    websiteBody.classList.remove('no-scroll');
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && rulesPopup.open) { 
    websiteBody.classList.remove('no-scroll');
  }
});

/* Show/close dialog window with Leaderboard*/

const leaderboardPopup = document.getElementById('leaderboard');
const leaderboardPopupOpen = document.getElementById('leaderboard-open')
const leaderboarPopupClose = document.getElementById('leaderboard-close');

leaderboardPopupOpen.addEventListener('click', () => {
  leaderboardPopup.showModal();
  websiteBody.classList.add('no-scroll');
});

leaderboarPopupClose.addEventListener('click', () => {
  leaderboardPopup.close();
  websiteBody.classList.remove('no-scroll');
});

leaderboardPopup .addEventListener('click', (event) => {
  if (event.clientX < leaderboardPopup.getBoundingClientRect().left || event.clientX > leaderboardPopup.getBoundingClientRect().right || event.clientY < leaderboardPopup.getBoundingClientRect().top || event.clientY > leaderboardPopup.getBoundingClientRect().bottom) {
    leaderboardPopup.close();
    websiteBody.classList.remove('no-scroll');
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && leaderboardPopup.open) { 
    websiteBody.classList.remove('no-scroll');
  }
});