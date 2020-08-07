"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Actor extends ƒ.Node {
        constructor(_name, _speed, _health, _radius, _color) {
            super(_name);
            this.facing = ƒ.Vector3.X();
            this.direction = ƒ.Vector3.ZERO();
            this.speed = _speed;
            this.health = _health;
            this.maxHealth = _health;
            this.radius = _radius;
            this.oColor = _color;
            this.createModel();
        }
        update() {
            if (this.health <= 0)
                return false;
            return true;
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
        setDirection(_vec) {
            if (_vec.equals(ƒ.Vector3.ZERO()))
                this.direction = _vec;
            else {
                let tempVec = ƒ.Vector3.NORMALIZATION(_vec, 1);
                this.direction = new ƒ.Vector3(tempVec.x, 0, tempVec.z);
            }
        }
        move() {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);
            let nextPos = ƒ.Vector3.SUM(this.mtxLocal.translation, distance);
            let boundary = Game.config.Map.size / 2 - this.radius;
            if (nextPos.x >= boundary || nextPos.x <= -boundary)
                distance.x = 0;
            if (nextPos.z >= boundary || nextPos.z <= -boundary)
                distance.z = 0;
            this.mtxLocal.translate(distance, false);
        }
    }
    Game.Actor = Actor;
})(Game || (Game = {}));
//# sourceMappingURL=Actor.js.map