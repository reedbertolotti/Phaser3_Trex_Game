// class for sky obstacles (birds)

class SkyObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    let height = obsValues.skyObsHeights[Math.floor(Math.random() * obsValues.skyObsHeights.length)];

    super(scene, config.width+100, height, "bird");
    this.play("fly");

    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    scene.obstacles.add(this);

    this.body.setSize(60, 24);
    this.body.setOffset(20, 31);

    this.body.setAllowGravity(false);

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
