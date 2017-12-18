export default class Spider extends Phaser.Sprite {

  constructor(game, x, y) {

    super(game, x, y, 'spider', 0);

    this.inputEnabled = true;
    // this.input.enableDrag();
    // this.game.physics.enable(this, Phaser.Physics.ARCADE);
    // this.body.drag.x = 35;
    // this.body.drag.y = 35;
    // this.body.collideWorldBounds = true;

    // initialize your prefab herea
    // this.xspeed = 100;
    // this.bulletGate = 0;
    // this.shotInterval = 500;
    // this.bullets = bullets;
    // this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // this.health = { current: 10, max: 10 };
    // this.fireposition = { x: 160, y: 100 };
    // this.frac = this.game.rnd.frac();
    // this.scale.set(this.frac, this.frac);
    // if(type == 'spider_crawl')
    //   this.crawlAnimation = this.animations.add("crawl", Phaser.ArrayUtils.numberArray(0,18));
    // else
    //   this.crawlAnimation = this.animations.add("crawl", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    // // this.crawlAnimation.scale.set(0.1, 0.1);
    // // this.fireAnimation = this.animations.add("fire", [11,12,13]);
    // // this.fireAnimation.onComplete.add(this.playFly, this);
    // this.animations.play("crawl", 24, true);

    // this.speedX = frac

    // this.events.onDragStart.add(this.dragStart);
    // this.events.onDragUpdate.add(this.dragUpdate);
    // this.events.onDragStop.add(this.dragStop);
    // this.events.onInputDown.add(this.destroy);
    this.createAnimations(0, '_left');
    this.createAnimations(32, '_top_left');
    this.createAnimations(64, '_top');
    this.createAnimations(96, '_top_right');
    this.createAnimations(128, '_right');
    this.createAnimations(160, '_bottom_right');
    this.createAnimations(192, '_bottom');
    this.createAnimations(224, '_bottom_left');

    this.animations.play('walk_top', 16, true);
  }

  createAnimations(startFrame, direction) {
    var fps = 1;
    
    this.animations.add('stand' + direction, Phaser.ArrayUtils.numberArray(startFrame, startFrame + 3));
    this.animations.add('walk' + direction, Phaser.ArrayUtils.numberArray(startFrame + 4, startFrame + 4 + 7 ));
    this.animations.add('jump' + direction, Phaser.ArrayUtils.numberArray(startFrame + 12, startFrame + 12 + 3));
    this.animations.add('die' + direction, Phaser.ArrayUtils.numberArray(startFrame + 16, startFrame + 16 + 7));

    this.animations.add('flip' + direction, Phaser.ArrayUtils.numberArray(startFrame + 24, startFrame + 24 + 3));
    this.animations.add('attack' + direction, Phaser.ArrayUtils.numberArray(startFrame + 28, startFrame + 28 + 3));

  }

  inputDown() {
    console.log('inputDown');
  }

  dragStart() {
    console.log('dragStart');
  }

  dragUpdate() {
    console.log('dragUpdate');
  }

  dragStop() {
    console.log('dragStop');
  }

  update() {
    // if(this.running){
    this.y -= 2;

    if (this.y < -300)
      this.y = this.game.world.height + 300;

    this.x -= this.game.rnd.normal() * 1;
    // }
    // this.rotation = this.game.physics.arcade.angleToPointer(this) + 90;
  }

}