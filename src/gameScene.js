const GameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function GameScene() {
      Phaser.Scene.call(this, {
        key: 'GameScene'
      });
    },

  preload: function () {

    this.load.bitmapFont('prolamina', 'assets/fonts/bitmap/prolamina.png', 'assets/fonts/bitmap/prolamina.xml');
  },

  create: function () {

    var chars = [
      ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í'],
      ['j', 'k', 'l', 'm', 'n', 'o', 'Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>']
    ];

    var input = this.add.bitmapText(130, 50, 'prolamina', 'aábcdeéfghií\n\njklmnoóöőpqrs\n\ntuúüűvwxyz').setLetterSpacing(20);

    input.setInteractive();

  },

  update: function () {

    

  }

});
