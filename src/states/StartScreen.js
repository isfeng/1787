export default class StartScreen {

  create() {
    this.game.sound.play('On_the_Bach', 1, true);
    // let achivement_emitter = this.game.add.emitter(150, 30, 500);
    // achivement_emitter.makeParticles('achivement', Phaser.ArrayUtils.numberArray(0, 27));
    // achivement_emitter.gravity = 200;

    // this.game.stage.setBackgroundColor('#d8d2d3');
    let office_02 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'office_02');
    office_02.alpha = 0;
    office_02.anchor.setTo(0.5);
    office_02.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    office_02.scale.pageAlignHorizontally = true;
    office_02.scale.pageAlignVertically = true;
    office_02.scale.forceLandscape = true;
    var t = this.game.add.tween(office_02).to({
      alpha: 1
    }, 10000, Phaser.Easing.Linear.None, true, 3000);
    t.onComplete.add(function() {
      this.game.add.tween(sign).to({
        alpha: 1
      }, 2000, Phaser.Easing.Linear.None, true, 0);
    }, this);

    let sign = this.game.add.sprite(this.game.world.centerX + 200, this.game.world.centerY + 200, 'sign');
    sign.anchor.setTo(0.5);
    sign.angle = 17;
    sign.alpha = 0;
    sign.inputEnabled = true;
    sign.events.onInputDown.add(function(sprite, pointer) {

      // this.medal_emitter.start(false, 5000, 0, 100);
      // this.game.state.start('game');
      this.game.add.tween(sign).to({
        alpha: 0
      }, 6000, Phaser.Easing.Linear.None, true, 0);

      this.game.add.tween(office_02).to({
        alpha: 0
      }, 6000, Phaser.Easing.Linear.None, true, 0);

      this.game.add.tween(this.player).to({
        alpha: 0
      }, 5000, Phaser.Easing.Linear.None, true, 0);

      // this.game.time.events.add(3000, function() {
      //   achivement_emitter.start(false, 3000, 100, 25);
      // }, this);

      var once = this.game.time.events.add(6000, function() {
        this.game.state.start('game')
      }, this);

    }, this);

    // Create a bitmap for the lightning bolt texture
    this.lightningBitmap = this.game.add.bitmapData(1280, 768);
    // Create a sprite to hold the lightning bolt texture
    this.lightning = this.game.add.image(this.game.width / 2, 0, this.lightningBitmap);
    // Set the anchor point of the sprite to center of the top edge
    // This allows us to position the lightning by simply specifiying the
    // x and y coordinate of where we want the lightning to appear from.
    this.lightning.anchor.setTo(0.5, 0);

    // Trigger lightning on mouse clicks and taps
    this.game.input.onTap.add(this.zap, this);
    this.medal_emitter = this.game.add.emitter(this.game.world.centerX + 80, this.game.world.centerY - 20, 500);
    this.medal_emitter.makeParticles('medal', Phaser.ArrayUtils.numberArray(0, 631));
    this.medal_emitter.gravity = 200;

    // emitter.setAlpha(min, max, rate, easing, yoyo);
    //To use gravity on the emitter, start the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.player = this.game.add.sprite(128, this.game.world.height - 150, 'dude');
    // this.player.scale.setTo(2);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('face', Phaser.ArrayUtils.numberArray(0, 11), 12, true);
    this.player.animations.add('left', Phaser.ArrayUtils.numberArray(12, 23), 12, true);
    this.player.animations.add('right', Phaser.ArrayUtils.numberArray(24, 35), 12, true);
    this.player.animations.add('back', Phaser.ArrayUtils.numberArray(36, 47), 12, true);
    this.player.animations.play('back');
    this.game.add.tween(this.player.scale).to({
      x: 3,
      y: 3
    }, 15000, Phaser.Easing.Linear.None, true);

    // this.showText();
  }

  update() {
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //   this.game.state.start('game');
    // }
  }

  // Create a lightning bolt
  zap() {
    // Create the lightning texture
    this.createLightningTexture(this.game.world.randomX, 0, 20, 3, false);
    // Make the lightning sprite visible
    this.lightning.alpha = 1;
    // Fade out the lightning sprite using a tween on the alpha property
    // Check out the "Easing function" examples for more info.
    this.game.add.tween(this.lightning).to({
      alpha: 0.5
    }, 100, Phaser.Easing.Bounce.Out).to({
      alpha: 1.0
    }, 100, Phaser.Easing.Bounce.Out).to({
      alpha: 0.5
    }, 100, Phaser.Easing.Bounce.Out).to({
      alpha: 1.0
    }, 100, Phaser.Easing.Bounce.Out).to({
      alpha: 0
    }, 250, Phaser.Easing.Cubic.In).start();
  }

  // This function creates a texture that looks like a lightning bolt
  createLightningTexture(x, y, segments, boltWidth, branch) {
    // Get the canvas drawing context for the lightningBitmap
    var ctx = this.lightningBitmap.context;
    var width = this.lightningBitmap.width;
    var height = this.lightningBitmap.height;
    // Our lightning will be made up of several line segments starting at
    // the center of the top edge of the bitmap and ending at the bottom edge
    // of the bitmap.
    // Clear the canvas
    if (!branch) ctx.clearRect(0, 0, width, height);
    // Draw each of the segments
    for (var i = 0; i < segments; i++) {
      // Set the lightning color and bolt width
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = boltWidth;
      ctx.beginPath();
      ctx.moveTo(x, y);
      // Calculate an x offset from the end of the last line segment and
      // keep it within the bounds of the bitmap
      if (branch) {
        // For a branch
        x += this.game.rnd.integerInRange(-10, 10);
      } else {
        // For the main bolt
        x += this.game.rnd.integerInRange(-30, 30);
      }
      if (x <= 10) x = 10;
      if (x >= width - 10) x = width - 10;
      // Calculate a y offset from the end of the last line segment.
      // When we've reached the ground or there are no more segments left,
      // set the y position to the height of the bitmap. For branches, we
      // don't care if they reach the ground so don't set the last coordinate
      // to the ground if it's hanging in the air.
      if (branch) {
        // For a branch
        y += this.game.rnd.integerInRange(10, 20);
      } else {
        // For the main bolt
        y += this.game.rnd.integerInRange(20, height / segments);
      }
      if ((!branch && i == segments - 1) || y > height) {
        y = height;
      }
      // Draw the line segment
      ctx.lineTo(x, y);
      ctx.stroke();
      // Quit when we've reached the ground
      if (y >= height) break;
      // Draw a branch 20% of the time off the main bolt only
      if (!branch) {
        if (Phaser.Utils.chanceRoll(20)) {
          // Draws another, thinner, bolt starting from this position
          this.createLightningTexture(x, y, 10, 1, true);
        }
      }
    }
    // This just tells the engine it should update the texture cache
    this.lightningBitmap.dirty = true;
  }

  showText() {
    //Assigned for later use
    var label = this.game.add.text(800, 650, "我最常玩的就是簽到");
    label.alpha = 0;
    this.game.add.tween(label).to({
      alpha: 1
    }, 6000, Phaser.Easing.Linear.None, true, 6000);
    // label.text = "I'm changing the text inside the label var!";
    //Center the text
    // var txt = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "My Text");
    // txt.anchor.set(0.5, 0.5);
  }
}
