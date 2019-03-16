define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefeatType;
    (function (DefeatType) {
        DefeatType[DefeatType["Special"] = 0] = "Special";
        DefeatType[DefeatType["HP"] = 1] = "HP";
        DefeatType[DefeatType["Lust"] = 2] = "Lust";
        DefeatType[DefeatType["Escape"] = 3] = "Escape";
    })(DefeatType = exports.DefeatType || (exports.DefeatType = {}));
    class DefeatEvent {
        constructor(victor, loser, how) {
            this.victor = victor;
            this.loser = loser;
            this.how = how;
        }
    }
    exports.DefeatEvent = DefeatEvent;
});
//# sourceMappingURL=DefeatEvent.js.map