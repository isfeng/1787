export default class Spider extends Phaser.Sprite {

  constructor(game, x, y) {

    super(game, x, y, 'spider', 0);

    this.inputEnabled = true;

    this.createAnimations(0, '_left');
    this.createAnimations(32, '_top_left');
    this.createAnimations(64, '_top');
    this.createAnimations(96, '_top_right');
    this.createAnimations(128, '_right');
    this.createAnimations(160, '_bottom_right');
    this.createAnimations(192, '_bottom');
    this.createAnimations(224, '_bottom_left');

    this.animations.play('walk_top', 16, true);

    this.events.onInputDown.add(function(sprite, pointer) {
      if (Phaser.Utils.chanceRoll(50))
        this.game.sound.play('fart-01');
      else
        this.game.sound.play('fart-03');
    }, this);
  }

  createAnimations(startFrame, direction) {
    this.animations.add('stand' + direction, Phaser.ArrayUtils.numberArray(startFrame, startFrame + 3));
    this.animations.add('walk' + direction, Phaser.ArrayUtils.numberArray(startFrame + 4, startFrame + 4 + 7));
    this.animations.add('jump' + direction, Phaser.ArrayUtils.numberArray(startFrame + 12, startFrame + 12 + 3));
    this.animations.add('die' + direction, Phaser.ArrayUtils.numberArray(startFrame + 16, startFrame + 16 + 7));

    this.animations.add('flip' + direction, Phaser.ArrayUtils.numberArray(startFrame + 24, startFrame + 24 + 3));
    this.animations.add('attack' + direction, Phaser.ArrayUtils.numberArray(startFrame + 28, startFrame + 28 + 3));
  }

  update() {
    // if(this.running){
    this.y -= 2;

    if (this.y < -300)
      this.y = this.game.world.height + 200;

    this.x -= this.game.rnd.normal() * 1;
    // }
    // this.rotation = this.game.physics.arcade.angleToPointer(this) + 90;
  }

}
