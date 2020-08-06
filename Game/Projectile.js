"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Projectile extends ƒ.Node {
        constructor(_name, _speed, _direction, _damage, _lifespan) {
            super(_name);
            this.speed = _speed;
            this.direction = _direction;
            this.damage = _damage;
            this.lifespan = _lifespan;
            this.createModel();
        }
    }
    Game.Projectile = Projectile;
})(Game || (Game = {}));
//# sourceMappingURL=Projectile.js.map