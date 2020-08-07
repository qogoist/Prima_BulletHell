namespace Game {
    import ƒ = FudgeCore;

    export class SmallEnemy extends Enemy {

        public damage: number;

        constructor(_name: string = "SmallEnemy") {
            super(_name, config.SmallEnemy.speed, config.SmallEnemy.health, 0.5, config.SmallEnemy.value);
            this.damage = config.SmallEnemy.damage;

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }

        public update(): boolean {
            if (this.collidesWith(player)) {
                player.reduceHP(this.damage);
                cmpAudioImpact.play(true);
                return false;
            }
            else {
                this.setDirection(ƒ.Vector3.DIFFERENCE(player.mtxLocal.translation, this.mtxLocal.translation));
                
                for (let enemy of enemyList.getChildren()) {
                    let e: Enemy = <Enemy>enemy;   
                    if (this.collidesWith(e)) {
                        this.setDirection(ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, e.mtxLocal.translation));
                        this.move();
                    }
                }

                if (this.direction.equals(ƒ.Vector3.ZERO()))
                    this.setDirection(ƒ.Vector3.DIFFERENCE(player.mtxLocal.translation, this.mtxLocal.translation));
            }

            

            this.move();

            return super.update();
        }

        protected createModel(): void {
            let sphere: ƒ.Node = new ƒ.Node("SmallEnemy");
            let meshSphere: ƒ.MeshSphere = new ƒ.MeshSphere(5, 5);
            let cmpMeshSphere: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);

            let material: ƒ.Material = new ƒ.Material("SmallEnemy", ƒ.ShaderFlat, new ƒ.CoatColored(this.oColor));
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);

            this.addChild(sphere);
        }

        protected move(): void {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;

            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);

            this.mtxLocal.translate(distance);
        }
    }
}