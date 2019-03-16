define(["require", "exports", "Engine/Display/ContentView", "./PassTime"], function (require, exports, ContentView_1, PassTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function masturbateMenu(player) {
        player.stats.lust = 0;
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Placeholder. Lust gone.");
        return { next: PassTime_1.passTime(1) };
    }
    exports.masturbateMenu = masturbateMenu;
});
//# sourceMappingURL=Masturbate.js.map