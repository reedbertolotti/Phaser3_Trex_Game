class SetUpScene extends Phaser.Scene
{
  constructor()
  {
    super("setUpGame");
  }

  preload()
  {
    this.load.atlas('cactiSheet', 'assets/cactiSheet.png', 'assets/cactiSheet.json');

    this.load.image("bkgrndCacti", "assets/background.png");
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
  }

  create()
  {
    this.scene.start("titleMenu"); // start FrontScene

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
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird",
      {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    });
  }
}
