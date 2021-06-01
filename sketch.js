var balloon,background,database,position;
function preload(){
  backgroundImg=loadImage("cityImage.png")
  balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
  
}
function setup(){
  database = firebase.database();

  
  createCanvas(900,900);

  balloon=createSprite(100,400,20,20)
  balloon.addAnimation("balloon",balloonImage);
  balloon.scale=0.5;

  var ballPosition = database.ref('balloon/position');
  ballPosition.on("value",readPosition,showError);
}

function draw(){
  
  background(backgroundImg);
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
 balloon.x=balloon.x-10;
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x=balloon.x+10;
  writePosition(10,0);
  
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-10);
    balloon.scale -= 0.005;
}
else if(keyDown(DOWN_ARROW)){
  writePosition(0,+10);
    balloon.scale += 0.005;
}


drawSprites();
}
function writePosition(x,y){
  database.ref("balloon/position").set(
      { 
          'x':position.x+x,
          'y':position.y+y
      }
  )
}
function readPosition(data){
  position = data.val();
  console.log(position);
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError(){
  console.log("error");    
}
