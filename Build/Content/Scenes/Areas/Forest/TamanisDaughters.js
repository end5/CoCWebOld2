define(["require", "exports", "Engine/Character/Character", "Engine/Utilities/SMath", "Engine/Display/ContentView", "Content/Descriptors/CockDescriptor", "Content/Descriptors/LegDescriptor", "Content/Effects/EffectType", "Engine/Body/Vagina", "Engine/Body/BreastRow", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Inventory/CharacterInventory", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Content/Character/CharacterType", "./TamanisDaughtersScene", "./TamaniScene", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/EndScenes", "Engine/Combat/Actions/CombatAction", "Content/Descriptors/BallsDescriptor", "Content/Combat/Actions/BasicAttack", "./Tamani", "../BeyondCamp/Goblin"], function (require, exports, Character_1, SMath_1, ContentView_1, CockDescriptor_1, LegDescriptor_1, EffectType_1, Vagina_1, BreastRow_1, Butt_1, Hips_1, WeightedDrop_1, ConsumableName_1, CharacterInventory_1, CharacterDescription_1, CombatContainer_1, CharacterType_1, TamanisDaughtersScene_1, TamaniScene_1, Weapon_1, ItemDesc_1, Armor_1, EndScenes_1, CombatAction_1, BallsDescriptor_1, BasicAttack_1, Tamani_1, Goblin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function midRoundMadness(player) {
        const selector = SMath_1.randInt(4);
        if (selector === 0) {
            ContentView_1.CView.text("A slender hand reaches inside your " + player.inventory.armor.displayName + " and gives your ");
            if (player.body.balls.count > 0) {
                if (SMath_1.randInt(2) === 0)
                    ContentView_1.CView.text(CockDescriptor_1.describeCocksLight(player));
                else
                    ContentView_1.CView.text(BallsDescriptor_1.describeBalls(true, true, player));
            }
            else
                ContentView_1.CView.text(CockDescriptor_1.describeCocksLight(player));
            ContentView_1.CView.text(" a gentle squeeze.  You twist away but your breathing gets a little heavier.\n\n");
        }
        else if (selector === 1) {
            ContentView_1.CView.text("A girl latches onto your " + LegDescriptor_1.describeLegs(player) + " and begins caressing your body lovingly, humming happily.  You quickly shake her loose but the attention makes you blush a little more.\n\n");
        }
        else if (selector === 2) {
            ContentView_1.CView.text("One of your daughters launches onto your back and presses her hard, pierced nipples against your neck.  She whispers in your ear, \"<i>Twist my nipples dad!</i>\"\n\n");
            ContentView_1.CView.text("You reach back and throw her off, but her perverted taunts still leave you feeling a little hot under the collar.\n\n");
        }
        else
            ContentView_1.CView.text("A daughter lays down in front of you and starts jilling herself on the spot.  It's impossible to not glance down and see her or hear her pleasured moans.  You step away to remove the distraction but it definitely causes some discomfort in your " + player.inventory.armor.displayName + ".\n\n");
        player.stats.lust += 1 + player.stats.lib / 15 + SMath_1.randInt(player.stats.cor / 30);
    }
    const tamaniDrugAttack = new Tamani_1.TamaniDrugAttack();
    function tamaniShowsUp(daughters, enemy) {
        if (TamanisDaughtersScene_1.TamanisDaughtersFlags.TAMANI_PRESENT) {
            if (SMath_1.randInt(4) === 0)
                tamaniDrugAttack.use(daughters, enemy); // Tamani already there - chance of potion
        }
        else if (SMath_1.randInt(6) === 0) {
            TamanisDaughtersScene_1.TamanisDaughtersFlags.TAMANI_PRESENT = true;
            ContentView_1.CView.text("A high-pitched yet familiar voice calls out, \"<i><b>So this is where you skanks ran off to---wait a second.  Are you trying to poach Tamani's man!?</b></i>\"\n\n");
            ContentView_1.CView.text("You can see Tamani lurking around the rear of the goblin pack, visibly berating her daughters.  On one hand it sounds like she might help you, but knowing goblins, she'll probably forget about her anger and help them subdue you for more cum...\n\n");
            // (+5 mob strength)
            daughters.stats.str += 5;
            // (+5 mob toughness)
            daughters.stats.tou += 5;
            daughters.stats.HP += 10;
            // (-20 mob lust)
            daughters.stats.lust -= 20;
            // append combat desc
            daughters.desc.long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
        }
    }
    class TamaniDaughtersDrugAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Drug Attack";
        }
        useAction(char, enemy) {
            const color = SMath_1.randomChoice("red", "green", "blue", "white", "black");
            // Throw offensive potions at the player
            if (color !== "blue") {
                ContentView_1.CView.text("Tamani uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
            }
            // Drink blue pots
            else {
                ContentView_1.CView.text("Tamani pulls out a blue vial and uncaps it, then douses the mob with the contents.");
                if (char.combat.HPRatio() < 1) {
                    ContentView_1.CView.text("  Though less effective than ingesting it, the potion looks to have helped the goblins recover from their wounds!\n");
                    char.stats.HP += 80;
                }
                else
                    ContentView_1.CView.text("  There doesn't seem to be any effect.\n");
                ContentView_1.CView.text("\n");
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
    class TamanisDaughtersMainAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Action";
            this.subActions = [new BasicAttack_1.BasicAttack(), new Goblin_1.GoblinTeaseAttack(), new TamaniDaughtersDrugAttack()];
        }
        use(char, enemy) {
            // mid-round madness!
            midRoundMadness(enemy);
            tamaniShowsUp(char, enemy);
            const selected = SMath_1.randInt(this.subActions.length);
            if (selected === 0) {
                const attacks = Math.floor(TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 20);
                while (attacks > 0)
                    this.subActions[0].use(char, enemy);
            }
            else {
                this.subActions[selected].use(char, enemy);
            }
        }
    }
    class TamanisDaughtersEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            // $> Need to fix worms
            // if (pcCameWorms) {
            //     CView.text("\n\nYour foes seem visibly disgusted and leave, telling you to, \"<i>quit being so fucking gross...</i>\"");
            //     return { next: passTime(1) };
            // } else {
            return TamanisDaughtersScene_1.loseToDaughters(enemy);
            // }
        }
        defeatScene(howYouLost, enemy) {
            return TamanisDaughtersScene_1.combatWinAgainstDaughters(enemy, this.char);
        }
    }
    class TamanisDaughters extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.TamanisDaughters);
            this.description = new CharacterDescription_1.CharacterDescription(this, "the group of ", "Tamani's daughters", "A large grouping of goblin girls has gathered around you, surrounding you on all sides.  Most have varying shades of green skin, though a few have yellowish or light blue casts to their skin.  All are barely clothed, exposing as much of their flesh as possible in order to excite a potential mate.  Their hairstyles are as varied as their clothing and skin-tones, and the only things they seem to have in common are cute faces and curvy forms.  It looks like they want something from you.", true);
            this.body.vaginas.add(new Vagina_1.Vagina(Vagina_1.VaginaWetness.DROOLING, Vagina_1.VaginaLooseness.TIGHT, false));
            this.effects.create(EffectType_1.EffectType.BonusVCapacity, { vaginalCapacity: 40 });
            this.body.chest.firstRow.rating = BreastRow_1.BreastCup.D;
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.DRY;
            this.effects.create(EffectType_1.EffectType.BonusACapacity, { analCapacity: 25 });
            this.body.tallness = 40;
            this.body.hips.rating = Hips_1.HipRating.AMPLE + 1;
            this.body.butt.rating = Butt_1.ButtRating.NOTICEABLE + 1;
            this.body.skin.tone = "greenish gray";
            this.body.hair.color = "pink";
            this.body.hair.length = 16;
            this.stats.str = 55;
            this.stats.tou = 30;
            this.stats.spe = 45;
            this.stats.int = 50;
            this.stats.lib = 70;
            this.stats.sens = 70;
            this.stats.cor = 50;
            this.stats.maxHP = 50 + (Math.floor(TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 2) * 15);
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 30;
            this.stats.lustVuln = .65;
            this.stats.level = 8 + (Math.floor(TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 20));
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("fists", new ItemDesc_1.ItemDesc("fists"), "fists", "tiny punch", 0), new Armor_1.Armor("leather straps", new ItemDesc_1.ItemDesc("leather straps"), "leather straps", 0));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new TamanisDaughtersMainAction(),
                endScenes: new TamanisDaughtersEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(15) + 5,
                    drop: new WeightedDrop_1.WeightedDrop().
                        add(ConsumableName_1.ConsumableName.GoblinAle, 5).
                        addMany(1, ConsumableName_1.ConsumableName.LustDraft, ConsumableName_1.ConsumableName.HairDyeNeonPink, ConsumableName_1.ConsumableName.HairDyeDarkBlue, ConsumableName_1.ConsumableName.HairDyeBrightOrange, ConsumableName_1.ConsumableName.HairDyePurple)
                }
            });
        }
    }
    exports.TamanisDaughters = TamanisDaughters;
});
//# sourceMappingURL=TamanisDaughters.js.map