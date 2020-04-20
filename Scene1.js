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
      frameWidth: 102,
      frameHeight: 70
    });

    this.load.image("cactiBg", "assets/bigObstacles.png");

    this.load.image("ground", "assets/platform.png");

    this.load.spritesheet("trexRun", "assets/runBest.png",
    {
      frameWidth: 88,
      frameHeight: 94
    });

    this.load.spritesheet("trexDuck", "assets/duckBest4-19.png",
    {
      frameWidth: 88,
      frameHeight: 40
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

    this.ground = this.add.image(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(2);

    this.trexR = this.physics.add.sprite(config.width/2-44, config.height-50-94*0.9+5, "trexRun").setScale(0.9);
    this.trexR.setOrigin(0, 0);

    // this.trexD = this.add.sprite(config.width/2 - 50, config.height-50-40, "trexDuck").setScale(1);
    // this.trexD.setOrigin(0, 0);

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

    this.trexR.play("run");
    //this.trexD.play("duck");

    this.cursors = this.input.keyboard.createCursorKeys();



    this.obstacles = this.physics.add.group();
    this.physics.add.overlap(this.trexR, this.obstacles, this.gameOver, null, this);

    this.obstacleTimer = 0;
  }

  update()
  {
    if (this.cursors.down.isDown)
    {
      this.trexR.play("duck", true);
      if (this.trexR.y != (config.height-50-40))
      {
        this.trexR.y = config.height-50-40;
        this.trexR.setScale(1);
      }
    }
    else
    {
      this.trexR.play("run", true);
      if (this.trexR.y != (config.height-50-94*0.9+5))
      {
        this.trexR.y = config.height-50-94*0.9+5;
        this.trexR.setScale(0.9);
      }
    }



    //this.moveObstacles();
    this.updateObstacles();
  }

  updateObstacles()
  {
    this.obstacleTimer++;

    // add new obs
    if (this.obstacleTimer > 350)
    {
      console.log("in");
      let obs = new GroundObstacle(this);

      this.obstacleTimer = 0;
    }

    // destroy obs if off screen
    this.obstacles.children.each(ob => ob.update(), this);
  }

  gameOver()
  {
    console.log("game over");
  }

  moveObstacles()
  {
    this.smCacti.x -= 2;
    if (this.smCacti.x + this.smCacti.width < 0)
      this.smCacti.x = config.width;
  }
}
