define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enlightened extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.cor >= 10)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.description();
        }
        constructor() {
            super(EffectType_1.EffectType.Enlightened, "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
        }
    }
    exports.Enlightened = Enlightened;
});
//# sourceMappingURL=Enlightened.js.map