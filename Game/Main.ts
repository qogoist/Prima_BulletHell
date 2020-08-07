namespace Game {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    window.addEventListener("resize", hndResize);

    export let graph: ƒ.Node;
    export let player: Player;
    export let map: ƒ.Node;
    export let projectileList: Projectile[] = [];
    export let enemyList: Enemy[] = [];
    export let score: number;
    export let config: Config;
    export let color: number;

    export let audioShot: ƒ.Audio;

    export let globalVolume: number = 0.5;

    export let viewport: ƒ.Viewport;

    async function init(): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        audioShot = await ƒ.Audio.load("Assets/shot.mp3");

        graph = new ƒ.Node("Graph");
        player = new Player();
        score = 0;

        generateMap();
        createLights();

        graph.addChild(player);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 20, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);

        player.addComponent(new ƒ.ComponentAudioListener());
        ƒ.AudioManager.default.listenTo(graph);
        ƒ.AudioManager.default.listen(player.getComponent(ƒ.ComponentAudioListener));
        ƒ.AudioManager.default.volume = globalVolume;
        ƒ.Debug.log(ƒ.AudioManager.default);

        viewport.draw();

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, hndMouseMove);

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, hndMouseDown);

        viewport.activatePointerEvent(ƒ.EVENT_POINTER.UP, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.UP, hndMouseUp);

        viewport.activateKeyboardEvent(ƒ.EVENT_KEYBOARD.DOWN, true);
        viewport.addEventListener(ƒ.EVENT_KEYBOARD.DOWN, hndKey);
        viewport.setFocus(true);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
        ƒ.Time.game.setScale(1);
    }

    function update(_event: ƒ.Eventƒ): void {
        processInput();
        if (!player.update())
            gameOver();

        for (let enemy of enemyList) {
            if (!enemy.update()) {
                graph.removeChild(enemy);
                enemyList.splice(enemyList.indexOf(enemy), 1);

                score += enemy.value;
            }
        }

        for (let projectile of projectileList) {
            if (!projectile.update()) {
                graph.removeChild(projectile);
                projectileList.splice(projectileList.indexOf(projectile), 1);
            }
        }

        updateScore();

        ƒ.AudioManager.default.update();
        viewport.draw();
    }

    function hndKey(_event: ƒ.EventKeyboard): void {
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

    function processInput(): void {
        let direction: ƒ.Vector3 = ƒ.Vector3.ZERO();

        let difference: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(player.mtxLocal.translation, viewport.camera.pivot.translation);
        let relDirection: ƒ.Vector3 = new ƒ.Vector3(difference.x, 0, difference.z);

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]))
            direction.add(relDirection);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(90)));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]))
            direction.add(ƒ.Vector3.SCALE(relDirection, -1));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
            direction.add(ƒ.Vector3.TRANSFORMATION(relDirection, ƒ.Matrix4x4.ROTATION_Y(-90)));

        player.setDirection(direction);
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

    function updateScore(): void {
        let elem: HTMLElement = document.querySelector("h1#score");
        elem.innerHTML = "Score: " + score;
    }

    function getPauseMenu(): void {
        ƒ.Time.game.setScale(0);

        let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("pVolume");
        slider.value = (globalVolume * 100).toString();
        slider.addEventListener("input", changeVolume);

        document.getElementById("Pause").style.left = "50%";
        document.querySelector("#Resume").addEventListener("click", hidePauseMenu);
        document.querySelector("#Back").addEventListener("click", goToMainMenu);
    }

    function hidePauseMenu(): void {
        ƒ.Time.game.setScale(1);

        document.getElementById("Pause").style.left = "-50%";
    }

    function goToMainMenu(): void {
        ƒ.Debug.log("Ending the Game");
        ƒ.Loop.stop();
        location.reload();
    }

    function startGame(): void {
        document.getElementById("Main").style.left = "-100%";
        init();
    }

    function changeColor(): void {
        color++;
        if (color >= config.Colors.length)
            color = 0;

        document.querySelector("#Color").innerHTML = "COLOR: " + config.Colors[color].toUpperCase();
    }

    async function hndLoad(): Promise<void> {
        config = await loadJSON();
        color = 0;
        document.querySelector("#Color").innerHTML = "COLOR: " + config.Colors[color].toUpperCase();

        document.querySelector("#Start").addEventListener("click", startGame);
        document.querySelector("#Color").addEventListener("click", changeColor);
        document.querySelector("#Volume").addEventListener("input", changeVolume);
    }

    function changeVolume(_event: Event): void {
        let slider: HTMLInputElement = <HTMLInputElement>_event.target;
        globalVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = globalVolume;
        ƒ.AudioManager.default.gain.gain.value = globalVolume;
        console.log(globalVolume);
    }

    function gameOver(): void {
        viewport.removeEventListener(ƒ.EVENT_KEYBOARD.DOWN, hndKey);
        ƒ.Time.game.setScale(0);
        document.getElementById("Over").style.left = "50%";
        document.querySelector("#Again").addEventListener("click", goToMainMenu);
    }

    function hndResize(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}