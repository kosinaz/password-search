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

    const chars = [
      'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű',
      'í', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ü', 'ó'
    ];

    let current = 0;
    let word = ['f', 'a', 'l', 'a', 't'];
    let guess = [];
    let line = 1;
    const scene = this;

    chars.forEach(function (char, i) {
      scene.add.bitmapText(
        130 + (i % 12) * 60, 
        420 + Math.floor(i / 12) * 60, 
        'prolamina', 
        char
      ).setOrigin(0.5).setInteractive().on('pointerup', function () {
        if (current < 5) {
          guess[current].text = char;
          current += 1;
        }
      });
    });
    
    for (i = 0; i < 5; i += 1) {
      guess[i] = this.add.bitmapText(
        130 + i * 60, 
        line * 60, 
        'prolamina', 
        '_'
      ).setOrigin(0.5);
    }

    this.input.keyboard.on('keydown', function (event) {
      if (chars.includes(event.key)) {
        if (current < 5) {
          guess[current].text = event.key;
          current += 1;
        }
      }
      if (event.key === 'Backspace') {
        if (current > 0) {
          current -= 1;
          guess[current].text = '_';
        }
      }
      if (event.key === 'Enter') {
        if (line < 5) {
          line += 1;
          for (i = 0; i < 5; i += 1) {
            if (guess[i].text === word[i]) {
              guess[i].setTint(0x00aa00);
            } else if (word.includes(guess[i].text)){
              guess[i].setTint(0xffff00);
            }
            guess[i] = scene.add.bitmapText(
              130 + i * 60,
              line * 60,
              'prolamina',
              '_'
            ).setOrigin(0.5);
          }
          current = 0;
        }
      }
    });
  },

  update: function () {
    
    
  }

});
