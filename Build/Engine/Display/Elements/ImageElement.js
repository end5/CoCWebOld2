define(["require", "exports", "./ScreenElement"], function (require, exports, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageElement extends ScreenElement_1.ScreenElement {
        load(location) {
            this.element.src = location;
        }
    }
    exports.ImageElement = ImageElement;
});
//# sourceMappingURL=ImageElement.js.map