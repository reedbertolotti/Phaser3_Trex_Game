class GroundObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    super(scene, config.width, config.height-50-70, "cactiSm");
    this.setOrigin(0, 0);
    this.setFrame(1);

    scene.add.existing(this);
    scene.obstacles.add(this);

    scene.physics.world.enableBody(this);
    this.body.setVelocityX(-75);
  }

  update()
  {
    if (this.x + this.width < 0)
    {
      this.destroy();
      console.log("destroyed");
    }
  }
}
