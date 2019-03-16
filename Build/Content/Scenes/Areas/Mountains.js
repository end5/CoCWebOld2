define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MountainsFlags = Flags_1.Flags.register("Mountain", {
        TIMES_EXPLORED: 0,
    });
    function exploreMountain(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreMountain = exploreMountain;
});
//# sourceMappingURL=Mountains.js.map