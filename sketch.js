var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var coinImg, bombImg, energydrinkImg, fenceImg, grassImg, pauseImg, powerImg, rockImg, shieldImg, wallImg;
var i;
var start=0;
var play=1;
var end=2;
var Pause=3;
var gameStates=start; 
var score;
var pause;
var gameMusic;

function preload()
{
  pathImg = loadImage("sprites/path.png");
  boyImg = loadAnimation("sprites/Jake1.png","sprites/Jake2.png","sprites/jake3.png","sprites/jake4.PNG","sprites/jake5.png");
  coinImg = loadImage("sprites/coin.png");
  bombImg = loadImage("sprites/bomb.png");
  energydrinkImg = loadImage("sprites/energyDrink.png");
  fenceImg = loadImage("sprites/fence.png");
  grassImg = loadImage("sprites/grass.png");
  pauseImg=loadImage("sprites/pause2.png");
  powerImg = loadImage("sprites/power.png");
  rockImg=loadImage("sprites/rock.png");
  shieldImg=loadImage("sprites/shield.png");
  wallImg=loadImage("sprites/wall.png");
  jakeStop=loadAnimation("sprites/jake4.png");
  gameMusic=loadSound("sprites/gamemusic.wav");
}

function setup()
{
  createCanvas(400,400);
  obstaclegroup=createGroup();
  coingroup=createGroup();
  energydrinkgroup=createGroup();
  score=0;

 
// Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.2;

  pause=createSprite(320,40,10,10);
  pause.addImage(pauseImg);
  pause.scale=0.1

  //creating boy running
  boy = createSprite(180,340,30,30);
  boy.addAnimation("JakeRunning",boyImg);
  boy.addAnimation("jakestop",jakeStop);
  boy.scale= 0.7

    
  // create left Boundary
  leftBoundary=createSprite(0,0,100,800);
  leftBoundary.visible = false;

  //create right Boundary
  rightBoundary=createSprite(410,0,100,800);
  rightBoundary.visible = false;

  //gameOver=createSprite(300,80,100,100);
  //gameOver.addImage(gameOver_image);
  //gameOver.scale=0.5;
  //gameOver.visible=false;

  //restart=createSprite(300,120,100,100);
  //restart.addImage(restart_image);
  //restart.scale=0.5;
  //restart.visible=false;
  textSize(20);
  fill("white");
  
  if(gameStates===play)
  {
    setInterval(function(){
      gameMusic.play();
      },3000);
  }

    
}

function draw()
{
    drawSprites();
    if(gameStates===start)
    {
      path.velocityY = 0;
      background("red");
      textSize(20);
      fill("white");
      text("Press Space To Start",100,100);

      if(keyDown("Space"))
      {
      gameStates=play
      }
  }

 
  if(gameStates===play)
  {
        path.velocityY = 4;
    boy.changeAnimation("JakeRunning",boyImg);
    text("Score ="+score,50,50)
    boy.x = World.mouseX;

    if(path.y > 400 )
    {
      path.y = height/2; 
    }
        spawnObstacles();

    if(World.frameCount % 60===0)
 {
      var rand = Math.round(random(1,2))

    if(rand===1)
    {
        spawnCoins();
    }
          
    else 
    {
      spawnEnergy();
    }
 }

        
    if(keyDown("UP"))
  {
    boy.velocityY=-10;
  }
    boy.velocityY+=0.5;

    if(boy.isTouching(obstaclegroup))
    {
      gameStates=end
    }

    if(boy.isTouching(coingroup))
    {
      score+=1
      coingroup.get(0).destroy();
    }

    if(mousePressedOver(pause))
    {
       gameStates=Pause 
    }

     if(boy.isTouching(energydrinkgroup))
  {
    setInterval(function(){
    boy.velocityY+=5
    },5000);
  }
  //console.log(boy.velocityY);

  }

  if(gameStates===Pause)
  {
    obstaclegroup.setVelocityYEach(0);
    coingroup.setVelocityYEach(0);
    energydrinkgroup.setVelocityYEach(0);

    energydrinkgroup.setLifetimeEach(-1);
    coingroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
       
    boy.changeAnimation("jakestop",jakeStop);
    path.velocityY=0;
    text("press space to resume",100,100);
    
  if(keyDown("space"))
  {
    gameStates=play
    coingroup.setLifetimeEach(70);
    energydrinkgroup.setLifetimeEach(70);
    obstaclegroup.setLifetimeEach(70);
    obstaclegroup.setVelocityYEach(10);
    coingroup.setVelocityYEach(10);
    energydrinkgroup.setVelocityYEach(10);
  }
  }

   if(gameStates===end)
   {
      text("Score ="+score,50,50)
      path.velocityY = 0;
      
      text("Game Ended",100,200)
      boy.changeAnimation("jakestop",jakeStop);
      obstaclegroup.setVelocityYEach(0);
      obstaclegroup.setLifetimeEach(-1);
      coingroup.setLifetimeEach(-1);
      coingroup.setVelocityYEach(0);
      energydrinkgroup.setLifetimeEach(-1);
      energydrinkgroup.setVelocityYEach(0);
    }
   
  // boy moving on Xaxis with mouse
 
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //code to reset the background
 
       
    
  //drawSprites();
}
  
  function spawnObstacles()
  {
    if(World.frameCount % 100 === 0) 
    {
      var obstacle = createSprite(400,0,10,40);
      obstacle.velocityY = 6 ;
      obstacle.x=Math.round(random(50,350)); 

      //generate random obstacles
      var rand = Math.round(random(1,5));
      if(rand===1){
      obstacle.addImage(bombImg)
      obstacle.scale= 0.1;
    }
          else if(rand===2)
      {
        obstacle.addImage(fenceImg)
        obstacle.scale= 0.5;
      }

       else if(rand===3)
       {
        obstacle.addImage(grassImg)
        obstacle.scale= 0.2;
       }

       else if(rand===4)
       {
         obstacle.addImage(rockImg)
         obstacle.scale= 0.5;
       }

       else if(rand===5)
       {
        obstacle.addImage(wallImg)
        obstacle.scale= 0.5;
       }

            
      //assign scale and lifetime to the obstacle           
            obstacle.lifetime = 100;
            obstacle.depth=boy.depth;
            boy.depth=boy.depth+1;
      //add each obstacle to the group
    obstaclegroup.add(obstacle);
    }
    
  }
  
 function spawnCoins()
 {
  var coin=createSprite(Math.round(random(50,350)),0,20,20)
  coin.velocityY=4
  coin.addImage(coinImg)
  coin.scale=0.5;
  coin.lifetime=100;
  coingroup.add(coin);
}

 function spawnEnergy()
 {
    var energydrink=createSprite(Math.round(random(50,350)),0,20,20)
    energydrink.velocityY=4
    energydrink.addImage(energydrinkImg)
    energydrink.scale=0.1;
    energydrink.lifetime=100;
    energydrinkgroup.add(energydrink);
  }
