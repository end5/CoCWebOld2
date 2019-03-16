define(["require", "exports", "./DefeatEvent"], function (require, exports, DefeatEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CombatParty {
        constructor(party) {
            this.allMembers = party;
            this.ableMembers = party.slice();
            this.defeatLog = [];
        }
        activePartyMember() {
            return this.ableMembers[0];
        }
        lostFight(combatEndType, victor) {
            this.defeatLog.push(new DefeatEvent_1.DefeatEvent(victor, this.ableMembers[0], combatEndType));
        }
        selectNextPartyMember() {
            if (this.ableMembers.length > 0) {
                const member = this.ableMembers.shift();
                if (member)
                    this.ableMembers.push(member);
            }
        }
        resolveAttacker(attacker) {
            for (const defender of this.ableMembers) {
                if (defender.stats.HP < 1) {
                    if (attacker.combat.endScenes.claimsVictory)
                        attacker.combat.endScenes.claimsVictory(DefeatEvent_1.DefeatType.HP, defender);
                    this.defeatLog.push(new DefeatEvent_1.DefeatEvent(attacker, defender, DefeatEvent_1.DefeatType.HP));
                    this.ableMembers.shift();
                }
                else if (defender.stats.lust > 99) {
                    if (attacker.combat.endScenes.claimsVictory)
                        attacker.combat.endScenes.claimsVictory(DefeatEvent_1.DefeatType.Lust, defender);
                    this.defeatLog.push(new DefeatEvent_1.DefeatEvent(attacker, defender, DefeatEvent_1.DefeatType.Lust));
                    this.ableMembers.shift();
                }
                else if (attacker.combat.endScenes.hasEscaped && attacker.combat.endScenes.hasEscaped(defender)) {
                    if (attacker.combat.endScenes.claimsVictory)
                        attacker.combat.endScenes.claimsVictory(DefeatEvent_1.DefeatType.Escape, defender);
                    this.defeatLog.push(new DefeatEvent_1.DefeatEvent(attacker, defender, DefeatEvent_1.DefeatType.Escape));
                    this.ableMembers.shift();
                }
                else if (attacker.combat.endScenes.hasDefeated && attacker.combat.endScenes.hasDefeated(defender)) {
                    if (attacker.combat.endScenes.claimsVictory)
                        attacker.combat.endScenes.claimsVictory(DefeatEvent_1.DefeatType.Special, defender);
                    this.defeatLog.push(new DefeatEvent_1.DefeatEvent(attacker, defender, DefeatEvent_1.DefeatType.Special));
                    this.ableMembers.shift();
                }
            }
        }
    }
    exports.CombatParty = CombatParty;
});
//# sourceMappingURL=CombatParty.js.map