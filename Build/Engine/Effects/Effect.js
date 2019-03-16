define(["require", "exports", "./EffectDescLib"], function (require, exports, EffectDescLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Effect {
        constructor(type, values) {
            this.effectType = type;
            this.desc = EffectDescLib_1.EffectDescLib.get(name);
            this.effectValues = values ? values : {};
        }
        get values() {
            return this.effectValues;
        }
        get type() {
            return this.effectType;
        }
        combatStart(char) { }
        combatTurnStart(char, ...enemies) { }
        combatTurnEnd(char, ...enemies) { }
        combatEnd(char) { }
        serialize() {
            if (Object.keys(this.values).length > 0)
                return {
                    type: this.effectType,
                    values: this.values
                };
            else
                return { type: this.effectType };
        }
        deserialize(saveObject) {
            this.effectType = saveObject.type;
            if (saveObject.values)
                this.effectValues = saveObject.values;
        }
    }
    exports.Effect = Effect;
});
//# sourceMappingURL=Effect.js.map