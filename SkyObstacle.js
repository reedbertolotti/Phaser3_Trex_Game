class SkyObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    super(scene, config.width - 50, config.height/2, "bird");
    this.play("fly");

    this.setOrigin(0, 1);

    scene.physics.world.enableBody(this);


    this.body.setSize(60, 35);
    this.body.setOffset(20, 20);


    scene.add.existing(this);
    scene.obstacles.add(this);
    this.body.setAllowGravity(false);


    this.body.setVelocityX(-600);
  }

  update()
  {
    if (this.x + this.width < 0)
    {
      this.destroy();
      console.log("sky destroyed");
    }
  }
}
