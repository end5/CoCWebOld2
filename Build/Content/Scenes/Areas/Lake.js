define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LakeFlags = Flags_1.Flags.register("Lake", {
        TIMES_EXPLORED: 0,
    });
    function exploreLake(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreLake = exploreLake;
});
//# sourceMappingURL=Lake.js.map