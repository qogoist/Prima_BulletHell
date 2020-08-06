"use strict";
var Game;
(function (Game) {
    async function loadJSON() {
        let content = await load("Externals/config.json");
        return content;
    }
    Game.loadJSON = loadJSON;
    async function load(_filename) {
        let response = await fetch(_filename);
        let text = await response.text();
        let json = JSON.parse(text);
        return (json);
    }
})(Game || (Game = {}));
//# sourceMappingURL=Config.js.map