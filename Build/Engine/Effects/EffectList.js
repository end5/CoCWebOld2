define(["require", "exports", "./Effect", "Engine/Utilities/ObservableList", "./EffectConstructorLib", "Engine/Combat/Actions/CombatActionType"], function (require, exports, Effect_1, ObservableList_1, EffectConstructorLib_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EffectList extends ObservableList_1.ObservableList {
        create(key, values) {
            let newEffect;
            const effectConstr = EffectConstructorLib_1.EffectConstructorLib.get(key);
            if (effectConstr) {
                newEffect = new effectConstr(key, values);
            }
            newEffect = new Effect_1.Effect(key, values);
            this.add(newEffect);
            return newEffect;
        }
        getByName(name) {
            return this.list.find((effect) => effect.type === name);
        }
        removeByName(name) {
            const index = this.list.findIndex((effect) => effect.type === name);
            if (index !== -1)
                this.remove(index);
            return index !== -1;
        }
        has(name) {
            return this.list.some((effect) => effect.type === name);
        }
        get blockedCombatActions() {
            let flags = CombatActionType_1.CombatActionType.None;
            for (const effect of this) {
                if (effect && effect.values.blockedTypes)
                    flags &= effect.values.blockedTypes;
            }
            return flags;
        }
    }
    exports.EffectList = EffectList;
});
//# sourceMappingURL=EffectList.js.map