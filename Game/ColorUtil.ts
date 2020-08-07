namespace Game {
    import ƒ = FudgeCore;

    export class ColorUtil {
        public static changeColor(_node: ƒ.Node, _scale: number, _color1: ƒ.Color, _color2: ƒ.Color): void {

            let mat: ƒ.ComponentMaterial = _node.getComponent(ƒ.ComponentMaterial);
            if (mat != null) {
                let coat: ƒ.CoatColored = <ƒ.CoatColored>mat.material.getCoat();

                coat.color = ColorUtil.GRADIENT(_color1, _color2, _scale);
            }

            for (let child of _node.getChildren()) {
                ColorUtil.changeColor(child, _scale, _color1, _color2);
            }
        }

        private static GRADIENT(_c1: ƒ.Color, _c2: ƒ.Color, _scale: number): ƒ.Color {
            let r: number = _c2.r - _c1.r;
            let g: number = _c2.g - _c1.g;
            let b: number = _c2.b - _c1.b;

            let rGradiant: number = _c1.r + (r * _scale);
            let gGradiant: number = _c1.g + (g * _scale);
            let bGradiant: number = _c1.b + (b * _scale);

            return new ƒ.Color(rGradiant, gGradiant, bGradiant, 1);
        }

    }
}