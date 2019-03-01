const GameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function GameScene() {
      Phaser.Scene.call(this, {
        key: 'GameScene'
      });
    },

  preload: function () {

    this.load.bitmapFont(
      'prolamina', 
      'assets/fonts/bitmap/prolamina.png', 
      'assets/fonts/bitmap/prolamina.xml'
    );
  },

  create: function () {

    const keys = [
      'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű',
      'í', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ü', 'ó'
    ];

    let current = 0;
    let out = [];
    const scene = this;

    keys.forEach(function (key, i) {
      scene.add.bitmapText(
        130 + (i % 12) * 60, 
        400 + Math.floor(i / 12) * 60, 
        'prolamina', 
        key
      ).setOrigin(0.5).setInteractive().on('pointerup', function () {
        out[current].text = key;
        current = (current + 1) % 5;
      });
    });

    
    for (i = 0; i < 5; i += 1) {
      out[i] = this.add.bitmapText(
        130 + i * 60, 
        130, 
        'prolamina', 
        '_'
      ).setOrigin(0.5);
    }
  },

  update: function () {

    

  }

});
