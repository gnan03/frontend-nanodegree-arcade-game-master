
var numRows=6;
var numCols=5;
var height=83;
var width=101;
var score=0;
var level=1;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed= Math.floor((Math.random() * 200) + 50);
    this.x=x;
    this.y=y;
    this.row=parseInt(this.y/101)+1;
 };
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    var dx=Math.abs(this.x-player.x);
    //if((this.row===player.row)&&(this.x+50>player.x)&&(this.x<player.x))
    //Check for collision and reset player if true
    if((this.row===player.row)&&(dx<80))
    {
        player.x=width*(numCols-1);
        player.y=height*(numRows-1);
        player.row=numRows-1;
        player.col=numCols-1;
    }   
    if(this.x>500)
    {
        this.x=-500;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class
var Player=function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x=x;
    this.y=y;
    this.row=numRows-1;
    this.col=numCols-1;
};
Player.prototype.update = function() {
  //Player has reached water block, reset position to default
  if(this.row===0)
  {
      gameOver();
      this.x=width*(numCols-1);
      this.y=height*(numRows-1);
      this.row=numRows-1;
      this.col=numCols-1;
             
  }
};
//move player
//reset if movement crosses game boundary
Player.prototype.handleInput = function(keyInput) {
    if(keyInput==='left')
    {
        this.x-=101;
         this.col--;
         score++;
        if(this.x<0)
        {
            this.x=0;
            this.col=0;
        }
    }
    else if(keyInput==='up')
    {
        this.y-=height;
        this.row--;
        score++;
       if(this.row===0)
       {
        this.y=0;
        this.row=0;
       }     
    }
    else if(keyInput==='right')
    {
        this.x+=101;
        this.col++;
        score++;
        if(this.x>width*(numCols-1))
        {
            this.x=width*(numCols-1);
            this.col=numCols-1;
        }
    }
    else if(keyInput==='down')
    {
        this.y+=83;
        this.row++;
        score++;
        if(this.y>height*(numRows-1))
        {
            this.y=height*(numRows-1);
            this.row=numRows-1;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player=new Player(width*(numCols-1),height*(numRows-1));
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
//get level from user
function setLevel()
{
   var e= document.getElementById('levels');
   level= e.options[e.selectedIndex].value;
   startGame();
}
//hide level selection and start game
function startGame()
{
    
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('score_msg').style.display = 'none';
    document.getElementById('select_level').style.display = 'none';
    createEnemies();
}
//Number of enemies vary according to level selected by user
function createEnemies()
{
    switch(level)
    {
        case "1":
        {
            allEnemies[0]=new Enemy(0, (1.5*83)-66);
            allEnemies[1]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[2]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            break;
        }
        case "2":
        {
            allEnemies[0]=new Enemy(-202, Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[1]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[2]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[3]=new Enemy(0, (1.5*83)-66);
            allEnemies[4]=new Enemy(0,(2.5*83)-66);
            break;
        }
        case "3":
        {
            allEnemies[0]=new Enemy(-202, Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[1]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[2]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[3]=new Enemy(0, (1.5*83)-66);
            allEnemies[4]=new Enemy(0,(2.5*83)-66);
            allEnemies[5]=new Enemy(0,(3.5*83)-66);
            allEnemies[6]=new Enemy(0,(3.5*83)-66);
            break;
        }
        default:
        {
            allEnemies[0]=new Enemy(0, (1.5*83)-66);
            allEnemies[1]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
            allEnemies[2]=new Enemy(0,Math.floor((Math.random() * 3) + 1)*73);
        }
    }

//
/*
allEnemies[0]=new Enemy(-500, 60);
allEnemies[1]=new Enemy(-500,140);
allEnemies[2]=new Enemy(0,220);*/
}
//reset score, enemies and level
function resetGame()
{
    level=1;
    allEnemies=[];
    score=0;
}
//Display message and score
function gameOver()
{
    document.getElementById('canvas').style.display='none';
    document.getElementById('select_level').style.display = 'block';
    document.getElementById('score').textContent=score;
    document.getElementById('score_msg').style.display='block';
    document.getElementById('levels').selectedIndex=0;
    resetGame();
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) 
{
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
