define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loadFromId(id) {
        const element = document.getElementById(id);
        if (!element)
            throw new Error("Could not find " + id + " on page");
        return element;
    }
    exports.loadFromId = loadFromId;
    function loadFromClassName(classname, parentElement) {
        let element;
        if (parentElement.getElementsByClassName(classname).length !== 0)
            element = parentElement.getElementsByClassName(classname)[0];
        else
            throw new Error(classname + " was not found on " + parentElement.title);
        return element;
    }
    exports.loadFromClassName = loadFromClassName;
});
//# sourceMappingURL=Html.js.map