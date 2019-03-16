define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Engine/Utilities/SMath", "Content/Character/CharacterType", "Content/Effects/EffectType"], function (require, exports, CombatAction_1, ContentView_1, SMath_1, CharacterType_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BasicAttack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Attack";
        }
        useAction(char, enemy) {
            if (attackSucceeded(char, enemy)) {
                const damage = eOneAttack(char, enemy);
                outputAttack(char, enemy, damage);
                postAttack(char, enemy, damage);
                ContentView_1.CView.text("\n");
            }
        }
    }
    exports.BasicAttack = BasicAttack;
    function eOneAttack(char, enemy) {
        // Determine damage - str modified by enemy toughness!
        return enemy.combat.loseHP(char.stats.str + char.combat.attack());
    }
    function attackSucceeded(char, enemy) {
        let attack = true;
        // Blind dodge change
        if (char.effects.has(EffectType_1.EffectType.Blind)) {
            attack = handleBlind(char);
        }
        attack = !enemyDodged(enemy, char);
        return attack;
    }
    function handleBlind(char) {
        if (SMath_1.randInt(3) < 2) {
            if (char.inventory.weapon.name === "tongue-slap")
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " completely misses you with a thrust from " + char.desc.possessivePronoun + " tongue!\n");
            else
                ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " completely misses you with a blind attack!\n");
            return false;
        }
        return true;
    }
    function speedDodge(player, enemy) {
        const diff = player.stats.spe - enemy.stats.spe;
        const rnd = Math.floor(Math.random() * ((diff / 4) + 80));
        if (rnd <= 80)
            return 0;
        else if (diff < 8)
            return 1;
        else if (diff < 20)
            return 2;
        else
            return 3;
    }
    function enemyDodged(char, enemy) {
        // Determine if dodged!
        const dodge = speedDodge(char, enemy);
        if (dodge > 0) {
            outputEnemyDodged(char, dodge);
            return true;
        }
        // Determine if evaded
        if (!(enemy.charType === CharacterType_1.CharacterType.Kiha) && char.effects.has(EffectType_1.EffectType.Evade) && SMath_1.randInt(100) < 10) {
            ContentView_1.CView.text("Using your skills at evading attacks, you anticipate and sidestep " + enemy.desc.a + enemy.desc.short + "'");
            if (!enemy.desc.plural)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text(" attack.\n");
            return true;
        }
        // ("Misdirection"
        if (char.effects.has(EffectType_1.EffectType.Misdirection) && SMath_1.randInt(100) < 10 && char.inventory.armor.name === "red, high-society bodysuit") {
            ContentView_1.CView.text("Using Raphael's teachings, you anticipate and sidestep " + enemy.desc.a + enemy.desc.short + "' attacks.\n");
            return true;
        }
        // Determine if cat'ed
        if (char.effects.has(EffectType_1.EffectType.Flexibility) && SMath_1.randInt(100) < 6) {
            ContentView_1.CView.text("With your incredible flexibility, you squeeze out of the way of " + enemy.desc.a + enemy.desc.short + "");
            if (enemy.desc.plural)
                ContentView_1.CView.text("' attacks.\n");
            else
                ContentView_1.CView.text("'s attack.\n");
            return true;
        }
        return false;
    }
    function outputEnemyDodged(char, dodge) {
        if (dodge === 1)
            ContentView_1.CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + "!\n");
        else if (dodge === 2)
            ContentView_1.CView.text("You dodge " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + " with superior quickness!\n");
        else {
            ContentView_1.CView.text("You deftly avoid " + char.desc.a + char.desc.short);
            if (char.desc.plural)
                ContentView_1.CView.text("'");
            else
                ContentView_1.CView.text("'s");
            ContentView_1.CView.text(" slow " + char.inventory.weapon.verb + ".\n");
        }
    }
    function outputAttack(char, enemy, damage) {
        if (damage <= 0) {
            // Due to toughness or amor...
            if (SMath_1.randInt(enemy.combat.defense() + enemy.stats.tou) < enemy.combat.defense())
                ContentView_1.CView.text("You absorb and deflect every " + char.inventory.weapon.verb + " with your " + enemy.inventory.armor.displayName + ".");
            else {
                if (char.desc.plural)
                    ContentView_1.CView.text("You deflect and block every " + char.inventory.weapon.verb + " " + char.desc.a + char.desc.short + " throw at you.");
                else
                    ContentView_1.CView.text("You deflect and block every " + char.inventory.weapon.verb + " " + char.desc.a + char.desc.short + " throws at you.");
            }
        }
        else if (damage < 6)
            ContentView_1.CView.text("You are struck a glancing blow by " + char.desc.a + char.desc.short + "! (" + damage + ")");
        else if (damage < 11) {
            ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " wound");
            if (!char.desc.plural)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text(" you! (" + damage + ")");
        }
        else if (damage < 21) {
            ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " stagger");
            if (!char.desc.plural)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text(" you with the force of " + char.desc.possessivePronoun + " " + char.inventory.weapon.verb + "! (" + damage + ")");
        }
        else if (damage > 20) {
            ContentView_1.CView.text(char.desc.capitalA + char.desc.short + " <b>mutilate");
            if (!char.desc.plural)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text("</b> you with " + char.desc.possessivePronoun + " powerful " + char.inventory.weapon.verb + "! (" + damage + ")");
        }
    }
    function postAttack(char, enemy, damage) {
        if (damage > 0) {
            if (char.stats.lustVuln > 0 && enemy.inventory.armor.displayName === "barely-decent bondage straps") {
                if (!char.desc.plural)
                    ContentView_1.CView.text("\n" + char.desc.capitalA + char.desc.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
                else
                    ContentView_1.CView.text("\n" + char.desc.capitalA + char.desc.short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
                char.stats.lust += 5 * char.stats.lustVuln;
            }
        }
    }
});
//# sourceMappingURL=BasicAttack.js.map