define(["require", "exports", "Engine/Combat/EndScenes", "Engine/Body/Butt", "Engine/Body/Face", "Engine/Body/Skin", "Engine/Body/Tongue", "Engine/Combat/CombatContainer", "Content/Items/ArmorName", "Content/Items/WeaponName", "Engine/Character/Character", "Content/Character/CharacterType", "Engine/Character/CharacterDescription", "Engine/Utilities/SMath", "./PlayerResponses", "./CombatActions/PlayerActionPerform", "Engine/Items/ItemDict", "Content/Player/PlayerStats", "Content/Player/PlayerBody"], function (require, exports, EndScenes_1, Butt_1, Face_1, Skin_1, Tongue_1, CombatContainer_1, ArmorName_1, WeaponName_1, Character_1, CharacterType_1, CharacterDescription_1, SMath_1, PlayerResponses_1, PlayerActionPerform_1, ItemDict_1, PlayerStats_1, PlayerBody_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BlankEndScenes extends EndScenes_1.EndScenes {
    }
    class Player extends Character_1.Character {
        constructor() {
            super({
                type: CharacterType_1.CharacterType.Player,
                unarmedWeapon: ItemDict_1.ItemDict.getByName(WeaponName_1.WeaponName.Fists),
                baseArmor: ItemDict_1.ItemDict.getByName(ArmorName_1.ArmorName.ComfortUndercloth),
            });
            this.description = new CharacterDescription_1.CharacterDescription(this, "", "", "");
            this.body = new PlayerBody_1.PlayerBody(this);
            this.stats = new PlayerStats_1.PlayerStats(this);
            this.desc.isPlayer = true;
            this.stats.str = 15;
            this.stats.tou = 15;
            this.stats.spe = 15;
            this.stats.int = 15;
            this.stats.sens = 15;
            this.stats.lib = 15;
            this.stats.cor = 0;
            this.stats.lust = 15;
            this.stats.fatigue = 0;
            this.stats.level = 1;
            this.body.skin.type = Skin_1.SkinType.PLAIN;
            this.body.skin.desc = "skin";
            this.body.face.type = Face_1.FaceType.HUMAN;
            this.body.tongue.type = Tongue_1.TongueType.HUMAN;
            this.body.cumMultiplier = 1;
            this.hoursSinceCum = 0;
            this.body.butt.looseness = Butt_1.ButtLooseness.VIRGIN;
            this.body.butt.wetness = Butt_1.ButtWetness.DRY;
            // Inventory
            this.inventory.items.unlock(6);
            // Combat
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new PlayerActionPerform_1.PlayerAction(this),
                reactions: PlayerResponses_1.PlayerResponses,
                endScenes: new BlankEndScenes(this),
                rewards: {
                    gems: () => SMath_1.randInt(10)
                }
            });
            this.combatContainer.useAI = false;
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map