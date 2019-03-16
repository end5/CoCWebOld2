define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControlledBreath extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.cor >= 30)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.description();
        }
        constructor() {
            super(EffectType_1.EffectType.ControlledBreath, "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
        }
    }
    exports.ControlledBreath = ControlledBreath;
});
//# sourceMappingURL=ControlledBreath.js.map