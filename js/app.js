
var Enemy = function(x,y) {
    // Sets position.
    this.x = x;
    this.y = y;
    // Sets speed.
    this.speed = getRandomValue(1,3);
    // This holds the current time.
    var ts = Math.round((new Date()).getTime() / 1000);
    // Gets instance.
    this.friend = ts + getRandomValue(1,5);
    // Enemy image
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // Enemy moves
    this.x += (90*dt)+this.speed;
    var ts = Math.round((new Date()).getTime() / 1000);
    if(this.friend === ts)
    {
        // Random y
        var randy = getRandomValue(0,3);
        // Random x
        var randx = getRandomValue(1,2) * -100;
        allEnemies[index] = new Enemy(randx,validRows[randy]);
        index++;
        this.friend = 0;
    }
    if(index===14)
        index = 0;  
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// function player
var Player = function() {
    // Boy image
    this.sprite = 'images/char-boy.png';
    // Coordinates of the player (start)
    this.x = 200;
    this.y = 400;
    this.moveX = 0;
    this.moveY = 0;
    this.speed = 5;
};


Player.prototype.handleInput = function(key) {
    if(this.moveX !== 0 || this.moveY !== 0)
            return;
// The player is just on the screen
    if(this.x>300 && key === 'right')
            return;
    if(this.x<100 && key === 'left')
            return;
    if(this.y<0 && key === 'up')
            return;
    if(this.y>359 && key === 'down')
            return;
    
    if(key === 'up')
            this.moveY -= 85;
    if(key === 'down')
            this.moveY += 85;
    if(key === 'left')
            this.moveX -= 100;
    if(key === 'right')
            this.moveX += 100;
};


Player.prototype.update = function() {
 
    if(this.moveX > 0)
    {
        this.x += this.speed;
        this.moveX -= this.speed;
    }
    if(this.moveX < 0)
    {
        this.x -= this.speed;
        this.moveX += this.speed;
    }
    if(this.moveY > 0)
    {
        this.y += this.speed;
        this.moveY -= this.speed;
    }
    if(this.moveY < 0)
    {
        this.y -= this.speed;
        this.moveY += this.speed;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// instantiate the player.
var player = new Player();
var allEnemies = [];
var index = 2;
var validRows = [60,145,230];

allEnemies[0] = new Enemy(-100,validRows[0]);
allEnemies[1] = new Enemy(-400,validRows[2]);


function getRandomValue(min, max) {
    var range = max - min;
    var randomValue = Math.floor(Math.random() * range);
    return randomValue + min;
}

