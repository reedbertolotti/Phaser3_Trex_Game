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
    this.scene.start("playGame");
  }
}
