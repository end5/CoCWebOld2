define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BottomButtons {
        constructor() {
            this.buttons = [];
        }
        get(buttonNumber) {
            return this.buttons[buttonNumber];
        }
        show() {
            for (let buttonNumber = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
                this.buttons[buttonNumber].show();
            }
        }
        hide() {
            for (let buttonNumber = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
                this.buttons[buttonNumber].hide();
            }
        }
    }
    BottomButtons.NUM_BOT_BUTTONS = 10;
    BottomButtons.NEXT_BUTTON_ID = 0;
    BottomButtons.BACK_BUTTON_ID = BottomButtons.NUM_BOT_BUTTONS - 1;
    BottomButtons.YES_BUTTON_ID = 0;
    BottomButtons.NO_BUTTON_ID = 1;
    exports.BottomButtons = BottomButtons;
});
//# sourceMappingURL=BottomButtons.js.map