define(["require", "exports", "Engine/Flags", "Engine/Character/Character", "Engine/Display/ContentView", "Engine/Display/ScreenDisplay", "Content/Effects/EffectType", "Content/Scenes/PassTime", "Engine/Utilities/SMath", "Content/Character/CharacterType", "Engine/Body/Vagina", "Engine/Body/BreastRow", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Body/Legs", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Content/Items/MaterialName", "Engine/Body/Antennae", "Engine/Body/Wings", "Engine/Body/Tail", "Engine/Combat/EndScenes", "./BeeGirlScene", "Engine/Combat/DefeatEvent", "Engine/Character/CharacterDescription", "Engine/Inventory/CharacterInventory", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/CombatContainer", "Engine/Combat/Actions/CombatAction", "./TamaniScene", "Content/Combat/Actions/MainAction"], function (require, exports, Flags_1, Character_1, ContentView_1, ScreenDisplay_1, EffectType_1, PassTime_1, SMath_1, CharacterType_1, Vagina_1, BreastRow_1, Butt_1, Hips_1, Legs_1, WeightedDrop_1, ConsumableName_1, MaterialName_1, Antennae_1, Wings_1, Tail_1, EndScenes_1, BeeGirlScene_1, DefeatEvent_1, CharacterDescription_1, CharacterInventory_1, Weapon_1, ItemDesc_1, Armor_1, CombatContainer_1, CombatAction_1, TamaniScene_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BeeGirlFlags = Flags_1.Flags.register("BeeGirl", {
        BEE_GIRL_STATUS: 0,
        BEE_GIRL_COMBAT_LOSSES: 0,
        BEE_GIRL_COMBAT_WINS_WITH_RAPE: 0,
        BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE: 0,
        FORCE_BEE_TO_PRODUCE_HONEY: 0,
    });
    class BeeGirlEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            if (enemy.effects.has(EffectType_1.EffectType.CameWorms)) {
                ContentView_1.CView.text("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
                return { next: PassTime_1.passTime(1) };
            }
            else {
                return BeeGirlScene_1.beeRapesYou(enemy);
            }
        }
        defeatScene(howYouLost, enemy) {
            ContentView_1.CView.clear();
            if (enemy.gender > 0) {
                if (howYouLost === DefeatEvent_1.DefeatType.HP) {
                    ContentView_1.CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
                }
                else {
                    ContentView_1.CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
                }
                enemy.stats.lust = 98;
                enemy.stats.lust += 1;
                const dildoRape = (TamaniScene_1.TamaniFlags.DELUXE_DILDO ? ScreenDisplay_1.choiceWrap(BeeGirlScene_1.beeGirlsGetsDildoed, this.char) : undefined);
                const milkAndHoney = (enemy.effects.has(EffectType_1.EffectType.Feeder) ? ScreenDisplay_1.choiceWrap(BeeGirlScene_1.milkAndHoneyAreKindaFunny, this.char) : undefined);
                return { choices: [["Rape", ScreenDisplay_1.choiceWrap(BeeGirlScene_1.rapeTheBeeGirl, this.char)], ["Dildo Rape", dildoRape], ["", undefined], ["B. Feed", milkAndHoney], ["Leave", leaveAfterDefeating]] };
            }
            else if (enemy.effects.has(EffectType_1.EffectType.Feeder)) { // Genderless can still breastfeed
                if (howYouLost === DefeatEvent_1.DefeatType.HP) {
                    ContentView_1.CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
                }
                else {
                    ContentView_1.CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
                }
                return { choices: [["B. Feed", BeeGirlScene_1.milkAndHoneyAreKindaFunny], ["", undefined], ["", undefined], ["", undefined], ["Leave", leaveAfterDefeating]] };
            }
            return { next: PassTime_1.passTime(1) };
        }
    }
    function leaveAfterDefeating(beeGirl) {
        if (beeGirl.stats.HP < 1) {
            exports.BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE++; // This only happens if you beat her up and then don't rape her
        }
        else {
            exports.BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITH_RAPE++; // All wins by lust count towards the desire option, even when you leave
        }
        return { next: PassTime_1.passTime(1) };
    }
    class BeeSting extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Bee Sting";
        }
        useAction(beeGirl, player) {
            // Blind dodge change
            if (beeGirl.effects.has(EffectType_1.EffectType.Blind)) {
                ContentView_1.CView.text(beeGirl.desc.capitalA + beeGirl.desc.short + " completely misses you with a blind sting!!");
                return;
            }
            // Determine if dodged!
            if (player.stats.spe - beeGirl.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - beeGirl.stats.spe) / 4) + 80)) > 80) {
                if (player.stats.spe - beeGirl.stats.spe < 8)
                    ContentView_1.CView.text("You narrowly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger!");
                if (player.stats.spe - beeGirl.stats.spe >= 8 && player.stats.spe - beeGirl.stats.spe < 20)
                    ContentView_1.CView.text("You dodge " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger with superior quickness!");
                if (player.stats.spe - beeGirl.stats.spe >= 20)
                    ContentView_1.CView.text("You deftly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s slow attempts to sting you.");
                return;
            }
            // determine if avoided with armor.
            if (player.combat.defense() >= 10 && SMath_1.randInt(4) > 0) {
                ContentView_1.CView.text("Despite her best efforts, " + beeGirl.desc.a + beeGirl.desc.short + "'s sting attack can't penetrate your armor.");
                return;
            }
            // Sting successful!  Paralize or lust?
            // Lust 50% of the time
            if (SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
                ContentView_1.CView.text("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
                if (player.gender === 1)
                    ContentView_1.CView.text("or dripping honey-slicked cunts beckoning you. ");
                if (player.gender === 2)
                    ContentView_1.CView.text("planting your aching sex over her face while you lick her sweet honeypot. ");
                if (player.gender === 3)
                    ContentView_1.CView.text("or cocks, tits, and puffy nipples. ");
                player.stats.lust += 25;
                if (player.stats.lust > 60) {
                    ContentView_1.CView.text(" You shake your head and struggle to stay focused,");
                    if (player.gender === 1 || player.gender === 3)
                        ContentView_1.CView.text(" but it's difficult with the sensitive bulge in your groin.");
                    if (player.gender === 2)
                        ContentView_1.CView.text(" but can't ignore the soaking wetness in your groin.");
                    if (player.stats.sens > 50)
                        ContentView_1.CView.text("  The sensitive nubs of your nipples rub tightly under your " + player.inventory.armor.displayName + ".");
                }
                else
                    ContentView_1.CView.text(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
                if (!player.effects.has(EffectType_1.EffectType.lustvenom))
                    player.effects.create(EffectType_1.EffectType.lustvenom);
            }
            // Paralise the other 50%!
            else {
                ContentView_1.CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
                const paralyzeEffect = player.effects.getByName(EffectType_1.EffectType.ParalyzeVenom);
                if (paralyzeEffect && paralyzeEffect.values.str && paralyzeEffect.values.spe) {
                    paralyzeEffect.values.str += 2.9; // v1 - strenght penalty, v2 speed penalty
                    paralyzeEffect.values.spe += 2.9; // v1 - strenght penalty, v2 speed penalty
                    player.stats.str -= 3;
                    player.stats.spe -= 3;
                    ContentView_1.CView.text("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
                }
                else {
                    player.effects.create(EffectType_1.EffectType.ParalyzeVenom, { str: 2, spe: 2 });
                    player.stats.str -= 2;
                    player.stats.spe -= 2;
                    ContentView_1.CView.text("  You've fallen prey to paralyzation venom!  Better end this quick!");
                }
            }
        }
    }
    class BeeGirl extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.BeeGirl);
            this.description = new CharacterDescription_1.CharacterDescription(this, "a ", "bee-girl", "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.");
            this.body.vaginas.add(new Vagina_1.Vagina(Vagina_1.VaginaWetness.SLAVERING, Vagina_1.VaginaLooseness.GAPING, false));
            this.body.chest.firstRow.rating = BreastRow_1.BreastCup.DD;
            this.body.butt.looseness = Butt_1.ButtLooseness.STRETCHED;
            this.body.butt.wetness = Butt_1.ButtWetness.NORMAL;
            this.body.tallness = SMath_1.randInt(14) + 59;
            this.body.hips.rating = Hips_1.HipRating.CURVY + 3;
            this.body.butt.rating = Butt_1.ButtRating.EXPANSIVE;
            this.body.legs.type = Legs_1.LegType.BEE;
            this.body.skin.tone = "yellow";
            this.body.hair.color = SMath_1.randomChoice("black", "black and yellow");
            this.body.hair.length = 6;
            this.body.antennae.type = Antennae_1.AntennaeType.BEE;
            this.body.wings.type = Wings_1.WingType.BEE_LIKE_SMALL;
            this.body.tails.add(new Tail_1.Tail(Tail_1.TailType.BEE_ABDOMEN, 100));
            this.stats.str = 30;
            this.stats.tou = 30;
            this.stats.spe = 30;
            this.stats.int = 20;
            this.stats.lib = 60;
            this.stats.sens = 55;
            this.stats.cor = 0;
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 20 + SMath_1.randInt(40);
            this.stats.lustVuln = 0.9;
            this.stats.level = 4;
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("chitin-plated fist", new ItemDesc_1.ItemDesc("chitin-plated fist"), "chitin-plated fist", "armored punch", 1), new Armor_1.Armor("chitin", new ItemDesc_1.ItemDesc("chitin"), "chitin", 9));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new BeeGirlEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(15) + 1,
                    drop: new WeightedDrop_1.WeightedDrop()
                        .add(ConsumableName_1.ConsumableName.BeeHoney, 4)
                        .addMany(1, ConsumableName_1.ConsumableName.OvipositionElixir, ConsumableName_1.ConsumableName.WhiteSpellbook, MaterialName_1.MaterialName.BlackChitin)
                }
            });
            this.combat.action.subActions.push(new BeeSting());
        }
    }
    exports.BeeGirl = BeeGirl;
});
//# sourceMappingURL=BeeGirl.js.map