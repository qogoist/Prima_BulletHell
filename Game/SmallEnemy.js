"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class SmallEnemy extends Game.Actor {
        constructor(_name = "SmallEnemy") {
            super(_name, Game.config.SmallEnemy.speed, Game.config.SmallEnemy.health);
            this.damage = Game.config.SmallEnemy.damage;
            this.radius = 0.5;
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }
        update() {
            this.move();
            if (this.health <= 0)
                return false;
            return true;
        }
        createModel() {
            let sphere = new ƒ.Node("SmallEnemy");
            let meshSphere = new ƒ.MeshSphere(5, 5);
            let cmpMeshSphere = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);
            let material = new ƒ.Material("SmallEnemy", ƒ.ShaderFlat, new ƒ.CoatColored());
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);
            this.addChild(sphere);
        }
        move() {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let direction = ƒ.Vector3.DIFFERENCE(Game.player.mtxLocal.translation, this.mtxLocal.translation);
            direction.normalize(1);
            let distance = ƒ.Vector3.SCALE(direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);
        }
    }
    Game.SmallEnemy = SmallEnemy;
})(Game || (Game = {}));
//# sourceMappingURL=SmallEnemy.js.map