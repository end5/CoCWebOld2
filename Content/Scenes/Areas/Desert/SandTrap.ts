import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { SpriteName } from 'Content/Display/SpriteName';
import { EffectType } from 'Content/Effects/EffectType';
import { randInt } from 'Engine/Utilities/SMath';
import { combatEvade, combatFlexibility } from 'Content/Combat/CombatUtils';
import { CharacterType } from 'Content/Character/CharacterType';
import { Settings } from 'Content/Settings';
import { Cock, CockType } from 'Engine/Body/Cock';
import { BreastRow } from 'Engine/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { ChainedDrop } from 'Engine/Utilities/Drops/ChainedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { TailType, Tail } from 'Engine/Body/Tail';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { sandtrapmentLoss, pcBeatsATrap } from 'Content/Scenes/Areas/Desert/SandTrapScene';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { BasicAttack } from 'Content/Combat/Actions/BasicAttack';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IReaction } from 'Engine/Combat/Actions/IReaction';

const reactions = new Dictionary<string, IReaction>();
// Wait:
reactions.set("Wait", {
    beforeUseAction(char, enemy) {
        CView.clear();
        CView.sprite(SpriteName.SandTrap); // 97;
        if (!char.effects.has(EffectType.Climbed)) char.effects.create(EffectType.Climbed);
        CView.text("Instead of attacking, you turn away from the monster and doggedly attempt to climb back up the pit, digging all of your limbs into the soft powder as you climb against the sandslide.");
        if (trapLevel(char) === 4) {
            CView.text("\n\nYou eye the ground above you.  The edge of the pit is too sheer, the ground too unstable... although it looks like you can fight against the currents carrying you further down, it seems impossible to gain freedom with the sand under the monster's spell.");
        }
        else {
            // Strength check success: [Player goes up one level, does not go down a level this turn]
            if (enemy.stats.str / 10 + randInt(20) > 10) {
                CView.text("\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  Nonetheless, through considerable effort you see you've managed to pull further clear of the sandtrap's grasp.  \"<i>Watching you squirm around like that gets me so hot,</i>\" it calls up to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  \"<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>\"");
                trapLevel(char, 2);
            }
            else {
                // Strength check fail:  [Player goes down as normal]
                CView.text("\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  You feel like you're going to burst and you eventually give up, noting wearily that you've managed to get nowhere. \"<i>Watching you squirm around like that gets me so hot,</i>\" the sandtrap calls to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  \"<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>\"");
                trapLevel(char, 1);
            }
        }
        CView.text("\n\n");
        return false;
    }
});

export function trapLevel(char: Character, adjustment: number = 0): number {
    let level = char.effects.getByName(EffectType.Level);
    if (!level)
        level = char.effects.create(EffectType.Level, { level: 4 });

    if (adjustment !== 0) {
        level.values.level! += adjustment;
        // Keep in bounds ya lummox
        if (level.values.level! < 1) level.values.level! = 1;
        if (level.values.level! > 4) level.values.level! = 4;
    }
    return level.values.level!;
}

// sandtrap pheromone attack:
class Pheromones extends CombatAction {
    public name = "Pheromones";
    protected useAction(char: Character, enemy: Character) {
        CView.sprite(SpriteName.SandTrap); // 97;
        CView.text("The sandtrap puckers its lips.  For one crazed moment you think it's going to blow you a kiss... but instead it spits clear fluid at you!   You desperately try to avoid it, even as your lower half is mired in sand.");
    }

    protected checkMiss(self: Character, enemy: Character): boolean {
        // Quicksand attack fail:
        return enemy.stats.spe / 10 + randInt(20) > 10 || combatEvade(enemy, self) || combatFlexibility(enemy, self);
    }

    protected missed(char: Character, enemy: Character) {
        CView.text("  Moving artfully with the flow rather than against it, you are able to avoid the trap's fluids, which splash harmlessly into the dune.");
    }

    protected calcDamage(char: Character, enemy: Character) {
        return { lust: 10 + enemy.stats.lib / 10 };
    }

    protected applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean) {
        CView.text("  Despite ducking away from the jet of fluid as best you can, you cannot avoid some of the stuff splashing upon your arms and face.  The substance feels oddly warm and oily, and though you quickly try to wipe it off it sticks resolutely to your skin and the smell hits your nose.  Your heart begins to beat faster as warmth radiates out from it; you feel languid, light-headed and sensual, eager to be touched and led by the hand to a sandy bed...  Shaking your head, you try to stifle what the foreign pheromones are making you feel.");
        enemy.stats.lust += damage;

        damage = Math.round(damage * char.stats.lustPercent() / 10) / 10;
        CView.text(" (" + damage + " lust)");
    }
}

// sandtrap quicksand attack:
class NestledQuickSandAttack extends CombatAction {
    public name = "Quick Sand";
    protected useAction(char: Character, enemy: Character) {
        CView.sprite(SpriteName.SandTrap); // 97;
        CView.text("The sandtrap smiles at you winningly as it thrusts its hands into the sifting granules.  The sand beneath you suddenly seems to lose even more of its density; you're sinking up to your thighs!");
    }

    protected checkMiss(self: Character, enemy: Character): boolean {
        // Quicksand attack fail:
        return enemy.stats.spe / 10 + randInt(20) > 10 || combatEvade(enemy, self) || combatFlexibility(enemy, self);
    }

    protected missed(char: Character, enemy: Character) {
        CView.text("  Acting with alacrity, you manage to haul yourself free of the area affected by the sandtrap's spell, and set yourself anew.");
    }

    protected applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean) {
        // Quicksand attack success: (Speed and Strength loss, ability to fly free lost)
        CView.text("  You can't get free in time and in a panic you realize you are now practically wading in sand.  Attempting to climb free now is going to be very difficult.");
        if (enemy.canFly()) CView.text("  You try to wrench yourself free by flapping your wings, but it is hopeless.  You are well and truly snared.");
        trapLevel(char, -1);
        if (!char.effects.has(EffectType.Climbed)) char.effects.create(EffectType.Climbed);
    }
}

class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions = [new NestledQuickSandAttack(), new Pheromones(), new BasicAttack()];
    public use(char: Character, enemy: Character): void {
        if (char.effects.has(EffectType.Level)) {
            if (trapLevel(char) === 4 && !char.effects.has(EffectType.Climbed)) this.subActions[0].use(char, enemy);
            else this.subActions[1].use(char, enemy);
            // PC sinks a level (end of any turn in which player didn't successfully \"<i>Wait</i>\"):
            if (!char.effects.has(EffectType.Climbed)) {
                CView.text("\n\nRivulets of sand run past you as you continue to sink deeper into both the pit and the sand itself.");
                trapLevel(char, -1);
            }
            else char.effects.removeByName(EffectType.Climbed);
        }
        else this.subActions[2].use(char, enemy);
    }
}

class SandTrapEndScenes extends EndScenes {
    public hasDefeated(enemy: Character): boolean {
        return enemy.stats.lust >= 33;
    }

    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices | void {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe sand trap seems bemused by the insects your body houses...");
        }
        else {
            return sandtrapmentLoss(enemy, this.char, true);
        }
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return pcBeatsATrap(enemy, this.char);
    }
}

export class SandTrap extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.SandTrap);
        this.description = new CharacterDescription(this, "the ", Settings.sillyMode ? "sand tarp" : "sandtrap", "You are fighting the sandtrap.  It sits half buried at the bottom of its huge conical pit, only its lean human anatomy on show, leering at you from beneath its shoulder length black hair with its six equally sable eyes.  You cannot say whether its long, soft face with its pointed chin is very pretty or very handsome - every time the creature's face moves, its gender seems to shift.  Its lithe, brown flat-chested body supports four arms, long fingers playing with the rivulets of powder sand surrounding it.  Beneath its belly you occasionally catch glimpses of its insect half: a massive sand-coloured abdomen which anchors it to the desert, with who knows what kind of anatomy.");
        // this.plural = false;
        this.body.cocks.add(new Cock(10, 2, CockType.HUMAN));
        this.body.balls.count = 2;
        this.body.balls.size = 4;
        this.body.cumMultiplier = 3;
        this.body.chest.add(new BreastRow(0, 0));
        this.body.butt.looseness = ButtLooseness.NORMAL;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.tallness = randInt(8) + 150;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "fair";
        this.body.hair.color = "black";
        this.body.hair.length = 15;
        this.body.tails.add(new Tail(TailType.DEMONIC));

        this.stats.str = 55;
        this.stats.tou = 10;
        this.stats.spe = 45;
        this.stats.int = 55;
        this.stats.lib = 60;
        this.stats.sens = 45;
        this.stats.cor = 50;
        this.stats.lust = 20;
        this.stats.lustVuln = .55;
        this.stats.level = 4;
        this.stats.maxHP = 100;
        this.stats.HP = this.stats.maxHP;

        this.effects.create(EffectType.Level, { level: 4 });
        // 1/3 have fertilized eggs!
        if (randInt(3) === 0) this.effects.create(EffectType.Fertilized);

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claw", "claw", 10),
            new Armor("chitin" as ArmorName, new ItemDesc("chitin"), "chitin", 20)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new SandTrapEndScenes(this),
                reactions,
                rewards: {
                    gems: 2 + randInt(5),
                    drop: new ChainedDrop(ConsumableName.TrapOil)
                        .add(ConsumableName.OvipositionElixir, 1 / 3)
                }
            });

    }
}
