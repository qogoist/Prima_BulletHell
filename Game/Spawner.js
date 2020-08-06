"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Spawner extends Game.Enemy {
        constructor(_name = "Spawner") {
            super(_name, Game.config.Spawner.speed, Game.config.Spawner.health, 2, Game.config.Spawner.value);
            this.spawnType = Game.config.Spawner.spawnType;
            this.spawnRate = Game.config.Spawner.spawnRate;
            this.timeSinceSpawn = 0;
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.scale(ƒ.Vector3.ONE(4));
            Game.graph.addChild(this);
            Game.enemyList.push(this);
        }
        update() {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            this.timeSinceSpawn += timeFrame;
            if (this.timeSinceSpawn >= this.spawnRate) {
                Game.EnemyFactory.createEnemy(this.spawnType, this.mtxLocal.translation);
                this.timeSinceSpawn = 0;
            }
            //TODO: MAKE SPAWNERS MOVE
            return super.update();
        }
        createModel() {
            let model = new ƒ.Node("Spawner");
            let meshSphere = new ƒ.MeshPyramid();
            let cmpMeshSphere = new ƒ.ComponentMesh(meshSphere);
            model.addComponent(cmpMeshSphere);
            let material = new ƒ.Material("Spawner", ƒ.ShaderFlat, new ƒ.CoatColored());
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            model.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            model.addComponent(cmpTransform);
            this.addChild(model);
        }
    }
    Game.Spawner = Spawner;
})(Game || (Game = {}));
//# sourceMappingURL=Spawner.js.map