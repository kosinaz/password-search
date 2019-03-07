const StartScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function StartScene() {
      Phaser.Scene.call(this, {
        key: 'StartScene'
      });
    },

  preload: function () {

    this.load.bitmapFont(
      'font',
      'assets/fonts/bitmap/quadrangle.png',
      'assets/fonts/bitmap/quadrangle.xml'
    );

    this.load.atlas(
      'atlas',
      'assets/images/atlas.png',
      'assets/images/atlas.json'
    );

    this.load.json('words', 'data/words.json');
  },

  create: function () {

    let scene = this;
    
    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);

    for (let i = 0; i < 12; i += 1) {
      let x = 448 + (i % 3) * 64;
      let y = 192 + ~~(i / 3) * 64;
      let tints = [
        '0x006699',
        '0x009966',
        '0x006699',
        '0x009966',
        '0x006699',
        '0x006699',
        '0x006699',
        '0x009966',
        '0x006699',
        '0xffff00',
        '0xffff00',
        '0xffff00',
      ]
      this.add.image(x, y, 'atlas', 'key_blue').setTint(tints[i]);
      this.add.bitmapText(x, y, 'font', 'jelszókereső'.charAt(i))
        .setOrigin(0.5)
        .setTint(tints[i]);
    }

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

  }

});