class FrontScene extends Phaser.Scene
{
  constructor()
  {
    super("titleMenu");
  }

  create()
  {
    // switch to MainScene
    let playGameKey = this.input.keyboard.addKey('ENTER')
    playGameKey.on('up', () => this.scene.switch("playGame"));

    // menu text
    let bkrndRect = this.add.rectangle(config.width/2, config.height/2, 700, 250, 0x21572f)
    let titleText = this.add.text(config.width/2, config.height/2 - 50, "SIMPLE T-REX GAME", { fontSize: '48px', fill: '#FFF' })
    titleText.setOrigin(0.5, 0.5)
    let controlsText = this.add.text(config.width/2, config.height/2 + 25, "UP to jump     DOWN to duck", { fontSize: '16px', fill: '#FFF' })
    controlsText.setOrigin(0.5, 0.5)
    let enterText = this.add.text(config.width/2, config.height/2 + 75, "Press ENTER to play", { fontSize: '16px', fill: '#FFF' })
    enterText.setOrigin(0.5, 0.5)

    // menu moving cacti
    this.topCacti = this.add.tileSprite(config.width/2-bkrndRect.width/2, config.height/2 - bkrndRect.height/2, 2*700, 100, "bkgrndCacti");
    this.topCacti.setOrigin(0, 1).setScale(0.5);

    this.bottomCacti = this.add.tileSprite(config.width/2-bkrndRect.width/2, config.height/2 + bkrndRect.height/2, 2*700, 100, "bkgrndCacti");
    this.bottomCacti.setOrigin(0, 0).setScale(0.5).setFlipY(true);
  }

  update()
  {
    this.topCacti.tilePositionX -= 1;
    this.bottomCacti.tilePositionX += 1;
  }
}
