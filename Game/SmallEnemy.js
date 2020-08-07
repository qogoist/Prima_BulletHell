"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class SmallEnemy extends Game.Enemy {
        constructor(_name = "SmallEnemy") {
            super(_name, Game.config.SmallEnemy.speed, Game.config.SmallEnemy.health, 0.5, Game.config.SmallEnemy.value);
            this.damage = Game.config.SmallEnemy.damage;
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }
        update() {
            if (this.collidesWith(Game.player)) {
                Game.player.reduceHP(this.damage);
                return false;
            }
            else {
                this.setDirection(ƒ.Vector3.DIFFERENCE(Game.player.mtxLocal.translation, this.mtxLocal.translation));
                for (let enemy of Game.enemyList.getChildren()) {
                    let e = enemy;
                    if (this.collidesWith(e)) {
                        this.setDirection(ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, e.mtxLocal.translation));
                        this.move();
                    }
                }
                if (this.direction.equals(ƒ.Vector3.ZERO()))
                    this.setDirection(ƒ.Vector3.DIFFERENCE(Game.player.mtxLocal.translation, this.mtxLocal.translation));
            }
            this.move();
            return super.update();
        }
        createModel() {
            let sphere = new ƒ.Node("SmallEnemy");
            let meshSphere = new ƒ.MeshSphere(5, 5);
            let cmpMeshSphere = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);
            let material = new ƒ.Material("SmallEnemy", ƒ.ShaderFlat, new ƒ.CoatColored(this.oColor));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);
            this.addChild(sphere);
        }
        move() {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);
        }
    }
    Game.SmallEnemy = SmallEnemy;
})(Game || (Game = {}));
//# sourceMappingURL=SmallEnemy.js.map