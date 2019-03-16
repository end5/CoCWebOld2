define(["require", "exports", "./ScreenElement"], function (require, exports, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextElement extends ScreenElement_1.ScreenElement {
        text(text) {
            this.element.innerHTML += text;
        }
        clear() {
            while (this.element.lastChild) {
                this.element.removeChild(this.element.lastChild);
            }
            this.element.innerHTML = "";
        }
    }
    exports.TextElement = TextElement;
});
//# sourceMappingURL=TextElement.js.map