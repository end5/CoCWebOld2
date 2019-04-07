import { Character } from 'Content/Character/Character';
import { defeatImpLord, loseToAnImpLord } from './ImpLordScene';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { randInt } from 'Engine/Utilities/SMath';
import { combatDodge } from 'Content/Combat/CombatUtils';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { Cock, CockType } from 'Engine/Body/Cock';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { LegType } from 'Engine/Body/Legs';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { WingType } from 'Engine/Body/Wings';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { CharacterType } from 'Content/Character/CharacterType';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { MainAction } from 'Content/Combat/Actions/MainAction';

// Special Attack 1
class Fire extends CombatAction {
    public name: string = "Imp Fire";
    public useAction(char: Character, enemy: Character) {
        CView.text("The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin.");
        // [-HP // +Lust(minor)]
        const damage: number = 40 + randInt(10);
        enemy.combat.loseHP(damage);
        enemy.stats.lust += 20 + enemy.stats.cor / 10;
    }
}

// Heavy Attack
class HeavyAttack extends CombatAction {
    public name: string = "Heavy Attack";
    public useAction(char: Character, enemy: Character) {
        let damage: number = Math.floor((char.stats.str + char.combat.attack() + 20) - randInt(enemy.stats.tou) - enemy.combat.defense());
        CView.text("The demonic creature slashes a clawed hand towards your stomach,");
        if (combatDodge(char, enemy)) CView.text(" but you handily avoid it.");
        else if (damage <= 0) CView.text(" but the attack proves ineffectual.");
        else {
            CView.text("leaving a large gash. The attack leaves you slightly stunned, but you recover. ");
            damage = enemy.combat.loseHP(damage);
            CView.text("(" + damage + ")");
        }
    }
}

// Lust Attack
class LustAttack extends CombatAction {
    public name: string = "Lust Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need.");
        // [+Lust]
        enemy.stats.lust += 5 + enemy.stats.lib / 5 + enemy.stats.cor / 5;
    }
}

// Lust and Light Attack
class LustAttackWithDamage extends CombatAction {
    public name: string = "Lust + Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal.");
        let damage: number = 3 + randInt(10);
        damage = enemy.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
        // [-HP(minor) // +Lust]
        enemy.stats.lust += 5 + enemy.stats.sens / 4 + enemy.stats.cor / 10;
    }
}

class ImpLordEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return loseToAnImpLord(enemy, this.char);
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatImpLord(enemy, this.char);
    }
}

export class ImpLord extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.ImpLord);
        this.description = new CharacterDescription(this, "the ", "imp lord", "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.");

        // Imps now only have demon dicks.
        // Not sure if I agree with this, I can imagine the little fuckers abusing the
        // shit out of any potions they can get their hands on.
        this.body.cocks.add(new Cock(randInt(2) + 11, 2.5, CockType.DEMON));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(14) + 40;
        this.body.hips.rating = HipRating.BOYISH;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.legs.type = LegType.HOOFED;
        this.body.skin.tone = "red";
        this.body.wings.type = WingType.IMP;

        this.stats.str = 55;
        this.stats.tou = 40;
        this.stats.spe = 75;
        this.stats.int = 42;
        this.stats.lib = 55;
        this.stats.sens = 35;
        this.stats.cor = 100;
        this.stats.lust = 30;
        this.stats.lustVuln = .65;
        this.stats.level = 7;
        this.stats.maxHP = 100;
        this.stats.HP = this.stats.maxHP;

        this.inventory = new CharacterInventory(this,
            new Weapon("fist" as WeaponName, new ItemDesc("fist"), "fist", "punch", 10),
            new Armor("leathery skin" as ArmorName, new ItemDesc("leathery skin"), "leathery skin", 5)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new ImpLordEndScenes(this),
                rewards: {
                    gems: randInt(15) + 25,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.MinotaurBlood, 1).
                        add(ConsumableName.LaBova, 1).
                        add(ConsumableName.IncubusDraft, 6).
                        add(ConsumableName.SuccubiMilk, 6)
                }
            });
        this.combat.action.subActions.push(new Fire(), new HeavyAttack(), new LustAttack(), new LustAttackWithDamage());
    }
}
