import { randInt } from '../../../../../Engine/Utilities/SMath';
import { FaceType } from '../../../../Body/Face';
import { Character } from '../../../../Character/Character';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class Bite extends PlayerPhysicalAction {
    public name: string = "Bite";
    public reasonCannotUse: string = "";
    public baseCost: number = 25;

    public isPossible(player: Player): boolean {
        return player.body.face.type === FaceType.SHARK_TEETH;
    }

    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reasonCannotUse = "You're too fatigued to use your shark-like jaws!";
            return false;
        }
        // Worms are special
        if (monster.desc.short === "worms") {
            this.reasonCannotUse = "There is no way those are going anywhere near your mouth!\n\n";
            return false;
        }
        return true;
    }

    public consumeComponents(char: Character, enemy: Character): void {
        char.stats.fatiguePhysical(this.baseCost);
    }

    public useAction(char: Character, enemy: Character): void {
        CView.clear();
        CView.text("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ");
        if (char.combat.effects.has(CombatEffectType.Blind))
            CView.text("In hindsight, trying to bite someone while blind was probably a bad idea... ");
    }

    public checkMiss(char: Character, enemy: Character): boolean {
        return (char.combat.effects.has(CombatEffectType.Blind) && randInt(3) !== 0) ||
            (enemy.stats.spe - char.stats.spe > 0 && Math.floor(randInt(((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80);
    }

    public missed(char: Character, enemy: Character): void {
        if (enemy.stats.spe - char.stats.spe < 8)
            CView.text(enemy.desc.capitalA + enemy.desc.short + " narrowly avoids your attack!");
        if (enemy.stats.spe - char.stats.spe >= 8 && enemy.stats.spe - char.stats.spe < 20)
            CView.text(enemy.desc.capitalA + enemy.desc.short + " dodges your attack with superior quickness!");
        if (enemy.stats.spe - char.stats.spe >= 20)
            CView.text(enemy.desc.capitalA + enemy.desc.short + " deftly avoids your slow attack.");
        CView.text("\n\n");
    }

    public calcDamage(char: Character, enemy: Character): IActionDamage {
        // Determine damage - str modified by enemy toughness!
        return { damage: Math.floor((char.stats.str + 45) - randInt(enemy.stats.tou) - enemy.combat.stats.defense()) };
    }

    public applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean): void {
        // Deal damage and update based on perks
        if (damage > 0) {
            damage *= enemy.combat.stats.attack(char);
            damage = enemy.combat.stats.loseHP(damage);
        }

        if (damage <= 0) {
            damage = 0;
            CView.text("Your bite is deflected or blocked by " + enemy.desc.a + enemy.desc.short + ".");
        }
        if (damage > 0 && damage < 10) {
            CView.text("You bite doesn't do much damage to " + enemy.desc.a + enemy.desc.short + "! (" + damage + ")");
        }
        if (damage >= 10 && damage < 20) {
            CView.text("You seriously wound " + enemy.desc.a + enemy.desc.short + " with your bite! (" + damage + ")");
        }
        if (damage >= 20 && damage < 30) {
            CView.text("Your bite staggers " + enemy.desc.a + enemy.desc.short + " with its force. (" + damage + ")");
        }
        if (damage >= 30) {
            CView.text("Your powerful bite <b>mutilates</b> " + enemy.desc.a + enemy.desc.short + "! (" + damage + ")");
        }
        CView.text("\n\n");
    }
}
