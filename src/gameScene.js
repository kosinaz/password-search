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
      'quadrangle', 
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

    const scene = this;
    const keys = [
      'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű',
      'í', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ü', 'ó'
    ];

    let current = 0;    
    let words = this.cache.json.get('words');
    word = words[Math.floor(Math.random() * words.length)];
    let guess = [];
    let line = 0;
    let i;
    let keyChars = [];

    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);

    let addChar = function (char) {
      if (current < word.length) {
        guess[current].text = char;
        current += 1;
      }
    }

    keys.forEach(function (char, i) {
      scene.add.image(
        116 + (i % 12) * 64,
        396 + Math.floor(i / 12) * 64,
        'atlas',
        'key_blue'
      ).setOrigin(0.5);

      keyChars[char] = scene.add.bitmapText(
        116 + (i % 12) * 64, 
        396 + Math.floor(i / 12) * 64, 
        'quadrangle', 
        char
      ).setOrigin(0.5).setInteractive().on('pointerup', function () {
        addChar(char);
      });
    });

    let backspace = function () {
      if (current > 0) {
        current -= 1;
        guess[current].text = '_';
      }
    }

    this.add.image(948, 396, 'atlas', 'backspace_blue')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerup', backspace);

    let enter = function () {
      if (current < word.length) {
        return;
      }
      let guessed = '';
      if (line < 4) {
        line += 1;
        for (i = 0; i < word.length; i += 1) {
          guessed += guess[i].text;
          guess[i].setTint(0x006699);
          keyChars[guess[i].text].setTint(0x006699);
          if (guess[i].text === word.charAt(i)) {
            guess[i].setTint(0xffff00);
            keyChars[guess[i].text].setTint(0xffff00);
          } else if (word.includes(guess[i].text)) {
            guess[i].setTint(0x009966);
            keyChars[guess[i].text].setTint(0x009966);
          }
          
          guessed += guess[i].text;
          guess[i] = scene.add.bitmapText(
            384 + i * 64,
            64 + line * 64,
            'quadrangle',
            '_'
          ).setOrigin(0.5);
        }
        if (guessed === word) {
          scene.scene.start('WinScene');
        }
        current = 0;
      } else {
        scene.scene.start('LoseScene');
      }
    }

    this.add.image(948, 524, 'atlas', 'enter_blue')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerup', enter);
    
    for (i = 0; i < word.length; i += 1) {
      guess[i] = this.add.bitmapText(
        384 + i * 64, 
        64 + line * 64, 
        'quadrangle', 
        '_'
      ).setOrigin(0.5);
    }

    this.input.keyboard.on('keydown', function (event) {
      if (keys.includes(event.key)) {
        addChar(event.key);
      } else if (event.key === 'Backspace') {
        backspace();
      } else if (event.key === 'Enter') {
        enter();
      }
    });
  },

  update: function () {}

});
