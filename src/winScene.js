const WinScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function WinScene() {
      Phaser.Scene.call(this, {
        key: 'WinScene'
      });
    },

  create: function () {

    let scene = this;
    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);
    this.add.image(928, 524, 'atlas', 'enter_blue')
      .setInteractive()
      .on('pointerup', function () {
        scene.scene.start('GameScene');
      });

    this.input.keyboard.on('keydown', function (event) {
      if (event.key === 'Enter') {
        scene.scene.start('GameScene');
      }
    });

    this.add.bitmapText(500, 200, 'font', word).setOrigin(0.5);

  }

});