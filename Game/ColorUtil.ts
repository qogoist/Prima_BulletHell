namespace Game {
    import ƒ = FudgeCore;

    export class ColorUtil {
        public static changeColor(_node: ƒ.Node, _scale: number): void {

            let mat: ƒ.ComponentMaterial = _node.getComponent(ƒ.ComponentMaterial);
            if (mat != null) {
                let clr: ƒ.Color = ƒ.Color.MULTIPLY(ƒ.Color.CSS(config.Colors[color]), new ƒ.Color(_scale, _scale, _scale, 1));
                clr.add(mat.clrPrimary);

                mat.clrPrimary = ColorUtil.NORMALIZE(clr);
            }

            for (let child of _node.getChildren()) {
                ColorUtil.changeColor(child, _scale);
            }
        }

        private static NORMALIZE(_clr: ƒ.Color): ƒ.Color {
            let tempVec: ƒ.Vector3 = new ƒ.Vector3(_clr.r, _clr.g, _clr.b);
            tempVec.normalize(1);

            return new ƒ.Color(tempVec.x, tempVec.y, tempVec.z, 1);
        }

    }
}