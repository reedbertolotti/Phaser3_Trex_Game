class Scene1 extends Phaser.Scene
{
  constructor()
  {
    super("bootGame");
  }

  preload()
  {
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

    this.ground = this.add.image(0, config.height - 50, "ground");
    this.ground.setOrigin(0, 0).setScale(2);

    this.trexR = this.add.sprite(config.width/2 + 100, config.height-50-94*0.9+5, "trexRun").setScale(0.9);
    this.trexR.setOrigin(0, 0);

    this.trexD = this.add.sprite(config.width/2 - 50, config.height-50-40, "trexDuck").setScale(1);
    this.trexD.setOrigin(0, 0);

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
    this.trexD.play("duck");
  }
}
