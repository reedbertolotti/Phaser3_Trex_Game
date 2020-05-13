class FrontScene extends Phaser.Scene
{
  constructor()
  {
    console.log("CREATING FRONT SCENE");
    super("titleMenu");
  }

  create()
  {
    // switch to game playing scene
    let playGameKey = this.input.keyboard.addKey('ENTER')
    playGameKey.on('up', () => this.scene.switch("playGame"));

    let bkrndRect = this.add.rectangle(config.width/2, config.height/2, 700, 250, 0x21572f)

    this.yourScore = this.add.text(config.width/2, config.height/2 - 50, "SIMPLE T-REX GAME", { fontSize: '48px', fill: '#FFF' })
    this.yourScore.setOrigin(0.5, 0.5)

    let controlsText = this.add.text(config.width/2, config.height/2 + 25, "UP to jump     DOWN to duck", { fontSize: '16px', fill: '#FFF' })
    controlsText.setOrigin(0.5, 0.5)

    let enterText = this.add.text(config.width/2, config.height/2 + 75, "Press ENTER to play", { fontSize: '16px', fill: '#FFF' })
    enterText.setOrigin(0.5, 0.5)

    this.topCacti = this.add.tileSprite(config.width/2-bkrndRect.width/2, config.height/2 - bkrndRect.height/2, 2*700, 100, "bkg");
    this.topCacti.setOrigin(0, 1).setScale(0.5);

    this.bottomCacti = this.add.tileSprite(config.width/2-bkrndRect.width/2, config.height/2 + bkrndRect.height/2, 2*700, 100, "bkg");
    this.bottomCacti.setOrigin(0, 0).setScale(0.5).setFlipY(true);



    // this.ground = this.physics.add.staticImage(0, config.height - 50, "ground");
    // this.ground.setOrigin(0, 0).setScale(3.5).setTint(0xff0000).refreshBody();
    //
    // this.background = this.add.image(0, config.height - 75, "ground");
    // this.background.setOrigin(0, 0).setScale(3).setAlpha(0.3);

    // setTimeout(() => {
    //   this.scene.start('playGame')
    // }, 1000);
  }

  update()
  {
    this.topCacti.tilePositionX -= 1;
    this.bottomCacti.tilePositionX += 1;
  }
}
