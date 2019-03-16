define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isValentine() {
        const date = new Date(Date.now());
        const day = date.getDay();
        const month = date.getMonth();
        return (day >= 13 && day <= 15 && month === 1);
    }
    exports.isValentine = isValentine;
    function isEaster() {
        const date = new Date(Date.now());
        const day = date.getDay();
        const month = date.getMonth();
        return (day >= 30 && day <= 31 && month === 2) || (month === 3 && day <= 1);
    }
    exports.isEaster = isEaster;
    function isHalloween() {
        const date = new Date(Date.now());
        const day = date.getDay();
        const month = date.getMonth();
        return ((day >= 28 && month === 9) || (day < 2 && month === 10));
    }
    exports.isHalloween = isHalloween;
    function isThanksgiving() {
        const date = new Date(Date.now());
        const day = date.getDay();
        const month = date.getMonth();
        return ((day >= 21 && month === 10) && (day < 30 && month === 10));
    }
    exports.isThanksgiving = isThanksgiving;
    function isHolidays() {
        const date = new Date(Date.now());
        const day = date.getDay();
        const month = date.getMonth();
        return (day >= 25 && month === 11);
    }
    exports.isHolidays = isHolidays;
});
//# sourceMappingURL=Dates.js.map