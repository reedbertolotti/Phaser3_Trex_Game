let config =
{
  width: 1200,
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
      tileBias: 8,
      debug: true
    }
  }
}

let game = new Phaser.Game(config);
