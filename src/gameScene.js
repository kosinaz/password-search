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
    let numberOfChars = {};
    let guessedCharPositions = [];
    let i;
    word = words[~~(Math.random() * words.length)];
    for (i = 0; i < word.length; i += 1) {
      char = word.charAt(i);
      numberOfChars[char] =
        numberOfChars.hasOwnProperty(char) ?
        numberOfChars[char] + 1 : 1;
    }
    
    this.add.image(0, 0, 'atlas', 'bg').setOrigin(0);
    
    let keyImages = [];
    let keyChars = [];

    let addChar = function (char) {
      while (cursorPosition < word.length 
        && guessedCharPositions.includes(cursorPosition)) {
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
        && guessedCharPositions.includes(cursorPosition - 1)) {
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
      while (guessedCharPositions.includes(cursorPosition) 
        && cursorPosition < word.length) {
          cursorPosition += 1;
      }
      if (cursorPosition < word.length) {        
        return;
      }
      let numberOfGuessedChars = {};
      if (numberOfGuesses < 4) {
        numberOfGuesses += 1;
        
        // Read the guess
        let guess = '';
        for (i = 0; i < word.length; i += 1) {
          guess += inputField[i].text;
        }

        // Show hits
        for (i = 0; i < word.length; i += 1) {
          if (guess.charAt(i) === word.charAt(i)) {
            inputField[i].setTint(0xffff00);
            keyImages[guess.charAt(i)].setTint(0xffff00);
            keyChars[guess.charAt(i)].setTint(0xffff00);
            guessedCharPositions.push(i);
            numberOfGuessedChars[guess.charAt(i)] =
              numberOfGuessedChars.hasOwnProperty(guess.charAt(i)) ?
              numberOfGuessedChars[guess.charAt(i)] + 1 : 1;
          }
        }

        // Show misses
        for (i = 0; i < word.length; i += 1) {
          if (word.includes(guess.charAt(i))
            && guess.charAt(i) !== word.charAt(i)
            && (numberOfGuessedChars[guess.charAt(i)] === undefined
            && numberOfChars[guess.charAt(i)] > 0
            || numberOfGuessedChars[guess.charAt(i)] 
            < numberOfChars[guess.charAt(i)])) {
              inputField[i].setTint(0x009966);
              keyImages[guess.charAt(i)].setTint(0x009966);
              keyChars[guess.charAt(i)].setTint(0x009966);
              numberOfGuessedChars[guess.charAt(i)] =
                numberOfGuessedChars.hasOwnProperty(guess.charAt(i)) ?
                numberOfGuessedChars[guess.charAt(i)] + 1 : 1;
          }
        }

        // Show fails
        for (i = 0; i < word.length; i += 1) {
          if (!word.includes(guess.charAt(i))) {
            inputField[i].setTint(0x006699);
            keyImages[guess.charAt(i)].setTint(0x006699);
            keyChars[guess.charAt(i)].setTint(0x006699);
            if (keys.indexOf(guess.charAt(i)) > -1) {
              keys.splice(keys.indexOf(guess.charAt(i)), 1);
            }
          } else if (!inputField[i].isTinted) {
            inputField[i].setTint(0x006699);
          }
        }

        // Show next input field
        for (i = 0; i < word.length; i += 1) {
          inputField[i] = scene.add.bitmapText(
            544 - (word.length * 32) + i * 64,
            (numberOfGuesses + 1) * 64,
            'font',
            guessedCharPositions.includes(i) ? word.charAt(i) : '_'
          ).setOrigin(0.5);
          if (guessedCharPositions.includes(i)) {
            inputField[i].setTint(0xffff00);
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
