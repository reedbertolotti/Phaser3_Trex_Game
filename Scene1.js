class Scene1 extends Phaser.Scene
{
  constructor()
  {
    super("bootGame");
  }

  preload()
  {
    this.load.spritesheet("trex", "assets/duckBest4-19.png",
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

    this.trex = this.add.sprite(config.width/2 - 50, config.height/2, "trex").setScale(1);

    this.ship1 = this.add.sprite(50, 50, "shipI");

    this.anims.create(
      {
        key: "trexRun",
        frames: this.anims.generateFrameNumbers("trex",
        {
          start: 0,
          end: 1
        }),
        frameRate: 10,
        repeat: -1
      });

    this.trex.play("trexRun");
  }
}
