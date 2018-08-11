//variable to store canvas width
let Canvas_width = 805;

//variable to store canvas height
let Canvas_height = 805;

//variable to store player starting x-Axis position
let Player_start_x = 305;

//variable to store player starting y-Axis postion
let Player_start_y = 575;

//variable to store booolean value to know if the game is started or not.
let play = false;

//variable to store the selected character
let selectedChar;

//array of characters
const chars = [
    'images/char-boy.png',
    'images/char-princess-girl.png',
    'images/char-cat-girl.png',
    'images/char-pink-girl.png',
    'images/char-horn-girl.png'
];
//variables to store reference to the difficulty buttons
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

//event listener for easy difficulty
easyButton.addEventListener('click', function () {
    easyButton.className = 'easy active';
    mediumButton.className = 'medium';
    hardButton.className = 'hard';

/*sets the speed according to the easy difficulty and speed variation between left and right enemies*/
  const enemiesLeft = allEnemies.slice(0,4);
  const enemiesRight = allEnemies.slice(4,10);

  enemiesLeft.forEach(function(enemy) {
   enemy.speed = Math.floor(Math.random() * (526-1)) + 1;
  });
  enemiesRight.forEach(function(enemy) {
     enemy.speed = Math.floor(Math.random() * (426-1)) + 1;
  });
}, false);

//event listener for medium difficulty
mediumButton.addEventListener('click', function () {
    easyButton.className = 'easy';
    mediumButton.className = 'medium active';
    hardButton.className = 'hard';

/*sets the speed according to the medium difficulty and speed variation between left and right enemies*/
    const enemiesLeft = allEnemies.slice(0,4);
    const enemiesRight = allEnemies.slice(4,10);

  enemiesLeft.forEach(function(enemy) {
   enemy.speed = Math.floor(Math.random() * (730-1)) + 1;
  });
  enemiesRight.forEach(function(enemy) {
     enemy.speed = Math.floor(Math.random() * (590-1)) + 1;
  });
}, false);

//event listener for hard difficulty
hardButton.addEventListener('click', function () {
    easyButton.className = 'easy';
    mediumButton.className = 'medium';
    hardButton.className = 'hard active';

/*sets the speed according to the medium difficulty and speed variation between left and right enemies*/
    let enemiesLeft = allEnemies.slice(0,4);
    let enemiesRight = allEnemies.slice(4,10);

  enemiesLeft.forEach(function(enemy) {
   enemy.speed = Math.floor(Math.random() * (870-1)) + 1;
  });
  enemiesRight.forEach(function(enemy) {
     enemy.speed = Math.floor(Math.random() * (680-1)) + 1;
  });
}, false);

//function to load audio samples
const Game = function() {
  this.gainLifeEfx = new Audio('sound/Gain-Life.wav');
  this.getGemEfx = new Audio('sound/Get-Gem.mp3');
  this.loseLifeEfx = new Audio('sound/Lose-Life.mp3');
};

//function to show message on win
Game.prototype.win = function() {
    alert ("You Won! Refresh page to play again");
    this.resetGame();
};

//function to show message on lose
Game.prototype.lose = function() {
    alert ("Game Over!");
    this.resetGame();
};

//function to reset game
Game.prototype.resetGame = function() {
    //reset the number of collected gems and hearts
    collectedGems = [];
    collectedHearts = [];

    //reset the lives and gems
    document.getElementById("lives").innerHTML = 3;
    document.getElementById("gems").innerHTML = collectedGems.length.toString();

    //reset the player position, gems and hearts position and enemies
    player.reset();
    let allGemsLength = allGems.length;
    for (i=0; i < allGemsLength; i++) {
        allGems[i].reset();
    }
    let allEnemiesLength = allEnemies.length;
    for (i=0; i < allEnemiesLength; i++) {
        allEnemies[i].reset();
    }
    let allRocksLength = allRocks.length;
    for (i=0; i < allRocksLength; i++) {
        allRocks[i].reset();
    }
    let allHeartsLength = allHearts.length;
    for (i=0; i < allHeartsLength; i++) {
        allHearts[i].reset();
    }
};

let game = new Game();


//selector function for character selection
let Selector = function() {
    this.col = 0;
    this.x = this.col * 101 + 152;
    this.y = 358;
    this.sprite = 'images/Selector.png';
    this.alpha = 1;
    this.throbdir = 'transparent';
};

//input handler to move selector
Selector.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.col > 0 ? (this.col--, this.x = this.col * 101 + 152) : this.col;
    }
    if (key == 'right') {
      this.col < 4 ? (this.col++, this.x = this.col * 101 + 152) : this.col;
    }
    if (key == 'enter') {
      selectedChar = this.col;
      play = true;
      game.resetGame();
    }
};

//selector render function
Selector.prototype.render = function() {
    ctx.save();
    this.throb();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
};

//function to throb the selector
Selector.prototype.throb = function() {
    if (this.alpha > 0.5 && this.throbdir === 'transparent') {
        this.alpha -= 0.08;
    }
    else {
        this.throbdir = 'opaque';
        this.alpha += 0.08;
        if (this.alpha > 1 && this.throbdir === 'opaque') {
            this.throbdir = 'transparent';
        }
    }
};

//function for the entities in the game
let Entity = function (x,y) {
    this.x = x;
    this.y = y;
    this.originalPosition = [x,y];
    this.width = 50;
    this.height = 50;
};

Entity.prototype.reset = function() {
    this.x = this.originalPosition[0];
    this.y = this.originalPosition[1];
};

Entity.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

//function for positioning rocks
let Rock = function(x,y, originalPosition, width, height) {
  Entity.call (this, x, y, originalPosition, width, height);
  this.sprite = 'images/Rock1.png';
};

Rock.prototype = Object.create(Entity.prototype);

//array to store rocks postion
let allRocks = [];
//coordinates of the rocks
const rock1 = new Rock (405,485);
const rock2 = new Rock (505,400);
const rock3 = new Rock (100,320);
const rock4 = new Rock (305,320);
const rock5 = new Rock (405,240);
const rock6 = new Rock (710,240);
const rock7 = new Rock (100,155);
const rock8 = new Rock (100,-10);
const rock9 = new Rock (310,155);
const rock10 = new Rock (710,-10);
allRocks.push(rock1,rock2,rock3,rock4,rock5,rock6,rock7,rock8,rock9,rock10);

//function for positioning hearts
let Heart = function(x,y, originalPosition, width, height) {
  Entity.call (this, x, y, originalPosition, width, height);
  this.sprite = 'images/Heart1.png';
};

Heart.prototype = Object.create(Entity.prototype);

//array to store hearts postion
let allHearts = [];
//coordinates of the hearts
let heart1 = new Heart (608,419);
let heart2 = new Heart (305,249);
allHearts.push(heart1,heart2);

//function for positioning gems
let Gem = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/Gem-Blue1.png';
};

Gem.prototype = Object.create(Entity.prototype);
//array to store gems position
let allGems = [];
//coordinates of the gems
let gem1 = new Gem (517,503); //a bit of trial & error to center it.
let gem2 = new Gem (10,418);
let gem3 = new Gem (720,88);
allGems.push(gem1,gem2,gem3);

//function for positioning enemies moving to the left
let EnemyL = function(x,y, originalPosition, width, height) {
  Entity.call (this, x, y, originalPosition);
  this.width = 70;
  this.height = 60;
  this.sprite = 'images/enemy-bug.png';
};

EnemyL.prototype = Object.create(Entity.prototype);

//function to update enemies position
EnemyL.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > Canvas_width) {
        this.x = -20;
    }
};

//array to store enemies psoition
let allEnemies = [];
//coordinates of enemies
let enemy0 =  new EnemyL (300,65);
let enemy1 = new EnemyL (0,65);
let enemy2 = new EnemyL (0,150);
let enemy3 = new EnemyL (0,235);
allEnemies.push(enemy0,enemy1,enemy2,enemy3);

//function for positioning enemies moving to the right
let EnemyR = function(x,y, originalPosition, width, height) {
  Entity.call (this, x, y, originalPosition);
  this.width = 85;
  this.height = 65;
  this.sprite = 'images/enemy-bug-r.png';
};

EnemyR.prototype = Object.create(Entity.prototype);

//function to update enemies position
EnemyR.prototype.update = function(dt) {
    this.x -= this.speed * dt;
    if (this.x < -70) {
        this.x = Canvas_width;
    }
};
//coordinates of the enemies
let enemy4 =  new EnemyR (800,320);
let enemy5 = new EnemyR (400,320);
let enemy6 = new EnemyR (800,405);
let enemy7 = new EnemyR (400,405);
let enemy8 = new EnemyR (800,490);
let enemy9 = new EnemyR (400,490);
allEnemies.push(enemy4,enemy5,enemy6,enemy7,enemy8,enemy9);


//funtion for player
let Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.playerPosition = [];
  this.width = 60;
  this.height = 70;
  this.lives = 3;
  this.sprite = chars[selectedChar];
};

Player.prototype.reset = function() {
  this.x = Player_start_x;
  this.y = Player_start_y;
  this.lives = 3;
  this.sprite = chars[selectedChar];
};

//function for collision with enemy
Player.prototype.collision = function() {
    //condition if player has only 1 life left
    if (this.lives === 1) {
      this.lives -= 1;
      document.getElementById("lives").innerHTML = this.lives.toString();
      setTimeout(function() {
      game.lose();
      }, 26);
    }
    //condition if player has more than 1 lives left
    else if (this.lives > 1) {
      this.lives -= 1;
      document.getElementById("lives").innerHTML = this.lives.toString();
      this.x = Player_start_x;
      this.y = Player_start_y;
    }
};

Player.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

//function to update player's position
Player.prototype.update = function(dt) {
  // prevent left movement out of canvas
  if (this.x < 0) {
      this.x = 0;
  }
  //prevent right movement out of canvas
  if (this.x > 700) {
      this.x = 700;
  }
  //prevent down movement out of canvas
  if (this.y > Player_start_y) {
      this.y = Player_start_y;
  }
  //prevent top movement out of canvas 
  if (this.y < -6) {
      this.y = -6;
  }
  if (this.y <= -6  && collectedGems.length > 2) {
    this.y = -6;
    game.win();
  }

  for (i=0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + allEnemies[i].width &&
        this.x + this.width > allEnemies[i].x &&
        this.y < allEnemies[i].y + allEnemies[i].height &&
        this.y + this.height > allEnemies[i].y) {
          game.loseLifeEfx.play();
          this.collision();
      }
  }
  //loop to prevent player from passing through the rocks
    for (i=0; i < allRocks.length; i++) {
      if (this.x < allRocks[i].x + allRocks[i].width &&
          this.x + this.width > allRocks[i].x &&
          this.y < allRocks[i].y + allRocks[i].height &&
          this.y + this.height > allRocks[i].y) {
            this.x = this.playerPosition[this.playerPosition.length-1][0];
            this.y = this.playerPosition[this.playerPosition.length-1][1];
          }
  }

  for (i=0; i < allHearts.length; i++) {
    if (this.x < allHearts[i].x + allHearts[i].width &&
        this.x + this.width > allHearts[i].x &&
        this.y < allHearts[i].y + allHearts[i].height &&
        this.y + this.height > allHearts[i].y) {
          collectedHearts.push([allHearts[i].x,allHearts[i].y]);
          game.gainLifeEfx.play();
          this.lives += 1;
          document.getElementById("lives").innerHTML = this.lives.toString();
          allHearts[i].x = 1000;
          allHearts[i].y = 1000;
        }
  }

  for (i = 0; i < allGems.length; i++) {
    if (this.x < allGems[i].x + allGems[i].width &&
        this.x + this.width > allGems[i].x &&
        this.y < allGems[i].y + allGems[i].height &&
        this.y + this.height > allGems[i].y) {
          collectedGems.push([allGems[i].x, allGems[i].y]);
          game.getGemEfx.play();
          document.getElementById('gems').innerHTML = collectedGems.length.toString();
          allGems[i].x = 1000;
          allGems[i].y = 1000;
        }
    }
};


//function to enable player's movement
Player.prototype.handleInput = function(movement) {
  if (movement == "left") {
    this.playerPosition.push([this.x, this.y]);
    this.x -= 100;
  }
  if (movement == 'right') {
    this.playerPosition.push([this.x, this.y]);
    this.x += 100;
  }
  if (movement == "up") {
    this.playerPosition.push([this.x, this.y]);
    this.y -= 85;
  }
  if (movement == "down") {
    this.playerPosition.push([this.x, this.y]);
    this.y += 85;
  }
};

//instantiates the player object
let player = new Player (Player_start_x,Player_start_y);

//instantiates the selector
function initLoad() {
    selector = new Selector();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (play === false) {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
    else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
