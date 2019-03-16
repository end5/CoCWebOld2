define(["require", "exports", "Engine/Character/Character", "Content/Character/CharacterType", "Engine/Body/Cock", "Engine/Inventory/CharacterInventory", "Engine/Character/CharacterDescription", "Engine/Combat/CombatContainer", "Engine/Items/Weapon", "Engine/Items/ItemDesc", "Engine/Items/Armor", "Engine/Combat/EndScenes", "Content/Combat/Actions/MainAction"], function (require, exports, Character_1, CharacterType_1, Cock_1, CharacterInventory_1, CharacterDescription_1, CombatContainer_1, Weapon_1, ItemDesc_1, Armor_1, EndScenes_1, MainAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpGangDesc extends CharacterDescription_1.CharacterDescription {
        get capitalA() {
            return "gang of imps";
        }
    }
    class ImpGangEndScenes extends EndScenes_1.EndScenes {
    }
    class ImpGang extends Character_1.Character {
        constructor() {
            super(CharacterType_1.CharacterType.ImpGang);
            this.description = new ImpGangDesc(this, "a mob of imps", "imp gang", "");
            this.body.cocks.add(new Cock_1.Cock(12, 1.5));
            this.body.cocks.add(new Cock_1.Cock(25, 2.5));
            this.body.cocks.add(new Cock_1.Cock(25, 2.5, Cock_1.CockType.DOG, 2));
            this.body.balls.count = 2;
            this.body.balls.size = 3;
            this.body.skin.tone = "imp mob";
            this.inventory = new CharacterInventory_1.CharacterInventory(this, new Weapon_1.Weapon("", new ItemDesc_1.ItemDesc(""), "", "", 0), new Armor_1.Armor("", new ItemDesc_1.ItemDesc(""), "", 0));
            this.combatContainer = new CombatContainer_1.CombatContainer(this, {
                mainAction: new MainAction_1.MainAction(),
                endScenes: new ImpGangEndScenes(this),
                rewards: {}
            });
        }
    }
    exports.ImpGang = ImpGang;
});
//# sourceMappingURL=ImpGang.js.map