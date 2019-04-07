import { Character } from 'Content/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from 'Content/Scenes/PassTime';
import { describeFeet, describeLeg } from 'Content/Descriptors/LegDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Settings } from 'Content/Settings';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { randInt } from 'Engine/Utilities/SMath';
import { HipRating } from 'Engine/Body/Hips';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { sandwitchRape, beatSandwitch } from 'Content/Scenes/Areas/Desert/SandWitchScene';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { MainAction } from 'Content/Combat/Actions/MainAction';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';

class LustMagicAttack extends CombatAction {
    public name = "Lust Magic";
    protected useAction(char: Character, enemy: Character) {
        CView.text("The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n");
        if (enemy.effects.has(EffectType.StoneLust)) {
            CView.text("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  ");
            enemy.stats.lust += 8 + Math.floor(enemy.stats.sens) / 10;

        }
        else {
            CView.text("You feel the sands shift by your " + describeFeet(enemy) + ", and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your " + describeLeg(enemy) + ", its progress unaffected by your frantic effort to dislodge it.  ");
            if (enemy.body.vaginas.length > 0) CView.text("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your " + describeVagina(enemy, enemy.body.vaginas.get(0)) + " in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
            else CView.text("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
            enemy.effects.create(EffectType.StoneLust);
            enemy.stats.lust += 4 + Math.floor(enemy.stats.sens) / 10;
        }
    }
}

class SandWitchEndScenes extends EndScenes {
    public hasDefeated(enemy: Character): boolean {
        return enemy.stats.lust >= 33;
    }

    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe witch blanches and backs away, leaving you to your fate.");
            return { next: passTime(1) };
        }
        else {
            return sandwitchRape(enemy);
        }
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.StoneLust))
            enemy.effects.removeByName(EffectType.StoneLust);

        return beatSandwitch(enemy, this.char);
    }
}

export class SandWitch extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.SandWitch);
        this.description = new CharacterDescription(this, "the ", Settings.sillyMode ? "sand witch" : "sand witch", "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.");
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
        this.stats.level = 3;
        this.stats.maxHP = 20;
        this.stats.HP = this.stats.maxHP;

        this.inventory = new CharacterInventory(this,
            new Weapon("kick" as WeaponName, new ItemDesc("kick"), "kick", "kick", 0),
            new Armor("robes" as ArmorName, new ItemDesc("robes"), "robes", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new SandWitchEndScenes(this),
                rewards: {
                    gems: randInt(15) + 5,
                    drop: new WeightedDrop<string>().addMany(1,
                        ConsumableName.TatteredScroll,
                        ConsumableName.OvipositionElixir,
                        ConsumableName.Lactaid,
                        ConsumableName.LaBova,
                        ConsumableName.WhiteSpellbook,
                        ConsumableName.BlackSpellbook)
                }
            });
        this.combat.action.subActions.push(new LustMagicAttack());

    }
}
