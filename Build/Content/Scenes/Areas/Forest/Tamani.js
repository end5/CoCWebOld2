define(["require", "exports", "Engine/Character/Character", "Engine/Display/ScreenDisplay", "Engine/Utilities/SMath", "Engine/Display/ContentView", "Content/Descriptors/CockDescriptor", "Engine/Body/Cock", "Content/Scenes/PassTime", "Engine/Body/Vagina", "Content/Effects/EffectType", "Engine/Body/BreastRow", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "./TamaniScene", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Content/Character/CharacterType", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/EndScenes", "Engine/Combat/DefeatEvent", "Engine/Combat/Actions/CombatAction", "../BeyondCamp/Goblin", "Content/Combat/Actions/MainAction"], function (require, exports, Character_1, ScreenDisplay_1, SMath_1, ContentView_1, CockDescriptor_1, Cock_1, PassTime_1, Vagina_1, EffectType_1, BreastRow_1, Butt_1, Hips_1, WeightedDrop_1, ConsumableName_1, TamaniScene_1, CharacterDescription_1, CombatContainer_1, CharacterType_1, Weapon_1, ItemDesc_1, Armor_1, EndScenes_1, DefeatEvent_1, CombatAction_1, Goblin_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // New Tease option:
    class TamaniTease extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Tease";
        }
        useAction(char, enemy) {
            if (TamaniScene_1.TamaniFlags.TAMANI_TIMES_HYPNOTISED <= 0)
                return new Goblin_1.GoblinTeaseAttack().use(char, enemy);
            let selector = SMath_1.randInt(3);
            // Choose 1 of 3 variations
            if (selector === 0)
                ContentView_1.CView.text("Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, \"<i>Mmm, can't you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>\"\n\n");
            if (selector === 1)
                ContentView_1.CView.text("Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, \"<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress's pussy.</i>\"\n\n");
            if (selector === 2)
                ContentView_1.CView.text("Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"\n\n");
            // REACTIONS
            // LOW HYPNO VALUE:
            if (TamaniScene_1.TamaniFlags.TAMANI_TIMES_HYPNOTISED < 5) {
                selector = SMath_1.randInt(3);
                if (selector === 0)
                    ContentView_1.CView.text("You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.");
                if (selector === 1)
                    ContentView_1.CView.text("You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.");
                if (selector === 2)
                    ContentView_1.CView.text("No matter the case, her actions shifted a fair bit of your blood-flow to your groin.");
            }
            // MEDIUM HYPNO VALUE:
            else if (TamaniScene_1.TamaniFlags.TAMANI_TIMES_HYPNOTISED < 10) {
                selector = SMath_1.randInt(2);
                if (selector === 0) {
                    ContentView_1.CView.text("With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ");
                    if (enemy.body.cocks.length > 1)
                        ContentView_1.CView.text("Each of y");
                    else
                        ContentView_1.CView.text("Y");
                    ContentView_1.CView.text("our " + CockDescriptor_1.describeCocksLight(enemy));
                    if (enemy.stats.lust > 80)
                        ContentView_1.CView.text(" drips pre-cum");
                    else if (enemy.stats.lust > 40)
                        ContentView_1.CView.text(" grows harder");
                    else
                        ContentView_1.CView.text(" hardens");
                    ContentView_1.CView.text(" from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.");
                    if (enemy.stats.lust < 70)
                        ContentView_1.CView.text("  Still, you don't want to fuck her right now!");
                }
                else {
                    ContentView_1.CView.text("Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ");
                    if (enemy.body.cocks.length > 1)
                        ContentView_1.CView.text("each of ");
                    ContentView_1.CView.text("your " + CockDescriptor_1.describeCocksLight(enemy));
                    if (enemy.stats.lust <= 41)
                        ContentView_1.CView.text(" thicken perceptibly");
                    else if (enemy.stats.lust <= 81)
                        ContentView_1.CView.text(" twitch eagerly");
                    else
                        ContentView_1.CView.text("drip pre-cum");
                    ContentView_1.CView.text(", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.");
                    if (enemy.stats.lust < 70)
                        ContentView_1.CView.text("  Regardless, you're resolute in your desire not to fuck her right now!");
                }
            }
            // HIGH HYPNO VALUE
            else {
                selector = SMath_1.randInt(2);
                if (selector === 0) {
                    ContentView_1.CView.text("You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ");
                    if (enemy.body.cocks.length > 1)
                        ContentView_1.CView.text("each of ");
                    ContentView_1.CView.text("your " + CockDescriptor_1.describeCocksLight(enemy) + " aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.");
                }
                else {
                    ContentView_1.CView.text("You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ");
                    if (enemy.body.cocks.length > 1)
                        ContentView_1.CView.text("Each of y");
                    else
                        ContentView_1.CView.text("Y");
                    ContentView_1.CView.text("our " + CockDescriptor_1.describeCocksLight(enemy) + " pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.");
                }
            }
            enemy.stats.lust += (SMath_1.randInt(enemy.stats.lib / 5) + 3 + (TamaniScene_1.TamaniFlags.TAMANI_TIMES_HYPNOTISED));
        }
    }
    class TamaniDrugAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Drug Attack";
        }
        useAction(char, enemy) {
            const color = SMath_1.randomChoice("red", "green", "blue", "white", "black");
            // Throw offensive potions at the player
            if (color !== "blue") {
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
            }
            // Drink blue pots
            else {
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " pulls out a blue vial and uncaps it, swiftly downing its contents.");
                if (char.combat.HPRatio() < 1) {
                    ContentView_1.CView.text("  She looks to have recovered from some of her wounds!\n");
                    char.stats.HP += (char.stats.maxHP / 2);
                }
                else
                    ContentView_1.CView.text("  There doesn't seem to be any effect.\n");
                return;
            }
            // Dodge chance!
            if ((enemy.effects.has(EffectType_1.EffectType.Evade) && SMath_1.randInt(10) <= 3) || (SMath_1.randInt(100) < enemy.stats.spe / 5)) {
                ContentView_1.CView.text("\nYou narrowly avoid the gush of alchemic fluids!\n");
            }
            else {
                // Get hit!
                if (color === "red") {
                    // Temporary heat
                    ContentView_1.CView.text("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n");
                    if (!enemy.effects.has(EffectType_1.EffectType.TemporaryHeat))
                        enemy.effects.create(EffectType_1.EffectType.TemporaryHeat);
                }
                else if (color === "green") {
                    // Green poison
                    ContentView_1.CView.text("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n");
                    if (!enemy.effects.has(EffectType_1.EffectType.Poison))
                        enemy.effects.create(EffectType_1.EffectType.Poison);
                }
                else if (color === "white") {
                    // sticky flee prevention
                    ContentView_1.CView.text("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n");
                    if (!enemy.effects.has(EffectType_1.EffectType.NoFlee))
                        enemy.effects.create(EffectType_1.EffectType.NoFlee);
                }
                else if (color === "black") {
                    // Increase fatigue
                    ContentView_1.CView.text("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n");
                    enemy.stats.fatigue += 10 + SMath_1.randInt(25);
                }
            }
            ContentView_1.CView.text("\n");
        }
    }
    exports.TamaniDrugAttack = TamaniDrugAttack;
    class TamaniEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            if (howYouWon === DefeatEvent_1.DefeatType.HP) {
                if (enemy.body.cocks.length > 0) {
                    if (SMath_1.randInt(2) === 0)
                        return TamaniScene_1.tamaniSexLost(enemy);
                    else
                        return TamaniScene_1.tamaniSexLetHer(enemy);
                }
                else {
                    ContentView_1.CView.clear().text("Tamani sighs as you begin to lose conscious, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"");
                    return { next: PassTime_1.passTime(1) };
                }
            }
            else {
                if (enemy.body.cocks.length > 0) {
                    // hypnoslut loss scene
                    if (TamaniScene_1.TamaniFlags.TAMANI_TIMES_HYPNOTISED > 19 && SMath_1.randInt(2) === 0) {
                        return TamaniScene_1.getRapedByTamaniYouHypnoSlut(enemy);
                    }
                    else if (SMath_1.randInt(2) === 0)
                        return TamaniScene_1.tamaniSexLost(enemy);
                    else
                        return TamaniScene_1.tamaniSexLetHer(enemy);
                }
                else {
                    ContentView_1.CView.clear().text("You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"");
                    // $> Unsure about this
                    // takeDamage(10000);
                    return { next: PassTime_1.passTime(1) };
                }
            }
        }
        defeatScene(howYouLost, enemy) {
            if (howYouLost === DefeatEvent_1.DefeatType.HP) {
                ContentView_1.CView.clear().text("Tamani is defeated!");
            }
            else {
                ContentView_1.CView.clear().text("Tamani gives up on defeating you and starts masturbating!");
            }
            if (enemy.stats.lust >= 33 && enemy.body.cocks.length > 0) {
                ContentView_1.CView.text("  You could fuck her, but if that's the case why did you bother fighting her?\n\nWhat do you do to her?");
                let buttFuck;
                let layEggs;
                if (enemy.body.cocks.length > 0 && enemy.body.cocks.find(Cock_1.Cock.CockThatFits(this.char.analCapacity())))
                    buttFuck = ScreenDisplay_1.choiceWrap(TamaniScene_1.tamaniAnalShits, this.char);
                // NOT PREGGERS
                if (!TamaniScene_1.TamaniFlags.TAMANI_WOMB.isPregnant() && enemy.canOvipositSpider()) {
                    layEggs = TamaniScene_1.tamaniBeaten;
                }
                return { choices: [["Fuck", TamaniScene_1.tamaniSexWon], ["Buttfuck", buttFuck], ["", undefined], ["Lay Eggs", layEggs], ["Leave", PassTime_1.passTime(1)]] };
            }
            else
                return { next: PassTime_1.passTime(1) };
        }
    }
    class Tamani extends Character_1.Character {
        constructor() {
            super({
                type: CharacterType_1.CharacterType.Tamani,
                unarmedWeapon: new Weapon_1.Weapon("fists", new ItemDesc_1.ItemDesc("fists"), "fists", "tiny punch", 0),
                baseArmor: new Armor_1.Armor("leather straps", new ItemDesc_1.ItemDesc("leather straps"), "leather straps", 0)
            });
            this.description = new CharacterDescription_1.CharacterDescription(this, "", "Tamani", "She keeps her arms folded across her " + TamaniScene_1.tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.");
            this.body.vaginas.add(new Vagina_1.Vagina(Vagina_1.VaginaWetness.DROOLING, Vagina_1.VaginaLooseness.NORMAL, false));
            this.effects.create(EffectType_1.EffectType.BonusVCapacity, { vaginalCapacity: 55 });
            this.body.chest.firstRow.rating = BreastRow_1.BreastCup.E;
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.DRY;
            this.effects.create(EffectType_1.EffectType.BonusACapacity, { analCapacity: 40 });
            this.body.tallness = 40;
            this.body.hips.rating = Hips_1.HipRating.AMPLE + 2;
            this.body.butt.rating = Butt_1.ButtRating.LARGE;
            this.body.skin.tone = "greenish gray";
            this.body.hair.color = "pink and black";
            this.body.hair.length = 16;
            this.stats.str = 32;
            this.stats.tou = 43;
            this.stats.spe = 55;
            this.stats.int = 62;
            this.stats.lib = 65;
            this.stats.sens = 65;
            this.stats.cor = 50;
            this.stats.maxHP = 40;
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 40;
            this.stats.lustVuln = 0.9;
            this.stats.level = 4;
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new TamaniEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(25) + 5,
                    drop: new WeightedDrop_1.WeightedDrop()
                        .add(ConsumableName_1.ConsumableName.GoblinAle, 4)
                        .addMany(1, ConsumableName_1.ConsumableName.LustDraft, ConsumableName_1.ConsumableName.HairDyeNeonPink, ConsumableName_1.ConsumableName.HairDyeDarkBlue, ConsumableName_1.ConsumableName.HairDyeBrightOrange, ConsumableName_1.ConsumableName.HairDyePurple, ConsumableName_1.ConsumableName.IncubusDraft, ConsumableName_1.ConsumableName.Reducto, ConsumableName_1.ConsumableName.LargeEggBlue)
                }
            });
            this.combat.action.subActions.push(new TamaniTease(), new TamaniDrugAttack());
        }
    }
    exports.Tamani = Tamani;
});
//# sourceMappingURL=Tamani.js.map