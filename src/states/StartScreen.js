export default class StartScreen {


  create() {
    this.game.sound.play('On_the_Bach', 1, true);
    let office_02 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'office_02');
    office_02.anchor.setTo(0.5);

    let sign = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sign');
    sign.anchor.setTo(0.5);
    sign.inputEnabled = true;
    sign.events.onInputDown.add(function(sprite, pointer) {

      this.game.state.start('game');

    }, this);
  }

  update() {
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //   this.game.state.start('game');
    // }
  }

}