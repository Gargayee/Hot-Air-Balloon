var balloon,balloonImg;
var bgImg;
var database,position;

function preload(){

  //bgImg=loadAnimation("pro-C35 images/Hot Air Ballon-01.png")

}




function setup() {
  createCanvas(500,500);
  balloon=createSprite(400, 200, 50, 50);
  database = firebase.database();
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
 background("black");  

  console.log(balloon.x,balloon.y,balloon.depth);

  if(keyDown(LEFT_ARROW)){
   balloon.x=balloon.x-10;
}
else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10); 
  balloon.y=balloon.y-10;
  balloon.scale=balloon.scale-0.01;
   
}
else if(keyDown(DOWN_ARROW)){
   balloon.y=balloon.y+10;
}

  drawSprites();
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
      'x': height.x+x,
      'y': height.y+y
  })
}

function showError(){
  console.log("Error in writing to the Database");
}


