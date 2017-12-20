//require our other computers
import Cockroach from "../prefabs/Cockroach.js";
// import Enemy from "../prefabs/Enemy.js";
import CCU from "../prefabs/CCU.js";
import Spider from "../prefabs/Spider.js";
// import HealthBar from "../prefabs/HealthBar.js";

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();

  }

  create() {
    this.game.renderer.setTexturePriority(['cloud_bg', 'cockroach-green', 'cockroach-lbrown',
      'cockroach-purple', 'cockroach-red', 'cockroach-die', 'smoke', 'spider'
    ]);
    this.bg = this.add.tileSprite(0, 0, 2000, 1024, 'cloud_bg');
    this.bg.alpha = 0;
    this.game.add.tween(this.bg).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
    // this.game.sound.play('On_the_Bach', 1, true);

    // this.game.input.pixelPerfect = true;
    // this.game.input.pixelPerfectClick = true

    // this.stage.setBackgroundColor('#d8d2d3');
    this.spawnChance = 0.11;
    // this.score = 0;

    // this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //add the explosions
    // this.explosions = this.game.add.emitter(0, 0, 50);
    // this.explosions.makeParticles("hexagon");
    // this.explosions.setAlpha(1, .2, 1000);
    // this.explosions.setScale(0.5, 0.5);

    // add UI
    this.setupUI();

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
    this.cockroaches = this.add.group();
    this.spiders = this.add.group();

    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function() {
      let spider = new Spider(this.game, Math.random() * this.game.width, this.game.height + 200);
      this.spiders.add(spider);

    }, this);

    let thought = [' 不要再寫拉芭樂了 ', ' 沒日沒夜的霉日任務 ', ' 你得到發不完勳獎章 ', ' 你得不到成就 ', ' 公司派我去 GDC 是正確的。呵呵～ ', ' 來公司吃便當真的很重要 ',
      ' 首頁怎麼開這麼慢 ', ' 種花電信第 200 次弱點掃描...還沒完啊... ', ' 魚蝦蟹海鮮尾牙 ', ' 聖誕活動注意大獎是我的 ', ' 我不平衡報表 ',
      ' 同上BUG破新高。。。。 ', ' 長得帥又會寫程式真的很難得。。。 ', ' 原來是電腦作弊 ', ' 不要再忘記密碼了，對就是在說你 ', ' 拉霸 - Slot 傻傻分不清楚 ',
      ' Slot -  斯洛 一樣分不清楚 ', ' 喂 不能登入了 ', ' 喂 儲值有問題 ', ' Batch 跑失敗啊 ', ' 1個新功能 30個BUG ',
      ' 軍團長自肥系統快要上線 ', ' 沒人發現我就是雜工黃 ', ' 說的一嘴好 Code ', ' 我一向說話都很正經 ', ' 台港泰三國PK ', ' 痛毆星球喔喔喔喔 ',
      ' 客服回應：這都是自燃雞率 ', ' 客服回應：這都是自燃雞率 ', ' 客服回應：這都是自燃雞率 '

    ];

    this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, function() {
      this.flyThought(thought[this.game.rnd.integerInRange(0, thought.length)]);
    }, this);
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
    this.bg.tilePosition.y -= 0.5;

    let types = ['cockroach-red', 'cockroach-green', 'cockroach-lbrown', 'cockroach-purple'];

    if (Math.random() < this.spawnChance) {

      var cockroach = this.cockroaches.getFirstDead();
      if (cockroach === null || cockroach === undefined) {
        var cockroach = new Cockroach(this.game, Math.random() * this.game.width, this.game.height + 200, types[this.game.rnd.integerInRange(0, 3)]);
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

          let snd = this.game.rnd.integerInRange(0, 3);
          if (snd == 0)
            this.game.sound.play('man-scream-01');
          else if (snd == 1)
            this.game.sound.play('man-scream-02');
          else if (snd == 2)
            this.game.sound.play('woman-scream-01');
          else
            this.game.sound.play('woman-scream-02');

          cockroach.kill();
          let die = this.game.add.sprite(sprite.x, sprite.y, 'cockroach-die');
          die.anchor.setTo(0.5, 0.5);
          die.width = sprite.width;
          die.height = sprite.height;
          let tween = this.game.add.tween(die).to({
            alpha: 0
          }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

          tween.onComplete.add(function() {
            die.destroy();
          }, this);

        }, this);

        this.cockroaches.add(cockroach);
      } else {
        cockroach.revive();
        cockroach.reset(this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height);
      }

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

  flyThought(txt) {
    var label = this.game.add.text(200, this.game.rnd.integerInRange(100, 500), txt, { fill: '#fff', backgroundColor: '#000' });
    label.x = -200
    this.game.add.tween(label).to({ x: 1500 }, 7000, Phaser.Easing.Linear.None, true, 0);

  }

}
