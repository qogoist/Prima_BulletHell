namespace Game {
    import ƒ = FudgeCore;

    export class SmallEnemy extends Actor {

        public damage: number;

        constructor(_name: string = "SmallEnemy") {
            super(_name, config.SmallEnemy.speed, config.SmallEnemy.health);
            this.damage = config.SmallEnemy.damage;
            this.radius = 0.5;

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }

        public update(): boolean {
            this.move();

            if (this.health <= 0)
                return false;

            return true;
        }

        protected createModel(): void {
            let sphere: ƒ.Node = new ƒ.Node("SmallEnemy");
            let meshSphere: ƒ.MeshSphere = new ƒ.MeshSphere(5, 5);
            let cmpMeshSphere: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);

            let material: ƒ.Material = new ƒ.Material("SmallEnemy", ƒ.ShaderFlat, new ƒ.CoatColored());
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);

            this.addChild(sphere);
        }

        private move(): void {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;

            let direction: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(player.mtxLocal.translation, this.mtxLocal.translation);
            direction.normalize(1);
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(direction, timeFrame * this.speed);

            this.mtxLocal.translate(distance);
        }
    }
}