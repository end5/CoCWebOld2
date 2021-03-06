import { EndScenes } from 'Engine/Combat/EndScenes';
import { CharacterType } from 'Content/Character/CharacterType';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { describeCocksLight, describeCock } from 'Content/Descriptors/CockDescriptor';
import { VaginaWetness } from 'Engine/Body/Vagina';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Cock, CockType } from 'Engine/Body/Cock';
import { randInt } from 'Engine/Utilities/SMath';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { WingType } from 'Engine/Body/Wings';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { impRapesYou, impVictory } from './ImpScene';
import { describeAllVagina } from 'Content/Descriptors/VaginaDescriptor';
import { EffectType } from 'Content/Effects/EffectType';
import { MainAction } from 'Content/Combat/Actions/MainAction';

export class ImpMagicLustAttack extends CombatAction {
    public name: string = "Magic Lust Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("You see " + char.desc.a + char.desc.short + " make sudden arcane gestures at you!\n\n");
        char.stats.lust += char.stats.lib / 10 + char.stats.cor / 10 + 10;

        if (char.stats.lust < 30) CView.text("You feel strangely warm.  ");
        if (char.stats.lust >= 30 && char.stats.lust < 60) CView.text("Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  ");
        if (char.stats.lust >= 60) CView.text("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  ");
        if (char.body.cocks.length > 0) {
            if (char.stats.lust >= 60)
                CView.text("You feel your " + describeCocksLight(char) + " dribble pre-cum.");
            else if (char.stats.lust >= 30 && char.body.cocks.length === 1)
                CView.text("Your " + describeCock(char, char.body.cocks.get(0)) + " hardens, distracting you further.");
            else if (char.stats.lust >= 30 && char.body.cocks.length > 1)
                CView.text("Your " + describeCocksLight(char) + " harden uncomfortably.");
            if (char.body.vaginas.length > 0) CView.text("  ");
        }
        if (char.stats.lust >= 60 && char.body.vaginas.length > 0) {
            switch (char.body.vaginas.get(0)!.wetness) {
                case VaginaWetness.NORMAL:
                    CView.text("Your " + describeAllVagina(char) + " dampen" + (char.body.vaginas.length > 1 ? "" : "s") + " perceptibly.");
                    break;
                case VaginaWetness.WET:
                    CView.text("Your crotch becomes sticky with girl-lust.");
                    break;
                case VaginaWetness.SLICK:
                    CView.text("Your " + describeAllVagina(char) + " become" + (char.body.vaginas.length > 1 ? "" : "s") + " sloppy and wet.");
                    break;
                case VaginaWetness.DROOLING:
                    CView.text("Thick runners of girl-lube stream down the insides of your thighs.");
                    break;
                case VaginaWetness.SLAVERING:
                    CView.text("Your " + describeAllVagina(char) + " instantly soak" + (char.body.vaginas.length > 1 ? "" : "s") + " your groin.");
                default: // Dry vaginas are unaffected

            }
        }
        CView.text("\n");
    }
}

class ImpEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe imp grins at your already corrupted state...");
            enemy.stats.lust = 100;
            return { next: choiceWrap(impRapesYou, this.char) };
        }
        else {
            return impRapesYou(enemy, this.char);
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return impVictory(enemy, this.char);
    }
}

export class Imp extends Character {
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super({
            type: CharacterType.Imp,
            unarmedWeapon: new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "claw-slash", 0),
            baseArmor: new Armor("leathery skin" as ArmorName, new ItemDesc("leathery skin"), "leathery skin", 0)
        });
        this.description = new CharacterDescription(this, "the ", "imp", "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.");
        this.body.cocks.add(new Cock(randInt(2) + 11, 2.5, CockType.DEMON));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(24) + 25;
        this.body.hips.rating = HipRating.BOYISH;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.skin.tone = "red";
        this.body.hair.color = "black";
        this.body.hair.length = 5;
        this.body.wings.type = WingType.IMP;

        this.stats.str = 20;
        this.stats.tou = 10;
        this.stats.spe = 25;
        this.stats.int = 12;
        this.stats.lib = 45;
        this.stats.sens = 45;
        this.stats.cor = 100;
        this.stats.HP = this.stats.maxHP;
        this.stats.lust = 40;
        this.stats.level = 1;

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new ImpEndScenes(this),
                rewards: {
                    gems: randInt(5) + 5,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.SuccubiMilk, 3).
                        add(ConsumableName.IncubusDraft, 3).
                        add(ConsumableName.ImpFood, 4)
                }
            });
        this.combat.action.subActions.push(new ImpMagicLustAttack());
    }
}
