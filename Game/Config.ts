namespace Game {

    export interface Config {
        Colors: string[];
        Player: Player;
        StandardProjectile: StandardProjectile;
        Spawner: Spawner;
        SmallEnemy: SmallEnemy;
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