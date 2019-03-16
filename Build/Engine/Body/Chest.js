define(["require", "exports", "./BreastRow", "Engine/Utilities/ObservableList"], function (require, exports, BreastRow_1, ObservableList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Chest extends ObservableList_1.ObservableList {
        constructor() {
            super();
            this.add(new BreastRow_1.BreastRow());
        }
        get firstRow() {
            if (this.list.length <= 0)
                throw new Error('No breast rows exist');
            return this.list[0];
        }
        add(newBreastRow) {
            if (this.list.length < 10)
                this.list.push(newBreastRow);
        }
        remove(index) {
            if (this.length - 1 >= 1)
                super.remove(index);
        }
        clear() {
            while (this.length > 1)
                this.remove(0);
        }
        lactationSpeed() {
            // Lactation * breastSize x 10 (milkPerBreast) determines scene
            return this.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier * this.sort(BreastRow_1.BreastRow.Largest).get(0).rating * 10;
        }
    }
    exports.Chest = Chest;
});
//# sourceMappingURL=Chest.js.map