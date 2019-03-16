define(["require", "exports", "Engine/Utilities/Dictionary", "Engine/Utilities/SMath", "Engine/Display/ContentView"], function (require, exports, Dictionary_1, SMath_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CombatContainer {
        constructor(character, values) {
            this.useAI = true;
            this.char = character;
            this.action = values.mainAction;
            if (values.reactions)
                this.reactions = values.reactions;
            else
                this.reactions = new Dictionary_1.Dictionary();
            this.endScenes = values.endScenes;
            this.rewards = values.rewards;
        }
        hasSpells() {
            return this.spellCount() > 0;
        }
        spellCount() {
            return []
                .filter((name) => {
                return this.char.effects.has(name);
            })
                .length;
        }
        HP() {
            return this.char.stats.HP;
        }
        HPRatio() {
            return this.char.stats.HP / this.char.stats.maxHP;
        }
        gainHP(value) {
            const oldHP = this.char.stats.HP;
            this.char.stats.HP += value;
            return oldHP - this.char.stats.HP;
        }
        loseHP(value) {
            const oldHP = this.char.stats.HP;
            this.char.stats.HP -= value;
            return oldHP - this.char.stats.HP;
        }
        /**
         * @return 0: did not avoid; 1-3: avoid with varying difference between
         * speeds (1: narrowly avoid, 3: deftly avoid)
         */
        speedDodge(enemy) {
            const diff = this.char.stats.spe - enemy.stats.spe;
            const rnd = SMath_1.randInt((diff / 4) + 80);
            if (rnd <= 80)
                return 0;
            else if (diff < 8)
                return 1;
            else if (diff < 20)
                return 2;
            else
                return 3;
        }
        defense() {
            return this.char.inventory.armor.defense;
        }
        attack() {
            return this.char.inventory.weapon.attack;
        }
        spellMod() {
            return 1;
        }
        teaseXP(XP = 0) {
            while (XP > 0) {
                XP--;
                this.char.stats.teaseXP++;
                // Level dat shit up!
                if (this.char.stats.teaseLevel < 5 && this.char.stats.teaseXP >= 10 + (this.char.stats.teaseLevel + 1) * 5 * (this.char.stats.teaseLevel + 1)) {
                    ContentView_1.CView.text("\n<b>Tease skill leveled up to " + (this.char.stats.teaseLevel + 1) + "!</b>");
                    this.char.stats.teaseLevel++;
                    this.char.stats.teaseXP = 0;
                }
            }
        }
    }
    exports.CombatContainer = CombatContainer;
});
//# sourceMappingURL=CombatContainer.js.map