import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { randInt } from 'Engine/Utilities/SMath';
import { passTime } from 'Content/Scenes/PassTime';
import { CharacterType } from 'Content/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { LegType } from 'Engine/Body/Legs';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { CombatAction, IActionDamage } from 'Engine/Combat/Actions/CombatAction';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { MainAction } from 'Content/Combat/Actions/MainAction';
import { nagaRapeChoice, nagaFUCKSJOOOOOO } from 'Content/Scenes/Areas/Desert/NagaScene';

// 2a)  Ability -  Poison Bite - poisons player
class PoisonBite extends CombatAction {
    public name = "Poison Bite";
    protected useAction(self: Character, enemy: Character) {
        // (Deals damage over 4-5 turns, invariably reducing
        // your speed. It wears off once combat is over.)
        CView.text("The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ");
        if (!enemy.effects.has(EffectType.NagaVenom)) {
            CView.text("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.");
            if (enemy.stats.spe > 4) {
                enemy.stats.spe -= 3;
                enemy.effects.create(EffectType.NagaVenom, { spe: 3 });
            }
            else {
                enemy.effects.create(EffectType.NagaVenom, { spe: 0 });
                enemy.combat.loseHP(5 + randInt(5));
            }
            enemy.combat.loseHP(5 + randInt(5));
        }
        else {
            CView.text("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.");
            if (enemy.stats.spe > 3) {
                enemy.stats.spe -= 2;
                const nagaVenom = enemy.effects.getByName(EffectType.NagaVenom);
                if (nagaVenom && nagaVenom.values.spe)
                    nagaVenom.values.spe += 2;
            }
            else enemy.combat.loseHP(5 + randInt(5));
            enemy.combat.loseHP(5 + randInt(5));
        }
    }
}

// 2b)  Ability - Constrict - entangles player, raises lust
// every turn until you break free
class Constrict extends CombatAction {
    public name = "Constrict";
    protected useAction(self: Character, enemy: Character) {
        CView.text("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!");
        enemy.effects.create(EffectType.NagaBind);
        enemy.combat.loseHP(2 + randInt(4));
    }
}

// 2c) Abiliy - Tail Whip - minus ??? HP
// (base it on toughness?)
class TailWhip extends CombatAction {
    public name = "Tail Whip";
    protected useAction(self: Character, enemy: Character) {
        CView.text("The naga tenses and twists herself forcefully.  ");
    }

    protected checkMiss(self: Character, enemy: Character): boolean {
        if ((enemy.effects.has(EffectType.Evade) && randInt(6) === 0)) {
            CView.text("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.");
            return true;
        }
        else if (enemy.effects.has(EffectType.Misdirection) && randInt(100) < 10 && enemy.inventory.armor.displayName === "red, high-society bodysuit") {
            CView.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + self.desc.a + self.desc.short + "'s tail-whip.");
            return true;
        }
        else if (enemy.stats.spe > randInt(300)) {
            CView.text("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.");
            return true;
        }
        return false;
    }

    protected calcDamage(self: Character, enemy: Character): undefined | IActionDamage {
        let damage: number = 10;
        if (enemy.combat.defense() < 10) damage += 10 - enemy.combat.defense();
        damage += randInt(3);
        return { damage };
    }

    protected applyDamage(self: Character, enemy: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.");
        damage = enemy.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
    }
}

class NagaEndScenes extends EndScenes {
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.");
            enemy.orgasm();
            return { next: passTime(1) };
        } else {
            return nagaFUCKSJOOOOOO(enemy, this.char);
        }
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return nagaRapeChoice(enemy, this.char);
    }
}

export class Naga extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Naga);
        this.description = new CharacterDescription(this, "the ", "naga", "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.");
        // this.plural = false;
        this.body.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.NORMAL, false));
        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 40 });
        this.body.chest.add(new BreastRow(breastCupInverse("C")));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 10 });
        this.body.tallness = 5 * 12 + 10;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.legs.type = LegType.NAGA;
        this.body.skin.tone = "mediterranean-toned";
        this.body.hair.color = "brown";
        this.body.hair.length = 16;

        this.stats.str = 28;
        this.stats.tou = 20;
        this.stats.spe = 35;
        this.stats.int = 42;
        this.stats.lib = 55;
        this.stats.sens = 55;
        this.stats.cor = 40;
        this.stats.lust = 30;
        this.stats.level = 2;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "punch", 3),
            new Armor("scales" as ArmorName, new ItemDesc("scales"), "scales", 5)
        );

        const mainAction = new MainAction();
        mainAction.subActions.push(new PoisonBite());
        mainAction.subActions.push(new Constrict());
        mainAction.subActions.push(new TailWhip());

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new NagaEndScenes(this),
                rewards: {
                    gems: randInt(5) + 8,
                    drop: new WeightedDrop<string>()
                        .add(ConsumableName.Reptilum, 5)
                        .add(ConsumableName.SnakeOil, 4)

                }
            });
    }
}
