define(["require", "exports", "Engine/Utilities/SMath"], function (require, exports, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EndScenes {
        constructor(character) {
            this.char = character;
        }
        /**
         * Displays victory scene.
         * If this character has a victory scene and the enemy has a defeat scene, it will random between the scenes.
         * @param howYouWon How this character defeated the enemy.
         * @param enemy The enemy character.
         */
        victory(howYouWon, enemy) {
            if (enemy.combat.endScenes.beforeEndingScene)
                enemy.combat.endScenes.beforeEndingScene(howYouWon, this.char);
            if (this.victoryScene && enemy.combat.endScenes.defeatScene) {
                if (SMath_1.randInt(2) === 0) {
                    return this.victoryScene(howYouWon, enemy);
                }
                else {
                    return enemy.combat.endScenes.defeatScene(howYouWon, this.char);
                }
            }
            else if (this.victoryScene) {
                return this.victoryScene(howYouWon, enemy);
            }
            else if (enemy.combat.endScenes.defeatScene) {
                return enemy.combat.endScenes.defeatScene(howYouWon, this.char);
            }
            throw new Error('No ending scene was found');
        }
    }
    /**
     * The default number of hours that pass when losing a fight.
     */
    EndScenes.defaultLostFightHours = 8;
    exports.EndScenes = EndScenes;
});
//# sourceMappingURL=EndScenes.js.map