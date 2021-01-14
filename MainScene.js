// scene for playing the game

class MainScene extends Phaser.Scene
{
  constructor()
  {
    super("playGame");
  }

  create()
  {
    // game values
    this.score = 0;
    this.highScore = 0;
    this.obstacleTimer = 0; // used for obstacle placement
    this.jumpTimer = 0; // used for determining varying jump amount
    this.gameSpeed = 600; // the speed of the obstacles
    this.speedIncrement = 0.2;
    this.tenFrames = 0;
    this.distModifier = Math.random()*100; // used for random obstacle placement
    this.over = false; // the state of the game


    // keyboard input
    let returnToMenu = this.input.keyboard.addKey('BACKSPACE')
    returnToMenu.on('up', () =>
    {
      this.resetGame();
      this.scene.switch("titleMenu");
    });

    let startNewGame = this.input.keyboard.addKey('ENTER');
    startNewGame.on('up', () =>
    {
      if(this.over)
      {
        this.resetGame();
      }
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.down.on('up', () => this.stopDucking());


    // the ground
    this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(3.5).refreshBody();

    // the background graphics
    this.background = this.add.image(0, config.height - 75, "ground");
    this.background.setOrigin(0, 0).setScale(3.5).setAlpha(0.3);

    this.bkgrndCacti = this.add.tileSprite(0, config.height-75, config.width*3, 100, "bkgrndCacti");
    this.bkgrndCacti.setOrigin(0, 1).setAlpha(0.3).setScale(0.5);

    // create the player
    this.player = this.physics.add.sprite(playerConfig.defaultX, playerConfig.defaultY, "trexRun");
    this.player.setOrigin(0, 1);
    this.setPhysicalDefault();
    this.player.play("run");


    // group for obstacles
    this.obstacles = this.physics.add.group();

    // physics collisions and overlap for player
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);


    // the displayed score
    this.scoreText = this.add.text(config.width - 30, 30, 'score: 0', {fontSize: '18px', fill: '#000'});
    this.scoreText.setOrigin(1, 0);

    // game over display window
    let rect = this.add.rectangle(config.width/2, config.height/2, 300, 250, 0xff0000, 0.2);
    let gameOverMsg = this.add.text(config.width/2, config.height/2 - 70, "Game Over", { fontSize: '48px', fill: '#000' });
    gameOverMsg.setOrigin(0.5, 0.5);
    let playAgain = this.add.text(config.width/2, config.height/2 + 80, "press ENTER to play again", { fontSize: '16px', fill: '#000' });
    playAgain.setOrigin(0.5, 0.5);
    let backToMenu = this.add.text(config.width/2, config.height/2 + 105, "press BACKSPACE for menu", { fontSize: '16px', fill: '#000' });
    backToMenu.setOrigin(0.5, 0.5);

    this.yourScore = this.add.text(config.width/2, config.height/2, "Your Score: " + this.score, { fontSize: '32px', fill: '#000' });
    this.yourScore.setOrigin(0.5, 0.5);

    this.topScoreLabel = this.add.text(config.width/2, config.height/2 + 40, "Top Score: " + this.highScore, { fontSize: '16px', fill: '#000' });
    this.topScoreLabel.setOrigin(0.5, 0.5);

    this.gameOverText = this.add.group().addMultiple([rect, gameOverMsg, this.yourScore, this.topScoreLabel, playAgain, backToMenu]);
    this.gameOverText.toggleVisible();
    this.gameOverText.visible = false;
  }


  update()
  {
    // the game is over
    if (this.over)
      return;

    // every 10 frames
    if (this.tenFrames == 10)
    {
      this.tenFrames = 0;
      this.score += 1; // increase score
      this.gameSpeed += this.speedIncrement; // increase obstacle speed

      let scoreFormatted = this.zeroPad(this.score, 7);
      this.scoreText.setText('Score: ' + scoreFormatted);
    }
    else
      this.tenFrames++;

    // for stopping a jump early
    if (this.cursors.space.isUp && this.cursors.up.isUp)
    {
      this.jumpTimer = 0; // set to 0 if up is released at any point during a jump
    }

    // player movement
    if (this.cursors.down.isDown && this.player.y == playerConfig.defaultY) // player tries to duck
    {
      let prevKey = this.player.anims.getCurrentKey(); // the previous animation key

      this.player.play("duck", true);
      if (prevKey == "run")
      {
        this.setPhysicalDucking();
      }
    }
    else if (this.cursors.space.isDown || this.cursors.up.isDown) // the player is or was jumping
    {
      if (this.player.body.onFloor()) // begin jump
      {
        this.jumpTimer = this.time.now;
        this.player.setVelocityY(-800);
        this.player.setFrame(0);
        this.player.anims.stop();
        this.setPhysicalDefault();
      }
      else if (this.jumpTimer != 0 && (this.time.now - this.jumpTimer < 150)) // continue already started jump
      {
        this.player.setVelocityY(-800);
      }
    }
    else if (this.player.body.onFloor()) // if none of the above, run
    {
      this.player.play("run", true);
    }

    this.bkgrndCacti.tilePositionX += this.gameSpeed/100; // move background cacti

    this.updateObstacles(); // move and add obstacles
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add obstacle
    if (this.score > 20 && this.obstacleTimer > 50 + this.distModifier)
    {
      if (this.score < 200 || Math.random() > 0.5) // only ground obstacles before 200 score
      {
        new GroundObstacle(this);
      }
      else
      {
        new SkyObstacle(this);
      }

      this.obstacleTimer = 0;
      this.distModifier = Math.random()*100; // pick a new dist modifier
    }

    this.obstacles.children.each(ob => ob.update(), this); // update all obstacles
  }

  gameOver()
  {
    this.over = true;

    if (this.score > this.highScore)
      this.highScore = this.score;

    this.yourScore.setText("Your Score: " + this.score);
    this.topScoreLabel.setText("Top Score: " + this.highScore);

    this.physics.pause();
    this.anims.pauseAll();

    this.player.setTint(0xff0000);
    this.gameOverText.toggleVisible();
    this.gameOverText.visible = true;
  }

  resetGame()
  {
    this.over = false;
    this.score = 0;
    this.gameSpeed = 600;

    this.physics.resume();
    this.anims.resumeAll();

    this.player.x = playerConfig.defaultX;
    this.player.y = playerConfig.defaultY;
    this.setPhysicalDefault();
    this.player.clearTint();
    this.player.setVelocityY(0);
    this.player.play("run");

    this.obstacles.clear(true, true);

    if (this.gameOverText.visible == true)
    {
      this.gameOverText.toggleVisible();
      this.gameOverText.visible = false;
    }
  }

  // set the physical hitbox size and offset for the player while running
  setPhysicalDefault()
  {
    this.player.setSize(playerConfig.runXSize, playerConfig.runYSize);
    this.player.setOffset(playerConfig.runXOffset, playerConfig.runYOffset);
  }

  // set the physical hitbox size and offset for the player while ducking
  setPhysicalDucking()
  {
    this.player.setSize(playerConfig.duckXSize, playerConfig.duckYSize);
  }

  // transition from ducking to running
  stopDucking()
  {
    if (!this.over && this.player.anims.getCurrentKey() == "duck")
    {
      this.player.play("run");
      this.setPhysicalDefault();
    }
  }

  // helper function to display score
  zeroPad(number, size)
  {
    let stringNumber = String(number);
    while(stringNumber.length < (size || 2))
    {
      stringNumber = "0" + stringNumber;
    }

    return stringNumber;
  }
}
