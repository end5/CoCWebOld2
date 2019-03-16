define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WeightedDrop {
        constructor(first, firstWeight = 0) {
            this.items = [];
            this.sum = 0;
            if (first) {
                this.items.push([first, firstWeight]);
                this.sum += firstWeight;
            }
        }
        add(item, weight = 1) {
            this.items.push([item, weight]);
            this.sum += weight;
            return this;
        }
        addMany(weight, ...items) {
            for (const item of items) {
                this.items.push([item, weight]);
                this.sum += weight;
            }
            return this;
        }
        // you can pass your own random value from 0 to 1 (so you can use your own RNG)
        roll() {
            let random = Math.random() * this.sum;
            let item;
            while (random > 0 && this.items.length > 0) {
                const pair = this.items.shift();
                if (pair) {
                    item = pair[0];
                    random -= pair[1];
                }
            }
            return item;
        }
    }
    exports.WeightedDrop = WeightedDrop;
});
//# sourceMappingURL=WeightedDrop.js.map