namespace Game {
    import ƒ = FudgeCore;

    export enum ENEMIES {
        SMALL = "SMALL"
    }

    export class EnemyFactory {
        public static createEnemy(_type: ENEMIES, _location: ƒ.Vector3): void {
            let enemy: Actor;
            switch (_type) {
                case ENEMIES.SMALL:
                    enemy = new SmallEnemy("Small Enemy");
                    enemy.mtxLocal.translation = _location;
                    break;
                default:
                    break;
            }

            graph.addChild(enemy);
            enemyList.push(enemy);
        }
    }
}