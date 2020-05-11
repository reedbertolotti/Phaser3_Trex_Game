class Scene1 extends Phaser.Scene
{
  constructor()
  {
    super("bootGame");
  }

  preload()
  {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");

    this.load.spritesheet("cactiSm", "assets/smallObstacles.png",
    {
      frameWidth: 68,
      frameHeight: 70
    });

    this.load.image("bkg", "assets/background2.png");

    this.load.image("cactiBg", "assets/bigObstacles.png");

    this.load.image("ground", "assets/platform.png");


    this.load.spritesheet("trexRun", "assets/trexRun.png",
    {
      frameWidth: 88,
      frameHeight: 94
    });

    this.load.spritesheet("trexDuck", "assets/trexDuck.png",
    {
      frameWidth: 118,
      frameHeight: 60
    });

    this.load.spritesheet("bird", "assets/bird.png",
    {
      frameWidth: 92,
      frameHeight: 80
    });


    this.load.spritesheet("shipI", "assets/shipI.png",
    {
      frameWidth: 16,
      frameHeight: 16,
    });


    this.load.atlas('sprsht', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.atlas('cSheet', 'assets/cactiSheet.png', 'assets/cactiSheet.json');
  }

  create()
  {
    this.cacti = this.add.tileSprite(0, config.height-75, config.width*2, 100, "bkg");
    this.cacti.setOrigin(0, 1).setAlpha(0.3).setScale(0.5);
    //this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    //this.cacti.setOrigin(0, 1).setScale(0.5).setAlpha(0.3);

    // this.anims.create({ key: 'runner', frames: this.anims.generateFrameNames('sprsht', { prefix: 'RunRight', start: 1, end: 4, suffix:'.png', zeroPad: 2 }), repeat: -1 });
    // let runner = this.physics.add.sprite(200, 150, 'sprsht', 'RunRight02.png')//.play('runner');//.setSize(50, 50)
    //this.add.text(20, 20, "Loading game...");

    //let smC1 = this.physics.add.sprite(200, 150, 'cSheet', 'cactiBigOne.png')//.play('runner');//.setSize(50, 50)




    // this.smCacti = this.add.sprite(150, 0, "cactiSm");
    // this.smCacti.y = config.height-75;
    // this.smCacti.setOrigin(0, 1);
    // this.smCacti.setFrame(1);
    // this.smCacti.setAlpha(0.1);
    // this.smCacti.setScale(0.5);

    this.bird1 = this.add.sprite(config.width-200, config.height/2, "bird");

    this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(3).refreshBody();

    this.background = this.add.image(0, config.height - 75, "ground");
    this.background.setOrigin(0, 0).setScale(3).setAlpha(0.3);



    this.playerX = config.width/10;
    this.playerY = config.height - 50;

    this.player = this.physics.add.sprite(this.playerX, this.playerY, "trexRun");
    this.player.setOrigin(0, 1);
    this.setPhysicalDefault(this.player);


    this.ship1 = this.add.sprite(50, 50, "shipI");

    this.anims.create(
      {
        key: "duck",
        frames: this.anims.generateFrameNumbers("trexDuck",
        {
          start: 0,
          end: 1
        }),
        frameRate: 10,
        repeat: -1
      });

    this.anims.create(
      {
        key: "run",
        frames: this.anims.generateFrameNumbers("trexRun",
      {
        start: 2,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create(
      {
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird",
      {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });

    this.bird1.play("fly");

    this.player.play("run");


    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.down.on('up', () => this.stopDucking());

    //this.physics.add.collider(runner, this.ground);
    //this.physics.add.collider(smC1, this.ground);

    this.obstacles = this.physics.add.group();

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    this.obstacleTimer = 0;
    this.score = 0;
    this.tenFrames = 0;
    this.jumpTimer = 0;

    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

    let clickCount = 0;
    this.scoreText = this.add.text(10, 30, 'score: 0', { fontSize: '16px', fill: '#000' });
    this.scoreText.setInteractive().on('pointerdown', () => this.updateClickCountText(++clickCount));

    this.clickCountText = this.add.text(100, 200, '');
    this.updateClickCountText(clickCount);

    //const rect = this.add.rectangle(400, 300, 100, 100, 0xff0000, 1)
    //this.physics.TILE_BIAS = 16000;
  }

  updateClickCountText(clickCount)
  {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }

  update()
  {
    if (this.tenFrames == 10)
    {
      this.tenFrames = 0;
      this.score += 1;
      let scoreFormatted = this.zeroPad(this.score, 6);

      this.scoreLabel.text = "SCORE " + scoreFormatted;
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
        this.jumpTimer = this.time.now;
        this.player.setVelocityY(-800);
        this.player.play("run");
        this.player.setFrame(0);
        this.setPhysicalDefault(this.player);
        this.player.anims.stop();
      }
      else if (this.jumpTimer != 0 && (this.time.now - this.jumpTimer < 150)) // continue jump true
      {
        this.player.setVelocityY(-800);
      }
    }
    else if (this.player.body.onFloor())
    {
      this.player.play("run", true);
    }

    this.cacti.tilePositionX += 0.5;

    this.updateObstacles();
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add new obs
    if (this.obstacleTimer > 100)
    {
      console.log("in update obs");
      if (Math.random() > 0.5)
        new GroundObstacle(this);
      else
        new SkyObstacle(this);

      this.obstacleTimer = 0;
    }

    // destroy obs if off screen
    this.obstacles.children.each(ob => ob.update(), this);
  }

  gameOver()
  {
    console.log("game over");
    this.scene.pause();

    // tint player
    // transparent rectangle in middle of screen
    // text in rectangle: "Game Over" and "your score: score" and "press enter to play again"
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
    if (this.player.anims.getCurrentKey() == "duck")
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
