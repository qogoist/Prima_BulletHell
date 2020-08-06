"use strict";
var Game;
(function (Game) {
    var ƒ = FudgeCore;
    class ColorUtil {
        static changeColor(_node, _scale) {
            let mat = _node.getComponent(ƒ.ComponentMaterial);
            if (mat != null) {
                let clr = ƒ.Color.MULTIPLY(ƒ.Color.CSS(Game.config.Colors[Game.color]), new ƒ.Color(_scale, _scale, _scale, 1));
                clr.add(mat.clrPrimary);
                mat.clrPrimary = ColorUtil.NORMALIZE(clr);
            }
            for (let child of _node.getChildren()) {
                ColorUtil.changeColor(child, _scale);
            }
        }
        static NORMALIZE(_clr) {
            let tempVec = new ƒ.Vector3(_clr.r, _clr.g, _clr.b);
            tempVec.normalize(1);
            return new ƒ.Color(tempVec.x, tempVec.y, tempVec.z, 1);
        }
    }
    Game.ColorUtil = ColorUtil;
})(Game || (Game = {}));
//# sourceMappingURL=ColorUtil.js.map