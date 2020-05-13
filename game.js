let config =
{
  width: 1200,
  height: 400,
  backgroundColor: 0xaed6f1,
  scene: [Scene1, Scene2, FrontScene],
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

let gameSettings =
{
  playerSpeed: 200
}

let game = new Phaser.Game(config);
