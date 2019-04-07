import { Flags } from 'Engine/Flags';
import { Character } from 'Content/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { passTime } from 'Content/Scenes/PassTime';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { CharacterType } from 'Content/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastCup } from 'Engine/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { LegType } from 'Engine/Body/Legs';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { MaterialName } from 'Content/Items/MaterialName';
import { AntennaeType } from 'Engine/Body/Antennae';
import { WingType } from 'Engine/Body/Wings';
import { TailType, Tail } from 'Engine/Body/Tail';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { beeRapesYou, beeGirlsGetsDildoed, milkAndHoneyAreKindaFunny, rapeTheBeeGirl } from './BeeGirlScene';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { TamaniFlags } from './TamaniScene';
import { MainAction } from 'Content/Combat/Actions/MainAction';

export const BeeGirlFlags = Flags.register("BeeGirl", {
    BEE_GIRL_STATUS: 0,
    BEE_GIRL_COMBAT_LOSSES: 0,
    BEE_GIRL_COMBAT_WINS_WITH_RAPE: 0,
    BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE: 0,
    FORCE_BEE_TO_PRODUCE_HONEY: 0,
});

class BeeGirlEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
            return { next: passTime(1) };
        }
        else {
            return beeRapesYou(enemy);
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        CView.clear();
        if (enemy.gender > 0) {
            if (howYouLost === DefeatType.HP) {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            else {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            enemy.stats.lust = 98;
            enemy.stats.lust += 1;

            const dildoRape = (TamaniFlags.DELUXE_DILDO ? choiceWrap(beeGirlsGetsDildoed, this.char) : undefined);
            const milkAndHoney = (enemy.effects.has(EffectType.Feeder) ? choiceWrap(milkAndHoneyAreKindaFunny, this.char) : undefined);
            return { choices: [["Rape", choiceWrap(rapeTheBeeGirl, this.char)], ["Dildo Rape", dildoRape], ["", undefined], ["B. Feed", milkAndHoney], ["Leave", leaveAfterDefeating]] };
        }
        else if (enemy.effects.has(EffectType.Feeder)) { // Genderless can still breastfeed
            if (howYouLost === DefeatType.HP) {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            else {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            return { choices: [["B. Feed", milkAndHoneyAreKindaFunny], ["", undefined], ["", undefined], ["", undefined], ["Leave", leaveAfterDefeating]] };
        }
        return { next: passTime(1) };
    }
}

function leaveAfterDefeating(beeGirl: Character): NextScreenChoices {
    if (beeGirl.stats.HP < 1) {
        BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE++; // This only happens if you beat her up and then don't rape her
    }
    else {
        BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITH_RAPE++; // All wins by lust count towards the desire option, even when you leave
    }
    return { next: passTime(1) };
}

class BeeSting extends CombatAction {
    public name: string = "Bee Sting";
    public useAction(beeGirl: Character, player: Character) {
        // Blind dodge change
        if (beeGirl.effects.has(EffectType.Blind)) {
            CView.text(beeGirl.desc.capitalA + beeGirl.desc.short + " completely misses you with a blind sting!!");
            return;
        }
        // Determine if dodged!
        if (player.stats.spe - beeGirl.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - beeGirl.stats.spe) / 4) + 80)) > 80) {
            if (player.stats.spe - beeGirl.stats.spe < 8) CView.text("You narrowly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger!");
            if (player.stats.spe - beeGirl.stats.spe >= 8 && player.stats.spe - beeGirl.stats.spe < 20) CView.text("You dodge " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger with superior quickness!");
            if (player.stats.spe - beeGirl.stats.spe >= 20) CView.text("You deftly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s slow attempts to sting you.");
            return;
        }
        // determine if avoided with armor.
        if (player.combat.defense() >= 10 && randInt(4) > 0) {
            CView.text("Despite her best efforts, " + beeGirl.desc.a + beeGirl.desc.short + "'s sting attack can't penetrate your armor.");
            return;
        }
        // Sting successful!  Paralize or lust?
        // Lust 50% of the time
        if (randInt(2) === 0) {
            CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
            CView.text("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
            if (player.gender === 1) CView.text("or dripping honey-slicked cunts beckoning you. ");
            if (player.gender === 2) CView.text("planting your aching sex over her face while you lick her sweet honeypot. ");
            if (player.gender === 3) CView.text("or cocks, tits, and puffy nipples. ");
            player.stats.lust += 25;

            if (player.stats.lust > 60) {
                CView.text(" You shake your head and struggle to stay focused,");
                if (player.gender === 1 || player.gender === 3) CView.text(" but it's difficult with the sensitive bulge in your groin.");
                if (player.gender === 2) CView.text(" but can't ignore the soaking wetness in your groin.");
                if (player.stats.sens > 50) CView.text("  The sensitive nubs of your nipples rub tightly under your " + player.inventory.armor.displayName + ".");
            }
            else CView.text(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
            if (!player.effects.has(EffectType.lustvenom))
                player.effects.create(EffectType.lustvenom);
        }
        // Paralise the other 50%!
        else {
            CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
            const paralyzeEffect = player.effects.getByName(EffectType.ParalyzeVenom);
            if (paralyzeEffect && paralyzeEffect.values.str && paralyzeEffect.values.spe) {
                paralyzeEffect.values.str += 2.9; // v1 - strenght penalty, v2 speed penalty
                paralyzeEffect.values.spe += 2.9; // v1 - strenght penalty, v2 speed penalty
                player.stats.str -= 3;
                player.stats.spe -= 3;

                CView.text("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
            }
            else {
                player.effects.create(EffectType.ParalyzeVenom, { str: 2, spe: 2 });
                player.stats.str -= 2;
                player.stats.spe -= 2;

                CView.text("  You've fallen prey to paralyzation venom!  Better end this quick!");
            }
        }
    }
}

export class BeeGirl extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.BeeGirl);
        this.description = new CharacterDescription(this, "a ", "bee-girl", "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.");
        this.body.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.GAPING, false));
        this.body.chest.firstRow.rating = BreastCup.DD;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(14) + 59;
        this.body.hips.rating = HipRating.CURVY + 3;
        this.body.butt.rating = ButtRating.EXPANSIVE;
        this.body.legs.type = LegType.BEE;
        this.body.skin.tone = "yellow";
        this.body.hair.color = randomChoice("black", "black and yellow");
        this.body.hair.length = 6;
        this.body.antennae.type = AntennaeType.BEE;
        this.body.wings.type = WingType.BEE_LIKE_SMALL;
        this.body.tails.add(new Tail(TailType.BEE_ABDOMEN, 100));

        this.stats.str = 30;
        this.stats.tou = 30;
        this.stats.spe = 30;
        this.stats.int = 20;
        this.stats.lib = 60;
        this.stats.sens = 55;
        this.stats.cor = 0;
        this.stats.HP = this.stats.maxHP;
        this.stats.lust = 20 + randInt(40);
        this.stats.lustVuln = 0.9;
        this.stats.level = 4;

        this.inventory = new CharacterInventory(this,
            new Weapon("chitin-plated fist" as WeaponName, new ItemDesc("chitin-plated fist"), "chitin-plated fist", "armored punch", 1),
            new Armor("chitin" as ArmorName, new ItemDesc("chitin"), "chitin", 9)
        );

        this.combatContainer = new CombatContainer(this, {
            mainAction: new MainAction(),
            endScenes: new BeeGirlEndScenes(this),
            rewards: {
                gems: randInt(15) + 1,
                drop: new WeightedDrop<string>()
                    .add(ConsumableName.BeeHoney, 4)
                    .addMany(1, ConsumableName.OvipositionElixir, ConsumableName.WhiteSpellbook, MaterialName.BlackChitin)
            }
        });
        this.combat.action.subActions.push(new BeeSting());
    }
}
