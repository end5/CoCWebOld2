define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * These values should be bit flags.
     */
    var CombatActionType;
    (function (CombatActionType) {
        CombatActionType[CombatActionType["None"] = 0] = "None";
        CombatActionType[CombatActionType["Attack"] = 1] = "Attack";
        CombatActionType[CombatActionType["Tease"] = 2] = "Tease";
        CombatActionType[CombatActionType["Spells"] = 4] = "Spells";
        CombatActionType[CombatActionType["Items"] = 8] = "Items";
        CombatActionType[CombatActionType["MoveAway"] = 16] = "MoveAway";
        CombatActionType[CombatActionType["PhysSpec"] = 32] = "PhysSpec";
        CombatActionType[CombatActionType["MagicSpec"] = 64] = "MagicSpec";
        CombatActionType[CombatActionType["Wait"] = 128] = "Wait";
        CombatActionType[CombatActionType["Fantasize"] = 256] = "Fantasize";
        CombatActionType[CombatActionType["All"] = 511] = "All";
    })(CombatActionType = exports.CombatActionType || (exports.CombatActionType = {}));
});
//# sourceMappingURL=CombatActionType.js.map