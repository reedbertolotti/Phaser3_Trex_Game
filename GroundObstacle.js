class GroundObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    let size = obsValues.cactiSizes[Math.floor(Math.random() * obsValues.cactiSizes.length)];
    let number = obsValues.cactiNumbers[Math.floor(Math.random() * obsValues.cactiNumbers.length)];

    let cactiFrame = "cacti" + size + number + ".png";

    super(scene, config.width+100, config.height-50, 'cactiSheet', cactiFrame);

    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    scene.obstacles.add(this);

    this.body.setSize(this.width-(this.width/5), this.height-(this.height/10));
    this.body.setOffset(this.width/10, this.height/10);

    this.body.setVelocityX(-scene.gameSpeed);
  }

  update()
  {
    if (this.x + this.width < 0)
    {
      this.destroy();
    }
  }
}
