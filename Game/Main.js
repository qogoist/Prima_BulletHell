"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    Game.projectileList = [];
    Game.enemyList = [];
    async function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ƒ.Debug.log(canvas);
        Game.config = await Game.loadJSON();
        Game.graph = new ƒ.Node("Graph");
        Game.player = new Game.Player();
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
        Game.viewport.setFocus(true);
        ƒ.Time.game.setScale(1);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function update(_event) {
        processInput();
        Game.player.update();
        for (let enemy of Game.enemyList) {
            if (!enemy.update()) {
                Game.graph.removeChild(enemy);
                Game.enemyList.splice(Game.enemyList.indexOf(enemy), 1);
            }
        }
        for (let projectile of Game.projectileList) {
            if (!projectile.update()) {
                Game.graph.removeChild(projectile);
                Game.projectileList.splice(Game.projectileList.indexOf(projectile), 1);
            }
        }
        Game.viewport.draw();
    }
    function processInput() {
        let direction = ƒ.Vector3.ZERO();
        let difference = ƒ.Vector3.DIFFERENCE(Game.player.mtxLocal.translation, Game.viewport.camera.pivot.translation);
        let relDirection = ƒ.Vector3.NORMALIZATION(new ƒ.Vector3(difference.x, 0, difference.z), 1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]))
            direction.add(relDirection);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(90)));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]))
            direction.add(ƒ.Vector3.SCALE(relDirection, -1));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(-90)));
        Game.player.move(direction);
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
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map