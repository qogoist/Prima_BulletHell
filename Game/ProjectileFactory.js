"use strict";
var Game;
(function (Game) {
    let PROJECTILES;
    (function (PROJECTILES) {
        PROJECTILES["STANDARD"] = "STANDARD";
    })(PROJECTILES = Game.PROJECTILES || (Game.PROJECTILES = {}));
    class ProjectileFactory {
        static createProjectile(_type, _direction) {
            let projectile;
            switch (_type) {
                case PROJECTILES.STANDARD:
                    projectile = new Game.StandardProjectile("Standard", _direction);
                    break;
                default:
                    break;
            }
            Game.graph.addChild(projectile);
            Game.projectileList.push(projectile);
        }
    }
    Game.ProjectileFactory = ProjectileFactory;
})(Game || (Game = {}));
//# sourceMappingURL=ProjectileFactory.js.map