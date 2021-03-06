export default class Cockroach extends Phaser.Sprite {

  constructor(game, x, y, type) {

    super(game, x, y, type, 0);

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
    this.frac = this.game.rnd.frac();
    
    this.scale.set(this.frac, this.frac);
    this.crawlAnimation = this.animations.add("crawl", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    // this.crawlAnimation.scale.set(0.1, 0.1);
    // this.fireAnimation = this.animations.add("fire", [11,12,13]);
    // this.fireAnimation.onComplete.add(this.playFly, this);
    this.animations.play("crawl", 16, true);

    // this.speedX = frac

    // this.events.onDragStart.add(this.dragStart);
    // this.events.onDragUpdate.add(this.dragUpdate);
    // this.events.onDragStop.add(this.dragStop);
    // this.events.onInputDown.add(this.destroy);
    // 
    

  }

  // inputDown() {
  //   console.log('inputDown');
  // }

  // dragStart() {
  //   console.log('dragStart');
  // }

  // dragUpdate() {
  //   console.log('dragUpdate');
  // }

  // dragStop() {
  //   console.log('dragStop');
  // }

  update() {
    // if(this.running){
    if(this.frac > 0.3)
      this.y -= Math.random() * this.frac * 10;
    else
      this.y -= Math.random() * 10;
    if (this.y < -300)
      this.y = this.game.world.height + 300;

    this.x -= this.game.rnd.normal() * 1;
    // }
  }

}