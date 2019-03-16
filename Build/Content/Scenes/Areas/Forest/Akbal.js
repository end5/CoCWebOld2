define(["require", "exports", "Engine/Character/Character", "Engine/Display/ContentView", "Content/Effects/EffectType", "Engine/Utilities/SMath", "Content/Character/CharacterType", "Engine/Body/Cock", "Engine/Body/BreastRow", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Body/Skin", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Body/Tail", "Engine/Character/CharacterDescription", "Engine/Inventory/CharacterInventory", "Engine/Items/Weapon", "Engine/Items/Armor", "Content/Items/WeaponName", "Engine/Items/ItemDesc", "Engine/Combat/CombatContainer", "Engine/Combat/Actions/CombatAction", "Engine/Combat/EndScenes", "Engine/Combat/DefeatEvent", "./AkbalScenes", "Content/Combat/Actions/MainAction"], function (require, exports, Character_1, ContentView_1, EffectType_1, SMath_1, CharacterType_1, Cock_1, BreastRow_1, Butt_1, Hips_1, Skin_1, WeightedDrop_1, ConsumableName_1, Tail_1, CharacterDescription_1, CharacterInventory_1, Weapon_1, Armor_1, WeaponName_1, ItemDesc_1, CombatContainer_1, CombatAction_1, EndScenes_1, DefeatEvent_1, AkbalScenes_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Attack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Attack";
        }
        useAction(char, enemy) {
            // Chances to miss:
            let damage = 0;
            // Blind dodge change
            if (char.effects.has(EffectType_1.EffectType.Blind)) {
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " seems to have no problem guiding his attacks towards you, despite his blindness.\n");
            }
            // Determine if dodged!
            if (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80) {
                if (enemy.stats.spe - char.stats.spe < 8)
                    ContentView_1.CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + "!");
                if (enemy.stats.spe - char.stats.spe >= 8 && enemy.stats.spe - char.stats.spe < 20)
                    ContentView_1.CView.text("You dodge " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + " with superior quickness!");
                if (enemy.stats.spe - char.stats.spe >= 20)
                    ContentView_1.CView.text("You deftly avoid " + char.desc.a + char.desc.short + "'s slow " + char.inventory.weapon.verb + ".");
                return;
            }
            // Determine if evaded
            if (enemy.effects.has(EffectType_1.EffectType.Evade) && SMath_1.randInt(100) < 10) {
                ContentView_1.CView.text("Using your skills at evading attacks, you anticipate and sidestep " + char.desc.a + char.desc.short + "'s attack.");
                return;
            }
            // Determine if flexibilitied
            if (enemy.effects.has(EffectType_1.EffectType.Flexibility) && SMath_1.randInt(100) < 10) {
                ContentView_1.CView.text("Using your cat-like agility, you twist out of the way of " + char.desc.a + char.desc.short + "'s attack.");
                return;
            }
            // Determine damage - str modified by enemy toughness!
            // *Normal Attack A -
            if (SMath_1.randInt(2) === 0) {
                // (medium HP damage)
                damage = Math.floor((char.stats.str + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
                if (damage <= 0) {
                    ContentView_1.CView.text("Akbal lunges forwards but with your toughness");
                    if (enemy.combat.defense() > 0)
                        ContentView_1.CView.text(" and " + enemy.inventory.armor.displayName + ", he fails to deal any damage.");
                    else
                        ContentView_1.CView.text(" he fails to deal any damage.");
                }
                else {
                    ContentView_1.CView.text("Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.");
                    enemy.combat.loseHP(damage);
                }
            }
            else { // *Normal Attack B
                // (high HP damage)
                damage = Math.floor((char.stats.str + 25 + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
                if (damage === 0) {
                    ContentView_1.CView.text("Akbal lunges forwards but between your toughness ");
                    if (enemy.combat.defense() > 0)
                        ContentView_1.CView.text("and " + enemy.inventory.armor.displayName + ", he fails to deal any damage.");
                }
                else {
                    ContentView_1.CView.text("Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.");
                    enemy.combat.loseHP(damage);
                }
            }
        }
    }
    class Lust extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Special";
        }
        useAction(char, enemy) {
            // *Lust Attack -
            if (!enemy.effects.has(EffectType_1.EffectType.Whispered)) {
                ContentView_1.CView.text("You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.");
                // (Lust increase)
                enemy.stats.lust += 7 + (100 - enemy.stats.int) / 10;
                enemy.effects.create(EffectType_1.EffectType.Whispered);
            }
            // Continuous Lust Attack -
            else {
                ContentView_1.CView.text("The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.");
                // (Lust increase)
                enemy.stats.lust += 12 + (100 - enemy.stats.int) / 10;
            }
        }
    }
    class Special extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Special";
        }
        useAction(char, enemy) {
            // *Special Attack A -
            if (SMath_1.randInt(2) === 0 && enemy.stats.spe > 20) {
                const speedChange = enemy.stats.spe / 5 * -1;
                ContentView_1.CView.text("Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.");
                // (Speed decrease)
                enemy.stats.spe += speedChange;
                const akbalSpeed = enemy.effects.getByName(EffectType_1.EffectType.AkbalSpeed);
                if (akbalSpeed && akbalSpeed.values.spe)
                    akbalSpeed.values.spe += speedChange;
                else
                    enemy.effects.create(EffectType_1.EffectType.AkbalSpeed, { spe: speedChange });
            }
            // *Special Attack B -
            else {
                ContentView_1.CView.text("Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n");
                // (high HP damage)
                // Determine if dodged!
                if (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80) {
                    if (enemy.stats.spe - char.stats.spe < 8)
                        ContentView_1.CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s fire!");
                    if (enemy.stats.spe - char.stats.spe >= 8 && enemy.stats.spe - char.stats.spe < 20)
                        ContentView_1.CView.text("You dodge " + char.desc.a + char.desc.short + "'s fire with superior quickness!");
                    if (enemy.stats.spe - char.stats.spe >= 20)
                        ContentView_1.CView.text("You deftly avoid " + char.desc.a + char.desc.short + "'s slow fire-breath.");
                    return;
                }
                // Determine if evaded
                if (enemy.effects.has(EffectType_1.EffectType.Evade) && SMath_1.randInt(100) < 20) {
                    ContentView_1.CView.text("Using your skills at evading attacks, you anticipate and sidestep " + char.desc.a + char.desc.short + "'s fire-breath.");
                    return;
                }
                // Determine if flexibilitied
                if (enemy.effects.has(EffectType_1.EffectType.Flexibility) && SMath_1.randInt(100) < 10) {
                    ContentView_1.CView.text("Using your cat-like agility, you contort your body to avoid " + char.desc.a + char.desc.short + "'s fire-breath.");
                    return;
                }
                ContentView_1.CView.text("You are burned badly by the flames! (" + enemy.combat.loseHP(40) + ")");
            }
        }
    }
    // *Support ability -
    class Heal extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Heal";
        }
        useAction(char, enemy) {
            if (char.combat.HPRatio() >= 1)
                ContentView_1.CView.text("Akbal licks himself, ignoring you for now.");
            else
                ContentView_1.CView.text("Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.");
            char.stats.HP += 30;
            char.stats.lust += 10;
        }
    }
    class AkbalEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            // $> Need Fix for pcCameWorms
            return AkbalScenes_1.akbalWon(enemy, this.char, howYouWon === DefeatEvent_1.DefeatType.HP, enemy.effects.has(EffectType_1.EffectType.CameWorms));
        }
        defeatScene(howYouLost, enemy) {
            return AkbalScenes_1.akbalDefeated(enemy, this.char, howYouLost === DefeatEvent_1.DefeatType.HP);
        }
    }
    class Akbal extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.Akbal);
            this.description = new CharacterDescription_1.CharacterDescription(this, "", "Akbal", "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.");
            this.body.cocks.add(new Cock_1.Cock(15, 2.5, Cock_1.CockType.DOG));
            this.body.balls.count = 2;
            this.body.balls.size = 4;
            this.body.cumMultiplier = 6;
            this.body.chest.add(new BreastRow_1.BreastRow());
            this.body.chest.add(new BreastRow_1.BreastRow());
            this.body.chest.add(new BreastRow_1.BreastRow());
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.NORMAL;
            this.body.tallness = 4 * 12;
            this.body.hips.rating = Hips_1.HipRating.SLENDER;
            this.body.butt.rating = Butt_1.ButtRating.TIGHT;
            this.body.skin.tone = "spotted";
            this.body.skin.type = Skin_1.SkinType.FUR;
            this.body.hair.color = "black";
            this.body.hair.length = 5;
            this.body.tails.add(new Tail_1.Tail(Tail_1.TailType.DOG));
            this.hoursSinceCum = 400;
            this.stats.str = 55;
            this.stats.tou = 53;
            this.stats.spe = 50;
            this.stats.int = 75;
            this.stats.lib = 50;
            this.stats.sens = 50;
            this.stats.cor = 100;
            this.stats.lust = 30;
            this.stats.lustVuln = 0.8;
            this.stats.maxHP = 20;
            this.stats.HP = this.stats.maxHP;
            this.stats.level = 6;
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("claws", new ItemDesc_1.ItemDesc("claws"), "claws", "claw-slash", 5), new Armor_1.Armor("shimmering pelt", new ItemDesc_1.ItemDesc("shimmering pelt"), "shimmering pelt", 5));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new AkbalEndScenes(this),
                rewards: {
                    gems: 15,
                    drop: new WeightedDrop_1.WeightedDrop().
                        add(ConsumableName_1.ConsumableName.IncubusDraft, 6).
                        add(ConsumableName_1.ConsumableName.WhiskerFruit, 3).
                        add(WeaponName_1.WeaponName.Pipe, 1),
                }
            });
            this.combat.action.subActions = [new Attack(), new Lust(), new Special(), new Heal()];
        }
    }
    exports.Akbal = Akbal;
});
//# sourceMappingURL=Akbal.js.map