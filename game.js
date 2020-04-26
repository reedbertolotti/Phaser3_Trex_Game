let config =
{
  width: 768,
  height: 256,
  backgroundColor: 0x808080/*0x8B0000*/,
  scene: [Scene1/*, Scene2*/],
  pixelArt: true,
  physics:
  {
    default: "arcade",
    arcade:
    {
      debug: true,
      gravity: {y: 2000}
    }
  }
}

let game = new Phaser.Game(config);
