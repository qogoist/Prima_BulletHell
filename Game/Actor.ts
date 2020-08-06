namespace Game {
    import ƒ = FudgeCore;

    export abstract class Actor extends ƒ.Node implements CollisionSphere {
        
        public radius: number;          //in m 

        protected facing: ƒ.Vector3;
        protected direction: ƒ.Vector3;
        protected speed: number;        // in m/s
        protected health: number;
        protected maxHealth: number;

        constructor(_name: string, _speed: number, _health: number, _radius: number) {
            super(_name);
            this.facing = ƒ.Vector3.X();
            this.direction = ƒ.Vector3.ZERO();
            this.speed = _speed;
            this.health = _health;
            this.maxHealth = _health;
            this.radius = _radius;

            this.createModel();
        }

        public update(): boolean {
            if (this.health <= 0)
                return false;

            return true;
        }

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

        public setDirection(_vec: ƒ.Vector3): void {
            if (_vec.equals(ƒ.Vector3.ZERO()))
                this.direction = _vec;
            else 
                this.direction = ƒ.Vector3.NORMALIZATION(_vec, 1);
        }

        protected abstract createModel(): void;

        protected move(): void {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.direction, timeFrame * this.speed);

            this.mtxLocal.translate(distance);
        }
    }
}