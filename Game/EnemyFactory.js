"use strict";
var Game;
(function (Game) {
    let ENEMIES;
    (function (ENEMIES) {
        ENEMIES["SMALL"] = "SMALL";
    })(ENEMIES = Game.ENEMIES || (Game.ENEMIES = {}));
    class EnemyFactory {
        static createEnemy(_type, _location) {
            let enemy;
            switch (_type) {
                case ENEMIES.SMALL:
                    enemy = new Game.SmallEnemy("Small Enemy");
                    enemy.mtxLocal.translation = _location;
                    break;
                default:
                    break;
            }
            Game.graph.addChild(enemy);
            Game.enemyList.push(enemy);
        }
    }
    Game.EnemyFactory = EnemyFactory;
})(Game || (Game = {}));
//# sourceMappingURL=EnemyFactory.js.map