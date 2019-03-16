define(["require", "exports", "Engine/Items/Armor", "../ArmorName", "Engine/Items/ItemDesc", "Engine/Items/Piercing", "Engine/Display/ContentView", "Content/Scenes/NPCs/CeraphFollowerScene", "Content/Descriptors/GenderDescriptor", "Content/Scenes/NPCs/Ceraph", "Engine/Items/ItemDict", "Content/Items/PiercingName"], function (require, exports, Armor_1, ArmorName_1, ItemDesc_1, Piercing_1, ContentView_1, CeraphFollowerScene_1, GenderDescriptor_1, Ceraph_1, ItemDict_1, PiercingName_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SeductiveArmor extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.SeductiveArmor, new ItemDesc_1.ItemDesc("SeductA", "a set of scandalously seductive armor", "A complete suit of scalemail shaped to hug tightly against every curve, it has a solid steel chest-plate with obscenely large nipples molded into it.  The armor does nothing to cover the backside, exposing the wearer's cheeks to the world."), "scandalously seductive armor", 0, 1);
        }
        hasNipplePiercing(character) {
            for (const nipple of character.inventory.piercings.nipples)
                if (nipple.isEquipped())
                    return true;
            return false;
        }
        useText(character) {
            if (!CeraphFollowerScene_1.ceraphIsFollower()) {
                ContentView_1.CView.text("After struggling to get it on, you feel a sudden shift in your scandalous new armor.  To your horror, it begins folding into itself, revealing more and more of your " + character.body.skin.desc + " and the comfortable underclothes you had on underneath it.  The transforming armor gradually covers less and less of you until it's little more than a pair of huge nipple-coverings and a silver chain.  A loud KA-CHUNK startles you, and then you're screaming as you feel something stabbing through your nipples.  Goosebumps cover your flesh as you twist in unexpected agony.\n\n");
                ContentView_1.CView.text("After you've had a chance to recover, you inspect your abused nipples and discover that your armor has totally disappeared.  The only thing left behind is a pair of seamless black nipple-studs, embedded into your vulnerable flesh.  There doesn't appear to be any way to remove them either.  Thankfully, your comfortable underclothes have been unaffected by the sudden disappearance of your armor.  The thought of having to run around naked stays stubbornly locked in your mind, and you mentally curse the demon for what she's done to you.\n\n");
                ContentView_1.CView.text("As if summoned by your thoughts, you can hear her voice on the wind, taunting you again, \"<i>Enjoy your new bondage fetish, pet!  One more piercing and you'll be ready.  Don't have too much fun being tied down and fucked, ok?</i>\"\n\n");
                const hasNipplePiercing = character.inventory.piercings.nipples.find((equipSlot) => equipSlot.isEquipped());
                if (hasNipplePiercing)
                    ContentView_1.CView.text("You're left to wonder - where did the old piercings go?\n\n");
                for (const nipple of character.inventory.piercings.nipples)
                    nipple.equip(new Piercing_1.Piercing(PiercingName_1.PiercingName.Stud, "seamless black nipple-studs", "Seamless black nipple-studs"));
                Ceraph_1.CeraphFlags.PC_FETISH = 2;
            }
            else {
                ContentView_1.CView.text("As you're trying to put on the armor, Ceraph appears from nowhere, apologizing profusely and stopping you before you can slide the last strap into place.  \"<i>Please don't put that on, " + GenderDescriptor_1.mf(character, "Master", "Mistress") + ".  I trapped that armor to pierce new fetishes the unwary so that I could add them to my harem.  I'd hate to garner your anger.</i>\"  She wrings her hands nervously.  \"<i>If you'll hand it here, I'll get rid of it for you. Noone would buy it anyway.</i>\"");
                ContentView_1.CView.text("\n\nYou shrug and toss her the armor, disappointed that you're down a potentially sexy outfit.");
                ContentView_1.CView.text("\n\nCeraph bows gratefully and swiftly backpedals, offering, \"<i>And if you ever want me to stuff you full of magic fetishes, just ask, okay?</i>\"");
                ContentView_1.CView.text("\n\nShe's gone before you can reply.  Sometimes she's more trouble than she's worth.");
            }
        }
        onEquip(character) {
            const underClothes = ItemDict_1.ItemDict.getByName(ArmorName_1.ArmorName.ComfortUndercloth);
            if (underClothes) {
                underClothes.onEquip(character);
                return underClothes;
            }
            throw new Error("Error: Underclothes not found.");
        }
    }
    exports.SeductiveArmor = SeductiveArmor;
});
//# sourceMappingURL=SeductiveArmor.js.map