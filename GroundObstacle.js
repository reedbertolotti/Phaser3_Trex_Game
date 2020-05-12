class GroundObstacle extends Phaser.GameObjects.Sprite
{
  constructor(scene)
  {
    let cactiSizes = ["Big", "Small"];
    let cactiNumbers = ["One", "Two", "Three"];

    let size = cactiSizes[Math.floor(Math.random() * cactiSizes.length)];
    let number = cactiNumbers[Math.floor(Math.random() * cactiNumbers.length)];

    let cactiFrame = "cacti" + size + number + ".png";

    super(scene, 1200+100, 350, 'cSheet', cactiFrame);

    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    scene.obstacles.add(this);

    this.body.setSize(this.width-(this.width/5), this.height-(this.height/10));
    this.body.setOffset(this.width/10, this.height/10);

    this.body.setVelocityX(-600);
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
