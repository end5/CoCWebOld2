define(["require", "exports", "./Womb", "Engine/Utilities/SMath"], function (require, exports, Womb_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ButtWomb extends Womb_1.Womb {
        knockUp(pregnancy, event, virility = 100, guarantee) {
            if (!this.pregnancy && (guarantee || this.body.fertility > SMath_1.randInt(virility))) {
                this.currentPregnancy = pregnancy;
                this.pregEvent = event;
            }
        }
    }
    exports.ButtWomb = ButtWomb;
});
//# sourceMappingURL=ButtWomb.js.map