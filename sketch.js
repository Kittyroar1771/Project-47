var leviStandingImg;
var leviJumpingImg;
var TitanImg;
var BgImg;
var leviStanding;
var leviJumping;
var Titan;
var Bg;
var ground;
var gameState = play;
var play,end
var score = 0
function preload(){
  leviJumpingImg = loadAnimation("images/leviJumping.png");
  leviStandingImg = loadAnimation("images/leviStanding.png");
  TitanImg = loadImage("images/TitanImg.png");
  BgImg = loadImage("images/Background.png")
  gameOverImg = loadImage("images/gameOver.png")
  restartImg = loadImage("images/restart.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  levi = createSprite(600,460,100,100);
  levi.addAnimation("standing",leviStandingImg);
  levi.addAnimation("jumping",leviJumpingImg);
  levi.scale = 0.5

  Titan = createSprite(windowWidth-200,460,100,100);
  Titan.addImage(TitanImg);
  Titan.scale = 0.9
  Titan.velocityX = -3;

  ground = createSprite(windowWidth-800,windowHeight-50,windowWidth,20);
  ground.visible = false;  

  gameOver = createSprite(windowWidth/2,windowHeight/2,60,40)
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.0

  restart = createSprite(windowWidth/2,windowHeight/2,60,40)
  restart.addImage(restartImg);
  restart.scale = 0.1
}

function draw() {
  background(BgImg);  
  //form = new Form();
  //form.display();
  // score
  text("score"+score,windowWidth-200,100)
  fill("black")
  if(gameState === play){
    gameOver.visible = false;
    restart.visible = false;
    // making Levi jump
    if(keyCode === 32 && levi.y >= height -120  ){
      levi.velocityY = -10;
    }
    // giving velocity or speed to levi
    levi.velocityY = levi.velocityY + 0.4;
    // changing levi's animation to jumping when it is hitting the titan
    if(levi.isTouching(Titan)){
      Titan.x += 5
      levi.changeAnimation("jumping")
      score += 1
    }
    controlLevi();
    if(Titan.lifeTime > 500){
      gameState = end;
    }
  }
  if(gameState === end){
    // making game over image and rest image visible in end state
  gameOver.visible = true; 
  restart.visible = true;
  // making levi and titan's velocity 0 
 levi.velocityX = 0;
 Titan.velocityX = 0;
 // reseting the game
 if(mousePressedOver(restart)){
   reset();
 }
  }
  levi.collide(ground)
  // add score with logic
  // game state
  drawSprites();
}
function controlLevi(){
  if(keyIsDown(LEFT_ARROW)){
  levi.x = levi.x -5
  }
  if(keyIsDown(RIGHT_ARROW)){
    levi.x = levi.x +5
    }
    
}
function reset(){
  gameState = play;
  score = 0;
}