import { PlayerSpellAction } from './PlayerSpellAction';
import { Character } from 'Content/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { PlayerFlags } from '../PlayerFlags';
import { CView } from 'Engine/Display/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export abstract class LearnedSpellAction extends PlayerSpellAction {
    public type = CombatActionType.Spells;

    public use(character: Character, enemy: Character): void {
        PlayerFlags.SPELLS_CAST++;
        this.spellPerkUnlock(character);
        super.use(character, enemy);
    }

    protected spellPerkUnlock(character: Character): void {
        let spellAffEffect = character.effects.getByName(EffectType.SpellcastingAffinity);
        if (PlayerFlags.SPELLS_CAST >= 5 && !spellAffEffect) {
            CView.text("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            spellAffEffect = character.effects.create(EffectType.SpellcastingAffinity, { spellCost: 20 });
        }

        if (spellAffEffect && spellAffEffect.values.spellCost) {
            if (PlayerFlags.SPELLS_CAST >= 15 && spellAffEffect.values.spellCost < 35) {
                CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
                spellAffEffect.values.spellCost = 35;
            }
            if (PlayerFlags.SPELLS_CAST >= 45 && spellAffEffect.values.spellCost < 50) {
                CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
                spellAffEffect.values.spellCost = 50;
            }
        }
    }
}
