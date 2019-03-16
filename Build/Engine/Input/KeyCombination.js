define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KeyCombination {
        constructor(keyCode) {
            this.keyCode = 0;
            this.shiftKey = false;
            this.altKey = false;
            this.ctrlKey = false;
            this.metaKey = false;
            if (keyCode)
                this.keyCode = keyCode;
        }
        clone() {
            const newKeyComb = new KeyCombination();
            newKeyComb.keyCode = this.keyCode;
            newKeyComb.shiftKey = this.shiftKey;
            newKeyComb.altKey = this.altKey;
            newKeyComb.ctrlKey = this.ctrlKey;
            newKeyComb.metaKey = this.metaKey;
            return newKeyComb;
        }
        toString() {
            return (this.shiftKey ? "Shift + " : "") +
                (this.ctrlKey ? "Ctrl + " : "") +
                (this.altKey ? "Alt + " : "") +
                (this.metaKey ? "Meta + " : "") +
                String.fromCharCode(this.keyCode);
        }
        serialize() {
            return {
                keyCode: this.keyCode,
                shiftKey: this.shiftKey,
                altKey: this.altKey,
                ctrlKey: this.ctrlKey,
                metaKey: this.metaKey
            };
        }
        deserialize(saveObject) {
            if (saveObject.keyCode) {
                this.keyCode = saveObject.keyCode;
            }
            if (saveObject.shiftKey) {
                this.shiftKey = saveObject.shiftKey;
            }
            if (saveObject.altKey) {
                this.altKey = saveObject.altKey;
            }
            if (saveObject.ctrlKey) {
                this.ctrlKey = saveObject.ctrlKey;
            }
            if (saveObject.metaKey) {
                this.metaKey = saveObject.metaKey;
            }
        }
    }
    exports.KeyCombination = KeyCombination;
});
//# sourceMappingURL=KeyCombination.js.map