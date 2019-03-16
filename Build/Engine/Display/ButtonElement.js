define(["require", "exports", "./Elements/ScreenElement", "Engine/Utilities/SMath"], function (require, exports, ScreenElement_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ButtonElement extends ScreenElement_1.ScreenElement {
        constructor() {
            super();
            this.elementType = 'a';
            this.lock = false;
        }
        get element() {
            return super.element;
        }
        set element(htmlElement) {
            super.element = htmlElement;
            super.element.style.backgroundImage = "url('resource/ui/button" + SMath_1.randInt(10) + ".jpg')";
            super.element.className = "button";
        }
        /**
         * Modifies the text and click function in the button and shows the button.
         * @param text The text that appears on the button.
         * @param clickFunc The function that is called when clicked.
         * @param disable Whether or not the button should be clickable.
         */
        modify(text, clickFunc, disable = false) {
            this.element.textContent = text;
            this.disable();
            if (clickFunc) {
                this.clickFunc = clickFunc;
                if (!disable)
                    this.enable();
            }
            this.show();
        }
        enable() {
            if (!this.lock && this.clickFunc) {
                this.lock = true;
                this.element.addEventListener('click', this.clickFunc);
                this.element.style.color = ButtonElement.textColorActive;
            }
        }
        disable() {
            if (this.lock && this.clickFunc) {
                this.lock = false;
                this.element.removeEventListener('click', this.clickFunc);
            }
            this.element.style.color = ButtonElement.textColorInactive;
        }
    }
    ButtonElement.textColorActive = "Black";
    ButtonElement.textColorInactive = "DarkRed";
    exports.ButtonElement = ButtonElement;
});
//# sourceMappingURL=ButtonElement.js.map