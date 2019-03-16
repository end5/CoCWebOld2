define(["require", "exports", "Engine/Items/Armor", "../ArmorName", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Engine/Body/GenderIdentity", "Engine/Display/ContentView", "Content/Scenes/NPCs/Valeria"], function (require, exports, Armor_1, ArmorName_1, ItemDesc_1, CockDescriptor_1, GenderIdentity_1, ContentView_1, Valeria_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GooArmor extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.GooArmor, new ItemDesc_1.ItemDesc("GooArmr", "Valeria, the goo-girl armor", "This shining suit of platemail is more than just platemail - it houses the goo-girl, Valeria!  Together, they provide one tough defense, but you had better be okay with having goo handling your junk while you fight if you wear this!"), "goo armor", 22, 1);
        }
        useText(character) {
            ContentView_1.CView.text("With an ecstatic smile, the goo-armor jumps to her feet and throws her arms around your shoulders.  \"<i>Oh, this is going to be so much fun!  Thank you thank you thank you!  I promise I'll keep you nice and snug and safe, don't you worry.  Oooh, a real adventure again!  WHEEE!</i>\"");
            ContentView_1.CView.text("\n\nBefore she can get too excited, you remind the goo that she's supposed to be your armor right about now.  Clasping her hands over her mouth in embarrassment, she utters a muted apology and urges you to just \"<i>put me on!</i>\"  Awkwardly, you strip out of your gear and open up the platemail armor and clamber in.  It's wet and squishy, making you shudder and squirm as you squash your new friend flat against the metal armor.");
            ContentView_1.CView.text("\n\nEventually, the two of you get situated. The goo-girl slips around your body inside the heavy armor, maneuvering so that your face is unobstructed and your joints, not protected by the armor, are soundly clad in squishy goo.  She even forms a gooey beaver on your new helm, allowing you to open and close her like a visor in battle.  Eventually, her goo settles around your ");
            if (character.body.vaginas.length > 0)
                ContentView_1.CView.text("[vagina]");
            if (character.body.vaginas.length > 0 && character.body.cocks.length > 0)
                ContentView_1.CView.text(" and ");
            if (character.body.cocks.length > 0)
                ContentView_1.CView.text(CockDescriptor_1.describeCocksLight(character));
            if (character.gender === GenderIdentity_1.Gender.NONE)
                ContentView_1.CView.text("groin");
            ContentView_1.CView.text(", encasing your loins in case you need a little mid-battle release, she says.");
            ContentView_1.CView.text("\n\nAfter a few minutes, you and your armor-friend are settled and ready to go.");
            if (Valeria_1.ValeriaFlags.MET_VALERIA) {
                ContentView_1.CView.text("  As you ready yourself for the dungeon ahead, the goo giggles into your ear.  \"<i>Oh shit, silly me.  I forgot, my name's Valeria.  Ser Valeria, if you're feeling fancy.</i>\"  You introduce yourself, awkwardly shaking your own hand by way of pleasantries.");
                Valeria_1.ValeriaFlags.MET_VALERIA++;
            }
            ContentView_1.CView.text("\n\n\"<i>Well alright then, [name]!</i>\" Valeria says excitedly, \"<i>Let's go!</i>\"\n\n");
        }
        unequipText() {
            return "Valeria picks herself up and huffs, \"<i>Maybe we can adventure some more later on?</i>\" before undulating off towards your camp.\n\n(<b>Valeria now available in the followers tab!</b>)";
        }
        onEquip(character) {
            Valeria_1.ValeriaFlags.VALARIA_AT_CAMP = 0;
            super.onEquip(character);
        }
        onUnequip(character) {
            Valeria_1.ValeriaFlags.VALARIA_AT_CAMP = 1;
            super.onUnequip(character);
        }
    }
    exports.GooArmor = GooArmor;
});
//# sourceMappingURL=GooArmor.js.map