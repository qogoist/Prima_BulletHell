namespace Game {
    import ƒ = FudgeCore;

    export abstract class Projectile extends ƒ.Node {
        protected speed: number;                // in m/s   
        protected direction: ƒ.Vector3;         // as a normalized directional Vector3
        protected damage: number;               //
        protected lifespan: number;             // in seconds

        constructor(_name: string, _speed: number, _direction: ƒ.Vector3, _damage: number, _lifespan: number) {
            super(_name);
            this.speed = _speed;
            this.direction = _direction;
            this.damage = _damage;              
            this.lifespan = _lifespan;         

            this.createModel();
        }

        public abstract update(): boolean;

        protected abstract createModel(): void;
    }
}