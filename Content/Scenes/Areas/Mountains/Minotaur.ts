import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from 'Content/Scenes/PassTime';
import { CharacterType } from 'Content/Character/CharacterType';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { Cock, CockType } from 'Engine/Body/Cock';
import { BreastRow } from 'Engine/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { LegType } from 'Engine/Body/Legs';
import { SkinType } from 'Engine/Body/Skin';
import { FaceType } from 'Engine/Body/Face';
import { TailType, Tail } from 'Engine/Body/Tail';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { ChainedDrop } from 'Engine/Utilities/Drops/ChainedDrop';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { SpriteName } from 'Content/Display/SpriteName';
import { MinotaurFlags, getRapedByMinotaur, minoVictoryRapeChoices } from 'Content/Scenes/Areas/Mountains/MinotaurScene';
import { MainAction } from 'Content/Combat/Actions/MainAction';
import { BasicAttack } from 'Content/Combat/Actions/BasicAttack';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';

/**
 * ...
 * @author Fake-Name
 */

class MinotaurPheromones extends CombatAction {
    public name = "Pheromones";
    public useAction(char: Character, enemy: Character) {
        CView.sprite(SpriteName.Minotaur); // 44;
        CView.text("The minotaur smiles at you and lifts his loincloth, flicking it at you.  Thick ropes of pre-cum fly through the air, ");
        // sometimes get hit with the pre for stronger effect!
        if (randInt(3) === 0) {
            CView.text("slapping into your face before you can react!  You wipe the slick snot-like stuff out of your eyes and nose, ");
            if (enemy.stats.lust > 75) {
                CView.text("swallowing it into your mouth without thinking.  ");
                enemy.stats.lust += 10 + enemy.stats.lib / 10;

            }
            else {
                CView.text("feeling your heart beat with desire as your tongue licks the residue from your lips.  ");
                enemy.stats.lust += 5 + enemy.stats.lib / 20;

            }
        }
        else CView.text("right past your head.  ");
        CView.text("The animalistic scent of it seems to get inside you, the musky aroma burning a path of liquid heat to your groin.");
        enemy.stats.lust += 10 + enemy.stats.lib / 20;

        if (enemy.effects.has(EffectType.MinotaurCumAddict) || MinotaurFlags.MINOTAUR_CUM_ADDICTION_STATE === 2) {
            if (randInt(2) === 0) CView.text("\n<b>You shiver with need, wanting nothing more than to bury your face under that loincloth and slurp out every drop of goopey goodness.</b>");
            else CView.text("\n<b>You groan and lick your lips over and over, craving the taste of him in your mouth.</b>");
            enemy.stats.lust += 5 + randInt(5);
        }
    }
}

class MinotaurMainAction extends MainAction {
    public constructor() {
        super();
        this.subActions = [new BasicAttack(), new MinotaurPheromones()];
    }
}

class MinotaurEndScenes extends EndScenes {
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.");
            return { next: passTime(1) };
        }
        else
            return getRapedByMinotaur(enemy, this.char, false);
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return minoVictoryRapeChoices(enemy, this.char);
    }
}

export class Minotaur extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor(axe?: boolean) {
        super(CharacterType.Minotaur);
        // Most times they dont have an axe
        const hasAxe = axe || randInt(3) === 0;
        const furColor = randomChoice("black", "brown");

        this.body.cocks.add(new Cock(randInt(13) + 24, 2 + randInt(3), CockType.HORSE));
        this.body.balls.count = 2;
        this.body.balls.size = 2 + randInt(13);
        this.body.cumMultiplier = 1.5;
        this.body.chest.add(new BreastRow(0));
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(37) + 84;
        this.body.hips.rating = HipRating.AVERAGE;
        this.body.butt.rating = ButtRating.AVERAGE;
        this.body.legs.type = LegType.HOOFED;
        this.body.skin.tone = furColor;
        this.body.skin.type = SkinType.FUR;
        this.body.skin.desc = "shaggy fur";
        this.body.hair.color = furColor;
        this.body.hair.length = 3;
        this.body.face.type = FaceType.COW_MINOTAUR;
        this.body.tails.add(new Tail(TailType.COW));

        this.description = new CharacterDescription(this, "the ", "minotaur", "An angry-looking minotaur looms over you.  Covered in shaggy " + this.body.hair.color + " fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. " + (this.body.balls.size > 4 ? ("  Barely visible below the tattered shreds of loincloth are " + describeBalls(true, true, this) + ", swollen with the minotaur's long pent-up need.") : "") + (hasAxe ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>" : ""));

        this.stats.str = hasAxe ? 75 : 50;
        this.stats.tou = 60;
        this.stats.spe = 30;
        this.stats.int = 20;
        this.stats.lib = 40 + this.body.balls.size * 2;
        this.stats.sens = 15 + this.body.balls.size * 2;
        this.stats.cor = 35;
        this.stats.maxHP += 20 + randInt(this.body.balls.size * 2);
        this.stats.HP = this.stats.maxHP;
        this.stats.lust = this.body.balls.size * 3;
        this.stats.lustVuln = hasAxe ? 0.84 : 0.87;
        this.stats.level = hasAxe ? 6 : 5;

        this.hoursSinceCum = this.body.balls.size * 10;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 30 });

        this.inventory = new CharacterInventory(this,
            new Weapon("fist" as WeaponName, new ItemDesc("fist"), "fist", "punch", 0),
            new Armor("thick fur" as ArmorName, new ItemDesc("thick fur"), "thick fur", 0),
        );

        if (hasAxe)
            this.inventory.equippedWeaponSlot.equip(new Weapon("axe", new ItemDesc("axe"), "axe", "cleave", 0));

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MinotaurMainAction(),
                endScenes: new MinotaurEndScenes(this),
                rewards: {
                    gems: randInt(5) + 5,
                    drop: hasAxe ?
                        new WeightedDrop(ConsumableName.MinotaurBlood, 1) :
                        new ChainedDrop<string>().add(ConsumableName.MinotaurCum, 1 / 5)
                            .add(ConsumableName.MinotaurBlood, 1 / 2)
                }
            });

    }
}
