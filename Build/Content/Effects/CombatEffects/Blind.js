define(["require", "exports", "Content/Character/CharacterType", "Engine/Display/ContentView", "Content/Effects/EffectType", "Engine/Effects/Effect"], function (require, exports, CharacterType_1, ContentView_1, EffectType_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Blind extends Effect_1.Effect {
        combatTurnStart(character, enemy) {
            const blindEffect = character.effects.getByName(EffectType_1.EffectType.Blind);
            if (character.charType === CharacterType_1.CharacterType.Player && !enemy.effects.has(EffectType_1.EffectType.Sandstorm)) {
                if (character.effects.has(EffectType_1.EffectType.SheilaOil)) {
                    if (!blindEffect.values.combatExpire || blindEffect.values.combatExpire <= 0) {
                        character.effects.removeByName(EffectType_1.EffectType.Blind);
                        ContentView_1.CView.text("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>");
                    }
                    else {
                        blindEffect.values.combatExpire--;
                        ContentView_1.CView.text("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>");
                    }
                }
                else {
                    // Remove blind if countdown to 0
                    if (!blindEffect.values.combatExpire || blindEffect.values.combatExpire === 0) {
                        character.effects.removeByName(EffectType_1.EffectType.Blind);
                        // Alert PC that blind is gone if no more stacks are there.
                        if (!character.effects.has(EffectType_1.EffectType.Blind)) {
                            ContentView_1.CView.text("<b>Your eyes have cleared and you are no longer blind!</b>");
                        }
                        else
                            ContentView_1.CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                    }
                    else {
                        blindEffect.values.combatExpire--;
                        ContentView_1.CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                    }
                }
            }
            else {
                if (!blindEffect.values.combatExpire || blindEffect.values.combatExpire <= 0) {
                    character.effects.removeByName(EffectType_1.EffectType.Blind);
                    ContentView_1.CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " no longer blind!</b>");
                }
                else {
                    blindEffect.values.combatExpire -= 1;
                    ContentView_1.CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " currently blind!</b>");
                }
            }
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.Blind = Blind;
});
//# sourceMappingURL=Blind.js.map