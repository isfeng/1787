
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";


var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);
game.state.start('boot');

