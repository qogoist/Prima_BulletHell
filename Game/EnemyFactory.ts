namespace Game {
    import ƒ = FudgeCore;

    export enum ENEMIES {
        SMALL = "SMALL",
        SPAWNER = "SPAWNER"
    }

    export class EnemyFactory {
        public static createEnemy(_type: ENEMIES, _location: ƒ.Vector3): void {
            let enemy: Enemy;
            switch (_type) {
                case ENEMIES.SMALL:
                    enemy = new SmallEnemy("Small Enemy");
                    break;
                case ENEMIES.SPAWNER:
                    enemy = new Spawner("Spawner");
                    break;
                default:
                    break;
            }

            enemy.mtxLocal.translation = _location;

            enemyList.addChild(enemy);
        }
    }
}