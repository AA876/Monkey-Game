var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survivalTime = 0
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

monkey = createSprite(50,370,20,50)
monkey.addAnimation("running",monkey_running)
monkey.scale = 0.1

ground = createSprite(200,400,400,10)
ground.x=ground.width/2
  
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  
  survivalTime = 0
  
  bananaGroup = createGroup()
  obstacleGroup = createGroup()
   score = 0;
  
}


function draw() {
background("white")

  if(gameState===PLAY){
    ground.velocityX = -(4 + 3* score/100)
     score = score + Math.round(getFrameRate()/60)
    monkey.collide(ground)
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

      if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(bananaGroup)){
       score=score+1
       }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END 
       }
    spawnbananas()
    spawnObstacles()

     }
  else if (gameState === END){
        ground.velocityX=0
        monkey.velocityY = 0
    bananaGroup.setLifetimeEach(-1)
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    obstacleGroup.setVelocityXEach(0)
    survivaltime()
    
    

           }
  textSize(18)
  fill("blue")
  text("Score: "+ score, 500,50);
  
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
drawSprites()  
}

function spawnbananas(){
if(frameCount%60===0) {
var banana = createSprite(500,220,40,40)
banana.velocityX = -(4 + score/100)
banana.y = Math.round(random(100,250))
banana.addImage(bananaImage)
banana.scale=0.1
banana.lifetime = 300
bananaGroup.add(banana)
   }
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,370,10,40);
   obstacle.velocityX = -(6 + score/100)
   obstacle.addImage(obstacleImage)
   obstacle.scale = 0.15
   obstacle.lifetime = 300
   obstacleGroup.add(obstacle)
 }
}

function survivaltime(){
survivalTime = 0 
}