class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("reset");
      this.blastKey = false;
    }
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }

      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        player1 = createSprite(width / 2 - 50, height - 100);
        player1.addImage("player1", player1_img);
        player1.scale = 0.07;
    
        player2 = createSprite(width / 2 + 100, height - 100);
        player2.addImage("player2", player2_img);
        player2.scale = 0.07;
    
        players = [player1, player2];
      }
      play() {
        this.handleResetButton();
    
        Player.getPlayersInfo();
       
    
        if (allPlayers !== undefined) {
          
    
          this.showLife();
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            var life = allPlayers[plr].life;
            if (life<=0) {
              players[index-1].changeImage("blast.png")
              players[index-1].scale = 1.1;
              
            }
            players[index - 1].position.x = x;
            players[index - 1].position.y = y;
    
            if (index === player.index) {
              if (player.life<=0) {
                this.blastKey = true;
              }
              
              
              /*this.handleObstacleCollision(index);
              this.handlePlayerCollision(index);*/
        
              // Changing camera position in y direction
              /*camera.position.x = players[index - 1].position.y;
              camera.position.y = players[index - 1].position.x;*/
            }
          }
    
          
          // handling keyboard events
          this.handlePlayerControls();
    
          // Finshing Line
          const finshLine = height * 6 - 100;
    
          drawSprites();
        }
      }
      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
          });
          window.location.reload();
        });
      }
      showLife() {
        push();
        image(lifeImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
        fill("#f50057");
        rect(width / 2 - 100, height - player.positionY - 300, player.life, 20);
        noStroke();
        pop();
      }
      handlePlayerControls() {
        if (!this.blastKey) {
          
        
        if (keyIsDown(UP_ARROW)) {
          player.positionY += 5;
          player.update();
        }
        if (keyIsDown(DOWN_ARROW)) {
          player.positionY -= 5;
          player.update();
        }
        if (keyIsDown(LEFT_ARROW)) {
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW)) {
          player.positionX += 5;
          player.update();
        }
      }
      
      }
      /*handleObstacleCollision(index) {
        if (players[index - 1].collide(obstacles)) {
          if (this.leftKeyActive) {
            player.positionX += 100;
          } else {
            player.positionX -= 100;
          }
    
          //Reducing Player Life
          if (player.life > 0) {
            player.life -= 185 / 4;
          }
    
          player.update();
        }
      }*/

     /* handlePlayerCollision(index){
        if (index===1) {
          if (cars[index-1].collide(cars[1])) {
            if (this.leftKwyActive) {
              player.positionX +=100
            }else {
              player.positionX -= 100;
            }
            
          }
          player.update()
        }
        if (index===2) {
          if (cars[index-1].collide(cars[0])) {
            if (this.leftKwyActive) {
              player.positionX +=100
            }else {
              player.positionX -= 100;
            }
          }
          player.update()
        }
        
      }*/

      gameOver() {
        swal({
          title: `Game Over`,
          text: "Oops you lost the race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
    }
  


