let config =
{
  width: 1200,
  height: 400,
  backgroundColor: 0xaed6f1,
  scene: [SetUpScene, MainScene, FrontScene],
  pixelArt: true,
  physics:
  {
    default: "arcade",
    arcade:
    {
      gravity: {y: 4000},
      debug: false
    }
  }
}


const obsValues =
{
  cactiSizes: ["Big", "Small"],
  cactiNumbers: ["One", "Two", "Three"],
  skyObsHeights: [config.height-50, config.height-100, config.height-150]
}

const playerConfig =
{
  defaultX:config.width/10,
  defaultY: config.height - 50,
  runXSize: 25,
  runYSize: 91,
  runXOffset: 27,
  runYOffset: 3,
  duckXSize: 97,
  duckYSize: 60
}


let game = new Phaser.Game(config);
