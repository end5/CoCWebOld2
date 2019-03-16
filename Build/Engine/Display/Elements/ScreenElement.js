define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ScreenElement {
        constructor(htmlElement) {
            if (htmlElement)
                this.element = htmlElement;
        }
        get element() {
            if (this.htmlElement)
                return this.htmlElement;
            throw new Error("No html element");
        }
        set element(htmlElement) {
            this.htmlElement = htmlElement;
        }
        hide() {
            this.element.style.visibility = "hidden";
        }
        show() {
            this.element.style.visibility = "visible";
        }
        appendChild(child) {
            child.element = this.element.appendChild(child.element);
        }
        removeChild(child) {
            this.element.removeChild(child.element);
        }
        get style() {
            return this.element.style;
        }
        get computedStyle() {
            return window.getComputedStyle(this.element);
        }
    }
    exports.ScreenElement = ScreenElement;
});
//# sourceMappingURL=ScreenElement.js.map