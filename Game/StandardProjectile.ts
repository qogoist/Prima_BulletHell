namespace Game {
    import ƒ = FudgeCore;

    export class StandardProjectile extends Projectile implements CollisionSphere {

        public radius: number;

        constructor(_name: string, _direction: ƒ.Vector3, _playerOwned: boolean = true) {
            super(_name, config.StandardProjectile.speed, _direction, config.StandardProjectile.damage, config.StandardProjectile.lifespan, _playerOwned);
            this.radius = 0.15;

            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.cmpTransform.local = player.cmpTransform.local.copy;
        }

        public update(): boolean {
            // ƒ.Debug.log("Moving Projectile " + this.name + " towards " + (this.direction));
            // ƒ.Debug.log("Time to live: " + this.lifespan);
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;

            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);

            for (let enemy of enemyList) {
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

        public collidesWith(_target: CollisionSphere): boolean {
            let distance: number = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.mtxLocal.translation).magnitude;
            let result: boolean = false;

            if (distance < this.radius + _target.radius)
                result = true;

            return result;
        }

        protected createModel(_playerOwned: boolean): void {
            let model: ƒ.Node = new ƒ.Node("Model");

            let mesh: ƒ.MeshSphere = new ƒ.MeshSphere(8, 8);
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            model.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.3));
            cmpMesh.pivot.rotateX(90);

            let material: ƒ.Material;
            if (_playerOwned)
                material = new ƒ.Material("StandardProjectile", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS(config.Colors[color])));
            else
                material = new ƒ.Material("StandardProjectile", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS(config.Colors[color + 1])));
                
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            model.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            model.addComponent(cmpTransform);
            model.mtxLocal.lookAt(this.direction);

            let cmpAudio: ƒ.ComponentAudio = new ƒ.ComponentAudio(audioShot, false, true);
            cmpAudio.volume = sfxVolume;

            
            model.addComponent(cmpAudio);

            this.addChild(model);
        }
    }
}