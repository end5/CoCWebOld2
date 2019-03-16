define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SwampFlags = Flags_1.Flags.register("Swamp", {
        TIMES_EXPLORED: 0,
    });
    function exploreSwamp(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreSwamp = exploreSwamp;
});
//# sourceMappingURL=Swamp.js.map