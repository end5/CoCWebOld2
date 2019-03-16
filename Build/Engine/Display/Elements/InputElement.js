define(["require", "exports", "./ScreenElement"], function (require, exports, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InputElement extends ScreenElement_1.ScreenElement {
        constructor(type, htmlElement) {
            super(htmlElement);
            this.element.type = type;
        }
        get type() {
            return this.element.type;
        }
        set type(type) {
            this.element.type = type;
        }
        select() {
            this.element.select();
        }
        get value() {
            return this.element.value;
        }
        set value(value) {
            this.element.value = value;
        }
    }
    exports.InputElement = InputElement;
});
//# sourceMappingURL=InputElement.js.map