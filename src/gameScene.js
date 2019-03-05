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

    const scene = this;
    const keys = [
      'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű',
      'í', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ü', 'ó'
    ];

    let cursorPosition = 0;    
    let words = this.cache.json.get('words');
    let inputField = [];
    let numberOfGuesses = 0;
    let guessedChars = [];
    let i;
    word = words[~~(Math.random() * words.length)];
    
    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);
    
    let keyImages = [];
    let keyChars = [];

    let addChar = function (char) {
      while (cursorPosition < word.length 
        && guessedChars.includes(cursorPosition)) {
          cursorPosition += 1;
      }
      if (cursorPosition < word.length) {
        inputField[cursorPosition].text = char;
        cursorPosition += 1;
      }
    }

    keys.forEach(function (char, i) {
      let x = 96 + (i % 12) * 64;
      let y = 396 + ~~(i / 12) * 64;
      keyImages[char] = scene.add.image(x, y, 'atlas', 'key_blue');
      keyChars[char] = scene.add.bitmapText(x, y, 'font', char)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerup', function () {
          addChar(char);
      });
    });

    let backspace = function () {
      while (cursorPosition > 0 
        && guessedChars.includes(cursorPosition - 1)) {
          cursorPosition -= 1;
      }
      if (cursorPosition > 0) {
        cursorPosition -= 1;
        inputField[cursorPosition].text = '_';
      }
    }

    this.add.image(928, 396, 'atlas', 'backspace_blue')
      .setInteractive()
      .on('pointerup', backspace);

    let enter = function () {
      while (guessedChars.includes(cursorPosition) 
        && cursorPosition < word.length) {
          cursorPosition += 1;
      }
      if (cursorPosition < word.length) {        
        return;
      }
      let guess = '';
      let char;
      if (numberOfGuesses < 4) {
        numberOfGuesses += 1;
        for (i = 0; i < word.length; i += 1) {
          char = inputField[i].text;
          guess += char;
          if (char === word.charAt(i)) {
            inputField[i].setTint(0xffff00);
            keyImages[char].setTint(0xffff00);
            keyChars[char].setTint(0xffff00);
            inputField[i] = scene.add.bitmapText(
              544 - (word.length * 32) + i * 64,
              (numberOfGuesses + 1) * 64,
              'font',
              char
            ).setOrigin(0.5);
            inputField[i].setTint(0xffff00);
            guessedChars.push(i);
          } else if (word.includes(char)) {
            inputField[i].setTint(0x009966);
            keyImages[char].setTint(0x009966);
            keyChars[char].setTint(0x009966);
            inputField[i] = scene.add.bitmapText(
              544 - (word.length * 32) + i * 64,
              (numberOfGuesses + 1) * 64,
              'font',
              '_'
            ).setOrigin(0.5);
          } else {
            if (keys.indexOf(char) > -1) {
              keys.splice(keys.indexOf(char), 1);
            }
            inputField[i].setTint(0x006699);
            keyImages[char].setTint(0x006699);
            keyChars[char].setTint(0x006699);
            inputField[i] = scene.add.bitmapText(
              544 - (word.length * 32) + i * 64,
              (numberOfGuesses + 1) * 64,
              'font',
              '_'
            ).setOrigin(0.5);
          }
        }
        if (guess === word) {
          scene.scene.start('WinScene');
        }
        cursorPosition = 0;
      } else {
        scene.scene.start('LoseScene');
      }
    }

    this.add.image(928, 524, 'atlas', 'enter_blue')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerup', enter);
    
    for (i = 0; i < word.length; i += 1) {
      inputField[i] = this.add.bitmapText(
        544 - (word.length * 32) + i * 64,
        (numberOfGuesses + 1) * 64, 
        'font', 
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
