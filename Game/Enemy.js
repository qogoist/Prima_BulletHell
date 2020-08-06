"use strict";
var Game;
(function (Game) {
    class Enemy extends Game.Actor {
        constructor(_name, _speed, _health, _radius, _value) {
            super(_name, _speed, _health, _radius);
            this.value = _value;
        }
        reduceHP(_x) {
            super.reduceHP(_x);
            Game.ColorUtil.changeColor(this, 1 - (this.health / this.maxHealth));
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map