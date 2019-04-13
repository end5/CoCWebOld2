define(["require", "exports", "Engine/Character/Character", "Content/Character/CharacterType", "Engine/Display/ScreenDisplay", "Engine/Display/ContentView", "Content/Effects/EffectType", "Content/Descriptors/LegDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Scenes/PassTime", "Engine/Utilities/SMath", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Engine/Body/Cock", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Body/Skin", "Engine/Utilities/Drops/WeightedDrop", "Engine/Body/Tail", "Engine/Body/GenderIdentity", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/EndScenes", "Engine/Combat/DefeatEvent", "Engine/Combat/Actions/CombatAction", "./TentacleBeastScene"], function (require, exports, Character_1, CharacterType_1, ScreenDisplay_1, ContentView_1, EffectType_1, LegDescriptor_1, CockDescriptor_1, VaginaDescriptor_1, ButtDescriptor_1, PassTime_1, SMath_1, CharacterDescription_1, CombatContainer_1, Cock_1, Butt_1, Hips_1, Skin_1, WeightedDrop_1, Tail_1, GenderIdentity_1, Weapon_1, ItemDesc_1, Armor_1, EndScenes_1, DefeatEvent_1, CombatAction_1, TentacleBeastScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Attack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Attack";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("The shambling horror throws its tentacles at you with a murderous force.\n");
            let temp = Math.floor((char.stats.str + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
            if (temp < 0)
                temp = 0;
            // Miss
            if (temp === 0 || (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80)) {
                ContentView_1.CView.text("However, you quickly evade the clumsy efforts of the abomination to strike you.");
            }
            // Hit
            else {
                temp = enemy.combat.loseHP(temp);
                ContentView_1.CView.text("The tentacles crash upon your body mercilessly for " + temp + " damage.");
            }
        }
    }
    class Entwine extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Entwine";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("The beast lunges its tentacles at you from all directions in an attempt to immobilize you.\n");
            // Not Trapped yet
            if (!enemy.effects.has(EffectType_1.EffectType.TentacleBind)) {
                // Success
                if (Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15 || (enemy.effects.has(EffectType_1.EffectType.Evade) && Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15)) {
                    ContentView_1.CView.text("In an impressive display of gymnastics, you dodge, duck, dip, dive, and roll away from the shower of grab-happy arms trying to hold you. Your instincts tell you that this was a GOOD thing.\n");
                }
                // Fail
                else {
                    ContentView_1.CView.text("While you attempt to avoid the onslaught of pseudopods, one catches you around your " + LegDescriptor_1.describeFoot(enemy) + " and drags you to the ground. You attempt to reach for it to pull it off only to have all of the other tentacles grab you in various places and immobilize you in the air. You are trapped and helpless!!!\n\n");
                    // Male/Herm Version:
                    if (enemy.body.cocks.length > 0)
                        ContentView_1.CView.text("The creature, having immobilized you, coils a long tendril about your penis. You shudder as the creature begins stroking your cock like a maid at a dairy farm in an attempt to provoke a response from you. Unable to resist, your " + CockDescriptor_1.describeCock(enemy, enemy.body.cocks.get(0)) + " easily becomes erect, signaling to the creature that you are responsive to harsher stimulation.\n");
                    // Female Version:
                    else if (enemy.body.vaginas.length > 0)
                        ContentView_1.CView.text("The creature quickly positions a long tentacle with a single sucker over your clitoris. You feel the power of the suction on you, and your body quickly heats up.  Your clit engorges, prompting the beast to latch the sucker onto your " + VaginaDescriptor_1.describeClit(enemy) + ".\n");
                    // Genderless
                    else
                        ContentView_1.CView.text("The creature quickly positions a long tentacle against your " + ButtDescriptor_1.describeButthole(enemy.body.butt) + ". It circles your pucker with slow, delicate strokes that bring unexpected warmth to your body.\n");
                    enemy.stats.lust += (8 + enemy.stats.sens / 20);
                    enemy.effects.create(EffectType_1.EffectType.TentacleBind);
                }
            }
        }
    }
    class TentacleBeastMainAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Action";
            this.subActions = [new Attack(), new Entwine()];
        }
        use(char, enemy) {
            // tentacle beasts have special AI
            if (SMath_1.randInt(2) === 0 || char.effects.has(EffectType_1.EffectType.TentacleCoolDown))
                this.subActions[0].use(char, enemy);
            else
                this.subActions[1].use(char, enemy);
        }
    }
    class TentacleBeastEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            if (howYouWon === DefeatEvent_1.DefeatType.HP) {
                ContentView_1.CView.text("Overcome by your wounds, you turn to make a last desperate attempt to run...\n\n");
                return TentacleBeastScene_1.tentacleLossRape(enemy, true);
            }
            else {
                ContentView_1.CView.text("You give up on fighting, too aroused to resist any longer.  Shrugging, you walk into the writhing mass...\n\n");
                return { next: ScreenDisplay_1.choiceWrap(TentacleBeastScene_1.tentacleLossRape, true) };
            }
        }
        defeatScene(howYouLost, enemy) {
            if (howYouLost === DefeatEvent_1.DefeatType.HP) {
                ContentView_1.CView.clear().text("The creature lets out an ear-piercing screech as it collapses upon itself. Its green coloring quickly fades to brown as the life drains from it, leaving you victorious.");
            }
            else {
                ContentView_1.CView.text("The tentacle beast's mass begins quivering and sighing, the tentacles wrapping around each other and feverishly caressing each other.  It seems the beast has given up on fighting.");
            }
            if (howYouLost !== DefeatEvent_1.DefeatType.HP && enemy.gender > 0) {
                ContentView_1.CView.clear().text("  Perhaps you could use it to sate yourself?");
                return { yes: TentacleBeastScene_1.tentacleVictoryRape, no: PassTime_1.passTime(1) };
            }
            else {
                return { next: PassTime_1.passTime(1) };
            }
        }
    }
    class TentacleBeast extends Character_1.Character {
        constructor() {
            super({
                type: CharacterType_1.CharacterType.TentacleBeast,
                unarmedWeapon: new Weapon_1.Weapon("whip-tendril", new ItemDesc_1.ItemDesc("whip-tendril"), "whip-tendril", "thorny tendril", 1),
                baseArmor: new Armor_1.Armor("rubbery skin", new ItemDesc_1.ItemDesc("rubbery skin"), "rubbery skin", 1)
            });
            this.description = new CharacterDescription_1.CharacterDescription(this, "the ", "tentacle beast", "You see the massive, shambling form of the tentacle beast before you.  Appearing as a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs.");
            this.genderPref = GenderIdentity_1.Gender.NONE;
            this.body.cocks.add(new Cock_1.Cock(40, 1.5));
            this.body.cocks.add(new Cock_1.Cock(60, 1.5));
            this.body.cocks.add(new Cock_1.Cock(50, 1.5));
            this.body.cocks.add(new Cock_1.Cock(20, 1.5));
            this.body.balls.count = 0;
            this.body.balls.size = 0;
            this.body.cumMultiplier = 3;
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.SLIME_DROOLING;
            this.body.tallness = SMath_1.randInt(9) + 70;
            this.body.hips.rating = Hips_1.HipRating.BOYISH;
            this.body.butt.rating = Butt_1.ButtRating.BUTTLESS;
            this.body.skin.tone = "green";
            this.body.skin.type = Skin_1.SkinType.PLAIN;
            this.body.skin.desc = "bark";
            this.body.hair.color = "green";
            this.body.hair.length = 1;
            this.body.tails.add(new Tail_1.Tail(Tail_1.TailType.DEMONIC));
            this.stats.str = 58;
            this.stats.tou = 25;
            this.stats.spe = 45;
            this.stats.int = 45;
            this.stats.lib = 90;
            this.stats.sens = 20;
            this.stats.cor = 100;
            this.stats.maxHP = 350;
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 10;
            this.stats.lustVuln = 0.8;
            this.stats.level = 6;
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new TentacleBeastMainAction(),
                endScenes: new TentacleBeastEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(15) + 5,
                    drop: new WeightedDrop_1.WeightedDrop(undefined, 1)
                }
            });
        }
    }
    exports.TentacleBeast = TentacleBeast;
});
//# sourceMappingURL=TentacleBeast.js.map