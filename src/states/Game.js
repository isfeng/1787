//require our other computers
import Cockroach from "../prefabs/Cockroach.js";
// import Enemy from "../prefabs/Enemy.js";
import CCU from "../prefabs/CCU.js";
// import HealthBar from "../prefabs/HealthBar.js";

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();

  }

  create() {
    this.bg = this.add.tileSprite(0, 0, 2000, 1024, 'cloud_bg');
    this.game.sound.play('On_the_Bach');

    // this.game.input.pixelPerfect = true;
    // this.game.input.pixelPerfectClick = true

    this.stage.setBackgroundColor('#d8d2d3');
    this.spawnChance = 0.11;
    // this.score = 0;

    // this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg');

    // this.bullets = this.add.group();
    // this.enemyBullets = this.add.group();

    //add player
    // this.player = new Player(this.game, 1000, 1000, this.bullets);
    // this.game.add.existing(this.player);

    //add a few enemeis..
    // this.cockroaches = this.add.group();
    // for(var i = 0; i < 100; i++) {
    //   var cockroach = new Cockroach(this.game, Math.random() * this.game.width, Math.random() * this.game.height);
    //   this.cockroaches.add(cockroach);
    // }

    //add the explosions
    this.explosions = this.game.add.emitter(0, 0, 50);
    this.explosions.makeParticles("hexagon");
    this.explosions.setAlpha(1, .2, 1000);
    this.explosions.setScale(0.5, 0.5);

    // add UI
    this.setupUI();

    //wave timer
    // this.waveTimer = this.game.time.create(false);
    // this.waveTimer.loop(20000, this.incrementWave, this);
    // this.waveTimer.start();
    // 
    // this.explosions = this.game.add.emitter(0,0, 200);
    // this.explosions.makeParticles("hexagon");
    // this.explosions.setAlpha(1, .2, 2000);

    var LIFECYCLE = 6000;

    // Create a particle emitter along the bottom of the stage
    var emitter = this.game.add.emitter(this.game.world.centerX, this.game.height, 50);
    emitter.width = this.game.width;

    // Particle behaviour ranges to create a smoke drift-like effect
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.9;
    emitter.minRotation = -5;
    emitter.maxRotation = 5;
    emitter.setYSpeed(-2, -5);
    emitter.setXSpeed(10, 20);
    emitter.gravity = -10;

    // Particle alpha will ease from 0 to 0.2 and back again, for fade in/out
    emitter.setAlpha(0, 0.2, LIFECYCLE, Phaser.Easing.Quadratic.InOut, true);

    // Start the emitter
    emitter.makeParticles('smoke');
    emitter.start(false, LIFECYCLE, 100, 0);


    // add GUI
    // var gui = new dat.GUI();
    // gui.add(emitter, 'gravity').min(-20).max(20).name('Gravity');
    // gui.add(emitter, 'maxRotation').min(0).max(20).name('Rotation');
    // gui.close();
    this.online_user = 0;
    this.cockroaches = this.add.group();
    this.kills = this.add.group();
  }


  setupUI() {
    this.UILayer = this.add.group();

    this.scoreField = new CCU(this.game, "circle", 0);
    this.UILayer.add(this.scoreField);
    this.game.world.bringToTop(this.UILayer);
    // this.healthBar = new HealthBar(this.game, 120, 40, "health_bar", "health_holder");
    // this.UILayer.add(this.healthBar);
  }

  update() {
    this.game.world.bringToTop(this.UILayer);
    this.bg.tilePosition.y -= 0.3;

    let types = ['cockroach-red', 'cockroach-green', 'cockroach-lbrown', 'cockroach-purple'];

    if (Math.random() < this.spawnChance) {



      var cockroach = new Cockroach(this.game, Math.random() * this.game.width, this.game.height + 200, types[this.game.rnd.integerInRange(0, 3)]);
      this.online_user++;
      // for(var i = 0; i < 100; i++) {
      // var cockroach = new Cockroach(this.game, Math.random() * this.game.width, this.game.height + 200);
      // cockroach.events.onDragUpdate.add(function(sprite, pointer) {
      //   this.explosions.x = pointer.x;
      //   this.explosions.y = pointer.y;
      //   this.explosions.explode(3000, 2);
      // }, this);
      cockroach.anchor.setTo(0.5, 0.5);
      // cockroach.input.pixelPerfectClick = true
      cockroach.events.onInputDown.add(function(sprite, pointer) {

        if (this.game.rnd.integerInRange(0, 1) == 1)
          this.game.sound.play('man-scream-01');
        else
          this.game.sound.play('woman-scream-02');

        cockroach.kill();
        let die = this.game.add.sprite(sprite.x, sprite.y, 'cockroach-die');
        die.anchor.setTo(0.5, 0.5);
        die.width = sprite.width;
        die.height = sprite.height;
        this.game.add.tween(die).to({
          alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.online_user--;

      }, this);

      this.cockroaches.add(cockroach);
      // }

      // var enemy = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
      // this.enemies.add(enemy);
      // 
      // this.explosions.x = cockroach.x;
      // this.explosions.y = cockroach.y - 250;

      // this.explosions.explode(3000, 10);
    }

    this.scoreField.setValue(this.cockroaches.countLiving());


    // this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
    // this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
    // this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
  }

  incrementWave() {
    this.spawnChance *= 1.2;
  }

  damagePlayer(playerRef, enemyRef) {
    this.player.damage(1);
    this.healthBar.setValue(this.player.health.current / this.player.health.max);
    enemyRef.kill();

    if (this.player.health.current <= 0) {
      this.game.state.start('gameOver');
    }
  }

  damageEnemy(enemy, bullet) {

    this.explosions.x = enemy.x;
    this.explosions.y = enemy.y;

    this.explosions.explode(2000, 4);

    enemy.kill();
    bullet.kill();

    this.score++;
    this.scoreField.setValue(this.score);
  }

}