define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlainsFlags = Flags_1.Flags.register("Plains", {
        TIMES_EXPLORED: 0,
    });
    function explorePlains(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.explorePlains = explorePlains;
});
//# sourceMappingURL=Plains.js.map