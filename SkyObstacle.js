class SkyObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    let heights = [config.height-50, config.height-110, config.height-170];

    let height = heights[Math.floor(Math.random() * heights.length)];

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
      console.log("sky destroyed");
    }
  }
}
