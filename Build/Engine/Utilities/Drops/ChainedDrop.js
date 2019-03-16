define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ChainedDrop {
        constructor(defaultItem) {
            this.items = [];
            this.probs = [];
            this.defaultItem = defaultItem;
        }
        add(item, prob) {
            if (prob < 0 || prob > 1) {
                console.error("Invalid probability value " + prob);
            }
            this.items.push(item);
            this.probs.push(prob);
            return this;
        }
        elseDrop(item) {
            this.defaultItem = item;
            return this;
        }
        roll() {
            for (let i = 0; i < this.items.length; i++) {
                if (Math.random() < this.probs[i])
                    return this.items[i];
            }
            return this.defaultItem;
        }
    }
    exports.ChainedDrop = ChainedDrop;
});
//# sourceMappingURL=ChainedDrop.js.map