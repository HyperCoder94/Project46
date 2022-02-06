var backgroundImg;
var hero, heroImg;
var zombie,zombieImg1,zombieImg2,zombieImg3,zombieImg4,zombieImg5 ,zombieImg6 ,zombieImg7 ,zombieImg8 ,zombieGroup;
var bullet, bulletImg, bulletGroup;

function preload() {
  getBackgroundImg();

 heroImg = loadImage("Images/hero.png");
 
 zombieImg1 = loadImage("Images/zombie1.png");
 zombieImg2 = loadImage("Images/zombie2.gif");
 zombieImg3 = loadImage("Images/zombie3.png");
 zombieImg4 = loadImage("Images/zombie4.png");
 zombieImg5 = loadImage("Images/zombie5.png");
 zombieImg6 = loadImage("Images/zombie6.png");
 zombieImg7 = loadImage("Images/zombie7.png");
 zombieImg8 = loadImage("Images/zombie8.png");

bulletImg = loadImage("Images/bullet.png");
}

function setup() {

  createCanvas(displayWidth,displayHeight - 110);
  hero = createSprite(displayWidth - 1700, displayHeight - 250);
  hero.addImage(heroImg);
  hero.scale = 0.5;

  bulletGroup = createGroup();
  
  zombieGroup = createGroup();
  
}

function draw() {

  if(backgroundImg) {
    background(backgroundImg);
  }
  
  play();
  if(zombieGroup.isTouching(hero)){   
    hero.destroy();
    play();
    
  }
  drawSprites();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=05 && hour<=12){
      bg = "Images/sunrise3.png";
  }
  else if(hour>=12 && hour<= 16){
      bg = "Images/sunset7.png";
  }
  else if(hour>=16 && hour<= 19){
    bg = "Images/sunset10.png";
  }
  else if(hour>=19 && hour<=00 ){
    bg = "Images/sunset11.png";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}

function play(){

  hero.y = mouseY;

  spawnZombies();
  

  if(keyDown("space") && frameCount % 3 === 0){

    spawnBullet();
  }

  if(bulletGroup.isTouching(zombieGroup)){
   // handleZombieCollision(bulletGroup,zombieGroup);
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
  }
  

}


function spawnZombies(){
  if (frameCount % 60 === 0){
    var zombie = createSprite(displayWidth - 100,random(100,1000),10,40);
    //zombie.velocityX = -(6 + score/100);
    zombie.velocityX = -6 ;
    
     //generate random obstacles
     var rand = Math.round(random(1,8));
     switch(rand) {
       case 1: zombie.addImage(zombieImg1);
       zombie.scale = 0.3;
               break;
        case 2: zombie.addImage(zombieImg2);
        zombie.scale = 0.2;
               break;
        case 3: zombie.addImage(zombieImg3);
        zombie.scale = 0.6;
               break;
       case 4: zombie.addImage(zombieImg4);
       zombie.scale = 0.3;
               break;
       case 5: zombie.addImage(zombieImg5);
               break;
       case 6: zombie.addImage(zombieImg6);
       zombie.scale = 0.3;
               break; 
       case 7: zombie.addImage(zombieImg7);
               break;
       case 8: zombie.addImage(zombieImg8);
       zombie.scale = 0.4;
               break;
       default: break;
     }
    
     //assign scale and lifetime to the zombie           
    
     zombie.lifetime = 300;
    
    //add each zombie to the group
    zombieGroup.add(zombie);
  }
 }

 function spawnBullet(){
  bullet = createSprite(displayWidth - 1615,hero.y-10);
  bullet.addImage(bulletImg);
  bullet.scale= 0.1
  
  bullet.velocityX = 15;
  
  bulletGroup.add(bullet);

 }

 function handleZombieCollision(bulletGroup,zombies){
  zombies.remove();
  //bulletGroup.remove();

 }