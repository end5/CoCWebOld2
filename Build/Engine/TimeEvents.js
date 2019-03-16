define(["require", "exports", "./CharDict", "./Utilities/Dictionary"], function (require, exports, CharDict_1, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeEventManager extends Dictionary_1.Dictionary {
        constructor() {
            super(...arguments);
            this.currentIndex = 0;
        }
        update(hours) {
        }
        runEvents(times, index = 0) {
            let nextScreen;
            const events = this.entries();
            while (!nextScreen && this.currentIndex < events.length) {
                nextScreen = events[this.currentIndex][1](CharDict_1.CharDict.player);
                this.currentIndex++;
            }
            if (this.currentIndex >= events.length) {
                this.currentIndex = 0;
                return;
            }
            if (nextScreen === true)
                return { next: ((player) => this.runEvents(times, index)) };
            return nextScreen;
        }
    }
    exports.TimeEvents = new TimeEventManager();
});
//# sourceMappingURL=TimeEvents.js.map