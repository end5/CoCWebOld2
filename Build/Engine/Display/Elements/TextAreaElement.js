define(["require", "exports", "./TextElement"], function (require, exports, TextElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextAreaElement extends TextElement_1.TextElement {
        select() {
            this.element.select();
        }
    }
    exports.TextAreaElement = TextAreaElement;
});
//# sourceMappingURL=TextAreaElement.js.map