"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class StandardProjectile extends Game.Projectile {
        constructor(_name, _direction) {
            super(_name, Game.config.StandardProjectile.speed, _direction, Game.config.StandardProjectile.damage, Game.config.StandardProjectile.lifespan);
            this.radius = 0.15;
            this.createModel();
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.cmpTransform.local = Game.player.cmpTransform.local.copy;
        }
        update() {
            // ƒ.Debug.log("Moving Projectile " + this.name + " towards " + (this.direction));
            // ƒ.Debug.log("Time to live: " + this.lifespan);
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);
            for (let enemy of Game.enemyList) {
                if (this.collidesWith(enemy)) {
                    enemy.reduceHP(this.damage);
                    return false;
                }
            }
            if (this.lifespan <= 0) {
                return false;
            }
            this.lifespan -= timeFrame;
            return true;
        }
        collidesWith(_target) {
            let distance = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.mtxLocal.translation).magnitude;
            let result = false;
            if (distance < this.radius + _target.radius)
                result = true;
            return result;
        }
        createModel() {
            let model = new ƒ.Node("Model");
            let mesh = new ƒ.MeshSphere(6, 10);
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            model.addComponent(cmpMesh);
            cmpMesh.pivot.scale(new ƒ.Vector3(0.1, 0.1, 0.3));
            cmpMesh.pivot.rotateX(90);
            let material = new ƒ.Material("StandardProjectile", ƒ.ShaderFlat, new ƒ.CoatColored());
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            model.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            model.addComponent(cmpTransform);
            model.mtxLocal.lookAt(this.direction);
            this.addChild(model);
        }
    }
    Game.StandardProjectile = StandardProjectile;
})(Game || (Game = {}));
//# sourceMappingURL=StandardProjectile.js.map