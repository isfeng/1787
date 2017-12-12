export default class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.load.image('loading_bg', require('../assets/images/loading_bg.jpg'));
  }

  create() {

    //background for game
    // this.add.sprite(0, 0, "loading_bg");

    // this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    // this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.load.setPreloadSprite(this.asset);

    //do all your loading here
    //this.load.image('player', 'assets/images/player.png'); //width and height of sprite
    // this.load.image('enemy', '../assets/images/enemy.png');
    // this.load.image('explosion', '../assets/images/explosion.png');

    // this.load.spritesheet('player', '../assets/images/gunbot.png', 214, 269); //width and height of sprite
    this.load.image('hexagon', require('../assets/images/cockroach-egg-200px.png'));
    // this.load.image('bullet', '../assets/images/bullet.png');
    // this.load.image('enemyBullet', '../assets/images/enemyBullet.png');
    // this.load.image('bg', '../assets/images/bg.jpg');

    // this.load.image('health_bar', '../assets/images/health_bar.png');
    // this.load.image('health_holder', '../assets/images/health_holder.png');
    this.load.image('circle', require('../assets/images/circle.png'));

    this.load.spritesheet('cockroach', require('../assets/images/cockroach-topview-Sprites.png'), 200, 300);
    this.load.spritesheet('cockroach-green', require('../assets/images/cockroach-topview-green.png'), 200, 300);
    this.load.spritesheet('cockroach-lbrown', require('../assets/images/cockroach-topview-Lbrown.png'), 200, 300);
    this.load.spritesheet('cockroach-purple', require('../assets/images/cockroach-topview-purple.png'), 200, 300);
    this.load.spritesheet('cockroach-red', require('../assets/images/cockroach-topview-red.png'), 200, 300);
    this.load.image('cockroach-die', require('../assets/images/cock-die-300.png'));
    
    this.load.crossOrigin = 'anonymous';
    this.load.image('smoke', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/mist1.png');

    
    //staaaart load
    this.load.start();
  }

  update() {

    if (this.ready) {
      this.game.state.start('game');
    }

  }

  onLoadComplete() {
    this.ready = true;
  }

}