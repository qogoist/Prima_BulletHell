"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class Player extends Game.Actor {
        constructor(_name = "Player") {
            ƒ.Debug.log("Creating new Player...");
            super(_name, Game.config.Player.speed, Game.config.Player.health);
            this.projectile = Game.config.Player.projectile;
            this.isShooting = false;
            this.firingRate = Game.config.Player.firingRate;
            this.timeLastShot = this.firingRate;
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
            this.mtxLocal.translateY(0.5);
        }
        move(_direction) {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector3.SCALE(_direction, timeFrame * this.speed);
            this.mtxLocal.translate(distance);
            let model = this.getChild(0);
            model.mtxLocal.lookAt(this.facing);
        }
        setFacing(_vec) {
            this.facing = _vec;
        }
        update() {
            let timeFrame = ƒ.Loop.timeFrameGame / 1000;
            this.updateOrientation();
            if (this.isShooting && this.timeLastShot >= (1 / this.firingRate)) {
                this.shoot();
                this.timeLastShot = 0;
            }
            this.timeLastShot += timeFrame;
            return true;
        }
        setIsShooting(_state) {
            this.isShooting = _state;
        }
        createModel() {
            let sphere = new ƒ.Node("PlayerModel");
            let meshSphere = new ƒ.MeshSphere(10, 10);
            let cmpMeshSphere = new ƒ.ComponentMesh(meshSphere);
            sphere.addComponent(cmpMeshSphere);
            let material = new ƒ.Material("Player", ƒ.ShaderFlat, new ƒ.CoatColored());
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            sphere.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            sphere.addComponent(cmpTransform);
            let gun = new ƒ.Node("Gun");
            let cmpMaterialGun = new ƒ.ComponentMaterial(material);
            gun.addComponent(cmpMaterialGun);
            let meshGun = new ƒ.MeshCube();
            let cmpMeshGun = new ƒ.ComponentMesh(meshGun);
            gun.addComponent(cmpMeshGun);
            cmpMeshGun.pivot.scale(new ƒ.Vector3(0.2, 0.2, 1));
            let cmpTransformGun = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            gun.addComponent(cmpTransformGun);
            gun.cmpTransform.local.translate(new ƒ.Vector3(0, 0, 0.25));
            sphere.addChild(gun);
            this.addChild(sphere);
        }
        calculateOrientation() {
            let vec = ƒ.Vector3.DIFFERENCE(this.facing, this.mtxLocal.translation);
            vec.y = 0;
            vec.normalize(1);
            return vec;
        }
        updateOrientation() {
            let model = this.getChild(0);
            model.mtxLocal.lookAt(this.calculateOrientation());
        }
        shoot() {
            ƒ.Debug.log("Firing at: " + this.facing);
            Game.ProjectileFactory.createProjectile(this.projectile, this.calculateOrientation());
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map