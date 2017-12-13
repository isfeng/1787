export default class Boot {

  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;

    this.load.image('preloader', require('../assets/images/loading_bar.png'));

  }

  create() {
    this.game.input.mouse.capture = true;
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }

}