export default class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    // this.load.image('loading_bg', require('../assets/images/loading_bg.jpg'));
  }

  create() {

    //background for game
    // this.add.sprite(0, 0, "loading_bg");

    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

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
    this.load.spritesheet('spider_crawl', require('../assets/images/spider_crawl.png'), 480/4, 740/5);
    this.load.image('cockroach-die', require('../assets/images/cock-die-300.png'));

    this.load.crossOrigin = 'anonymous';
    this.load.image('smoke', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/mist1.png');

    this.game.load.audio('On_the_Bach', ['/sounds/On_the_Bach.mp3']);
    this.game.load.audio('Keyboard_Typing_Fast', ['/sounds/Keyboard_Typing_Fast.mp3']);
    this.game.load.audio('woman-scream-01', ['/sounds/woman-scream-01.mp3']);
    this.game.load.audio('woman-scream-02', ['/sounds/woman-scream-02.mp3']);
    this.game.load.audio('man-scream-01', ['/sounds/man-scream-01.mp3']);
    this.game.load.audio('man-scream-02', ['/sounds/man-scream-02.mp3']);
    this.game.load.audio('fart-01', ['/sounds/fart-01.mp3']);
    this.game.load.audio('fart-03', ['/sounds/fart-03.mp3']);

    this.load.image('office_02', require('../assets/images/office_01.jpg'));

    this.load.image('sign', require('../assets/images/infoSign.png'));

    this.load.image('cloud_bg', require('../assets/images/cloud_bg.jpg'));

    this.load.spritesheet('spider', require('../assets/images/spider_giant.png'), 4096/32, 1024/8);

    this.game.load.atlasJSONHash('medal', require('../assets/images/medal.png'), '/src/assets/images/medal.json');
    this.game.load.atlasJSONHash('achivement', require('../assets/images/achivement.png'), '/src/assets/images/achivement.json');

    this.game.load.spritesheet('dude', require('../assets/images/pGGbv.png'), 1142/12, 635/4);


    // //  The Google WebFont Loader will look for this object, so create it before loading the script.
    // WebFontConfig = {

    //     //  'active' means all requested fonts have finished loading
    //     //  We set a 1 second delay before calling 'createText'.
    //     //  For some reason if we don't the browser cannot render the text the first time it's created.
    //     active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //     //  The Google Fonts we want to load (specify as many as you like in the array)
    //     google: {
    //       families: ['Revalia']
    //     }

    // };


    //staaaart load
    this.load.start();
  }

  update() {

    if (this.ready) {
      this.game.state.start('start');
    }

  }

  onLoadComplete() {
    this.ready = true;
  }

}