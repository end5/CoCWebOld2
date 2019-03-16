define(["require", "exports", "Engine/Character/Character", "Engine/Utilities/SMath", "Engine/Display/ContentView", "Content/Effects/EffectType", "Content/Scenes/PassTime", "Content/Character/CharacterType", "Engine/Body/Vagina", "Engine/Body/BreastRow", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Inventory/CharacterInventory", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/EndScenes", "Engine/Combat/Actions/CombatAction", "./GoblinScene", "Content/Combat/Actions/MainAction"], function (require, exports, Character_1, SMath_1, ContentView_1, EffectType_1, PassTime_1, CharacterType_1, Vagina_1, BreastRow_1, Butt_1, Hips_1, WeightedDrop_1, ConsumableName_1, CharacterInventory_1, CharacterDescription_1, CombatContainer_1, Weapon_1, ItemDesc_1, Armor_1, EndScenes_1, CombatAction_1, GoblinScene_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrugAttack extends CombatAction_1.CombatAction {
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
                    char.stats.HP += (char.stats.maxHP / 4);
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
    class GoblinTeaseAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Tease Attack";
        }
        useAction(char, enemy) {
            const det = SMath_1.randInt(3);
            if (det === 0)
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
            if (det === 1)
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.");
            if (det === 2)
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
            enemy.stats.lust += SMath_1.randInt(enemy.stats.lib / 10) + 8;
            ContentView_1.CView.text("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n");
        }
    }
    exports.GoblinTeaseAttack = GoblinTeaseAttack;
    class GoblinEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            if (enemy.gender === 0) {
                ContentView_1.CView.text("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.");
                return { next: PassTime_1.passTime(1) };
            }
            else if (enemy.effects.has(EffectType_1.EffectType.CameWorms)) {
                ContentView_1.CView.text("\n\nThe goblin's eyes go wide and she turns to leave, no longer interested in you.");
                enemy.orgasm();
                return { next: PassTime_1.passTime(1) };
            }
            else {
                return GoblinScene_1.goblinRapesPlayer(enemy, this.char);
            }
        }
        defeatScene(howYouLost, enemy) {
            return GoblinScene_1.gobboRapeIntro(enemy, this.char);
        }
    }
    class Goblin extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.Goblin);
            this.description = new CharacterDescription_1.CharacterDescription(this, "the ", "goblin", "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?");
            this.body.vaginas.add(new Vagina_1.Vagina(Vagina_1.VaginaWetness.DROOLING, Vagina_1.VaginaLooseness.NORMAL, false));
            this.effects.create(EffectType_1.EffectType.BonusVCapacity, { vaginalCapacity: 40 });
            this.body.chest.firstRow.rating = BreastRow_1.BreastCup.E;
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.DRY;
            this.effects.create(EffectType_1.EffectType.BonusACapacity, { analCapacity: 30 });
            this.body.tallness = 35 + SMath_1.randInt(4);
            this.body.hips.rating = Hips_1.HipRating.AMPLE + 2;
            this.body.butt.rating = Butt_1.ButtRating.LARGE;
            this.body.skin.tone = "dark green";
            this.body.hair.color = "purple";
            this.body.hair.length = 4;
            this.stats.str = 12;
            this.stats.tou = 13;
            this.stats.spe = 35;
            this.stats.int = 42;
            this.stats.lib = 45;
            this.stats.sens = 45;
            this.stats.cor = 60;
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 50;
            this.stats.level = 1;
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("fists", new ItemDesc_1.ItemDesc("fists"), "fists", "tiny punch", 0), new Armor_1.Armor("leather straps", new ItemDesc_1.ItemDesc("leather straps"), "leather straps", 0));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new GoblinEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(5) + 5,
                    drop: new WeightedDrop_1.WeightedDrop().
                        add(ConsumableName_1.ConsumableName.GoblinAle, 5).
                        addMany(1, ConsumableName_1.ConsumableName.LustDraft, ConsumableName_1.ConsumableName.HairDyeNeonPink, ConsumableName_1.ConsumableName.HairDyeDarkBlue, ConsumableName_1.ConsumableName.HairDyeBrightOrange, ConsumableName_1.ConsumableName.HairDyePurple)
                }
            });
            this.combat.action.subActions.push(new DrugAttack(), new GoblinTeaseAttack());
        }
    }
    exports.Goblin = Goblin;
});
//# sourceMappingURL=Goblin.js.map