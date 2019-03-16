define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // from https://gist.github.com/jed/982883
    function generateUUID(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUID);
    }
    exports.generateUUID = generateUUID;
});
//# sourceMappingURL=Uuid.js.map