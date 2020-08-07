namespace Game {
    import ƒ = FudgeCore;

    export class Spawner extends Enemy {

        private spawnType: ENEMIES;
        private spawnRate: number;
        private timeSinceSpawn: number;

        constructor(_name: string = "Spawner") {
            super(_name, config.Spawner.speed, config.Spawner.health, 2, config.Spawner.value);
            this.spawnType = config.Spawner.spawnType;
            this.spawnRate = config.Spawner.spawnRate;
            this. timeSinceSpawn = 0;

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.scale(ƒ.Vector3.ONE(4));

            graph.addChild(this);
            enemyList.push(this);
        }

        public update(): boolean {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;

            this.timeSinceSpawn += timeFrame;
            if (this.timeSinceSpawn >= this.spawnRate) {
                EnemyFactory.createEnemy(this.spawnType, this.mtxLocal.translation);
                this.timeSinceSpawn = 0;
            }

            //TODO: MAKE SPAWNERS MOVE

            return super.update();
        }

        protected createModel(): void {
            let model: ƒ.Node = new ƒ.Node("Spawner");
            let meshSphere: ƒ.MeshPyramid = new ƒ.MeshPyramid();
            let cmpMeshSphere: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshSphere);
            model.addComponent(cmpMeshSphere);

            let material: ƒ.Material = new ƒ.Material("Spawner", ƒ.ShaderFlat, new ƒ.CoatColored(this.oColor));
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            model.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            model.addComponent(cmpTransform);

            this.addChild(model);
        }
    }
}