define(["require", "exports", "./ScreenElement"], function (require, exports, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AnchorElement extends ScreenElement_1.ScreenElement {
        get href() {
            return this.element.href;
        }
        set href(link) {
            this.element.href = link;
        }
        get download() {
            return this.element.download;
        }
        set download(name) {
            this.element.download = name;
        }
        click() {
            this.element.click();
        }
    }
    exports.AnchorElement = AnchorElement;
});
//# sourceMappingURL=AnchorElement.js.map