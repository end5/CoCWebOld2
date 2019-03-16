define(["require", "exports", "Engine/Combat/CombatParty", "Engine/Combat/DefeatEvent", "Engine/Display/ScreenDisplay", "Content/Combat/CombatDrops", "Engine/CharDict", "Engine/Utilities/SMath", "Engine/Combat/CombatManager", "Content/Menus/InGame/PlayerCombatMenu", "Engine/PartyDict"], function (require, exports, CombatParty_1, DefeatEvent_1, ScreenDisplay_1, CombatDrops_1, CharDict_1, SMath_1, CombatManager_1, PlayerCombatMenu_1, PartyDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Encounter {
        constructor(mainCharacter, ...enemyParty) {
            this.mainCharacter = mainCharacter;
            this.allyParty = new CombatParty_1.CombatParty([this.mainCharacter].concat(PartyDict_1.PartyDict.getMembers(this.mainCharacter)));
            this.enemyParty = new CombatParty_1.CombatParty(enemyParty);
            this.effectsCombatStart(this.allyParty);
            this.effectsCombatStart(this.enemyParty);
            this.allyPartyTurn = true;
        }
        effectsCombatStart(party) {
            for (const member of party.ableMembers)
                for (const effect of member.effects)
                    effect.combatStart(member);
        }
        performRound() {
            if (this.performTurnEnd)
                return this.performTurnEnd();
            return this.performPartyTurn();
        }
        performPartyTurn() {
            const enemyParty = this.allyPartyTurn ? this.enemyParty : this.allyParty;
            const activeParty = this.allyPartyTurn ? this.allyParty : this.enemyParty;
            const activeMember = activeParty.activePartyMember();
            if (!activeMember)
                throw new Error("Combat has not finished and their are no more active characters in " + activeParty);
            this.performTurnEnd = () => {
                this.performTurnEnd = undefined;
                if (this.allyPartyTurn)
                    this.enemyParty.resolveAttacker(activeMember);
                else
                    this.allyParty.resolveAttacker(activeMember);
                this.resolveEndTurn(activeMember);
                return this.endCombatOrNextRound();
            };
            this.effectsTurnStart(activeMember, activeParty.ableMembers);
            if (!activeMember.combat.useAI) {
                return { next: ScreenDisplay_1.choiceWrapWithChar(PlayerCombatMenu_1.combatMenu, activeMember, enemyParty.ableMembers) };
            }
            else {
                if (this.allyPartyTurn)
                    activeMember.combat.action.use(activeMember, SMath_1.randomChoice(this.enemyParty.ableMembers));
                else
                    activeMember.combat.action.use(activeMember, SMath_1.randomChoice(this.allyParty.ableMembers));
                return this.performTurnEnd();
            }
        }
        effectsTurnStart(selectedChar, enemyParty) {
            for (const effect of selectedChar.effects)
                effect.combatTurnStart(selectedChar, ...enemyParty);
        }
        resolveEndTurn(character) {
            if (this.allyPartyTurn) {
                this.effectsTurnEnd(character, this.enemyParty.ableMembers);
                this.allyParty.selectNextPartyMember();
            }
            else {
                this.effectsTurnEnd(character, this.allyParty.ableMembers);
                this.enemyParty.selectNextPartyMember();
            }
            this.allyPartyTurn = !this.allyPartyTurn;
        }
        effectsTurnEnd(selectedChar, enemyParty) {
            for (const effect of selectedChar.effects)
                effect.combatTurnEnd(selectedChar, ...enemyParty);
        }
        endCombatOrNextRound() {
            if (this.allyParty.ableMembers.length === 0 || this.enemyParty.ableMembers.length === 0) {
                this.combatCleanup();
                return this.displayDefeatEvent();
            }
            return this.performRound();
        }
        combatCleanup() {
            this.effectsCombatEnd(this.mainCharacter);
            for (const member of this.allyParty.allMembers) {
                this.effectsCombatEnd(member);
            }
            for (const member of this.enemyParty.allMembers) {
                this.effectsCombatEnd(member);
            }
        }
        effectsCombatEnd(char) {
            for (const effect of char.effects)
                effect.combatEnd(char);
        }
        displayDefeatEvent() {
            if (this.allyParty.ableMembers.length === 0) {
                if (this.enemyParty.partyEndScenes) {
                    return this.enemyParty.partyEndScenes.victory(this.allyParty, this.enemyParty);
                }
                else {
                    if (this.allyParty.allMembers.length > 1) {
                        // Whoever defeated the player, that is the scene that is displayed
                        for (const defeatEvent of this.enemyParty.defeatLog) {
                            if (defeatEvent.loser.uuid === CharDict_1.CharDict.player.uuid) {
                                return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                            }
                        }
                        /*
                        // If multiple enemies survive, random scene
                        let defeatEvent = Utils.randomChoice(this.allyParty.defeatLog);
                        defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
                        */
                    }
                    else {
                        const defeatEvent = this.allyParty.defeatLog[0];
                        return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                    }
                }
            }
            else if (this.enemyParty.ableMembers.length === 0) {
                if (this.allyParty.partyEndScenes) {
                    return this.allyParty.partyEndScenes.victory(this.enemyParty, this.allyParty);
                }
                else {
                    if (this.enemyParty.allMembers.length > 1) {
                        // If multiple enemies lose, player picks one for end scene
                        const choices = [];
                        for (const defeatEvent of this.enemyParty.defeatLog) {
                            if (defeatEvent.how !== DefeatEvent_1.DefeatType.Escape) {
                                choices.push([
                                    defeatEvent.loser.desc.name,
                                    () => defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser)
                                ]);
                            }
                        }
                        // Should be replaced with separate menu
                        return { choices };
                    }
                    else {
                        const defeatEvent = this.enemyParty.defeatLog[0];
                        if (defeatEvent.how !== DefeatEvent_1.DefeatType.Escape) {
                            this.performTurnEnd = () => {
                                CombatManager_1.CombatManager.encounter = undefined;
                                return CombatDrops_1.awardPlayer(this.mainCharacter, defeatEvent.loser);
                            };
                        }
                        return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                    }
                }
            }
            throw new Error('Both parties have able members');
        }
    }
    exports.Encounter = Encounter;
});
//# sourceMappingURL=Encounter.js.map