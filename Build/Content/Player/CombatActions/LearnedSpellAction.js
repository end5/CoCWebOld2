define(["require", "exports", "./PlayerSpellAction", "Content/Effects/EffectType", "../PlayerFlags", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType"], function (require, exports, PlayerSpellAction_1, EffectType_1, PlayerFlags_1, ContentView_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LearnedSpellAction extends PlayerSpellAction_1.PlayerSpellAction {
        constructor() {
            super(...arguments);
            this.type = CombatActionType_1.CombatActionType.Spells;
        }
        use(character, enemy) {
            PlayerFlags_1.PlayerFlags.SPELLS_CAST++;
            this.spellPerkUnlock(character);
            super.use(character, enemy);
        }
        spellPerkUnlock(character) {
            let spellAffEffect = character.effects.getByName(EffectType_1.EffectType.SpellcastingAffinity);
            if (PlayerFlags_1.PlayerFlags.SPELLS_CAST >= 5 && !spellAffEffect) {
                ContentView_1.CView.text("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
                spellAffEffect = character.effects.create(EffectType_1.EffectType.SpellcastingAffinity, { spellCost: 20 });
            }
            if (spellAffEffect && spellAffEffect.values.spellCost) {
                if (PlayerFlags_1.PlayerFlags.SPELLS_CAST >= 15 && spellAffEffect.values.spellCost < 35) {
                    ContentView_1.CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
                    spellAffEffect.values.spellCost = 35;
                }
                if (PlayerFlags_1.PlayerFlags.SPELLS_CAST >= 45 && spellAffEffect.values.spellCost < 50) {
                    ContentView_1.CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
                    spellAffEffect.values.spellCost = 50;
                }
            }
        }
    }
    exports.LearnedSpellAction = LearnedSpellAction;
});
//# sourceMappingURL=LearnedSpellAction.js.map