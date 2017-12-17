import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import StartScreen from "./states/StartScreen.js";

var cfg = {
    width: 1280,
    height: 720,
    multiTexture: true,
    parent: 'game',
    enableDebug: false,
    renderer: Phaser.WEBGL_MULTI,

};
var game = new Phaser.Game(cfg);
game.clearBeforeRender = false;

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('start', StartScreen);
game.state.add('game', Game);
game.state.start('boot');