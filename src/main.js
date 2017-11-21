// import Vue from 'vue'
// import App from './App.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


/**
 * Import Phaser dependencies using `expose-loader`.
 * This makes then available globally and it's something required by Phaser.
 * The order matters since Phaser needs them available before it is imported.
 */

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

/**
 * Create a new Phaser game instance.
 * And render a single sprite so we make sure it works.
 */
import logo from './assets/logo.png';
import runningcat from './assets/explosion_opaque.png';

var game = new Phaser.Game(1024, 1024, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('logo', logo);
  game.load.spritesheet('cat', runningcat, 320/5, 320/5, 25);
}

function create() {
  // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
  // logo.anchor.setTo(0.5, 0.5);
  // 
  var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'cat');
  logo.anchor.setTo(0.5);

  logo.animations.add('funnyfaces', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  	10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  	20, 21, 22, 23, 24
  ]);

  logo.animations.play('funnyfaces', 30, false);

  game.input.onDown.add(function(event){
  	let logo = game.add.sprite(event.position.x, event.position.y, 'cat');
	  logo.anchor.setTo(0.5);

	  logo.animations.add('funnyfaces', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	  	10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	  	20, 21, 22, 23, 24
	  ]);

	  logo.animations.play('funnyfaces', 30, false);

  }, this);

};
  
function update() {
  // ¯ \_(ツ)_/¯ 
  // "surprise me"
}