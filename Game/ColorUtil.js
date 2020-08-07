"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class ColorUtil {
        static changeColor(_node, _scale, _color1, _color2) {
            let mat = _node.getComponent(ƒ.ComponentMaterial);
            if (mat != null) {
                let coat = mat.material.getCoat();
                coat.color = ColorUtil.GRADIENT(_color1, _color2, _scale);
            }
            for (let child of _node.getChildren()) {
                ColorUtil.changeColor(child, _scale, _color1, _color2);
            }
        }
        static GRADIENT(_c1, _c2, _scale) {
            let r = _c2.r - _c1.r;
            let g = _c2.g - _c1.g;
            let b = _c2.b - _c1.b;
            let rGradiant = _c1.r + (r * _scale);
            let gGradiant = _c1.g + (g * _scale);
            let bGradiant = _c1.b + (b * _scale);
            return new ƒ.Color(rGradiant, gGradiant, bGradiant, 1);
        }
    }
    Game.ColorUtil = ColorUtil;
})(Game || (Game = {}));
//# sourceMappingURL=ColorUtil.js.map