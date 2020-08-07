"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Enemy extends Game.Actor {
        constructor(_name, _speed, _health, _radius, _value) {
            super(_name, _speed, _health, _radius, ƒ.Color.CSS(Game.config.Colors[Game.color + 1]));
            this.value = _value;
        }
        reduceHP(_x) {
            super.reduceHP(_x);
            Game.ColorUtil.changeColor(this, 1 - (this.health / this.maxHealth), this.oColor, ƒ.Color.CSS(Game.config.Colors[Game.color]));
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map