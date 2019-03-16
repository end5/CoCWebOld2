define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VaginaType;
    (function (VaginaType) {
        VaginaType[VaginaType["HUMAN"] = 0] = "HUMAN";
        VaginaType[VaginaType["BLACK_SAND_TRAP"] = 1] = "BLACK_SAND_TRAP";
    })(VaginaType = exports.VaginaType || (exports.VaginaType = {}));
    var VaginaWetness;
    (function (VaginaWetness) {
        VaginaWetness[VaginaWetness["DRY"] = 0] = "DRY";
        VaginaWetness[VaginaWetness["NORMAL"] = 1] = "NORMAL";
        VaginaWetness[VaginaWetness["WET"] = 2] = "WET";
        VaginaWetness[VaginaWetness["SLICK"] = 3] = "SLICK";
        VaginaWetness[VaginaWetness["DROOLING"] = 4] = "DROOLING";
        VaginaWetness[VaginaWetness["SLAVERING"] = 5] = "SLAVERING";
    })(VaginaWetness = exports.VaginaWetness || (exports.VaginaWetness = {}));
    var VaginaLooseness;
    (function (VaginaLooseness) {
        VaginaLooseness[VaginaLooseness["TIGHT"] = 0] = "TIGHT";
        VaginaLooseness[VaginaLooseness["NORMAL"] = 1] = "NORMAL";
        VaginaLooseness[VaginaLooseness["LOOSE"] = 2] = "LOOSE";
        VaginaLooseness[VaginaLooseness["GAPING"] = 3] = "GAPING";
        VaginaLooseness[VaginaLooseness["GAPING_WIDE"] = 4] = "GAPING_WIDE";
        VaginaLooseness[VaginaLooseness["LEVEL_CLOWN_CAR"] = 5] = "LEVEL_CLOWN_CAR";
    })(VaginaLooseness = exports.VaginaLooseness || (exports.VaginaLooseness = {}));
    class Vagina {
        constructor(wetness = VaginaWetness.NORMAL, looseness = VaginaLooseness.TIGHT, virgin = true, type = VaginaType.HUMAN) {
            // Used during sex to determine how full it currently is.  For multi-dick sex.
            this.fullness = 0;
            this.type = type;
            this.wetness = wetness;
            this.looseness = looseness;
            this.virgin = virgin;
        }
        wetnessFactor() {
            if (this.wetness === VaginaWetness.DRY)
                return 1.25;
            if (this.wetness === VaginaWetness.NORMAL)
                return 1;
            if (this.wetness === VaginaWetness.WET)
                return 0.8;
            if (this.wetness === VaginaWetness.SLICK)
                return 0.7;
            if (this.wetness === VaginaWetness.DROOLING)
                return 0.6;
            if (this.wetness === VaginaWetness.SLAVERING)
                return 0.5;
            return .5;
        }
        capacity() {
            if (this.looseness === VaginaLooseness.TIGHT)
                return 8;
            if (this.looseness === VaginaLooseness.NORMAL)
                return 16;
            if (this.looseness === VaginaLooseness.LOOSE)
                return 24;
            if (this.looseness === VaginaLooseness.GAPING)
                return 36;
            if (this.looseness === VaginaLooseness.GAPING_WIDE)
                return 56;
            if (this.looseness === VaginaLooseness.LEVEL_CLOWN_CAR)
                return 100;
            return 10000;
        }
        serialize() {
            return {
                type: this.type,
                virgin: this.virgin,
                wetness: this.wetness,
                looseness: this.looseness,
                fullness: this.fullness
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.virgin = saveObject.virgin;
            this.wetness = saveObject.wetness;
            this.looseness = saveObject.looseness;
            this.fullness = saveObject.fullness;
        }
    }
    Vagina.LoosenessMost = (a, b) => {
        return a.looseness - b.looseness;
    };
    Vagina.LoosenessLeast = (a, b) => {
        return b.looseness - a.looseness;
    };
    Vagina.WetnessMost = (a, b) => {
        return a.wetness - b.wetness;
    };
    Vagina.WetnessLeast = (a, b) => {
        return b.wetness - a.wetness;
    };
    Vagina.Virgin = (a) => {
        return a.virgin;
    };
    Vagina.NotVirgin = (a) => {
        return !a.virgin;
    };
    Vagina.AverageLooseness = (previousValue, currentValue, index, array) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.looseness) / index;
        return previousValue + currentValue.looseness;
    };
    Vagina.AverageWetness = (previousValue, currentValue, index, array) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.wetness) / index;
        return previousValue + currentValue.wetness;
    };
    exports.Vagina = Vagina;
});
//# sourceMappingURL=Vagina.js.map