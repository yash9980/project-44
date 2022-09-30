var players = []
var canvas;

var backgroundImage, player1_img, player2_img, map;
var lifeImage;
var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2;
var blastImg
function preload() {
  backgroundImage = loadImage("background.jpg");
  player1_img = loadImage("player.png");
  player2_img = loadImage("player.png");
  lifeImage = loadImage("life.png");
  blastImg = loadImage("blast.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
