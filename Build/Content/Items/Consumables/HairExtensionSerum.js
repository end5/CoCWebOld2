define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Body/Hair", "Engine/Items/ItemDesc", "Content/Descriptors/HairDescriptor", "./Reptilum", "Engine/Display/ContentView", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, Hair_1, ItemDesc_1, HairDescriptor_1, Reptilum_1, ContentView_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HairExtensionSerumFlags = Flags_1.Flags.register("Hair Extension Serum", {
        INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED: 0,
        INCREASED_HAIR_GROWTH_TIME_REMAINING: 0,
    });
    class HairExtensionSerum extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.HairExtensionSerum, new ItemDesc_1.ItemDesc("ExtSerm", "a bottle of hair extension serum", "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows."));
        }
        canUse(character) {
            if (exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED <= 2)
                return true;
            ContentView_1.CView.text("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
            return false;
        }
        use(character) {
            ContentView_1.CView.text("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
            if (exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING <= 0) {
                ContentView_1.CView.text("\n\nThe tingling on your head lets you know that it's working!");
                exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
                exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED = 1;
            }
            else if (exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 1) {
                ContentView_1.CView.text("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
                exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
            }
            else if (exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED === 2) {
                ContentView_1.CView.text("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
                exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED++;
            }
            if (Reptilum_1.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD > 0 && character.body.hair.type !== Hair_1.HairType.ANEMONE) {
                Reptilum_1.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 0;
                ContentView_1.CView.text("\n\n<b>Somehow you know that your " + HairDescriptor_1.describeHair(character) + " is growing again.</b>");
            }
            if (exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING < 7)
                exports.HairExtensionSerumFlags.INCREASED_HAIR_GROWTH_TIME_REMAINING = 7;
        }
    }
    exports.HairExtensionSerum = HairExtensionSerum;
});
//# sourceMappingURL=HairExtensionSerum.js.map