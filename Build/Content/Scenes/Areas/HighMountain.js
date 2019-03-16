define(["require", "exports", "Engine/Flags", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HighMountainFlags = Flags_1.Flags.register("High Mountain", {
        TIMES_EXPLORED: 0,
    });
    function exploreHighMountain(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreHighMountain = exploreHighMountain;
});
//# sourceMappingURL=HighMountain.js.map