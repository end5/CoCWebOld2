define(["require", "exports", "Engine/Combat/EndScenes", "Content/Character/CharacterType", "Engine/Character/Character", "Engine/Display/ScreenDisplay", "Engine/Display/ContentView", "Content/Descriptors/CockDescriptor", "Engine/Body/Vagina", "Engine/Inventory/CharacterInventory", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Engine/Body/Cock", "Engine/Utilities/SMath", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Body/Wings", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/Actions/CombatAction", "./ImpScene", "Content/Descriptors/VaginaDescriptor", "Content/Effects/EffectType", "Content/Combat/Actions/MainAction"], function (require, exports, EndScenes_1, CharacterType_1, Character_1, ScreenDisplay_1, ContentView_1, CockDescriptor_1, Vagina_1, CharacterInventory_1, CharacterDescription_1, CombatContainer_1, Cock_1, SMath_1, Butt_1, Hips_1, WeightedDrop_1, ConsumableName_1, Wings_1, Weapon_1, ItemDesc_1, Armor_1, CombatAction_1, ImpScene_1, VaginaDescriptor_1, EffectType_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpMagicLustAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Magic Lust Attack";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("You see " + char.desc.a + char.desc.short + " make sudden arcane gestures at you!\n\n");
            char.stats.lust += char.stats.lib / 10 + char.stats.cor / 10 + 10;
            if (char.stats.lust < 30)
                ContentView_1.CView.text("You feel strangely warm.  ");
            if (char.stats.lust >= 30 && char.stats.lust < 60)
                ContentView_1.CView.text("Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  ");
            if (char.stats.lust >= 60)
                ContentView_1.CView.text("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  ");
            if (char.body.cocks.length > 0) {
                if (char.stats.lust >= 60)
                    ContentView_1.CView.text("You feel your " + CockDescriptor_1.describeCocksLight(char) + " dribble pre-cum.");
                else if (char.stats.lust >= 30 && char.body.cocks.length === 1)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(char, char.body.cocks.get(0)) + " hardens, distracting you further.");
                else if (char.stats.lust >= 30 && char.body.cocks.length > 1)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(char) + " harden uncomfortably.");
                if (char.body.vaginas.length > 0)
                    ContentView_1.CView.text("  ");
            }
            if (char.stats.lust >= 60 && char.body.vaginas.length > 0) {
                switch (char.body.vaginas.get(0).wetness) {
                    case Vagina_1.VaginaWetness.NORMAL:
                        ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeAllVagina(char) + " dampen" + (char.body.vaginas.length > 1 ? "" : "s") + " perceptibly.");
                        break;
                    case Vagina_1.VaginaWetness.WET:
                        ContentView_1.CView.text("Your crotch becomes sticky with girl-lust.");
                        break;
                    case Vagina_1.VaginaWetness.SLICK:
                        ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeAllVagina(char) + " become" + (char.body.vaginas.length > 1 ? "" : "s") + " sloppy and wet.");
                        break;
                    case Vagina_1.VaginaWetness.DROOLING:
                        ContentView_1.CView.text("Thick runners of girl-lube stream down the insides of your thighs.");
                        break;
                    case Vagina_1.VaginaWetness.SLAVERING:
                        ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeAllVagina(char) + " instantly soak" + (char.body.vaginas.length > 1 ? "" : "s") + " your groin.");
                    default: // Dry vaginas are unaffected
                }
            }
            ContentView_1.CView.text("\n");
        }
    }
    exports.ImpMagicLustAttack = ImpMagicLustAttack;
    class ImpEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            if (enemy.effects.has(EffectType_1.EffectType.CameWorms)) {
                ContentView_1.CView.text("\n\nThe imp grins at your already corrupted state...");
                enemy.stats.lust = 100;
                return { next: ScreenDisplay_1.choiceWrap(ImpScene_1.impRapesYou, this.char) };
            }
            else {
                return ImpScene_1.impRapesYou(enemy, this.char);
            }
        }
        defeatScene(howYouLost, enemy) {
            return ImpScene_1.impVictory(enemy, this.char);
        }
    }
    class Imp extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.Imp);
            this.description = new CharacterDescription_1.CharacterDescription(this, "the ", "imp", "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.");
            this.body.cocks.add(new Cock_1.Cock(SMath_1.randInt(2) + 11, 2.5, Cock_1.CockType.DEMON));
            this.body.balls.count = 2;
            this.body.balls.size = 1;
            this.body.butt.looseness = Butt_1.ButtLooseness.STRETCHED;
            this.body.butt.wetness = Butt_1.ButtWetness.NORMAL;
            this.body.tallness = SMath_1.randInt(24) + 25;
            this.body.hips.rating = Hips_1.HipRating.BOYISH;
            this.body.butt.rating = Butt_1.ButtRating.TIGHT;
            this.body.skin.tone = "red";
            this.body.hair.color = "black";
            this.body.hair.length = 5;
            this.body.wings.type = Wings_1.WingType.IMP;
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
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("claws", new ItemDesc_1.ItemDesc("claws"), "claws", "claw-slash", 0), new Armor_1.Armor("leathery skin", new ItemDesc_1.ItemDesc("leathery skin"), "leathery skin", 0));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new ImpEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(5) + 5,
                    drop: new WeightedDrop_1.WeightedDrop().
                        add(ConsumableName_1.ConsumableName.SuccubiMilk, 3).
                        add(ConsumableName_1.ConsumableName.IncubusDraft, 3).
                        add(ConsumableName_1.ConsumableName.ImpFood, 4)
                }
            });
            this.combat.action.subActions.push(new ImpMagicLustAttack());
        }
    }
    exports.Imp = Imp;
});
//# sourceMappingURL=Imp.js.map