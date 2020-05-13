class Scene2 extends Phaser.Scene
{
  constructor()
  {
    console.log("CREATING SCENE 2");
    super("playGame");
  }

  create()
  {
    let keyObj = this.input.keyboard.addKey('BACKSPACE')
    keyObj.on('up', () =>
    {
      this.resetGame();
      this.scene.switch("titleMenu");
    });

    this.cacti = this.add.tileSprite(0, config.height-75, config.width*2, 100, "bkg");
    this.cacti.setOrigin(0, 1).setAlpha(0.3).setScale(0.5);
    //this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    //this.cacti.setOrigin(0, 1).setScale(0.5).setAlpha(0.3);

    // this.anims.create({ key: 'runner', frames: this.anims.generateFrameNames('sprsht', { prefix: 'RunRight', start: 1, end: 4, suffix:'.png', zeroPad: 2 }), repeat: -1 });
    // let runner = this.physics.add.sprite(200, 150, 'sprsht', 'RunRight02.png')//.play('runner');//.setSize(50, 50)

    this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(3.5).refreshBody();

    this.background = this.add.image(0, config.height - 75, "ground");
    this.background.setOrigin(0, 0).setScale(3).setAlpha(0.3);



    this.playerX = config.width/10;
    this.playerY = config.height - 50;

    this.player = this.physics.add.sprite(this.playerX, this.playerY, "trexRun");
    this.player.setOrigin(0, 1);
    this.setPhysicalDefault(this.player);
    this.player.play("run");


    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.down.on('up', () => this.stopDucking());

    this.acceptNewGame = this.input.keyboard.addKey('ENTER');
    this.acceptNewGame.on('up', () =>
    {
      if(this.over)
      {
        this.resetGame();
      }
    });


    this.obstacles = this.physics.add.group();

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    this.obstacleTimer = 0;
    this.score = 0;
    this.highScore = 0;
    this.tenFrames = 0;
    this.jumpTimer = 0;
    this.gameSpeed = 600;


    this.scoreText = this.add.text(config.width - 30, 30, 'score: 0', { fontSize: '18px', fill: '#000' });
    this.scoreText.setOrigin(1, 0);


    // game over stuff
    let rect = this.add.rectangle(config.width/2, config.height/2, 300, 250, 0xff0000, 0.2)

    let gameOverMsg = this.add.text(config.width/2, config.height/2 - 70, "Game Over", { fontSize: '48px', fill: '#000' })
    gameOverMsg.setOrigin(0.5, 0.5);

    this.yourScore = this.add.text(config.width/2, config.height/2, "Your Score: " + this.score, { fontSize: '32px', fill: '#000' })
    this.yourScore.setOrigin(0.5, 0.5);

    this.topScoreLabel = this.add.text(config.width/2, config.height/2 + 40, "Top Score: " + this.highScore, { fontSize: '16px', fill: '#000' })
    this.topScoreLabel.setOrigin(0.5, 0.5);

    let playAgain = this.add.text(config.width/2, config.height/2 + 80, "press ENTER to play again", { fontSize: '16px', fill: '#000' })
    playAgain.setOrigin(0.5, 0.5);

    let backToMenu = this.add.text(config.width/2, config.height/2 + 105, "press BACKSPACE for menu", { fontSize: '16px', fill: '#000' })
    backToMenu.setOrigin(0.5, 0.5);

    this.gameOverText = this.add.group().addMultiple([rect, gameOverMsg, this.yourScore, this.topScoreLabel, playAgain, backToMenu]);
    this.gameOverText.toggleVisible();
    this.gameOverText.visible = false;
    console.log(this.gameOverText);

    this.over = false;
  }


  update()
  {
    if (this.over)
      return;

    if (this.tenFrames == 10)
    {
      this.tenFrames = 0;
      this.score += 1;
      this.gameSpeed += 0.1;

      let scoreFormatted = this.zeroPad(this.score, 7);
      this.scoreText.setText('Score: ' + scoreFormatted);
    }
    else
      this.tenFrames++;

    //console.log(this.player.y);

    if (this.cursors.space.isUp && this.cursors.up.isUp) // after jumping, up was released
    {
      this.jumpTimer = 0;
    }

    if (this.cursors.down.isDown && this.player.y == this.playerY) // player tries to duck
    {
      let prevKey = this.player.anims.getCurrentKey(); // the previous animation key

      this.player.play("duck", true);
      if (prevKey == "run")
      {
        this.setPhysicalDucking(this.player)
      }
    }
    else if (this.cursors.space.isDown || this.cursors.up.isDown)
    {
      if (this.player.body.onFloor()) // begin jump
      {
        //new SkyObstacle(this);
        this.jumpTimer = this.time.now;
        this.player.setVelocityY(-800);
        this.player.play("run");
        this.player.setFrame(0);
        this.setPhysicalDefault(this.player);
        this.player.anims.stop();
      }
      else if (this.jumpTimer != 0 && (this.time.now - this.jumpTimer < 150)) // if true, continue jump
      {
        this.player.setVelocityY(-800);
      }
    }
    else if (this.player.body.onFloor())
    {
      this.player.play("run", true);
    }

    this.cacti.tilePositionX += this.gameSpeed/100; // move background

    this.updateObstacles(); // move and add obstacles
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add new obs
    if (this.obstacleTimer > 100)
    {
      //console.log("in update obs");
      if (Math.random() > 0.5)
      {
        new GroundObstacle(this);
      }
      else
      {
        new SkyObstacle(this);
      }

      this.obstacleTimer = 0;
    }

    this.obstacles.children.each(ob => ob.update(), this); // update all obstacles
  }

  gameOver()
  {
    console.log("game over");
    this.over = true;

    this.player.setTint(0xff0000);

    if (this.score > this.highScore)
      this.highScore = this.score;
    //this.scene.pause();

    // tint player
    // transparent rectangle in middle of screen
    // text in rectangle: "Game Over" and "your score: score" and "press enter to play again"
    this.physics.pause();
    this.anims.pauseAll();
    this.yourScore.setText("Your Score: " + this.score);
    this.topScoreLabel.setText("Top Score: " + this.highScore);
    this.gameOverText.toggleVisible();
    this.gameOverText.visible = true;
  }

  resetGame()
  {
    console.log("resetting game");
    this.score = 0;
    this.gameSpeed = 600;
    this.over = false;
    this.player.clearTint();

    this.player.x = this.playerX;
    this.player.y = this.playerY;
    this.setPhysicalDefault(this.player);
    this.player.setVelocityY(0);
    this.player.play("run");

    this.obstacles.clear(true, true);

    this.physics.resume();
    this.anims.resumeAll();
    if (this.gameOverText.visible == true)
    {
      this.gameOverText.toggleVisible();
      this.gameOverText.visible = false;
    }
  }

  moveObstacles()
  {
    this.smCacti.x -= 2;
    if (this.smCacti.x + this.smCacti.width < 0)
      this.smCacti.x = config.width;
  }

  setPhysicalDefault(player)
  {
    this.player.setSize(25, 91);
    this.player.setOffset(27, 3);
  }

  setPhysicalDucking(player)
  {
    player.setSize(97, 60);
  }

  stopDucking()
  {
    if (!this.over && this.player.anims.getCurrentKey() == "duck")
    {
      this.player.play("run");
      this.setPhysicalDefault(this.player);
    }
  }

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
