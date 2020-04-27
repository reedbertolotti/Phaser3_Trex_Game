class Scene1 extends Phaser.Scene
{
  constructor()
  {
    super("bootGame");
  }

  preload()
  {
    this.load.spritesheet("cactiSm", "assets/smallObstacles.png",
    {
      frameWidth: 68,
      frameHeight: 70
    });

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
  }

  create()
  {
    //this.add.text(20, 20, "Loading game...");

    this.smCacti = this.add.sprite(150, 0, "cactiSm");
    this.smCacti.y = config.height-75;
    this.smCacti.setOrigin(0, 1);
    this.smCacti.setFrame(1);
    this.smCacti.setAlpha(0.1);
    this.smCacti.setScale(0.5);

    this.bird1 = this.add.sprite(config.width-200, config.height/2, "bird");

    this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(2).refreshBody();

    this.background = this.add.image(0, config.height - 75, "ground");
    this.background.setOrigin(0, 0).setScale(2).setAlpha(0.3);

    this.runX = config.width/2;
    this.runY = config.height - 50 - 47;
    this.duckX = this.runX + 13;
    this.duckY = this.runY + 18;
    this.player = this.physics.add.sprite(this.runX, this.runY, "trexRun");
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
      frameRate: 10,
      repeat: -1
    });

    this.bird1.play("fly");

    this.player.play("run");

    this.cursors = this.input.keyboard.createCursorKeys();



    this.obstacles = this.physics.add.group();
    //this.obstacles.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    this.obstacleTimer = 0;

    this.jumpTimer = 0;
  }

  update()
  {
    if (this.cursors.space.isUp && this.cursors.up.isUp) // after jumping, up was released
    {
      this.jumpTimer = 0;
    }

    if (this.cursors.down.isDown && this.player.body.onFloor())
    {
      this.player.play("duck", true);
      if (this.player.y != this.duckY)
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
      if (this.player.y != (this.runY))
      {
        this.setPhysicalDefault(this.player);
      }
    }

    //this.moveObstacles();
    //this.updateObstacles();
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add new obs
    if (this.obstacleTimer > 200)
    {
      console.log("in update obs");
      let obs = new GroundObstacle(this);

      this.obstacleTimer = 0;
    }

    // destroy obs if off screen
    this.obstacles.children.each(ob => ob.update(), this);
  }

  gameOver()
  {
    console.log("game over");
    this.scene.pause();
  }

  moveObstacles()
  {
    this.smCacti.x -= 2;
    if (this.smCacti.x + this.smCacti.width < 0)
      this.smCacti.x = config.width;
  }

  setPhysicalDefault(player)
  {
    this.player.y = this.runY;
    this.player.x = this.runX;
    //this.player.setSize(88, 94);
    this.player.setSize(67, 91);
  }

  setPhysicalDucking(player)
  {
    player.y = this.duckY;
    player.x = this.duckX;
    //player.setSize(118, 60);
    player.setSize(97, 59);
    player.setOffset(-3, 16);
  }
}
