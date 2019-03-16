define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "../MaterialName", "Engine/Display/ContentView", "Content/Menus/InGame/PlayerInventoryMenu", "Engine/Items/ItemDict"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, NumToText_1, ItemDesc_1, MaterialName_1, ContentView_1, PlayerInventoryMenu_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KitsuneGift extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.KitsuneGift, new ItemDesc_1.ItemDesc("KitGift", "a kitsune's gift", "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?"));
        }
        canUse(character) {
            return true;
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("Curiosity gets the best of you, and you decide to open the package.  After all, what's the worst that could happen?\n\n");
            // Opening the gift strand results in one of the following:
            switch (SMath_1.randInt(12)) {
                // [Fox Jewel]
                case 0:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, sitting in the center is a small teardrop-shaped jewel!");
                    ContentView_1.CView.text("\n\n<b>You've received a shining Fox Jewel from the kitsune's gift!  How generous!</b>  ");
                    character.inventory.items.createAdd(character, ConsumableName_1.ConsumableName.FoxJewel, PlayerInventoryMenu_1.inventoryMenu);
                    break;
                // [Fox Berries]
                case 1:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, there is a small cluster of orange-colored berries sitting in the center!");
                    ContentView_1.CView.text("\n\n<b>You've received a fox berry from the kitsune's gift!  How generous!</b>  ");
                    // add Fox Berries to inventory
                    character.inventory.items.createAdd(character, ConsumableName_1.ConsumableName.FoxBerry, PlayerInventoryMenu_1.inventoryMenu);
                    break;
                // [Gems]
                case 2:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it is filled to the brim with shining gems!");
                    const gems = 2 + SMath_1.randInt(20);
                    ContentView_1.CView.text("\n\n<b>You've received " + NumToText_1.numToCardinalText(gems) + " shining gems from the kitsune's gift!  How generous!</b>");
                    character.inventory.gems += gems;
                    // add X gems to inventory
                    break;
                // [Kitsune Tea/Scholar's Tea] //Just use Scholar's Tea and drop the "trick" effect if you don't want to throw in another new item.
                case 3:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small bag of dried tea leaves!");
                    ContentView_1.CView.text("\n\n<b>You've received a bag of tea from the kitsune's gift!  How thoughtful!</b>  ");
                    // add Kitsune Tea/Scholar's Tea to inventory
                    character.inventory.items.createAdd(character, ConsumableName_1.ConsumableName.ScholarsTea, PlayerInventoryMenu_1.inventoryMenu);
                    break;
                // [Hair Dye]
                case 4:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small vial filled with hair dye!");
                    const randomHairDye = [
                        ConsumableName_1.ConsumableName.HairDyeRed,
                        ConsumableName_1.ConsumableName.HairDyeBlonde,
                        ConsumableName_1.ConsumableName.HairDyeBlack,
                        ConsumableName_1.ConsumableName.HairDyeWhite
                    ][SMath_1.randInt(4)];
                    const hairDyeItem = ItemDict_1.ItemDict.getByName(randomHairDye);
                    ContentView_1.CView.text("\n\n<b>You've received " + hairDyeItem.desc.longName + " from the kitsune's gift!  How generous!</b>  ");
                    // add <color> Dye to inventory
                    character.inventory.items.addItem(character, hairDyeItem, PlayerInventoryMenu_1.inventoryMenu);
                    break;
                // [Knowledge Spell]
                case 5:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but it seems like there's nothing else inside.  As you peer into the box, a glowing circle filled with strange symbols suddenly flashes to life!  Light washes over you, and your mind is suddenly assaulted with new knowledge...  and the urge to use that knowledge for mischief!");
                    ContentView_1.CView.text("\n\n<b>The kitsune has shared some of its knowledge with you!</b>  But in the process, you've gained some of the kitsune's promiscuous trickster nature...");
                    // Increase INT and Libido, +10 LUST
                    character.stats.int += 4;
                    character.stats.sens += 2;
                    character.stats.lust += 10;
                    break;
                // [Thief!]
                case 6:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it leaps into your item pouch, then hops away and gallavants into the woods, carting off a small fortune in gems.");
                    ContentView_1.CView.text("\n\n<b>The kitsune's familiar has stolen your gems!</b>");
                    // Lose X gems as though losing in battle to a kitsune
                    character.inventory.gems -= 2 + SMath_1.randInt(15);
                    break;
                // [Prank]
                case 7:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it pulls a large calligraphy brush from thin air and leaps up into your face, then hops away and gallavants off into the woods.  Touching your face experimentally, you come away with a fresh coat of black ink on your fingertips.");
                    ContentView_1.CView.text("\n\n<b>The kitsune's familiar has drawn all over your face!</b>  The resilient marks take about an hour to completely scrub off in the nearby stream.  You could swear you heard some mirthful snickering among the trees while you were cleaning yourself off.");
                    // Advance time 1 hour, -20 LUST
                    character.stats.lust -= 20;
                    break;
                // [Aphrodisiac]
                case 8:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sweet-smelling pink dust into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel yourself growing hot and flushed, unable to keep your hands away from your groin.");
                    ContentView_1.CView.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a powerful aphrodisiac!  You are debilitatingly aroused and can think of nothing other than masturbating.</b>");
                    // +100 LUST
                    character.stats.raw.lust += 100;
                    break;
                // [Wither]
                case 9:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sour-smelling orange powder into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel the strength draining from your muscles, withering away before your eyes.");
                    ContentView_1.CView.text("\n\n<b>Oh no!  The kitsune's familiar has hit you with a strength draining spell!  Hopefully it's only temporary...</b>");
                    character.stats.str -= 5;
                    character.stats.tou -= 5;
                    break;
                // [Dud]
                case 10:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.");
                    ContentView_1.CView.text("\n\n<b>It seems the kitsune's gift was just a pile of useless junk!  What a ripoff!</b>");
                    break;
                // [Dud...  Or is it?]
                case 11:
                    ContentView_1.CView.text("As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.  Upon further investigation, though, you find a shard of shiny black chitinous plating mixed in with the other useless junk.");
                    ContentView_1.CView.text("\n\n<b>At least you managed to salvage a shard of black chitin from it...</b>  ");
                    character.inventory.items.createAdd(character, MaterialName_1.MaterialName.BlackChitin, PlayerInventoryMenu_1.inventoryMenu);
                    break;
                default: console.trace("Kitsune's gift roll foobar...");
            }
        }
    }
    exports.KitsuneGift = KitsuneGift;
});
//# sourceMappingURL=KitsuneGift.js.map