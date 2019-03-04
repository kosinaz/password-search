const LoseScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function LoseScene() {
      Phaser.Scene.call(this, {
        key: 'LoseScene'
      });
    },

  create: function () {

    let scene = this;
    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);
    this.add.image(948, 524, 'atlas', 'enter_blue')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerup', function () {
        scene.scene.start('GameScene');
      });

    this.input.keyboard.on('keydown', function (event) {
      if (event.key === 'Enter') {
        scene.scene.start('GameScene');
      }
    });

    this.add.bitmapText(500, 200, 'quadrangle', word).setOrigin(0.5);

  }

});