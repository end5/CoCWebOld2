define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ovipositor {
        constructor() {
            this.unfertileEggs = 0;
            this.fertileEggs = 0;
        }
        get eggs() {
            return this.unfertileEggs;
        }
        set eggs(value) {
            this.unfertileEggs = this.unfertileEggs > 50 ? 50 : value;
        }
        get fertilizedEggs() {
            return this.fertileEggs;
        }
        set fertilizedEggs(value) {
            this.fertileEggs = this.fertileEggs > 50 ? 50 : value;
        }
        canOviposit() {
            return this.unfertileEggs >= 10 ? true : false;
        }
        dumpEggs() {
            this.unfertileEggs = 0;
            this.fertilizeEggs();
        }
        fertilizeEggs() {
            this.fertileEggs = this.unfertileEggs;
            return this.fertileEggs;
        }
        serialize() {
            return {
                unfertileEggs: this.unfertileEggs,
                fertileEggs: this.fertileEggs
            };
        }
        deserialize(saveObject) {
            this.unfertileEggs = saveObject.unfertileEggs;
            this.fertileEggs = saveObject.fertileEggs;
        }
    }
    exports.Ovipositor = Ovipositor;
});
//# sourceMappingURL=Ovipositor.js.map