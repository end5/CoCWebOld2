define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BogFlags = Flags_1.Flags.register("Bog", {
        TIMES_EXPLORED: 0,
    });
    function exploreBog(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreBog = exploreBog;
});
//# sourceMappingURL=Bog.js.map