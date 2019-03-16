define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeHandler {
        constructor() {
            this.hours = 0;
            this.days = 0;
        }
        get hour() {
            return this.hours;
        }
        /**
         * Increments the time forward by hours.
         * If hour goes over 24, a day is added.
         */
        set hour(value) {
            this.days += Math.floor(value / 24);
            this.hours = value % 24;
        }
        get day() {
            return this.days;
        }
        set day(value) {
            this.days = value;
        }
    }
    exports.Time = new TimeHandler();
});
//# sourceMappingURL=Time.js.map