define(["require", "exports", "./ScreenElement"], function (require, exports, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UnorderedListElement extends ScreenElement_1.ScreenElement {
        constructor(htmlElement) {
            super(htmlElement);
            this.list = [];
        }
        appendChild(element) {
            super.appendChild(element);
            this.list.push(element);
        }
        get(index) {
            if (index >= this.list.length)
                return;
            return this.list[index];
        }
        remove(index) {
            if (index > 0 && index < this.list.length) {
                this.removeChild(this.list.splice(index, 1)[0]);
            }
        }
        count() {
            return this.list.length;
        }
    }
    exports.UnorderedListElement = UnorderedListElement;
});
//# sourceMappingURL=UnorderedListElement.js.map