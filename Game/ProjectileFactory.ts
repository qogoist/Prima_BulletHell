namespace Game {
    import ƒ = FudgeCore;

    export enum PROJECTILES {
        STANDARD = "STANDARD"
    }

    export class ProjectileFactory {
        public static createProjectile(_type: PROJECTILES, _direction: ƒ.Vector3): void {
            let projectile: Projectile;
            switch (_type) {
                case PROJECTILES.STANDARD:
                    projectile = new StandardProjectile("Standard", _direction);
                    break;
                default:
                    break;
            }

            projectileList.addChild(projectile);
        }
    }
}