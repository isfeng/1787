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

    // Create a bitmap for the lightning bolt texture
    this.lightningBitmap = this.game.add.bitmapData(1280, 768);

    // Create a sprite to hold the lightning bolt texture
    this.lightning = this.game.add.image(this.game.width/2, 0, this.lightningBitmap);

    // Set the anchor point of the sprite to center of the top edge
    // This allows us to position the lightning by simply specifiying the
    // x and y coordinate of where we want the lightning to appear from.
    this.lightning.anchor.setTo(0.5, 0);

    // Trigger lightning on mouse clicks and taps
    this.game.input.onTap.add(this.zap, this);
  }

  update() {
    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //   this.game.state.start('game');
    // }
  }

  // Create a lightning bolt
  zap() {
      // Create the lightning texture
      this.createLightningTexture();

      // Make the lightning sprite visible
      this.lightning.alpha = 1;

      // Fade out the lightning sprite using a tween on the alpha property
      // Check out the "Easing function" examples for more info.
      this.game.add.tween(this.lightning)
          .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
          .start();
  }

  // This function creates a texture that looks like a lightning bolt
  createLightningTexture() {
    // Get the canvas drawing context for the lightningBitmap
    var ctx = this.lightningBitmap.context;
    var width = this.lightningBitmap.width;
    var height = this.lightningBitmap.height;

    // Our lightning will be made up of several line segments starting at
    // the center of the top edge of the bitmap and ending at the bottom edge
    // of the bitmap.

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set the starting position and number of line segments
    var x = this.game.rnd.integerInRange(0, 1279);
    var y = 0;
    var segments = 20;

    // Draw each of the segments
    for(var i = 0; i < segments; i++) {
        // Set the lightning color and bolt width
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = this.game.rnd.integerInRange(3, 5);

        ctx.beginPath();
        ctx.moveTo(x, y);

        // Calculate an x offset from the end of the last line segment and
        // keep it within the bounds of the bitmap
        x += this.game.rnd.integerInRange(-30, 30);
        if (x <= 10) x = 10;
        if (x >= width-10) x = width-10;

        // Calculate a y offset from the end of the last line segment.
        // When we've reached the ground or there are no more segments left,
        // set the y position to the height of the bitmap.
        y += this.game.rnd.integerInRange(20, height/segments);
        if (i == segments - 1 || y > height) {
            y = height;
        }

        // Draw the line segment
        ctx.lineTo(x, y);
        ctx.stroke();

        // Quit when we've reached the ground
        if (y >= height) break;
    }

    // This just tells the engine it should update the texture cache
    this.lightningBitmap.dirty = true;
  }

}