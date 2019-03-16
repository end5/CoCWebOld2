define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function randomChoice(item, ...items) {
        if (Array.isArray(item) && items.length === 0) {
            return item[Math.round(Math.random() * (item.length - 1))];
        }
        return (items.concat(item))[Math.round(Math.random() * (items.length - 1))];
    }
    exports.randomChoice = randomChoice;
    /**
     * Returns the floor of a random number from 0 to max. The maximum is exclusive and the minimum is inclusive.
     * @param max
     */
    function randInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    exports.randInt = randInt;
    function percentChance(percent) {
        if (percent > 100)
            percent = Math.random() * 100;
        return Math.random() * 100 < percent;
    }
    exports.percentChance = percentChance;
    function round(value, place = 1) {
        return Math.round(value * Math.pow(10, Math.floor(place))) / Math.pow(10, Math.floor(place));
    }
    exports.round = round;
});
//# sourceMappingURL=SMath.js.map