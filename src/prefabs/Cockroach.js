export default class Cockroach extends Phaser.Sprite { 

	constructor(game, x, y) {  

	  super(game, x, y, 'cockroach', 0);

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
	  this.crawlAnimation = this.animations.add("crawl", [0,1,2,3,4,5,6,7]);
	  // this.crawlAnimation.scale.set(0.1, 0.1);
	  // this.fireAnimation = this.animations.add("fire", [11,12,13]);
	  // this.fireAnimation.onComplete.add(this.playFly, this);
	  this.animations.play("crawl", 16, true);

	  // this.speedX = frac
	}

	update() {
		this.y -= Math.random() * this.frac * 10;
		if(this.y < -300)
			this.y = this.game.world.height;

		this.x -= this.game.rnd.normal() * 1;
	}

}