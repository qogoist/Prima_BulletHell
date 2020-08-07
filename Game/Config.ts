namespace Game {

    export interface Config {
        map: Map;
        colors: string[];
        player: Player;
        standardProjectile: StandardProjectile;
        spawner: Spawner;
        smallEnemy: SmallEnemy;
    }

    export interface Map {
        size: number;
        color: string;
        camera: number[];
        spawnRate: number;
        spawnRateReduction: number;
    }

    export async function loadJSON(): Promise<Config> {
        let content: Config = await load("Externals/config.json");

        return content;
    }

    async function load(_filename: string): Promise<Config> {
        let response: Response = await fetch(_filename);

        let text: string = await response.text();
        let json: Config = JSON.parse(text);

        return (json);
    }
}