class Scene1 extends Phaser.Scene
{
  constructor()
  {
    console.log("CREATING SCENE 1");
    super("setUpGame");
  }

  preload()
  {
    this.load.spritesheet("cactiSm", "assets/smallObstacles.png",
    {
      frameWidth: 68,
      frameHeight: 70
    });

    this.load.image("bkg", "assets/background3.png");

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


    this.load.atlas('sprsht', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.atlas('cSheet', 'assets/cactiSheet.png', 'assets/cactiSheet.json');
  }

  create()
  {
    this.scene.start("titleMenu"); //this.scene.start("playGame");
    this.num = 5;

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
  }
}
