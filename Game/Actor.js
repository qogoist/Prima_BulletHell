"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Actor extends ƒ.Node {
        constructor(_name, _speed, _health) {
            super(_name);
            this.facing = ƒ.Vector3.X();
            this.speed = _speed;
            this.health = _health;
            this.createModel();
        }
        collidesWith(_target) {
            let distance = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.mtxLocal.translation).magnitude;
            let result = false;
            if (distance < this.radius + _target.radius)
                result = true;
            return result;
        }
        reduceHP(_x) {
            this.health -= _x;
        }
    }
    Game.Actor = Actor;
})(Game || (Game = {}));
//# sourceMappingURL=Actor.js.map