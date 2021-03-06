namespace Game {
    import ƒ = FudgeCore;

    export class Player extends Actor {

        private isShooting: boolean;
        private projectile: PROJECTILES;
        private firingRate: number;
        private timeLastShot: number;

        constructor(_name: string = "Player") {
            ƒ.Debug.log("Creating new Player...");

            super(_name, config.player.speed, config.player.health, 0.5, ƒ.Color.CSS(config.colors[color]));
            this.projectile = config.player.projectile;
            this.isShooting = false;
            this.firingRate = config.player.firingRate;
            this.timeLastShot = this.firingRate;

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }

        public setFacing(_vec: ƒ.Vector3): void {
            this.facing = _vec;
        }

        public update(): boolean {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.updateOrientation();

            if (this.isShooting && this.timeLastShot >= (1 / this.firingRate)) {
                this.shoot();
                this.timeLastShot = 0;
            }

            this.timeLastShot += timeFrame;

            for (let enemy of enemyList.getChildren()) {
                let e: Enemy = <Enemy>enemy;
                if (this.collidesWith(e))
                    this.setDirection(ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, e.mtxLocal.translation));
            }

            this.move();
            return super.update();
        }

        public setIsShooting(_state: boolean): void {
            this.isShooting = _state;
        }

        public reduceHP(_x: number): void {
            super.reduceHP(_x);

            ColorUtil.changeColor(this, 1 - (this.health / this.maxHealth), this.oColor, ƒ.Color.CSS(config.colors[color + 1]));
            
            let elem: HTMLElement = document.querySelector("h1#health");
            elem.innerHTML = "HP: " + this.health + "/" + this.maxHealth;
        }

        protected createModel(): void {
            let sphere: ƒ.Node = new ƒ.Node("PlayerModel");
            let meshSphere: ƒ.MeshSphere = new ƒ.MeshSphere(10, 10);
            let cmpMeshSphere: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);

            let material: ƒ.Material = new ƒ.Material("Player", ƒ.ShaderFlat, new ƒ.CoatColored(this.oColor));
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);

            let gun: ƒ.Node = new ƒ.Node("Gun");

            let cmpMaterialGun: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            gun.addComponent(cmpMaterialGun);

            let meshGun: ƒ.MeshCube = new ƒ.MeshCube();
            let cmpMeshGun: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshGun);
            gun.addComponent(cmpMeshGun);
            cmpMeshGun.pivot.scale(new ƒ.Vector3(0.2, 0.2, 1));

            let cmpTransformGun: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            gun.addComponent(cmpTransformGun);
            gun.cmpTransform.local.translate(new ƒ.Vector3(0, 0, 0.25));

            sphere.addChild(gun);

            this.addChild(sphere);
        }

        private calculateOrientation(): ƒ.Vector3 {
            let vec: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.facing, this.mtxLocal.translation);
            vec.y = 0;
            vec.normalize(1);

            return vec;
        }

        private updateOrientation(): void {
            let model: ƒ.Node = this.getChild(0);
            model.mtxLocal.lookAt(this.calculateOrientation());
        }

        private shoot(): void {
            // ƒ.Debug.log("Firing at: " + this.facing);
            ProjectileFactory.createProjectile(this.projectile, this.calculateOrientation());
        }
    }
}