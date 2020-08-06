namespace Game {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let graph: ƒ.Node;
    export let player: Player;
    export let map: ƒ.Node;
    export let projectileList: Projectile[] = [];
    export let enemyList: Actor[] = [];

    export let config: Config;

    export let viewport: ƒ.Viewport;

    async function hndLoad(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ƒ.Debug.log(canvas);

        config = await loadJSON();

        graph = new ƒ.Node("Graph");
        player = new Player();

        generateMap();
        createLights();

        graph.addChild(player);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 20, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, hndMouseMove);

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, hndMouseDown);

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.UP, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.UP, hndMouseUp);

        viewport.activateKeyboardEvent(ƒ.EVENT_KEYBOARD.DOWN, true);
        viewport.setFocus(true);

        ƒ.Time.game.setScale(1);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }

    function update(_event: ƒ.Eventƒ): void {
        processInput();
        player.update();
        
        for (let enemy of enemyList) {
            if (!enemy.update()) {
                graph.removeChild(enemy);
                enemyList.splice(enemyList.indexOf(enemy), 1);
            }
        }
        
        for (let projectile of projectileList) {
            if (!projectile.update()) {
                graph.removeChild(projectile);
                projectileList.splice(projectileList.indexOf(projectile), 1);
            }
        }

        viewport.draw();
    }

    function processInput(): void {
        let direction: ƒ.Vector3 = ƒ.Vector3.ZERO();

        let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(player.mtxLocal.translation, viewport.camera.pivot.translation);
        let relDirection: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(new ƒ.Vector3(difference.x, 0, difference.z), 1);

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]))
            direction.add(relDirection);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(90)));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]))
            direction.add(ƒ.Vector3.SCALE(relDirection, -1));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(-90)));

        player.move(direction);
    }

    function hndMouseMove(_event: ƒ.EventPointer): void {
        let ray: ƒ.Ray = viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
        let pos: ƒ.Vector3 = ray.intersectPlane(ƒ.Vector3.ZERO(), ƒ.Vector3.Y());
        player.setFacing(pos);
    }

    function hndMouseDown(_event: ƒ.EventPointer): void {
        player.setIsShooting(true);
    }

    function hndMouseUp(_event: ƒ.EventPointer): void {
        player.setIsShooting(false);
    }

    function generateMap(): void {
        let map: ƒ.Node = new ƒ.Node("Map");

        let material: ƒ.Material = new ƒ.Material("Map", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("lightgreen")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        map.addComponent(cmpMaterial);

        let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        map.addComponent(cmpMesh);
        cmpMesh.pivot.scale(ƒ.Vector3.ONE(10));
        cmpMesh.pivot.rotateX(-90);

        graph.addChild(map);

        let spawner: Spawner = new Spawner();
        spawner.mtxLocal.translate(new ƒ.Vector3(-5, 0, -5), false);
    }
    function createLights(): void {
        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(0.1, 0.1, 0.1)));
        let cmpLightDirection: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));

        cmpLightDirection.pivot.lookAt(new ƒ.Vector3(0, -10, -10));

        graph.addComponent(cmpLightAmbient);
        graph.addComponent(cmpLightDirection);
    }
}