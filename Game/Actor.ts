namespace Game {
    import ƒ = FudgeCore;

    export abstract class Actor extends ƒ.Node implements CollisionSphere {
        
        public radius: number;          //in m 

        protected facing: ƒ.Vector3;
        protected speed: number;        // in m/s
        protected health: number;       //

        constructor(_name: string, _speed: number, _health: number) {
            super(_name);
            this.facing = ƒ.Vector3.X();
            this.speed = _speed;
            this.health = _health;

            this.createModel();
        }

        public abstract update(): boolean;

        public collidesWith(_target: CollisionSphere): boolean {
            let distance: number = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.mtxLocal.translation).magnitude;
            let result: boolean = false;

            if (distance < this.radius + _target.radius)
                result = true;

            return result;
        }

        public reduceHP(_x: number): void {
            this.health -= _x;
        }

        protected abstract createModel(): void;
    }
}