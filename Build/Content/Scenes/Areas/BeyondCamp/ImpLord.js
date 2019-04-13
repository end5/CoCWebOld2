define(["require", "exports", "Engine/Character/Character", "./ImpLordScene", "Engine/Display/ContentView", "Engine/Utilities/SMath", "Content/Combat/CombatUtils", "Engine/Combat/EndScenes", "Engine/Body/Cock", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Body/Legs", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Body/Wings", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Content/Character/CharacterType", "Engine/Combat/Actions/CombatAction", "Content/Combat/Actions/MainAction"], function (require, exports, Character_1, ImpLordScene_1, ContentView_1, SMath_1, CombatUtils_1, EndScenes_1, Cock_1, Butt_1, Hips_1, Legs_1, WeightedDrop_1, ConsumableName_1, Wings_1, CharacterDescription_1, CombatContainer_1, Weapon_1, ItemDesc_1, Armor_1, CharacterType_1, CombatAction_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Special Attack 1
    class Fire extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Imp Fire";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin.");
            // [-HP // +Lust(minor)]
            const damage = 40 + SMath_1.randInt(10);
            enemy.combat.loseHP(damage);
            enemy.stats.lust += 20 + enemy.stats.cor / 10;
        }
    }
    // Heavy Attack
    class HeavyAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Heavy Attack";
        }
        useAction(char, enemy) {
            let damage = Math.floor((char.stats.str + char.combat.attack() + 20) - SMath_1.randInt(enemy.stats.tou) - enemy.combat.defense());
            ContentView_1.CView.text("The demonic creature slashes a clawed hand towards your stomach,");
            if (CombatUtils_1.combatDodge(char, enemy))
                ContentView_1.CView.text(" but you handily avoid it.");
            else if (damage <= 0)
                ContentView_1.CView.text(" but the attack proves ineffectual.");
            else {
                ContentView_1.CView.text("leaving a large gash. The attack leaves you slightly stunned, but you recover. ");
                damage = enemy.combat.loseHP(damage);
                ContentView_1.CView.text("(" + damage + ")");
            }
        }
    }
    // Lust Attack
    class LustAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Lust Attack";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need.");
            // [+Lust]
            enemy.stats.lust += 5 + enemy.stats.lib / 5 + enemy.stats.cor / 5;
        }
    }
    // Lust and Light Attack
    class LustAttackWithDamage extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Lust + Attack";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal.");
            let damage = 3 + SMath_1.randInt(10);
            damage = enemy.combat.loseHP(damage);
            ContentView_1.CView.text(" (" + damage + ")");
            // [-HP(minor) // +Lust]
            enemy.stats.lust += 5 + enemy.stats.sens / 4 + enemy.stats.cor / 10;
        }
    }
    class ImpLordEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            return ImpLordScene_1.loseToAnImpLord(enemy, this.char);
        }
        defeatScene(howYouLost, enemy) {
            return ImpLordScene_1.defeatImpLord(enemy, this.char);
        }
    }
    class ImpLord extends Character_1.Character {
        constructor() {
            super({
                type: CharacterType_1.CharacterType.ImpLord,
                unarmedWeapon: new Weapon_1.Weapon("fist", new ItemDesc_1.ItemDesc("fist"), "fist", "punch", 10),
                baseArmor: new Armor_1.Armor("leathery skin", new ItemDesc_1.ItemDesc("leathery skin"), "leathery skin", 5)
            });
            this.description = new CharacterDescription_1.CharacterDescription(this, "the ", "imp lord", "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.");
            // Imps now only have demon dicks.
            // Not sure if I agree with this, I can imagine the little fuckers abusing the
            // shit out of any potions they can get their hands on.
            this.body.cocks.add(new Cock_1.Cock(SMath_1.randInt(2) + 11, 2.5, Cock_1.CockType.DEMON));
            this.body.balls.count = 2;
            this.body.balls.size = 1;
            this.body.cumMultiplier = 3;
            this.hoursSinceCum = 20;
            this.body.butt.looseness = Butt_1.ButtLooseness.STRETCHED;
            this.body.butt.wetness = Butt_1.ButtWetness.NORMAL;
            this.body.tallness = SMath_1.randInt(14) + 40;
            this.body.hips.rating = Hips_1.HipRating.BOYISH;
            this.body.butt.rating = Butt_1.ButtRating.TIGHT;
            this.body.legs.type = Legs_1.LegType.HOOFED;
            this.body.skin.tone = "red";
            this.body.wings.type = Wings_1.WingType.IMP;
            this.stats.str = 55;
            this.stats.tou = 40;
            this.stats.spe = 75;
            this.stats.int = 42;
            this.stats.lib = 55;
            this.stats.sens = 35;
            this.stats.cor = 100;
            this.stats.lust = 30;
            this.stats.lustVuln = .65;
            this.stats.level = 7;
            this.stats.maxHP = 100;
            this.stats.HP = this.stats.maxHP;
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new ImpLordEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(15) + 25,
                    drop: new WeightedDrop_1.WeightedDrop().
                        add(ConsumableName_1.ConsumableName.MinotaurBlood, 1).
                        add(ConsumableName_1.ConsumableName.LaBova, 1).
                        add(ConsumableName_1.ConsumableName.IncubusDraft, 6).
                        add(ConsumableName_1.ConsumableName.SuccubiMilk, 6)
                }
            });
            this.combat.action.subActions.push(new Fire(), new HeavyAttack(), new LustAttack(), new LustAttackWithDamage());
        }
    }
    exports.ImpLord = ImpLord;
});
//# sourceMappingURL=ImpLord.js.map