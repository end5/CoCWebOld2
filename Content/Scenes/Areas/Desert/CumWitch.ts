import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CharacterType } from 'Content/Character/CharacterType';
import { Cock, CockType } from 'Engine/Body/Cock';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { EffectType } from 'Content/Effects/EffectType';
import { BreastRow } from 'Engine/Body/BreastRow';
import { breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { HipRating } from 'Engine/Body/Hips';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CView } from 'Engine/Display/ContentView';
import { combatMiss, combatMisdirect, combatEvade, combatFlexibility } from 'Content/Combat/CombatUtils';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { CombatAction, IActionDamage } from 'Engine/Combat/Actions/CombatAction';
import { defeatedByCumWitch, cumWitchDefeated } from 'Content/Scenes/Areas/Desert/CumWitchScene';
import { Womb } from 'Engine/Body/Pregnancy/Womb';

// *Attack: Heal
// *Restores one third of her HP.
class Heal extends CombatAction {
    public name = "Heal";
    protected useAction(self: Character, enemy: Character) {
        CView.text("The Witch smirks at you and holds her free hand under her robes.  When she pulls it out, you realize she's gathered a handful of her cum.  She holds it up and exhales over it, the air making a slight whistle as it blows through her parted lips.  The ebony sorceress then smears the goop over her wounds, which seem to drink in the cum and vanish before your eyes.  She scolds, \"<i>Physical damage?  How artless.</i>\"");
        self.combat.gainHP(self.stats.maxHP * 0.33);
        // self.stats.fatigue
    }
}

// *Attack: Bukkake
class Bukkake extends CombatAction {
    public name = "Bukkake";
    protected useAction(self: Character, enemy: Character) {
        // *Cum Witch hikes up her dress and bukkake's at PC.  Large # of chance for 'hits' for low individual damage.  Small reduction to sand witch lust.  Used more at high lust.
        CView.text("The Cum Witch moans and daintily peels her robes away from her swollen cock-flesh.  A bubble of precum pops wetly from her urethra to splatter on the floor as her balls suddenly swell.  You look back up in time to see the telltale glow of magic surrounding her staff, but then she's thrusting her hips at you, lewdly humping the air as she unleashes rope after thick rope of potent jism in your direction!\n");
    }

    protected checkMiss(self: Character, enemy: Character): boolean {
        if (combatMiss(self, enemy) || combatMisdirect(self, enemy)) {
            // Miss1
            if (randInt(3) === 0) CView.text("\nA glob of her goo goes wide, over your shoulder!");
            else if (randInt(2) === 0) CView.text("\nOne wave of alabaster falls short, to splatter at your [feet].");
            else CView.text("\nSome of the Cum Witch's cum nearly hits you, but you manage to step aside.");
            return true;
        }
        // Evade
        else if (combatEvade(self, enemy)) {
            CView.text("\nYou roll away from some of the hermaphrodite spunk, easily evading it.");
            return true;
        }
        // Misdirect
        else if (combatMisdirect(self, enemy)) {
            CView.text("\nYou feint one direction and then move another, misdirecting like a pro and avoiding some of the sexual artillery.");
            return true;
        }
        // Flexibility
        else if (combatFlexibility(self, enemy)) {
            CView.text("\nYou twist aside, making the most of your cat-like reflexes to avoid some of the stuff.");
            return true;
        }
        return false;
    }

    protected calcDamage(self: Character, enemy: Character): undefined | IActionDamage {
        let lust = 2;
        const hitType = randInt(5);
        if (hitType === 0) CView.text("\nA mass of jizz splatters into your [hair], soaking it with thick, salty goo.");
        else if (hitType === 1) CView.text("\nOne jet of thick witch-cum hits you in the [chest] before you can react.  You can feel it getting inside your [armor], squishing and sliding over your [nipples] as you try to fight.");
        else if (hitType === 2) CView.text("\nSome of the stuff spatters off your arm and soaks your hand, making it a slimy mess.");
        else if (hitType === 3) CView.text("\nA creamy deluge hits your [legs], though rather than running down, it seems to come up, flowing into your [armor] to squish wetly across your sensitive groin.");
        else {
            CView.text("\nSpunk nearly blinds you as the Cum Witch's virile fluids take you in the face.  You spit some of it out, the smell of the stuff making your head swim.");
            // bonus damage!
            lust += 3;
        }
        return { lust };
    }

    protected applyDamage(self: Character, enemy: Character, damage: number, lust: number, crit: boolean): void {
        enemy.stats.lust += lust;
    }

    public use(char: Character, enemy: Character): void {
        const reaction = enemy.combat.reactions.get(this.name);
        let miss = false;
        if (reaction && reaction.beforeConsumeComponents)
            if (!reaction.beforeConsumeComponents(enemy, char)) return;

        if (this.consumeComponents)
            this.consumeComponents(char, enemy);

        if (reaction && reaction.beforeUseAction)
            if (!reaction.beforeUseAction(enemy, char)) return;

        if (this.useAction)
            this.useAction(char, enemy);

        let hits: number = 5 + randInt(8);

        while (hits > 0) {
            hits--;

            if (this.checkMiss)
                miss = this.checkMiss(char, enemy);

            if (miss) {
                if (reaction && reaction.beforeMissed)
                    if (!reaction.beforeMissed(enemy, char)) continue;

                if (this.missed)
                    this.missed(char, enemy);
            }
            else {
                if (this.calcDamage) {
                    const initialDamage = this.calcDamage(char, enemy);

                    let modifiedDamage;
                    if (reaction && reaction.beforeApplyDamage) {
                        modifiedDamage = reaction.beforeApplyDamage(enemy, char, initialDamage);
                    }

                    if (modifiedDamage && !modifiedDamage.continue) continue;

                    if (this.applyDamage) {
                        let damage = 0;
                        if (modifiedDamage && modifiedDamage.damage)
                            damage = modifiedDamage.damage;
                        else if (initialDamage && initialDamage.damage)
                            damage = initialDamage.damage;

                        let lust = 0;
                        if (modifiedDamage && modifiedDamage.lust)
                            lust = modifiedDamage.lust;
                        else if (initialDamage && initialDamage.lust)
                            lust = initialDamage.lust;

                        let crit = false;
                        if (modifiedDamage && modifiedDamage.crit)
                            crit = modifiedDamage.crit;
                        else if (initialDamage && initialDamage.crit)
                            crit = initialDamage.crit;

                        this.applyDamage(char, enemy, damage, lust, crit);
                    }
                }
            }
        }
    }
}

// *Attack: Cum Magic
class CumMagic extends CombatAction {
    public name = "Cum Magic";
    protected useAction(self: Character, enemy: Character) {
        // *Used on males only, casts spell that causes balls to temporarily swell and increase lust by a moderate amount.  Unavoidable.
        CView.text("Gesticulating with her free hand, the Cum Witch utters impossible to pronounce words before closing her fingers tightly into a fist.  That same instant, you feel an onset of warmth in your [balls], a spreading heat that makes you tremble with growing lust.  A second later, [eachCock] is throbbing, and a runner of cum trickles from the [cockHead], a hint of your temporarily-enhanced virility.");
        // (15-30 lust, based on libido)
        enemy.stats.lust += 5 + enemy.stats.lib / 12;
        enemy.hoursSinceCum += 100;
    }
}

// *Attack: Cum Hunger
// *Used on vagoozles, spell that causes womb to literally thirst for sperm.  Unavoidable moderate lust gain.  Pregnant character's are immune.
class CumHunger extends CombatAction {
    public name = "Cum Hunger";
    protected useAction(self: Character, enemy: Character) {
        CView.text("Moaning luridly, the Cum Witch swivels her staff and opens her hand to spread her fingers wide.  At the same time, you feel her magic slam into your midsection, burrowing into your womb.  ");
        if (enemy.body.wombs.find(Womb.Pregnant)) {
            CView.text("Yet, whatever she tries to do fails, as her otherworldly conjuration falls apart as soon as soon as it reaches you.");
            return;
        }
        CView.text("It worms around your uterus, tickling it faintly before gently kneading your ovaries.  Your [legs] go weak as your womb throbs, hungering for something to fill it.  A trickle of wetness squirts from your [vagina] as the magic fades, and you squirm as your lust rises. If only something would make you pregnant!  Your eyes dart unbidden to the Witch's groin before you yank them away.");
        enemy.stats.lust += 5 + enemy.stats.lib / 12;
    }
}

// *Attack: Gender Confusion
class GenderConfusion extends CombatAction {
    public name = "Gender Confusion";
    protected useAction(self: Character, enemy: Character) {
        // *Used on genderless and hermaphrodite characters.  Mental attack that draws on disharmony with standard gender types to stun for one round.  3 turn cooldown
        CView.text("Touching her alabaster staff to her brow, just under the brim of her hat, the Cum Witch makes a brief incantation and fixes you with her gaze.  Her eyes flash blindingly white, and then you feel her inside you, rifling through your memories, digging up memories of your childhood, your past, and throwing them against you.  ");
        if (enemy.stats.int / 5 + randInt(20) + enemy.stats.level / 2 < 18) {
            CView.text("She batters your consciousness with conflicting memories of your gender, utterly dazing you.  How can you fight when you can barely tell who you are anymore?");
            enemy.effects.create(EffectType.Confusion);
        }
        else {
            CView.text("You parse the flood of information with mental focus and expel the intruder from your mind with a clenching of your sizable intellect.");
        }
    }
}

// *Attack: Shell
class ShellDefense extends CombatAction {
    public name = "Shell Defense";
    protected useAction(self: Character, enemy: Character) {
        // *Grants immunity to all magic-based attacks for the next two turns.
        CView.text("The Cum Witch holds her staff in both hands and rotates it in a circle, chanting all the while.  Her voice rises in pitch and intensity until she's screaming out unwords of power.  With one final cry, she slams her staff down into the ground hard enough to kick up a puff of sandy dust.  It quickly settles, but the Cum Witch has some kind of glittering, reflective shield around herself now!");
        // $> Check again
        // self.effects.create(EffectType.Shell, 3, 0, 0, 0);
        self.effects.create(EffectType.Shell);
    }
}

// *Attack: Cocknosis
// *Intelligence dependant attack with possibility of very high lust gain.
class Cocknosis extends CombatAction {
    public name = "Cocknosis";
    protected useAction(self: Character, enemy: Character) {
        CView.text("Lifting her robes enticingly, the Cum Witch reveals her ");
        if (self.stats.lust < 50) CView.text("half-hard");
        else if (self.stats.lust < 70) CView.text("hard");
        else if (self.stats.lust < 85) CView.text("throbbing");
        else CView.text("hard, dripping");
        CView.text(" cock.  She gently begins to sway her hips, bouncing back and forth with near-mechanical precision, her softly bobbing cock catching your eyes with its metronome-like precision.  She softly begins to speak, enunciating each word to the time and tune of her movements.");

        CView.text("\n\n\"<i>See my cock?  See the glistening thickness of it?  Watch how it sways and bobs for you, moving with such smooth and easy grace.  Can you feel your eyes following it, locking onto it and never letting go?</i>\"\n\n");

        if (enemy.stats.int / 20 + randInt(20) >= 13) {
            CView.text("You chuckle at her crude attempt to hypnotize you with her member.  She stomps her foot in irritation and drops her robes back into place.");
        }
        else {
            CView.text("The Witch smirks, though you're too focused on her cock to see, and she continues, \"<i>Good " + mf(enemy, "boy", "girl") + ".  Watch it sway.  You're so focused on my cock now that the world is just falling away around it, sinking into nothingness, leaving only that wonderful cock behind for you to watch.  And since it's filling your view, you can feel it filling your mind as well, can't you?</i>\"");
            CView.text("\n\nYou nod, your view rigidly attached to her equally rigid tool as you utterly and completely fixate on her penis, admiring its curves, its thickness, and the way it seems to pulsate happily for you whenever you look at it just right.  The Witch keeps talking, but it's her dick that's important.  You start to drool as your " + describeSkin(enemy) + " flushes and your body heats.  Gods, her cock is gorgeous.  Reaching down, you begin to masturbate without thinking.  You don't know why, but it just feels like the right thing to do.");
            enemy.stats.lust += 20;

            if (enemy.stats.lust <= 99) CView.text("\n\nYou bump against something, startling yourself out of the cocknosis before you can completely fall for it.  Still, you keep seeing her dick every time you close your eyes, and your body is very turned on from how you were touching yourself.");
            else CView.text("\n\nYou play with yourself until you're on the very edge of orgasm.  At that moment, a loud *SNAP* startles you back to wakefulness, and as you look down at the cock bobbing just a few inches away, you realize it's hopeless.  You can't fight this.");
            CView.text("\n\nThe witch smiles knowingly.");
        }
    }
}

class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions = [new Heal(), new CumMagic(), new Bukkake(), new Cocknosis(), new ShellDefense(), new GenderConfusion(), new CumHunger()];
    public use(self: Character, enemy: Character): void {
        // Hurt!
        if (self.combat.HPRatio() < .6) {
            this.subActions[0].use(self, enemy);
        }

        const choices = [];

        // Dicks only
        if (enemy.body.cocks.length > 0) choices.push(this.subActions[1]);
        choices.push(this.subActions[2]);
        choices.push(this.subActions[3]);
        if (!self.effects.has(EffectType.Shell)) {
            choices.push(this.subActions[4]);
            choices.push(this.subActions[4]);
            choices.push(this.subActions[4]);
        }
        // HERMS
        if (enemy.gender === 3) choices.push(this.subActions[5]);
        // VAGOOZLES
        if (enemy.body.vaginas.length > 0) choices.push(this.subActions[6]);

        randomChoice(choices).use(self, enemy);
    }
}

class CumWitchEndScenes extends EndScenes {
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return defeatedByCumWitch(enemy, this.char);
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return cumWitchDefeated(enemy, this.char, true);
    }
}

export class CumWitch extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.CumWitch);
        this.description = new CharacterDescription(this, "the ", "Cum Witch", "The Cum Witch is a moderately tall woman, almost six feet in height.  Her dark ebony skin is nearly as black as pitch, though it glitters with sweat from her recent sexual activities and the fight.  She has plump lips and long, smooth blonde hair, though much of it is hidden behind a pointed, wide-brimmed hat.  Her robes are even blacker than she is, but she wields an alabaster staff that fairly sizzles with magical might.  Of course, her garments don't do much to conceal her gigantic breasts.  Though there are only two, they're large enough to dwarf the four tits most sand witches are packing.");
        // this.plural = false;
        this.body.cocks.add(new Cock(12, 2, CockType.HUMAN));
        this.body.balls.count = 0;
        this.body.balls.size = 0;
        this.body.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.body.vaginas.add(new Vagina(VaginaWetness.WET, VaginaLooseness.LOOSE, false));
        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 20 });
        this.body.chest.add(new BreastRow(breastCupInverse("E")));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(12) + 55;
        this.body.hips.rating = HipRating.CURVY;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "black";
        this.body.hair.color = "sandy-blonde";
        this.body.hair.length = 15;
        this.stats.str = 35;
        this.stats.tou = 35;
        this.stats.spe = 35;
        this.stats.int = 85;
        this.stats.lib = 55;
        this.stats.sens = 40;
        this.stats.cor = 30;
        this.stats.lust = 30;
        this.stats.lustVuln = .8;
        this.stats.level = 6;
        this.stats.maxHP = 100;
        this.stats.HP = this.stats.maxHP;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "punches", 0),
            new Armor("robes" as ArmorName, new ItemDesc("robes"), "robes", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new CumWitchEndScenes(this),
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

    }
}
