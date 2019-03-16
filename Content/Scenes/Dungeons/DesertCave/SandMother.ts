import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { randInt } from 'Engine/Utilities/SMath';
import { defeatTheSandMother, loseToTheSandMother } from 'Content/Scenes/Dungeons/DesertCave/SandMotherScene';
import { CharacterType } from 'Content/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { SandStorm } from 'Content/Scenes/Dungeons/DesertCave/SandWitchMob';

// Earthshield
class EarthShield extends CombatAction {
    public name = "Earth Shield";
    protected useAction(char: Character, enemy: Character) {
        // Surrounds the witch a vortex of stones, raising her defense greatly and conferring 25% block to standard attacks.
        CView.text("Lowering her scepter towards the ground, the eight-foot tall sorceress suddenly grunts, lifting it as if carrying great weight.  As the small staff passes her chest, bits of stone and rock begin to lift out of the ground, accelerating into a vortex of earth that spins around her.  <b>It's going to be harder to hit her with physical attacks now!</b>");
        char.effects.create(EffectType.Earthshield);
    }
}

// *GigaFire
class GigaFire extends CombatAction {
    public name = "Giga Fire";
    protected useAction(char: Character, enemy: Character) {
        // Begins focusing into her staff, which floats in front of her.  PC disrupt attack by attacking.  Attack hits at half strength if disrupted.
        CView.text("Releasing the scepter, the Sand Mother spreads her hands, each glowing with eldritch, white flames.  Her heels slowly float up off the ground as she closes her eyes in concentration.  You can sense the power and heat rolling off her in waves, and if you don't do something to disrupt her, you'll likely be burned to a crisp.");
        if (enemy.stats.int > 40) CView.text("  She's not even looking at you and seems steeled against lusty interruptions.  Perhaps you can hit her hard enough to shatter her concentration.");
        char.effects.create(EffectType.Gigafire, { counter: 0 });
    }
}

class GigaFire2 extends CombatAction {
    public name = "Giga Fire 2";
    protected useAction(char: Character, enemy: Character) {
        let damage: number = 40 + randInt(11);
        const gigaFire = char.effects.getByName(EffectType.Gigafire);
        // Not interrupted:
        if (gigaFire && gigaFire.values.counter && gigaFire.values.counter < 10) {
            CView.text("The Sand Mother grabs her scepter in both hands, combining the flames that wreath them into an immense, blinding conflagration.  She points at you, and the fire washes out in a wave like a serpent, twisting at you as you try to avoid it, doubling back on itself whenever it misses.  It's unavoidable!  You're enveloped in the consuming fire!");
            damage *= 3;
        }
        // Interrupted:
        else {
            CView.text("Thumbling back to the ground from your damaging hit, the Sand Mother grabs at her head, one flame going out.  She recovers in time to grab the staff and fling it towards you, but it's at a fraction of the strength she intended.  Still, it burns all the same.");
        }
        damage = enemy.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
        char.effects.removeByName(EffectType.Gigafire);
    }
}

// *Telekinesis
// Throws the PC against the wall.  Does more damage to shorter, thinner PCs.
class Telekinesis extends CombatAction {
    public name = "Telekinesis";
    protected useAction(char: Character, enemy: Character) {
        CView.text("She narrows her eyes at you, and an immense, magical pressure reaches out, taking hold of you.  It spins you in the air before slamming you into the walls!");

        let sizeMod: number = 100;
        const thickMod: number = enemy.body.thickness / 100 + 0.5;
        sizeMod += enemy.body.tallness * thickMod;
        if (sizeMod < 140) CView.text("  You immediately wish you weren't so small, as you're sure she couldn't have flung a heavier champion nearly as easily.");
        else if (sizeMod >= 200) CView.text("  You're glad for your size, as she couldn't seem to accelerate you into the stone as fast as she'd like.  Sometimes eating plenty pays off.");
        // 0 thickness, 4' tall: 124
        // 100 thickness, 4' tall: 172
        // 0 thickness, 6' tall: 136
        // 100 thickness, 6' tall: 208
        // 0 thickness, 8' tall: 148
        // 100 thickness, 8' tall: 244
        const multiplier: number = sizeMod / 170;
        let damage: number = 20;
        damage = multiplier * damage;
        damage = enemy.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
    }
}

// *Lightning Bolt
// Unavoidable magic damage.
class LightningBolt extends CombatAction {
    public name = "Lightning Bolt";
    protected useAction(char: Character, enemy: Character) {
        CView.text("Holding her staff back, she lifts her free hand with her fingers outstretched in a fan.  Sparks dance between her slender digits, coiling around them like snakes.  In a flash, they rush to her palm and erupt in a lightning bolt, striking you instantly and unavoidably!");
        let damage: number = 30 + randInt(10);
        damage = enemy.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
    }
}

// *Whisper:
// As ackbal, stuns the PC 1 round.  Cannot be resisted.
class Whispered extends CombatAction {
    public name = "Whispered";
    protected useAction(char: Character, enemy: Character) {
        CView.text("Mouthing, \"<i>Can you hear me?</i>\" the witch's voice intrudes into your mind, matching her mouth word for word.  She floods your psyche with words and thoughts, all of your defeat or submission, each more degrading and more humiliating than the last.  Perhaps the worst are the ones where she turns you over to Lethice after you're broken...  The tumultous thoughts and emotions both stun and arouse you, preventing you from attacking while you try to clear your beleaguered consciousness.");
        enemy.effects.create(EffectType.Whispered);
        enemy.stats.lust += 15;
    }
}

// Notes:
// Starts combat with sandstorm.  GigaFire's every fifth round.
// Whispers every fourth.
class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new SandStorm(), new GigaFire2(), new Whispered(), new LightningBolt(), new Telekinesis(), new GigaFire(), new EarthShield()];
    public use(char: Character, enemy: Character): void {
        if (!char.effects.has(EffectType.Sandstorm))
            this.subActions[0].use(char, enemy);

        if (char.effects.has(EffectType.Gigafire))
            this.subActions[1].use(char, enemy);

        if (!enemy.effects.has(EffectType.Whispered)) this.subActions[randInt(5) + 2].use(char, enemy);
        else this.subActions[randInt(4) + 3].use(char, enemy);
    }
}

class SandWitchMotherEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return loseToTheSandMother(enemy);
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatTheSandMother(enemy, this.char);
    }
}

export class SandMother extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.SandMother);
        this.description = new CharacterDescription(this, "the ", "Sand Mother", "The Sand Mother is a towering woman of imposing stature and bust.  She wears a much silkier, regal-looking robe than her sisters, and it barely serves to contain her four milk-laden breasts, straining under their jiggling weight.  Dangling around her in a way that reminds you oddly of a halo, the Sand Mother's blonde-white hair fans around her, hanging long behind her.  The queen witch is brandishing a pearly white scepter rather threateningly, though from the way she holds it, it's clear she doesn't intend to use it as a physical weapon.");
        this.body.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.body.chest.add(new BreastRow(breastCupInverse("DD")));
        this.body.chest.add(new BreastRow(breastCupInverse("DD")));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = 8 * 12 + 6;
        this.body.hips.rating = HipRating.CURVY;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "bronzed";
        this.body.hair.color = "platinum-blonde";
        this.body.hair.length = 15;

        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 70 });
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 50 });

        this.stats.str = 55;
        this.stats.tou = 55;
        this.stats.spe = 35;
        this.stats.int = 45;
        this.stats.lib = 55;
        this.stats.sens = 40;
        this.stats.cor = 30;
        this.stats.lust = 20;
        this.stats.lustVuln = .6;
        this.stats.level = 7;
        this.stats.maxHP = 130;
        this.stats.HP = this.stats.maxHP;

        this.effects.create(EffectType.Resolute);
        this.effects.create(EffectType.Focused);

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "punches", 0),
            new Armor("robes" as ArmorName, new ItemDesc("robes"), "robes", 1)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new SandWitchMotherEndScenes(this),
                rewards: {
                    gems: randInt(15) + 55,
                }
            });
    }
}
