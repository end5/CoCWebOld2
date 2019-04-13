define(["require", "exports", "Engine/Character/Character", "Engine/Display/ContentView", "Content/Descriptors/LegDescriptor", "Content/Effects/EffectType", "Engine/Utilities/SMath", "Content/Settings", "Content/Character/CharacterType", "Engine/Body/Cock", "Engine/Body/Vagina", "Engine/Body/BreastRow", "Content/Descriptors/BreastDescriptor", "Engine/Body/Butt", "Engine/Body/Hips", "Engine/Utilities/Drops/WeightedDrop", "Content/Items/ConsumableName", "Engine/Body/Tail", "Engine/Character/CharacterDescription", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/CombatContainer", "Engine/Utilities/Dictionary", "Engine/Combat/EndScenes", "./KitsuneScene", "Engine/Combat/Actions/CombatAction", "Content/Combat/Actions/BasicAttack", "Engine/Combat/Actions/CombatActionType"], function (require, exports, Character_1, ContentView_1, LegDescriptor_1, EffectType_1, SMath_1, Settings_1, CharacterType_1, Cock_1, Vagina_1, BreastRow_1, BreastDescriptor_1, Butt_1, Hips_1, WeightedDrop_1, ConsumableName_1, Tail_1, CharacterDescription_1, Weapon_1, ItemDesc_1, Armor_1, CombatContainer_1, Dictionary_1, EndScenes_1, KitsuneScene_1, CombatAction_1, BasicAttack_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Combat Abilities:
    // the kitsune are an almost purely magical mob, relying mainly on tease attacks and spells that raise lust.
    // Entwine:
    class Entwine extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Entwine";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("The kitsune closes in on you with a mischievous glint in her eyes.  You raise your guard, keeping your eyes trained on her to ensure that she doesn't try to pull anything.  Suddenly, you feel something coiling around your " + LegDescriptor_1.describeLeg(enemy) + ", and let out a yelp as you are suddenly lifted into the air, entangled in the kitsune's tails!");
            ContentView_1.CView.text("\n\nYour limbs are bound tightly while coils of delightfully soft fur caress you on all sides.  You can do little besides struggle against your furry bonds as the constant writhing of her tails sends shudders flying up and down your spine.");
            char.effects.create(EffectType_1.EffectType.PCTailTangle, { counter: 0 });
            enemy.stats.lust += 10 + enemy.stats.sens / 8;
        }
    }
    // Fox Fire: - Low piercing damage, +10-15 LUST
    class FoxFire extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "FoxFire";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("The kitsune makes a small circle in the air with her fingers, conjuring up a pale blue flame into her palm with the sound of flint striking against steel.  Pursing her lips, she blows it toward you with a kiss.");
            ContentView_1.CView.text("\n\nThe flames burn furiously, but leave you with an incredibly pleasant tingling sensation all over your body.  Your skin flushes with excitement, and you can feel blood rushing to your extremities, making you shudder with pleasure.");
            let damage = 5 + SMath_1.randInt(20);
            damage = enemy.combat.loseHP(damage);
            ContentView_1.CView.text(" (" + damage + ")");
            enemy.stats.lust += 15 + enemy.stats.sens / 10;
        }
    }
    // Illusion: - Raises enemy evasion, but can be resisted.
    // Factors affecting resist: INT (1% per point, max 70%), "Whispered" perk (20% flat bonus), "Religious" background and < 20 corruption (20% bonus at 0, losing 1% per point of corruption.)
    // Success:
    class Illusion extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Illusion";
        }
        useAction(char, enemy) {
            ContentView_1.CView.text("You struggle to keep your eyes on the kitsune, ghostly laughter echoing all around you as you turn to and fro, trying to track her movements.  It almost seems like the edges of reality are blurring around her, severely distorting your perceptions and making it hard to follow her.  It's going to be much harder to hit her if she keeps this up!");
            // Resist: - successfully resisting deals small health & lust damage to kitsune
            let resist = 0;
            if (enemy.stats.int < 30)
                resist = Math.round(enemy.stats.int);
            else
                resist = 30;
            if (enemy.effects.has(EffectType_1.EffectType.Whispered))
                resist += 20;
            if (enemy.effects.has(EffectType_1.EffectType.HistoryReligious) && enemy.stats.cor < 20)
                resist += 20 - enemy.stats.cor;
            if (SMath_1.randInt(100) < resist) {
                ContentView_1.CView.text("\n\nThe kitsune seems to melt away before your eyes for a moment, as though the edges of reality are blurring around her.  You tighten your focus, keeping your eyes trained on her, and she suddenly reels in pain, clutching her forehead as she is thrust back into view.  She lets out a frustrated huff of disappointment, realizing that you have resisted her illusions.");
            }
            else {
                char.effects.create(EffectType_1.EffectType.Illusion, { spe: 20 });
            }
        }
    }
    // Seal: - cancels and disables whatever command the player uses this round. Lasts 3 rounds, cannot seal more than one command at a time.
    // PCs with "Religious" background and < 20 corruption have up to 20% resistance to sealing at 0 corruption, losing 1% per corruption.
    class Seal extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Seal";
        }
        useAction(char, enemy) {
            let resist = 0;
            if (enemy.stats.int < 30)
                resist = Math.round(enemy.stats.int);
            else
                resist = 30;
            if (enemy.effects.has(EffectType_1.EffectType.Whispered))
                resist += 20;
            if (enemy.effects.has(EffectType_1.EffectType.HistoryReligious) && enemy.stats.cor < 20)
                resist += 20 - enemy.stats.cor;
            const select = SMath_1.randInt(7);
            // Attack:
            if (select === 0) {
                ContentView_1.CView.text("The kitsune playfully darts around you, grinning coyly.  She somehow slips in under your reach, and before you can react, draws a small circle on your chest with her fingertip.  As you move to strike again, the flaming runic symbol she left on you glows brightly, and your movements are halted mid-swing.");
                ContentView_1.CView.text("\n\n\"<i>Naughty naughty, you should be careful with that.</i>\"");
                ContentView_1.CView.text("\n\nDespite your best efforts, every time you attempt to attack her, your muscles recoil involuntarily and prevent you from going through with it.  <b>The kitsune's spell has sealed your attack!</b>  You'll have to wait for it to wear off before you can use your basic attacks.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.Attack });
            }
            else if (select === 1) {
                // Tease:
                ContentView_1.CView.text("You are taken by surprise when the kitsune appears in front of you out of nowhere, trailing a fingertip down your chest.  She draws a small circle, leaving behind a glowing, sparking rune made of flames.  You suddenly find that all your knowledge of seduction and titillation escapes you.  <b>The kitsune's spell has sealed your ability to tease!</b>  Seems you won't be getting anyone hot and bothered until it wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.Tease });
            }
            // Spells:
            else if (select === 2) {
                ContentView_1.CView.text("\"<i>Oh silly, trying to beat me at my own game are you?</i>\"  the kitsune says with a smirk, surprising you as she appears right in front of you.  She traces a small circle around your mouth, and you find yourself stricken mute!  You try to remember the arcane gestures to cast your spell and find that you've forgotten them too.  <b>The kitsune's spell has sealed your magic!</b>  You won't be able to cast any spells until it wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.Spells });
            }
            // Items:
            else if (select === 3) {
                ContentView_1.CView.text("\"<i>Tsk tsk, using items?  That's cheating!</i>\"  the kitsune says as she appears right in front of you, taking you off guard.  Her finger traces a small circle on your pouch, leaving behind a glowing rune made of crackling flames.  No matter how hard you try, you can't seem to pry it open.  <b>The kitsune's spell has sealed your item pouch!</b>  Looks like you won't be using any items until the spell wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.Items });
            }
            // Run:
            else if (select === 4) {
                ContentView_1.CView.text("\"<i>Tsk tsk, leaving so soon?</i>\"  the kitsune says, popping up in front of you suddenly as you attempt to make your escape.  Before you can react, she draws a small circle on your chest with her fingertip, leaving behind a glowing rune made of crackling blue flames.  You try to run the other way, but your " + LegDescriptor_1.describeLegs(enemy) + " won't budge!\n\n\"<i>Sorry baby, you'll just have to stay and play~.</i>\" she says in a singsong tone, appearing in front of you again.  <b>The kitsune's spell prevents your escape!</b>  You'll have to tough it out until the spell wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.MoveAway });
            }
            // P.Special:
            else if (select === 5) {
                ContentView_1.CView.text("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your physical skills!");
                ContentView_1.CView.text("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
                ContentView_1.CView.text("\n\n<b>The kitsune's spell has sealed your physical skills!</b>  You won't be able to use any of them until the spell wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.PhysSpec });
            }
            // M.Special:
            else {
                ContentView_1.CView.text("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your magical skills!");
                ContentView_1.CView.text("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
                ContentView_1.CView.text("\n\n<b>The kitsune's spell has sealed your magical skills!</b>  You won't be able to use any of them until the spell wears off.");
                enemy.effects.create(EffectType_1.EffectType.Sealed, { combatExpire: 4, blockedTypes: CombatActionType_1.CombatActionType.MagicSpec });
            }
            if (resist >= SMath_1.randInt(100)) {
                ContentView_1.CView.text("\n\nUpon your touch, the seal dissipates, and you are free of the kitsune's magic!  She pouts in disappointment, looking thoroughly irritated, but quickly resumes her coy trickster facade.");
                enemy.effects.removeByName(EffectType_1.EffectType.Sealed);
            }
        }
    }
    class Tease extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Tease";
        }
        useAction(char, enemy) {
            let select = SMath_1.randInt(3);
            if (char.body.hair.color === "red" && SMath_1.randInt(2) === 0)
                select = 3;
            if (select === 0)
                ContentView_1.CView.text("You rub your eyes, suddenly seeing triple as you find yourself in the midst of a crowd of kitsune doppelgangers.  They run their hands all over you, teasing and doting on you as their tails caress every inch of your body.  Taken by surprise, you forget to fight back until they have already dispersed, blending back into a single fox-woman.");
            else if (select === 1)
                ContentView_1.CView.text("Bending forward, the kitsune runs her hands down over her breasts, jiggling them enticingly and squeezing them together.  Hooking a finger in her robes, she slides it down, tugging them aside until her nipples are just barely covered, and with a teasing smirk, pulls them back up, leaving you wanting.");
            else if (select === 2)
                ContentView_1.CView.text("Turning her back to you, the kitsune fans out her tails, peering back as she lifts the hem of her robe to expose her plump hindquarters.  Her tails continually shift and twist, blocking your view, but it only serves to make you want it even <i>more</i>, licking your lips in anticipation.");
            // Redhead only:
            else
                ContentView_1.CView.text("The kitsune sways her hips enticingly as she appears in front of you abruptly, rubbing up against your side.  Her teasing caresses make you shiver with arousal, and you can feel something thick and warm pressing against your [hips].  She gives you a wry grin as she breaks away from you, sporting an obvious tent in her robes.  \"<i>Just you wait...</i>\"");
            enemy.stats.lust += 5 + enemy.stats.sens / 7;
        }
    }
    class KitsuneMainAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Action";
            this.subActions = [new BasicAttack_1.BasicAttack(), new FoxFire(), new Tease(), new Seal(), new Entwine(), new Illusion()];
        }
        use(char, enemy) {
            const moves = [new FoxFire(), new FoxFire(), new Tease(), new Tease()];
            if (!enemy.effects.has(EffectType_1.EffectType.Sealed))
                moves.push(new Seal());
            if (!enemy.effects.has(EffectType_1.EffectType.Sealed))
                moves.push(new Seal());
            if (!char.effects.has(EffectType_1.EffectType.PCTailTangle))
                moves.push(new Entwine());
            if (!char.effects.has(EffectType_1.EffectType.Illusion))
                moves.push(new Illusion());
            return SMath_1.randomChoice(moves);
        }
    }
    const KitsuneReactions = new Dictionary_1.Dictionary();
    KitsuneReactions.set("Wait", {
        beforeUseAction: (kitsune, enemy) => {
            if (!kitsune.effects.has(EffectType_1.EffectType.PCTailTangle))
                return false;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("Happily, you slump deeper into the fluffy tails, eliciting an amused giggle from the kitsune.");
            if (Settings_1.Settings.sillyMode)
                ContentView_1.CView.text("  You're so glad you got to touch fluffy tail.");
            ContentView_1.CView.text("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            return true;
        }
    });
    KitsuneReactions.set("Struggle", {
        beforeUseAction: (kitsune, enemy) => {
            const pcTailTangle = kitsune.effects.getByName(EffectType_1.EffectType.PCTailTangle);
            if (!pcTailTangle || !pcTailTangle.values.counter)
                return false;
            ContentView_1.CView.clear();
            // Struggle:
            ContentView_1.CView.text("You struggle against the kitsune's tails with all your might, desperately trying to free yourself before she has her way with you.");
            // Success
            if (SMath_1.randInt(20) + enemy.stats.str / 20 + pcTailTangle.values.counter >= 12) {
                ContentView_1.CView.text("  Summoning up reserves of strength you didn't know you had, you wrench yourself free of her tails, pushing her away.\n\n");
                kitsune.effects.removeByName(EffectType_1.EffectType.PCTailTangle);
                kitsune.combat.action.use(kitsune, enemy);
            }
            // Failure - +5-10 LUST
            else {
                ContentView_1.CView.text("  Despite your valiant efforts, your wriggling only serves to get you deeper entangled in the fluffy tails, eliciting an amused giggle from the kitsune.");
                ContentView_1.CView.text("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
                enemy.stats.lust += 5 + enemy.stats.sens / 10;
                pcTailTangle.values.counter += 3;
            }
            return true;
        }
    });
    class KitsuneEndScenes extends EndScenes_1.EndScenes {
        victoryScene(howYouWon, enemy) {
            // $> Need Fix for pcCameWorms
            // if (pcCameWorms) {
            //     CView.text("\n\nThe kitsune recoils before running off, no longer interested in you...");
            //     return { next: passTime(1) };
            // }
            // else {
            return KitsuneScene_1.loseToKitsunes(enemy, this.char);
            // }
        }
        defeatScene(howYouLost, enemy) {
            return KitsuneScene_1.defeatTheKitsunes(enemy, this.char);
        }
    }
    class Kitsune extends Character_1.Character {
        constructor(hairColor) {
            super({
                type: CharacterType_1.CharacterType.Kitsune,
                unarmedWeapon: new Weapon_1.Weapon("claws", new ItemDesc_1.ItemDesc("claws"), "claws", "punch", 1),
                baseArmor: new Armor_1.Armor("skin", new ItemDesc_1.ItemDesc("skin"), "skin", 1),
            });
            if (SMath_1.randInt(3) !== 2)
                KitsuneScene_1.KitsuneFlags.redheadIsFuta = 1;
            this.description = new CharacterDescription_1.CharacterDescription(this, "a ", "kitsune", "A kitsune stands in front of you, about five and a half feet tall.  She has a head of " +
                ({
                    blonde: "long flaxen",
                    black: "lustrous, ass-length black",
                    red: "unkempt, shoulder-length reddish"
                }[hairColor]) +
                " hair.  She appears mostly human, except for a pair of large, furry ears poking through her hair and six luxurious silky tails swaying in the air behind her.  Her robes are revealing but comfortable-looking, hugging her voluptuous curves and exposing large swaths of tattooed skin.  A layer of ornate tattoos covers patches of her exposed flesh, accentuating her feminine curves nicely, and each movement brings a pleasant jiggle from her plump backside and large breasts.");
            // this.plural = false;
            if (hairColor === "red" && KitsuneScene_1.KitsuneFlags.redheadIsFuta === 1) {
                this.body.cocks.add(new Cock_1.Cock(SMath_1.randInt(13) + 14, 1.5 + SMath_1.randInt(20) / 2, Cock_1.CockType.HUMAN));
                this.body.balls.count = 2;
                this.body.balls.size = 2 + SMath_1.randInt(13);
                this.body.cumMultiplier = 1.5;
                this.hoursSinceCum = this.body.balls.size * 10;
            }
            this.body.vaginas.add(new Vagina_1.Vagina(Vagina_1.VaginaWetness.SLICK, Vagina_1.VaginaLooseness.NORMAL, false));
            this.effects.create(EffectType_1.EffectType.BonusVCapacity, { vaginalCapacity: 20 });
            this.body.chest.add(new BreastRow_1.BreastRow(BreastDescriptor_1.breastCupInverse("D")));
            this.body.chest.firstRow.rating = BreastRow_1.BreastCup.D;
            this.body.butt.looseness = Butt_1.ButtLooseness.TIGHT;
            this.body.butt.wetness = Butt_1.ButtWetness.NORMAL;
            this.effects.create(EffectType_1.EffectType.BonusACapacity, { analCapacity: 20 });
            this.body.tallness = SMath_1.randInt(24) + 60;
            this.body.hips.rating = Hips_1.HipRating.AMPLE;
            this.body.butt.rating = Butt_1.ButtRating.AVERAGE + 1;
            this.body.skin.tone = "pale";
            this.body.hair.color = hairColor;
            this.body.hair.length = 13 + SMath_1.randInt(20);
            this.body.tails.add(new Tail_1.Tail(Tail_1.TailType.FOX));
            this.stats.str = 35;
            this.stats.tou = 45;
            this.stats.spe = 90;
            this.stats.int = 95;
            this.stats.lib = 60;
            this.stats.sens = 65;
            this.stats.cor = 45;
            this.stats.maxHP = 120;
            this.stats.HP = this.stats.maxHP;
            this.stats.lust = 20;
            this.stats.lustVuln = 0.9;
            this.stats.level = 6;
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new KitsuneMainAction(),
                reactions: KitsuneReactions,
                endScenes: new KitsuneEndScenes(this),
                rewards: {
                    gems: SMath_1.randInt(10) + 10,
                    drop: new WeightedDrop_1.WeightedDrop(ConsumableName_1.ConsumableName.FoxJewel, 1)
                }
            });
        }
    }
    exports.Kitsune = Kitsune;
});
//# sourceMappingURL=Kitsune.js.map