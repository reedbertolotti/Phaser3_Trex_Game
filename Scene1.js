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


    this.load.spritesheet("trexRun", "assets/runBest.png",
    {
      frameWidth: 88,
      frameHeight: 94
    });

    this.load.spritesheet("trexDuck", "assets/duckAttempt7.png",
    {
      frameWidth: 118,
      frameHeight: 60
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
    this.smCacti.y = config.height-50-this.smCacti.height;
    this.smCacti.setOrigin(0, 0);
    this.smCacti.setFrame(1);

    this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(2).refreshBody();

    this.runX = config.width/2;
    this.runY = config.height - 50 - 47;
    this.duckX = this.runX + 13;
    this.duckY = this.runY + 18;
    this.player = this.physics.add.sprite(this.runX, this.runY, "trexRun");

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

    this.player.play("run");

    this.cursors = this.input.keyboard.createCursorKeys();



    this.obstacles = this.physics.add.group();
    //this.obstacles.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    this.obstacleTimer = 0;
  }

  update()
  {
    if (this.cursors.down.isDown && this.player.body.touching.down)
    {
      this.player.play("duck", true);
      if (this.player.y != this.duckY)
      {
        console.log("doing");
        this.player.y = this.duckY;
        this.player.x = this.duckX;
        this.player.setSize(118, 60);
        this.player.setOffset(-14, 16);
      }
    }
    else if (this.cursors.space.isDown && this.player.body.touching.down)
    {
      this.player.setVelocityY(-800);
      this.player.setFrame(0);
      this.player.anims.stop();
    }
    else if (this.player.body.touching.down)
    {
      this.player.play("run", true);
      if (this.player.y != (this.runY))
      {
        this.player.y = this.runY;
        this.player.x = this.runX;
        this.player.setSize(88, 94);
      }
    }

    //this.moveObstacles();
    //this.updateObstacles();
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add new obs
    if (this.obstacleTimer > 350)
    {
      console.log("in");
      let obs = new GroundObstacle(this);

      Phaser.Actions.PlaceOnRectangle(obs, new Phaser.Geom.Rectangle(84, 84, 616, 416));
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

  setDefaultPosition(player)
  {

  }
}
