"use strict";
var Game;
(function (Game) {
    let ENEMIES;
    (function (ENEMIES) {
        ENEMIES["SMALL"] = "SMALL";
        ENEMIES["SPAWNER"] = "SPAWNER";
    })(ENEMIES = Game.ENEMIES || (Game.ENEMIES = {}));
    class EnemyFactory {
        static createEnemy(_type, _location) {
            let enemy;
            switch (_type) {
                case ENEMIES.SMALL:
                    enemy = new Game.SmallEnemy("Small Enemy");
                    break;
                case ENEMIES.SPAWNER:
                    enemy = new Game.Spawner("Spawner");
                    break;
                default:
                    break;
            }
            enemy.mtxLocal.translation = _location;
            Game.graph.addChild(enemy);
            Game.enemyList.push(enemy);
        }
    }
    Game.EnemyFactory = EnemyFactory;
})(Game || (Game = {}));
//# sourceMappingURL=EnemyFactory.js.map