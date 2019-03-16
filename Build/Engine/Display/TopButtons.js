define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TopButtons {
        constructor() {
            this.buttons = [];
        }
        get(buttonNumber) {
            return this.buttons[buttonNumber];
        }
        show() {
            for (let buttonNumber = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
                this.buttons[buttonNumber].show();
            }
        }
        hide() {
            for (let buttonNumber = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
                this.buttons[buttonNumber].hide();
            }
        }
        get mainMenu() {
            return this.buttons[0];
        }
        get data() {
            return this.buttons[1];
        }
        get stats() {
            return this.buttons[2];
        }
        get levelUp() {
            return this.buttons[3];
        }
        get perks() {
            return this.buttons[4];
        }
        get appearance() {
            return this.buttons[5];
        }
    }
    TopButtons.NUM_TOP_BUTTONS = 6;
    exports.TopButtons = TopButtons;
});
//# sourceMappingURL=TopButtons.js.map