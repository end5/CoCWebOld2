define(["require", "exports", "Engine/Flags"], function (require, exports, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Settings = Flags_1.Flags.register('Settings', {
        customFontSize: 1.5,
        lowStandards: false,
        hyperHappy: false,
        debug: false,
        easyMode: false,
        showSprites: false,
        sillyMode: false,
    });
});
//# sourceMappingURL=Settings.js.map