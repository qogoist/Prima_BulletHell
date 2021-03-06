"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class StandardProjectile extends Game.Projectile {
        constructor(_name, _direction, _playerOwned = true) {
            super(_name, Game.config.standardProjectile.speed, _direction, Game.config.standardProjectile.damage, Game.config.standardProjectile.lifespan, _playerOwned);
            this.radius = 0.15;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.cmpTransform.local = Game.player.cmpTransform.local.copy;
        }
        update() {
            // ƒ.Debug.log("Moving Projectile " + this.name + " towards " + (this.direction));
            // ƒ.Debug.log("Time to live: " + this.lifespan);
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);
            for (let enemy of Game.enemyList.getChildren()) {
                let e = enemy;
                if (this.collidesWith(e)) {
                    e.reduceHP(this.damage);
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
        createModel(_playerOwned) {
            let model = new ƒ.Node("Model");
            let mesh = new ƒ.MeshSphere(8, 8);
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            model.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.3));
            cmpMesh.pivot.rotateX(90);
            let material;
            if (_playerOwned)
                material = new ƒ.Material("StandardProjectile", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS(Game.config.colors[Game.color])));
            else
                material = new ƒ.Material("StandardProjectile", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS(Game.config.colors[Game.color + 1])));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            model.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            model.addComponent(cmpTransform);
            model.mtxLocal.lookAt(this.direction);
            let cmpAudio = new ƒ.ComponentAudio(Game.audioShot, false, true);
            cmpAudio.volume = Game.sfxVolume;
            model.addComponent(cmpAudio);
            this.addChild(model);
        }
    }
    Game.StandardProjectile = StandardProjectile;
})(Game || (Game = {}));
//# sourceMappingURL=StandardProjectile.js.map