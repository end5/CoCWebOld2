define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Content/Descriptors/HairDescriptor", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, HairDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HairDyeType;
    (function (HairDyeType) {
        HairDyeType[HairDyeType["Auburn"] = 0] = "Auburn";
        HairDyeType[HairDyeType["Black"] = 1] = "Black";
        HairDyeType[HairDyeType["Blonde"] = 2] = "Blonde";
        HairDyeType[HairDyeType["DarkBlue"] = 3] = "DarkBlue";
        HairDyeType[HairDyeType["Brown"] = 4] = "Brown";
        HairDyeType[HairDyeType["Gray"] = 5] = "Gray";
        HairDyeType[HairDyeType["Green"] = 6] = "Green";
        HairDyeType[HairDyeType["BrightOrange"] = 7] = "BrightOrange";
        HairDyeType[HairDyeType["NeonPink"] = 8] = "NeonPink";
        HairDyeType[HairDyeType["Purple"] = 9] = "Purple";
        HairDyeType[HairDyeType["Red"] = 10] = "Red";
        HairDyeType[HairDyeType["White"] = 11] = "White";
    })(HairDyeType = exports.HairDyeType || (exports.HairDyeType = {}));
    class HairDye extends Consumable_1.Consumable {
        constructor(type) {
            switch (type) {
                case HairDyeType.Auburn:
                    super(ConsumableName_1.ConsumableName.HairDyeAuburn, new ItemDesc_1.ItemDesc("AuburnD", "a vial of auburn hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Black:
                    super(ConsumableName_1.ConsumableName.HairDyeBlack, new ItemDesc_1.ItemDesc("Black D", "a vial of black hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Blonde:
                    super(ConsumableName_1.ConsumableName.HairDyeBlonde, new ItemDesc_1.ItemDesc("Blond D", "a vial of blonde hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.DarkBlue:
                    super(ConsumableName_1.ConsumableName.HairDyeDarkBlue, new ItemDesc_1.ItemDesc("BlueDye", "a vial of blue hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Brown:
                    super(ConsumableName_1.ConsumableName.HairDyeBrown, new ItemDesc_1.ItemDesc("Brown D", "a vial of brown hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Gray:
                    super(ConsumableName_1.ConsumableName.HairDyeGray, new ItemDesc_1.ItemDesc("GrayDye", "a vial of gray hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Green:
                    super(ConsumableName_1.ConsumableName.HairDyeGreen, new ItemDesc_1.ItemDesc("Green D", "a vial of green hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.BrightOrange:
                    super(ConsumableName_1.ConsumableName.HairDyeBrightOrange, new ItemDesc_1.ItemDesc("OrangDy", "a vial of brilliant orange hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.NeonPink:
                    super(ConsumableName_1.ConsumableName.HairDyeNeonPink, new ItemDesc_1.ItemDesc("PinkDye", "a vial of bright pink hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Purple:
                    super(ConsumableName_1.ConsumableName.HairDyePurple, new ItemDesc_1.ItemDesc("PurpDye", "a vial of purple hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                case HairDyeType.Red:
                    super(ConsumableName_1.ConsumableName.HairDyeRed, new ItemDesc_1.ItemDesc("Red Dye", "a vial of red hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
                default:
                case HairDyeType.White:
                    super(ConsumableName_1.ConsumableName.HairDyeWhite, new ItemDesc_1.ItemDesc("WhiteDy", "a vial of white hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                    break;
            }
        }
        getColor() {
            switch (this.name) {
                case ConsumableName_1.ConsumableName.HairDyeAuburn:
                    return "auburn";
                case ConsumableName_1.ConsumableName.HairDyeBlack:
                    return "black";
                case ConsumableName_1.ConsumableName.HairDyeBlonde:
                    return "blonde";
                case ConsumableName_1.ConsumableName.HairDyeDarkBlue:
                    return "dark blue";
                case ConsumableName_1.ConsumableName.HairDyeBrown:
                    return "brown";
                case ConsumableName_1.ConsumableName.HairDyeGray:
                    return "gray";
                case ConsumableName_1.ConsumableName.HairDyeGreen:
                    return "green";
                case ConsumableName_1.ConsumableName.HairDyeBrightOrange:
                    return "bright orange";
                case ConsumableName_1.ConsumableName.HairDyeNeonPink:
                    return "neon pink";
                case ConsumableName_1.ConsumableName.HairDyePurple:
                    return "purple";
                case ConsumableName_1.ConsumableName.HairDyeRed:
                    return "red";
                default:
                case ConsumableName_1.ConsumableName.HairDyeWhite:
                    return "white";
            }
        }
        use(character) {
            ContentView_1.CView.clear();
            if (character.body.hair.color.indexOf("rubbery") !== -1 || character.body.hair.color.indexOf("latex-textured") !== -1) {
                ContentView_1.CView.text("You massage the dye into your " + HairDescriptor_1.describeHair(character) + " but the dye cannot penetrate the impermeable material your hair is composed of.");
                return;
            }
            if (character.body.hair.length === 0) {
                ContentView_1.CView.text("You rub the dye into your bald head, but it has no effect.");
                return;
            }
            ContentView_1.CView.text("You rub the dye into your " + HairDescriptor_1.describeHair(character) + ", then use a bucket of cool lakewater to rinse clean a few minutes later.  ");
            character.body.hair.color = this.getColor();
            ContentView_1.CView.text("You now have " + HairDescriptor_1.describeHair(character) + ".");
            if (character.stats.lust > 50) {
                ContentView_1.CView.text("\n\nThe cool water calms your urges somewhat, letting you think more clearly.");
                character.stats.lust += -15;
            }
        }
    }
    exports.HairDye = HairDye;
});
//# sourceMappingURL=HairDye.js.map