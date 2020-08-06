"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    window.addEventListener("resize", hndResize);
    Game.projectileList = [];
    Game.enemyList = [];
    function init() {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Game.graph = new ƒ.Node("Graph");
        Game.player = new Game.Player();
        Game.score = 0;
        generateMap();
        createLights();
        Game.graph.addChild(Game.player);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 20, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        Game.viewport = new ƒ.Viewport();
        Game.viewport.initialize("Viewport", Game.graph, cmpCamera, canvas);
        ƒ.Debug.log(Game.viewport);
        Game.viewport.draw();
        Game.viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        Game.viewport.addEventListener("\u0192pointermove" /* MOVE */, hndMouseMove);
        Game.viewport.activatePointerEvent("\u0192pointerdown" /* DOWN */, true);
        Game.viewport.addEventListener("\u0192pointerdown" /* DOWN */, hndMouseDown);
        Game.viewport.activatePointerEvent("\u0192pointerup" /* UP */, true);
        Game.viewport.addEventListener("\u0192pointerup" /* UP */, hndMouseUp);
        Game.viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        Game.viewport.addEventListener("\u0192keydown" /* DOWN */, hndKey);
        Game.viewport.setFocus(true);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
        ƒ.Time.game.setScale(1);
    }
    function update(_event) {
        processInput();
        if (!Game.player.update())
            gameOver();
        for (let enemy of Game.enemyList) {
            if (!enemy.update()) {
                Game.graph.removeChild(enemy);
                Game.enemyList.splice(Game.enemyList.indexOf(enemy), 1);
                Game.score += enemy.value;
            }
        }
        for (let projectile of Game.projectileList) {
            if (!projectile.update()) {
                Game.graph.removeChild(projectile);
                Game.projectileList.splice(Game.projectileList.indexOf(projectile), 1);
            }
        }
        updateScore();
        Game.viewport.draw();
    }
    function hndKey(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ESC:
                if (ƒ.Time.game.getScale() == 1)
                    getPauseMenu();
                else
                    hidePauseMenu();
                break;
            default:
                break;
        }
    }
    function processInput() {
        let direction = ƒ.Vector3.ZERO();
        let difference = ƒ.Vector3.DIFFERENCE(Game.player.mtxLocal.translation, Game.viewport.camera.pivot.translation);
        let relDirection = new ƒ.Vector3(difference.x, 0, difference.z);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]))
            direction.add(relDirection);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(90)));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]))
            direction.add(ƒ.Vector3.SCALE(relDirection, -1));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(-90)));
        Game.player.setDirection(direction);
    }
    function hndMouseMove(_event) {
        let ray = Game.viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
        let pos = ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Y());
        Game.player.setFacing(pos);
    }
    function hndMouseDown(_event) {
        Game.player.setIsShooting(true);
    }
    function hndMouseUp(_event) {
        Game.player.setIsShooting(false);
    }
    function generateMap() {
        let map = new ƒ.Node("Map");
        let material = new ƒ.Material("Map", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("lightgreen")));
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        map.addComponent(cmpMaterial);
        let mesh = new ƒ.MeshQuad();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        map.addComponent(cmpMesh);
        cmpMesh.pivot.scale(ƒ.Vector3.ONE(10));
        cmpMesh.pivot.rotateX(-90);
        Game.graph.addChild(map);
        let spawner = new Game.Spawner();
        spawner.mtxLocal.translate(new ƒ.Vector3(-5, 0, -5), false);
    }
    function createLights() {
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(0.1, 0.1, 0.1)));
        let cmpLightDirection = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
        cmpLightDirection.pivot.lookAt(new ƒ.Vector3(0, -10, -10));
        Game.graph.addComponent(cmpLightAmbient);
        Game.graph.addComponent(cmpLightDirection);
    }
    function updateScore() {
        let elem = document.querySelector("h1#score");
        elem.innerHTML = "Score: " + Game.score;
    }
    function getPauseMenu() {
        ƒ.Time.game.setScale(0);
        document.getElementById("Pause").style.left = "50%";
        document.querySelector("#Resume").addEventListener("click", hidePauseMenu);
        document.querySelector("#Back").addEventListener("click", goToMainMenu);
    }
    function hidePauseMenu() {
        ƒ.Time.game.setScale(1);
        document.getElementById("Pause").style.left = "-50%";
    }
    function goToMainMenu() {
        ƒ.Debug.log("Ending the Game");
        ƒ.Loop.stop();
        location.reload();
    }
    function startGame() {
        document.getElementById("Main").style.left = "-100%";
        init();
    }
    function changeColor() {
        Game.color++;
        if (Game.color >= Game.config.Colors.length)
            Game.color = 0;
        document.querySelector("#Color").innerHTML = "COLOR: " + Game.config.Colors[Game.color].toUpperCase();
    }
    async function hndLoad() {
        Game.config = await Game.loadJSON();
        Game.color = 0;
        document.querySelector("#Color").innerHTML = "COLOR: " + Game.config.Colors[Game.color].toUpperCase();
        document.querySelector("#Start").addEventListener("click", startGame);
        document.querySelector("#Color").addEventListener("click", changeColor);
    }
    function gameOver() {
        Game.viewport.removeEventListener("\u0192keydown" /* DOWN */, hndKey);
        ƒ.Time.game.setScale(0);
        document.getElementById("Over").style.left = "50%";
        document.querySelector("#Again").addEventListener("click", goToMainMenu);
    }
    function hndResize(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map