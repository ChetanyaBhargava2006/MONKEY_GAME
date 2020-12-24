survivalTime = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
//var score = 0;
var monkeyCollided_Image;

function preload(){
  
 monkey_running =           loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollided_Image = loadImage("sprite_0.png");
 }

function setup() {
  createCanvas(700,398);
  
  ground = createSprite(400,396,1500,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  console.log(ground.x); 
  
  monkey= createSprite(80,362,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1; 
  
  monkey.addImage("collided",monkeyCollided_Image);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
    background("0");
    
   
  
  if(keyDown("space") && monkey.y > 350){
    monkey.velocityY = -19;
    monkey.x = 80;    
    }

    monkey.velocityY = monkey.velocityY + 0.8;
  
      if(ground.x < 0 ){
    ground.x = ground.width/2;
      }
     
 // if(monkey.isTouching(foodGroup)){
  //  score = score + 1;
  //   }
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.changeAnimation("collided",monkeyCollided_Image);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  //  score = 0;
    survivalTime =  0;
    background(0);
    fill("red");
    text("GAME OVER",300,300);
  }
  
  monkey.collide(ground);
  
  //  text("SCORE " + score,500,50);
  fill("white");
  stroke("black");
  textSize(20);
  
  text("SURVIVAL TIME : "+ survivalTime,100,50);
  survivalTime =Math.ceil(frameCount/frameRate());
  fill("white");
  stroke("black");
  textSize(20);
  
  drawSprites();
  spawnObstacles();
  spawnFood();
}
function spawnObstacles(){
if(frameCount % 300 === 0) {
  var obstacle = createSprite(600,373,10,40);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.velocityX = -6;
  obstacle.scale = 0.1;
  obstacle.lifetime = 150;
  obstaclesGroup.add(obstacle);
}
}
  function spawnFood(){
  if(frameCount % 80 === 0){
  var banana = createSprite(500,100,40,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 120;
    foodGroup.add(banana);
}   
}