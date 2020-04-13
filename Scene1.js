class Scene1 extends Phaser.Scene
{
  constructor()
  {
    super("bootGame");
  }

  preload()
  {
    this.load.spritesheet("trex", "assets/everything.png",
    {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 50,
      endFrame: 200
    });

    this.load.spritesheet("shipI", "assets/shipI.png",
    {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create()
  {
    //this.add.text(20, 20, "Loading game...");

    this.trex = this.add.sprite(config.width/2 - 50, config.height/2, "trex");

    this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2 + 50, "shipI");
  }
}
