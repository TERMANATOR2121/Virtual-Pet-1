//Create variables here
var dogImg, dogHappyImg, database, foodS, foodStock, dog

function preload() {
  dogHappyImg = loadImage ("images/dogImg1.png");
  dogImg = loadImage ("images/dogImg.png");
}

function setup() {
	createCanvas(2400, 1330);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}

function draw() {
  background (46, 139, 87);
    textSize(20);
    fill("White");
    text("Press The Up Arrow To Feed The Dog Some Milk");
    text("Food Remaining: "+foodS, 150, 150);

    if (keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    }

    if (keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
    }

    drawSprites();
}

function writeStock(x){
  if (x<=0){
    x = 20;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
}


