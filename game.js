let config =
{
  width: 768,
  height: 400/*256*/,
  backgroundColor: 0x808080/*0x8B0000*/,
  scene: [Scene1/*, Scene2*/],
  pixelArt: true,
  physics:
  {
    default: "arcade",
    arcade:
    {
      gravity: {y: 4000},
      debug: true
    }
  }
}

let game = new Phaser.Game(config);
