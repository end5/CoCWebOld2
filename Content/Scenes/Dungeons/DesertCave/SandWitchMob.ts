import { Character } from 'Content/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { randInt } from 'Engine/Utilities/SMath';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { combatDodge } from 'Content/Combat/CombatUtils';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeNipple, breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { CharacterType } from 'Content/Character/CharacterType';
import { yoYouBeatUpSomeSandWitchesYOUMONSTER, loseToSammitchMob } from 'Content/Scenes/Dungeons/DesertCave/SandWitchMobScene';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { BasicAttack } from 'Content/Combat/Actions/BasicAttack';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';

// Sand Witch Mob Attacks:
// Swarm
// -Mob gangrushes the PC; multiple hits, light damage
class GangRush extends CombatAction {
    public name = "Gang Rush";
    private basicAttack = new BasicAttack();
    protected useAction(char: Character, enemy: Character) {
        CView.text("The witches close ranks and advance with raised fists, intent on beating you into submission!\n");
        // 3-5 attacks.at half strength
        char.stats.str -= 10;
        // char.effects.create(EffectType.Attacks, 2 + randInt(3), 0, 0, 0);
        let counter = 2 + randInt(3);
        while (counter-- >= 0)
            this.basicAttack.use(char, enemy);
        char.stats.str += 10;
    }
}

// Headbutt
// Single, high damage attack
// High hit chance
class Headbutt extends CombatAction {
    public name = "Headbutt";
    protected useAction(char: Character, enemy: Character) {
        CView.text("The crowd parts, and a stockier, sturdier sorceress ambles out, fists up and head cocked back.  She makes to punch at you before pulling her fist at the last second, snapping her head forward in a powerful headbutt!  You barely have time to react!");
    }

    protected checkMiss(char: Character, enemy: Character) {
        return combatDodge(char, enemy);
    }

    protected missed(char: Character, enemy: Character) {
        CView.text("\nThrowing yourself out of the way, you manage to avoid the hit.  Your foe doesn't seem nearly as pleased while she fades back in between her sisters.");
    }

    protected calcDamage(char: Character, enemy: Character) {
        return { damage: Math.round((char.stats.str + char.inventory.weapon.attack + 10) - randInt(enemy.stats.tou) - enemy.combat.defense()) };
    }

    protected applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean) {
        // Block
        if (damage <= 0) {
            CView.text("\nYou catch the hit on your forearm, stopping her cold.  The thuggish woman snarls as she fades back in between her sisters, disappointed at doing so little damage.");
        }
        // Hit
        else {
            damage = enemy.combat.loseHP(damage);
            CView.text("\nShe hits you square in the face, bloodying your face and sending you stumbling back in agony. (" + damage + ")");
        }
    }
}

// Sand Stones
// -Mob summons vibrating sands sands to  lust increase PCs lust
// - Lust gained each round they use it is determined by how many naughty bits a PC has.
// -For every dick, set of breast(nips?), cunts and ass-hole on a PC, the lust gain is increased by 3, Not accounting for lust resistance.
// -Goo bodies will gain 30 Lust by default, not accounting lust resistance.
// -Stones will randomly vibrate throughout the battle if they get the PC.
class SandStones extends CombatAction {
    public name = "Sand Stones";
    protected useAction(char: Character, enemy: Character) {
        CView.text("The sandstorm whirling around the room suddenly ceases, and all the tiny sand particles gather together into balls, growing into several smooth stones.  Then, all the sand stones fall to the ground and slither towards you.");
    }

    protected checkMiss(char: Character, enemy: Character) {
        return combatDodge(char, enemy);
    }

    protected missed(char: Character, enemy: Character) {
        CView.text("\nThe stones then make a ninety degree turn into the purple fire, and then nothing.  One sand-witch smacks another upside the head, yelling something about focusing.");
        char.effects.removeByName(EffectType.Sandstorm);
    }

    protected applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean) {
        let bonus = 0;
        // [IF PC has solid body]
        if (!enemy.body.legs.isGoo()) {
            CView.text("\n\nThey crawl up your [legs].  You try to swat them all off, but there are too many.");
            // If PC has 1 cock:
            if (enemy.body.cocks.length === 1) CView.text("  A stone crawls onto your [cock].");
            // [If PC has multi-cocks:
            if (enemy.body.cocks.length > 1) CView.text("  A bunch of the stones crawl onto your " + describeCocksLight(enemy) + ".");
            if (enemy.body.cocks.length > 0) bonus++;
            // [If PC has cunt]
            if (enemy.body.vaginas.length > 0) {
                CView.text("  One stone slides up your inner thigh");
                if (enemy.body.balls.count > 0) CView.text(" behind your [sack]");
                CView.text(" and pops itself right into your [vagina]");
                if (enemy.body.vaginas.find(Vagina.Virgin)) CView.text(", robbing you of your virginity as a trickle of blood runs down your [leg].");
                bonus++;
            }
            // [If PC has balls:
            if (enemy.body.balls.count > 0) {
                CView.text("  A small set of stones settle on your [balls].");
                bonus++;
            }
            CView.text("  " + numToCardinalText(enemy.body.chest.reduce(BreastRow.TotalNipples, 0)) + " crawl up to your chest and over your top " + describeNipple(enemy, enemy.body.chest.get(0)) + "s");
            if (enemy.body.chest.length > 1) {
                if (enemy.body.chest.length === 2) CView.text(" and");
                else CView.text(",");
                CView.text(" your middle " + describeNipple(enemy, enemy.body.chest.get(1)) + "s");
                bonus++;
            }
            if (enemy.body.chest.length > 2) {
                CView.text(", and your bottom " + describeNipple(enemy, enemy.body.chest.get(2)) + "s");
                bonus++;
            }
            CView.text(".");
            CView.text("  The last stone travels up the back of your [legs] and slides right into your [asshole].");
            CView.text("\n\nYou try to get the stones off and out of you, but some kind of magic is keeping them stuck to you like glue.  One sand-witch snaps her fingers, and all the of the smooth stones begin vibrating, making numbing waves of pleasure that rattle your body.  <b>You have to end this quick, or else!</b>");
        }
        // [IF PC has goo body]
        else {
            CView.text("\n\nThe stones launch themselves into your gooey body.  You try your best to dislodge these foreign objects from your insides, but some-kind of magic is holding them in place.  A sand-witch snaps her fingers and all the stones begin vibrating, sending ripples throughout your sentative gooey body.  It feels like your whole body is one, big pleasure-bomb right now.  You had better end this fight soon!");
            bonus = 5;

        }
        enemy.effects.create(EffectType.LustStones, { lust: bonus });
        enemy.stats.lust += bonus * 2 + 5 + enemy.stats.sens / 7;
        char.effects.removeByName(EffectType.Sandstorm);
    }
}

// Milk is Good
// -Mob's members start sucking on each other's tits. Arouses PC and restores health to mob, decreases (increases?) mob's lust.
class DrinkMilk extends CombatAction {
    public name = "Drink Milk";
    protected useAction(char: Character, enemy: Character) {
        CView.text("One of the blonde beauties turns to another and asks, \"<i>A drink, sister?  Fighting this intruder has given me a powerful thirst.</i>\"  The other woman wordlessly opens her robe, baring her breasts, exposing four heaving, milk-fueled mounds to the air before the other woman claims a nipple for herself.  Three others crowd in on the exposed teats, their rumps shaking contentedly as they grab a quick snack.");
        CView.text("\n\nAfter wiping the excess from their lips, they close their robes and resume a fighting stance, seeming healthier than before.");
        enemy.stats.lust += 4 + enemy.stats.lib / 10;

        // + 30 HP, +light lust damage to PC and mob
        char.combat.gainHP(30);
    }
}

// *Sandstorm
// Creates a sandstorm that blinds the PC one out of every 3 rounds.  Used first turn. Deals light HP damage every turn.  Reduces breath attacks damage by 80%.  Makes bow miss 50% of the time.
export class SandStorm extends CombatAction {
    public name: string = "Sand Storm";
    protected useAction(char: Character) {
        if (char.desc.name === CharacterType.SandWitchMob) {
            CView.text("The witches link their hands together and begin to chant together, lifting their voices high as loose sand trickles in from every corner, every doorway, even the ceiling.  \"<i>Enevretni llahs tresed eht!</i>\"  Swirling around the chamber, a cloud of biting, stinging sand clouds your vision and bites into your skin.  It's going to keep blinding you and hurting you every round!");
        }
        else {
            CView.text("With a smirk, the Sand Mother decrees, \"<i>You fight not just me, but the shifting sands as well.</i>\"  She casually flicks her wrist, and sand rises up from the floors, the walls, everywhere really.  It begins to spin about, blown by an unseen wind, and the entire chamber is wreathed in a shifting sandstorm.  The grit constantly tries to get into your eyes.  It's likely you're going to be blinded by it every now and then.");
        }
        char.effects.create(EffectType.Sandstorm);
    }
}

class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new GangRush(), new Headbutt(), new SandStones(), new DrinkMilk(), new SandStorm()];
    public use(char: Character, enemy: Character): void {
        if (!char.effects.has(EffectType.Sandstorm))
            this.subActions[4].use(char, enemy);
        else if (char.combat.HPRatio() < .5)
            this.subActions[3].use(char, enemy);
        else if (char.effects.has(EffectType.Sandstorm) && randInt(2) === 0 && !enemy.effects.has(EffectType.LustStones))
            this.subActions[2].use(char, enemy);
        else if (randInt(3) === 0)
            this.subActions[1].use(char, enemy);
        else
            this.subActions[0].use(char, enemy);
    }
}

class SandWitchMobEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return loseToSammitchMob(enemy);
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return yoYouBeatUpSomeSandWitchesYOUMONSTER(enemy, this.char);
    }
}

export class SandWitchMob extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.SandWitchMob);
        this.description = new CharacterDescription(this, "the ", "sand witches", "You are surrounded by a veritable tribe of sand witches.  Like the ones that roam the sands, they have simple robes, blond hair, and four big breasts that push at the concealing cloth immodestly.  Glowering at you hatefully, the pack of female spellcasters readies itself to drag you down with sheer numbers.", true);
        this.body.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.body.chest.add(new BreastRow(breastCupInverse("DD")));
        this.body.chest.add(new BreastRow(breastCupInverse("DD")));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(12) + 55;
        this.body.hips.rating = HipRating.CURVY;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "bronzed";
        this.body.hair.color = "sandy-blonde";
        this.body.hair.length = 15;

        this.stats.str = 25;
        this.stats.tou = 25;
        this.stats.spe = 35;
        this.stats.int = 45;
        this.stats.lib = 55;
        this.stats.sens = 40;
        this.stats.cor = 30;
        this.stats.lust = 30;
        this.stats.lustVuln = .5;
        this.stats.level = 4;
        this.stats.maxHP = 80;
        this.stats.HP = this.stats.maxHP;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "punches", 0),
            new Armor("robes" as ArmorName, new ItemDesc("robes"), "robes", 1)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new SandWitchMobEndScenes(this),
                rewards: {
                    gems: randInt(15) + 5,
                }
            });

    }
}
