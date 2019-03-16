define(["require", "exports", "Engine/Body/Pregnancy/Pregnancy", "./IncubationTime", "./PregnancyType", "Content/Items/Consumables/Eggs"], function (require, exports, Pregnancy_1, IncubationTime_1, PregnancyType_1, Eggs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EggPregnancy extends Pregnancy_1.Pregnancy {
        constructor(eggType, large, amount) {
            super(PregnancyType_1.PregnancyType.OVIELIXIR_EGGS, IncubationTime_1.IncubationTime.OVIELIXIR_EGGS);
            this.eggType = Eggs_1.EggType.Black;
            this.large = false;
            this.amount = 0;
            this.eggType = eggType;
            this.large = large;
            this.amount = amount;
        }
        serialize() {
            return Object.assign({
                eggType: this.eggType,
                large: this.large,
                amount: this.amount
            }, super.serialize());
        }
        deserialize(saveObject) {
            this.eggType = saveObject.eggType;
            this.large = saveObject.large;
            this.amount = saveObject.amount;
            super.deserialize(saveObject);
        }
    }
    exports.EggPregnancy = EggPregnancy;
});
//# sourceMappingURL=EggPregnancy.js.map