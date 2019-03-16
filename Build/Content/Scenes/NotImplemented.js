define(["require", "exports", "Engine/Display/ContentView", "Content/Scenes/PassTime"], function (require, exports, ContentView_1, PassTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sceneNotImplimented() {
        ContentView_1.CView.clear().text("Not Implemented");
        return { next: PassTime_1.passTime(1) };
    }
    exports.sceneNotImplimented = sceneNotImplimented;
});
//# sourceMappingURL=NotImplemented.js.map