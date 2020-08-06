namespace Game {
    import ƒ = FudgeCore;

    export abstract class Enemy extends Actor {

        public value: number;

        constructor(_name: string, _speed: number, _health: number, _radius: number, _value: number) {
            super(_name, _speed, _health, _radius);
            this.value = _value;
        }

        public reduceHP(_x: number): void {
            super.reduceHP(_x);

            ColorUtil.changeColor(this, 1 - (this.health / this.maxHealth));
        }

    }
}