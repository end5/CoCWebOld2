define(["require", "exports", "Engine/Display/ContentView", "./MainMenu"], function (require, exports, ContentView_1, MainMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function creditsMenu() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b>Credits</b>\n");
        return { next: MainMenu_1.mainMenu };
    }
    exports.creditsMenu = creditsMenu;
});
//# sourceMappingURL=CreditsMenu.js.map