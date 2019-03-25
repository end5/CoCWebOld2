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
import { TailType } from 'Engine/Body/Tail';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { ChainedDrop } from 'Engine/Utilities/Drops/ChainedDrop';

/**
 * ...
 * @author Fake-Name
 */

export function defeated(player: Character, hpVictory: boolean): NextScreenChoices {
    if (findStatusAffect(EffectType.PhyllaFight) >= 0) {
        removeStatusAffect(EffectType.PhyllaFight);
        CView.clear();
        CView.text("You defeat a minotaur!  ");
        desert.antsScene.phyllaBeatAMino();
    } else {
        mountain.minotaurScene.minoVictoryRapeChoices();
    }
}

export function won(player: Character, hpVictory: boolean, pcCameWorms: boolean): NextScreenChoices {
    if (findStatusAffect(EffectType.PhyllaFight) >= 0) {
        removeStatusAffect(EffectType.PhyllaFight);
        desert.antsScene.phyllaPCLostToMino();
    } else if (pcCameWorms) {
        CView.text("\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.");
        return { next: passTime(1) };
    } else
        mountain.minotaurScene.getRapedByMinotaur();
}

export function long(): string {
    return "An angry-looking minotaur looms over you.  Covered in shaggy " + hairColor + " fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. " +
        (ballSize > 4 ? ("  Barely visible below the tattered shreds of loincloth are " + ballsDescription(true, true, this) + ", swollen with the minotaur's long pent-up need.") : "") +
        (hasAxe ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>" : "");
}

export class Minotaur extends Character {
    public constructor(axe?: boolean) {
        super(CharacterType.Minotaur);
        // Most times they dont have an axe
        hasAxe = axe || randInt(3) === 0;
        const furColor: string = randomChoice("black", "brown");

        this.desc.a = "the ";
        this.desc.name = "minotaur";
        this.imageName = "minotaur";
        this.long = "";
        // this.plural = false;
        this.body.cocks.add(new Cock(randInt(13) + 24, 2 + randInt(3), CockType.HORSE));
        this.body.balls.count = 2;
        this.body.balls.size = 2 + randInt(13);
        this.body.cumMultiplier = 1.5;
        this.hoursSinceCum = this.body.balls.size * 10;
        this.body.chest.add(new BreastRow(0));
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.effects.create(EffectType.BonusACapacity, 30, 0, 0, 0);
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
        this.body.tail.type = TailType.COW;

        this.stats.str = hasAxe ? 75 : 50;
        this.stats.tou = 60;
        this.stats.spe = 30;
        this.stats.int = 20;
        this.stats.lib = 40 + this.body.balls.size * 2;
        this.stats.sens = 15 + this.body.balls.size * 2;
        this.stats.cor = 35;
        this.baseStats.bonusHP = 20 + randInt(this.body.balls.size * 2);
        this.stats.lust = this.body.balls.size * 3;
        this.stats.lustVuln = hasAxe ? 0.84 : 0.87;
        this.stats.level = hasAxe ? 6 : 5;

        this.inventory.weapon.displayName = hasAxe ? "axe" : "fist";
        this.inventory.weapon.verb = hasAxe ? "cleave" : "punch";
        this.inventory.armor.displayName = "thick fur";
        this.inventory.gems = randInt(5) + 5;
        if (hasAxe) {
            this.drop = new WeightedDrop(ConsumableName.MinotaurBlood, 1);
        } else {
            this.drop = new ChainedDrop().add(ConsumableName.MinotaurCum, 1 / 5)
                .add(ConsumableName.MinotaurBlood, 1 / 2)
                .elseDrop(undefined);
        }
        this.stats.special1 = mountain.minotaurScene.minoPheromones;
        checkMonster();
    }
}
