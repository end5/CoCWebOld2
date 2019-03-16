define(["require", "exports", "./Nipples"], function (require, exports, Nipples_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BreastCup;
    (function (BreastCup) {
        BreastCup[BreastCup["FLAT"] = 0] = "FLAT";
        BreastCup[BreastCup["A"] = 1] = "A";
        BreastCup[BreastCup["B"] = 2] = "B";
        BreastCup[BreastCup["C"] = 3] = "C";
        BreastCup[BreastCup["D"] = 4] = "D";
        BreastCup[BreastCup["DD"] = 5] = "DD";
        BreastCup[BreastCup["DD_BIG"] = 6] = "DD_BIG";
        BreastCup[BreastCup["E"] = 7] = "E";
        BreastCup[BreastCup["E_BIG"] = 8] = "E_BIG";
        BreastCup[BreastCup["EE"] = 9] = "EE";
        BreastCup[BreastCup["EE_BIG"] = 10] = "EE_BIG";
        BreastCup[BreastCup["F"] = 11] = "F";
        BreastCup[BreastCup["F_BIG"] = 12] = "F_BIG";
        BreastCup[BreastCup["FF"] = 13] = "FF";
        BreastCup[BreastCup["FF_BIG"] = 14] = "FF_BIG";
        BreastCup[BreastCup["G"] = 15] = "G";
        BreastCup[BreastCup["G_BIG"] = 16] = "G_BIG";
        BreastCup[BreastCup["GG"] = 17] = "GG";
        BreastCup[BreastCup["GG_BIG"] = 18] = "GG_BIG";
        BreastCup[BreastCup["H"] = 19] = "H";
        BreastCup[BreastCup["H_BIG"] = 20] = "H_BIG";
        BreastCup[BreastCup["HH"] = 21] = "HH";
        BreastCup[BreastCup["HH_BIG"] = 22] = "HH_BIG";
        BreastCup[BreastCup["HHH"] = 23] = "HHH";
        BreastCup[BreastCup["I"] = 24] = "I";
        BreastCup[BreastCup["I_BIG"] = 25] = "I_BIG";
        BreastCup[BreastCup["II"] = 26] = "II";
        BreastCup[BreastCup["II_BIG"] = 27] = "II_BIG";
        BreastCup[BreastCup["J"] = 28] = "J";
        BreastCup[BreastCup["J_BIG"] = 29] = "J_BIG";
        BreastCup[BreastCup["JJ"] = 30] = "JJ";
        BreastCup[BreastCup["JJ_BIG"] = 31] = "JJ_BIG";
        BreastCup[BreastCup["K"] = 32] = "K";
        BreastCup[BreastCup["K_BIG"] = 33] = "K_BIG";
        BreastCup[BreastCup["KK"] = 34] = "KK";
        BreastCup[BreastCup["KK_BIG"] = 35] = "KK_BIG";
        BreastCup[BreastCup["L"] = 36] = "L";
        BreastCup[BreastCup["L_BIG"] = 37] = "L_BIG";
        BreastCup[BreastCup["LL"] = 38] = "LL";
        BreastCup[BreastCup["LL_BIG"] = 39] = "LL_BIG";
        BreastCup[BreastCup["M"] = 40] = "M";
        BreastCup[BreastCup["M_BIG"] = 41] = "M_BIG";
        BreastCup[BreastCup["MM"] = 42] = "MM";
        BreastCup[BreastCup["MM_BIG"] = 43] = "MM_BIG";
        BreastCup[BreastCup["MMM"] = 44] = "MMM";
        BreastCup[BreastCup["MMM_LARGE"] = 45] = "MMM_LARGE";
        BreastCup[BreastCup["N"] = 46] = "N";
        BreastCup[BreastCup["N_LARGE"] = 47] = "N_LARGE";
        BreastCup[BreastCup["NN"] = 48] = "NN";
        BreastCup[BreastCup["NN_LARGE"] = 49] = "NN_LARGE";
        BreastCup[BreastCup["O"] = 50] = "O";
        BreastCup[BreastCup["O_LARGE"] = 51] = "O_LARGE";
        BreastCup[BreastCup["OO"] = 52] = "OO";
        BreastCup[BreastCup["OO_LARGE"] = 53] = "OO_LARGE";
        BreastCup[BreastCup["P"] = 54] = "P";
        BreastCup[BreastCup["P_LARGE"] = 55] = "P_LARGE";
        BreastCup[BreastCup["PP"] = 56] = "PP";
        BreastCup[BreastCup["PP_LARGE"] = 57] = "PP_LARGE";
        BreastCup[BreastCup["Q"] = 58] = "Q";
        BreastCup[BreastCup["Q_LARGE"] = 59] = "Q_LARGE";
        BreastCup[BreastCup["QQ"] = 60] = "QQ";
        BreastCup[BreastCup["QQ_LARGE"] = 61] = "QQ_LARGE";
        BreastCup[BreastCup["R"] = 62] = "R";
        BreastCup[BreastCup["R_LARGE"] = 63] = "R_LARGE";
        BreastCup[BreastCup["RR"] = 64] = "RR";
        BreastCup[BreastCup["RR_LARGE"] = 65] = "RR_LARGE";
        BreastCup[BreastCup["S"] = 66] = "S";
        BreastCup[BreastCup["S_LARGE"] = 67] = "S_LARGE";
        BreastCup[BreastCup["SS"] = 68] = "SS";
        BreastCup[BreastCup["SS_LARGE"] = 69] = "SS_LARGE";
        BreastCup[BreastCup["T"] = 70] = "T";
        BreastCup[BreastCup["T_LARGE"] = 71] = "T_LARGE";
        BreastCup[BreastCup["TT"] = 72] = "TT";
        BreastCup[BreastCup["TT_LARGE"] = 73] = "TT_LARGE";
        BreastCup[BreastCup["U"] = 74] = "U";
        BreastCup[BreastCup["U_LARGE"] = 75] = "U_LARGE";
        BreastCup[BreastCup["UU"] = 76] = "UU";
        BreastCup[BreastCup["UU_LARGE"] = 77] = "UU_LARGE";
        BreastCup[BreastCup["V"] = 78] = "V";
        BreastCup[BreastCup["V_LARGE"] = 79] = "V_LARGE";
        BreastCup[BreastCup["VV"] = 80] = "VV";
        BreastCup[BreastCup["VV_LARGE"] = 81] = "VV_LARGE";
        BreastCup[BreastCup["W"] = 82] = "W";
        BreastCup[BreastCup["W_LARGE"] = 83] = "W_LARGE";
        BreastCup[BreastCup["WW"] = 84] = "WW";
        BreastCup[BreastCup["WW_LARGE"] = 85] = "WW_LARGE";
        BreastCup[BreastCup["X"] = 86] = "X";
        BreastCup[BreastCup["X_LARGE"] = 87] = "X_LARGE";
        BreastCup[BreastCup["XX"] = 88] = "XX";
        BreastCup[BreastCup["XX_LARGE"] = 89] = "XX_LARGE";
        BreastCup[BreastCup["Y"] = 90] = "Y";
        BreastCup[BreastCup["Y_LARGE"] = 91] = "Y_LARGE";
        BreastCup[BreastCup["YY"] = 92] = "YY";
        BreastCup[BreastCup["YY_LARGE"] = 93] = "YY_LARGE";
        BreastCup[BreastCup["Z"] = 94] = "Z";
        BreastCup[BreastCup["Z_LARGE"] = 95] = "Z_LARGE";
        BreastCup[BreastCup["ZZ"] = 96] = "ZZ";
        BreastCup[BreastCup["ZZ_LARGE"] = 97] = "ZZ_LARGE";
        BreastCup[BreastCup["ZZZ"] = 98] = "ZZZ";
        BreastCup[BreastCup["ZZZ_LARGE"] = 99] = "ZZZ_LARGE";
    })(BreastCup = exports.BreastCup || (exports.BreastCup = {}));
    class BreastRow {
        constructor(rating = BreastCup.C, lactationMultiplier = 0) {
            this.nipples = new Nipples_1.Nipples();
            this.count = 2;
            this.rating = rating;
            this.lactationMultiplier = lactationMultiplier;
        }
        serialize() {
            return {
                rating: this.rating,
                lactationMultiplier: this.lactationMultiplier,
                nipples: this.nipples.serialize(),
                count: this.count
            };
        }
        deserialize(saveObject) {
            this.rating = saveObject.rating;
            this.lactationMultiplier = saveObject.lactationMultiplier;
            this.nipples.deserialize(saveObject.nipples);
            this.count = saveObject.count;
        }
    }
    BreastRow.Largest = (a, b) => {
        return a.rating - b.rating;
    };
    BreastRow.Smallest = (a, b) => {
        return b.rating - a.rating;
    };
    BreastRow.LactationMost = (a, b) => {
        return a.lactationMultiplier - b.lactationMultiplier;
    };
    BreastRow.LactationLeast = (a, b) => {
        return b.lactationMultiplier - a.lactationMultiplier;
    };
    BreastRow.NipplesPerBreastMost = (a, b) => {
        return a.nipples.count - b.nipples.count;
    };
    BreastRow.NipplesPerBreastLeast = (a, b) => {
        return b.nipples.count - a.nipples.count;
    };
    BreastRow.BreastsPerRowMost = (a, b) => {
        return a.count - b.count;
    };
    BreastRow.BreastsPerRowLeast = (a, b) => {
        return b.count - a.count;
    };
    BreastRow.HasNipples = (a) => {
        return a.nipples.count > 0;
    };
    BreastRow.FemaleBreasts = (a) => {
        return a.rating >= 1;
    };
    BreastRow.CanTitFuck = (a) => {
        return a.rating > 3;
    };
    BreastRow.FuckableNipples = (a) => {
        return a.nipples.fuckable;
    };
    BreastRow.NonFuckableNipples = (a) => {
        return !a.nipples.fuckable;
    };
    BreastRow.AverageSize = (previousValue, currentValue, _index, array) => {
        return previousValue + currentValue.rating / array.length;
    };
    BreastRow.AverageLactation = (previousValue, currentValue, _index, array) => {
        return previousValue + currentValue.lactationMultiplier / array.length;
    };
    BreastRow.AverageNipplesPerBreast = (previousValue, currentValue, _index, array) => {
        return previousValue + currentValue.nipples.count / array.length;
    };
    BreastRow.AverageNippleLength = (previousValue, currentValue, _index, array) => {
        return previousValue + currentValue.nipples.length / array.length;
    };
    BreastRow.TotalNipples = (previousValue, currentValue) => {
        return previousValue + currentValue.nipples.count;
    };
    BreastRow.TotalBreasts = (previousValue, currentValue) => {
        return previousValue + currentValue.count;
    };
    exports.BreastRow = BreastRow;
});
//# sourceMappingURL=BreastRow.js.map