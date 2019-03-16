define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LustStick extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.LustStick, new ItemDesc_1.ItemDesc("LustStk", "a tube of golden lipstick", "This tube of golden lipstick is used by harpies to keep males aroused.  It has aphrodisiac properties on anyone with male genitalia and is most effective when applied to the lips or groin."));
        }
        canUse(character) {
            if (character.body.cocks.length > 0 && !character.effects.has(EffectType_1.EffectType.LuststickAdapted)) {
                ContentView_1.CView.text("You look at the tube of lipstick, but get the idea it would be a pretty bad idea to smear a thick coating of cock-hardening aphrodisiacs over your own lips.  ");
                return false;
            }
            return true;
        }
        use(character) {
            const lustStickApplied = character.effects.getByName(EffectType_1.EffectType.LustStickApplied);
            if (lustStickApplied) {
                lustStickApplied.values.hourExpire = SMath_1.randInt(12) + 12;
                ContentView_1.CView.text("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ");
                ContentView_1.CView.text("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n");
            }
            else {
                character.effects.create(EffectType_1.EffectType.LustStickApplied, { hourExpire: 24 });
                ContentView_1.CView.text("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ");
                if (character.body.cocks.length > 0)
                    ContentView_1.CView.text("It tingles a little, but the drugs have little to no effect on you now.");
                else
                    ContentView_1.CView.text("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.");
                ContentView_1.CView.text("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n");
            }
            character.stats.lust += 1;
        }
    }
    exports.LustStick = LustStick;
});
//# sourceMappingURL=LustStick.js.map