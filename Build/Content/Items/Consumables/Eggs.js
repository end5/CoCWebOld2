define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Skin", "Engine/Items/ItemDesc", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/HipDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/HairDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier", "Content/Modifiers/CockModifier", "Content/Modifiers/BreastModifier", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Skin_1, ItemDesc_1, ButtDescriptor_1, HipDescriptor_1, BallsDescriptor_1, VaginaDescriptor_1, CockDescriptor_1, BreastDescriptor_1, HairDescriptor_1, ContentView_1, BodyModifier_1, CockModifier_1, BreastModifier_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EggFlags = Flags_1.Flags.register("Eggs", {
        PC_KNOWS_ABOUT_BLACK_EGGS: 0,
    });
    function randLargeEgg() {
        return SMath_1.randomChoice(ConsumableName_1.ConsumableName.LargeEggBlack, ConsumableName_1.ConsumableName.LargeEggBlue, ConsumableName_1.ConsumableName.LargeEggBrown, ConsumableName_1.ConsumableName.LargeEggPink, ConsumableName_1.ConsumableName.LargeEggPurple, ConsumableName_1.ConsumableName.LargeEggWhite);
    }
    exports.randLargeEgg = randLargeEgg;
    function randEgg() {
        return SMath_1.randomChoice(ConsumableName_1.ConsumableName.EggBlack, ConsumableName_1.ConsumableName.EggBlue, ConsumableName_1.ConsumableName.EggBrown, ConsumableName_1.ConsumableName.EggPink, ConsumableName_1.ConsumableName.EggPurple, ConsumableName_1.ConsumableName.EggWhite);
    }
    exports.randEgg = randEgg;
    function randAnySizeEgg() {
        return SMath_1.randomChoice(ConsumableName_1.ConsumableName.LargeEggBlack, ConsumableName_1.ConsumableName.LargeEggBlue, ConsumableName_1.ConsumableName.LargeEggBrown, ConsumableName_1.ConsumableName.LargeEggPink, ConsumableName_1.ConsumableName.LargeEggPurple, ConsumableName_1.ConsumableName.LargeEggWhite, ConsumableName_1.ConsumableName.EggBlack, ConsumableName_1.ConsumableName.EggBlue, ConsumableName_1.ConsumableName.EggBrown, ConsumableName_1.ConsumableName.EggPink, ConsumableName_1.ConsumableName.EggPurple, ConsumableName_1.ConsumableName.EggWhite);
    }
    exports.randAnySizeEgg = randAnySizeEgg;
    var EggType;
    (function (EggType) {
        EggType[EggType["Black"] = 0] = "Black";
        EggType[EggType["Blue"] = 1] = "Blue";
        EggType[EggType["Brown"] = 2] = "Brown";
        EggType[EggType["Pink"] = 3] = "Pink";
        EggType[EggType["Purple"] = 4] = "Purple";
        EggType[EggType["White"] = 5] = "White";
    })(EggType = exports.EggType || (exports.EggType = {}));
    function randEggType() {
        return SMath_1.randomChoice(EggType.Black, EggType.Blue, EggType.Brown, EggType.Pink, EggType.Purple, EggType.White);
    }
    exports.randEggType = randEggType;
    class Eggs extends Consumable_1.Consumable {
        constructor(eggType, large) {
            if (large) {
                switch (eggType) {
                    case EggType.Black:
                        super(ConsumableName_1.ConsumableName.LargeEggBlack, new ItemDesc_1.ItemDesc("L.BlkEg", "a large rubbery black egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!"));
                        break;
                    case EggType.Blue:
                        super(ConsumableName_1.ConsumableName.LargeEggBlue, new ItemDesc_1.ItemDesc("L.BluEg", "a large blue and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                        break;
                    case EggType.Brown:
                        super(ConsumableName_1.ConsumableName.LargeEggBrown, new ItemDesc_1.ItemDesc("L.BrnEg", "a large brown and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                        break;
                    case EggType.Pink:
                        super(ConsumableName_1.ConsumableName.LargeEggPink, new ItemDesc_1.ItemDesc("L.PnkEg", "a large pink and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                        break;
                    case EggType.Purple:
                        super(ConsumableName_1.ConsumableName.LargeEggPurple, new ItemDesc_1.ItemDesc("L.PrpEg", "a large purple and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                        break;
                    default:
                    case EggType.White:
                        super(ConsumableName_1.ConsumableName.LargeEggWhite, new ItemDesc_1.ItemDesc("L.WhtEg", "a large white egg", "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food."));
                        break;
                }
            }
            else {
                switch (eggType) {
                    case EggType.Black:
                        super(ConsumableName_1.ConsumableName.EggBlack, new ItemDesc_1.ItemDesc("BlackEg", "a rubbery black egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                    case EggType.Blue:
                        super(ConsumableName_1.ConsumableName.EggBlue, new ItemDesc_1.ItemDesc("BlueEgg", "a blue and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                    case EggType.Brown:
                        super(ConsumableName_1.ConsumableName.EggBrown, new ItemDesc_1.ItemDesc("BrownEg", "a brown and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                    case EggType.Pink:
                        super(ConsumableName_1.ConsumableName.EggPink, new ItemDesc_1.ItemDesc("PinkEgg", "a pink and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                    case EggType.Purple:
                        super(ConsumableName_1.ConsumableName.EggPurple, new ItemDesc_1.ItemDesc("PurplEg", "a purple and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                    default:
                    case EggType.White:
                        super(ConsumableName_1.ConsumableName.EggWhite, new ItemDesc_1.ItemDesc("WhiteEg", "a milky-white egg", "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food."), Eggs.DefaultValue);
                        break;
                }
            }
            this.eggType = eggType;
            this.large = large;
        }
        use(character) {
            switch (this.eggType) {
                case EggType.Black:
                    this.blackRubberEgg(character);
                    break;
                case EggType.Blue:
                    this.blueEgg(character);
                    break;
                case EggType.Brown:
                    this.brownEgg(character);
                    break;
                case EggType.Pink:
                    this.pinkEgg(character);
                    break;
                case EggType.Purple:
                    this.purpleEgg(character);
                    break;
                default:
                case EggType.White:
                    this.whiteEgg(character);
                    break;
            }
        }
        // butt expansion
        brownEgg(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.\n\n");
            if (!this.large) {
                ContentView_1.CView.text("You feel a bit of additional weight on your backside as your " + ButtDescriptor_1.describeButt(character) + " gains a bit more padding.");
                character.body.butt.rating++;
            }
            else {
                ContentView_1.CView.text("Your " + ButtDescriptor_1.describeButt(character) + " wobbles, nearly throwing you off balance as it grows much bigger!");
                character.body.butt.rating += 2 + SMath_1.randInt(3);
            }
            if (SMath_1.randInt(3) === 0) {
                if (this.large)
                    ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 100, 8));
                else
                    ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 95, 3));
            }
        }
        // hip expansion
        purpleEgg(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.\n\n");
            if (!this.large || character.body.hips.rating > 20) {
                ContentView_1.CView.text("You stumble as you feel your " + HipDescriptor_1.describeHips(character) + " widen, altering your gait slightly.");
                character.body.hips.rating++;
            }
            else {
                ContentView_1.CView.text("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.");
                character.body.hips.rating += 2 + SMath_1.randInt(2);
            }
            if (SMath_1.randInt(3) === 0) {
                if (this.large)
                    ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 80, 8));
                else
                    ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 80, 3));
            }
        }
        // Femminess
        pinkEgg(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.\n\n");
            if (!this.large) {
                // Remove a dick
                if (character.body.cocks.length > 0) {
                    character.body.cocks.remove(0);
                    ContentView_1.CView.text("\n\n");
                }
                // remove balls
                if (character.body.balls.count > 0) {
                    if (character.body.balls.size > 15) {
                        character.body.balls.size -= 8;
                        ContentView_1.CView.text("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + BallsDescriptor_1.describeBalls(true, true, character) + " are much smaller.</b>\n\n");
                    }
                    else {
                        character.body.balls.count = 0;
                        character.body.balls.size = 1;
                        ContentView_1.CView.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                    }
                }
                // Fertility boost
                if (character.body.vaginas.length > 0 && character.body.fertility < 40) {
                    ContentView_1.CView.text("You feel a tingle deep inside your body, just above your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ", as if you were becoming more fertile.\n\n");
                    character.body.fertility += 5;
                }
            }
            // LARGE
            else {
                // Remove a dick
                if (character.body.cocks.length > 0) {
                    CockModifier_1.displayKillCocks(character, -1);
                    ContentView_1.CView.text("\n\n");
                }
                if (character.body.balls.count > 0) {
                    character.body.balls.count = 0;
                    character.body.balls.size = 1;
                    ContentView_1.CView.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                }
                // Fertility boost
                if (character.body.vaginas.length > 0 && character.body.fertility < 70) {
                    ContentView_1.CView.text("You feel a powerful tingle deep inside your body, just above your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ". Instinctively you know you have become more fertile.\n\n");
                    character.body.fertility += 10;
                }
            }
            if (SMath_1.randInt(3) === 0) {
                if (this.large)
                    ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 100, 8));
                else
                    ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 95, 3));
            }
        }
        // Maleness
        blueEgg(character) {
            let cockAmountLengthened = 0;
            let cockAmountThickened = 0;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.");
            if (!this.large) {
                // Kill pussies!
                if (character.body.vaginas.length > 0) {
                    ContentView_1.CView.text("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>");
                    character.body.vaginas.remove(0);
                    character.body.clit.length = .5;
                }
                // Dickz
                if (character.body.cocks.length > 0) {
                    // Multiz
                    if (character.body.cocks.length > 1) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocks(character) + " fill to full-size... and begin growing obscenely.");
                        for (const cock of character.body.cocks) {
                            cockAmountLengthened += CockModifier_1.growCock(character, cock, SMath_1.randInt(3) + 2);
                            cockAmountThickened += CockModifier_1.thickenCock(cock, 1);
                        }
                        cockAmountLengthened /= character.body.cocks.length;
                        cockAmountThickened /= character.body.cocks.length;
                        CockModifier_1.displayLengthChange(character, cockAmountLengthened, character.body.cocks.length);
                        // Display the degree of thickness change.
                        if (cockAmountThickened >= 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                            else
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                        }
                        if (cockAmountThickened <= .5) {
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                            else
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                        }
                        if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                        }
                        character.stats.lib += 1;
                        character.stats.sens += 1;
                        character.stats.lust += 20;
                    }
                    // SINGLEZ
                    if (character.body.cocks.length === 1) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " fills to its normal size... and begins growing... ");
                        cockAmountThickened = CockModifier_1.thickenCock(character.body.cocks.get(0), 1);
                        cockAmountLengthened = CockModifier_1.growCock(character, character.body.cocks.get(0), SMath_1.randInt(3) + 2);
                        CockModifier_1.displayLengthChange(character, cockAmountLengthened, 1);
                        // Display the degree of thickness change.
                        if (cockAmountThickened >= 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                            else
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                        }
                        if (cockAmountThickened <= .5) {
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                            else
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                        }
                        if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                        }
                        character.stats.lib += 1;
                        character.stats.sens += 1;
                        character.stats.lust += 20;
                    }
                }
            }
            // LARGE
            else {
                // New lines if changes
                if (character.body.chest.length > 1 || character.body.butt.rating > 5 || character.body.hips.rating > 5 || character.body.vaginas.length > 0)
                    ContentView_1.CView.text("\n\n");
                // Kill pussies!
                if (character.body.vaginas.length > 0) {
                    ContentView_1.CView.text("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n");
                    if (character.body.chest.length > 1 || character.body.butt.rating > 5 || character.body.hips.rating > 5)
                        ContentView_1.CView.text("  ");
                    character.body.vaginas.remove(0);
                    character.body.clit.length = .5;
                }
                // Kill extra boobages
                if (character.body.chest.length > 1) {
                    ContentView_1.CView.text("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(character.body.chest.length - 1)) + " have vanished.</b>");
                    if (character.body.butt.rating > 5 || character.body.hips.rating > 5)
                        ContentView_1.CView.text("  ");
                    // Remove lowest row.
                    character.body.chest.remove(character.body.chest.length - 1);
                }
                // Ass/hips shrinkage!
                if (character.body.butt.rating > 5) {
                    ContentView_1.CView.text("Muscles firm and tone as you feel your " + ButtDescriptor_1.describeButt(character) + " become smaller and tighter.");
                    if (character.body.hips.rating > 5)
                        ContentView_1.CView.text("  ");
                    character.body.butt.rating -= 2;
                }
                if (character.body.hips.rating > 5) {
                    ContentView_1.CView.text("Feeling the sudden burning of lactic acid in your " + HipDescriptor_1.describeHips(character) + ", you realize they have slimmed down and firmed up some.");
                    character.body.hips.rating -= 2;
                }
                // Shrink tits!
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 0) {
                    BreastModifier_1.shrinkTits(character);
                }
                if (character.body.cocks.length > 0) {
                    // Multiz
                    if (character.body.cocks.length > 1) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocks(character) + " fill to full-size... and begin growing obscenely.  ");
                        for (const cock of character.body.cocks) {
                            cockAmountLengthened += CockModifier_1.growCock(character, cock, SMath_1.randInt(3) + 5);
                            cockAmountThickened += CockModifier_1.thickenCock(cock, 1.5);
                        }
                        cockAmountLengthened /= character.body.cocks.length;
                        cockAmountThickened /= character.body.cocks.length;
                        CockModifier_1.displayLengthChange(character, cockAmountLengthened, character.body.cocks.length);
                        // Display the degree of thickness change.
                        if (cockAmountThickened >= 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                            else
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                        }
                        if (cockAmountThickened <= .5) {
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                            else
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                        }
                        if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                        }
                        character.stats.lib += 1;
                        character.stats.sens += 1;
                        character.stats.lust += 20;
                    }
                    // SINGLEZ
                    if (character.body.cocks.length === 1) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCocksLight(character) + " fills to its normal size... and begins growing...");
                        cockAmountThickened = CockModifier_1.thickenCock(character.body.cocks.get(0), 1.5);
                        cockAmountLengthened = CockModifier_1.growCock(character, character.body.cocks.get(0), SMath_1.randInt(3) + 5);
                        CockModifier_1.displayLengthChange(character, cockAmountLengthened, 1);
                        // Display the degree of thickness change.
                        if (cockAmountThickened >= 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                            else
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                        }
                        if (cockAmountThickened <= .5) {
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                            else
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                        }
                        if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                            if (character.body.cocks.length === 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                            if (character.body.cocks.length > 1)
                                ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                        }
                        character.stats.lib += 1;
                        character.stats.sens += 1;
                        character.stats.lust += 20;
                    }
                }
            }
            if (SMath_1.randInt(3) === 0) {
                if (this.large)
                    ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 0, 8));
                else
                    ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 5, 3));
            }
        }
        // Nipplezzzzz
        whiteEgg(character) {
            let gainedNippleCunts = false;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.");
            if (!this.large) {
                // Grow nipples
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 3 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 0) {
                    ContentView_1.CView.text("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.");
                    character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length += .2;
                    character.stats.lust += 15;
                }
            }
            // LARGE
            else {
                // Grow nipples
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 3 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 0) {
                    ContentView_1.CView.text("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.");
                    character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length += (SMath_1.randInt(2) + 3) / 10;
                    character.stats.lust += 15;
                }
                // NIPPLECUNTZZZ
                // Set nipplecunts on every row.
                for (const breastRow of character.body.chest) {
                    if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                        breastRow.nipples.fuckable = true;
                        // Keep track of changes.
                        gainedNippleCunts = true;
                    }
                }
                // Talk about if anything was changed.
                if (gainedNippleCunts)
                    ContentView_1.CView.text("\n\nYour " + BreastDescriptor_1.describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>");
            }
        }
        blackRubberEgg(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You devour the egg, momentarily sating your hunger.");
            // Small
            if (!this.large) {
                // Change skin to normal if not flawless!
                if ((character.body.skin.adj !== "smooth" && character.body.skin.adj !== "latex" && character.body.skin.adj !== "rubber") || character.body.skin.desc !== "skin") {
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " tingles delightfully as it ");
                    if (character.body.skin.type === Skin_1.SkinType.PLAIN)
                        ContentView_1.CView.text(" loses its blemishes, becoming flawless smooth skin.");
                    if (character.body.skin.type === Skin_1.SkinType.FUR)
                        ContentView_1.CView.text(" falls out in clumps, revealing smooth skin underneath.");
                    if (character.body.skin.type === Skin_1.SkinType.SCALES)
                        ContentView_1.CView.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                    if (character.body.skin.type > Skin_1.SkinType.SCALES)
                        ContentView_1.CView.text(" shifts and changes into flawless smooth skin.");
                    character.body.skin.desc = "skin";
                    character.body.skin.adj = "smooth";
                    if (character.body.skin.tone === "rough gray")
                        character.body.skin.tone = "gray";
                    character.body.skin.type = Skin_1.SkinType.PLAIN;
                }
                // chance of hair change
                else {
                    // If hair isn't rubbery/latex yet
                    if (character.body.hair.color.indexOf("rubbery") === -1 && character.body.hair.color.indexOf("latex-textured") && character.body.hair.length !== 0) {
                        // if skin is already one...
                        if (character.body.skin.desc === "skin" && character.body.skin.adj === "rubber") {
                            ContentView_1.CView.text("\n\nYour scalp tingles and your " + HairDescriptor_1.describeHair(character) + " thickens, the strands merging into ");
                            ContentView_1.CView.text(" thick rubbery hair.");
                            character.body.hair.color = "rubbery " + character.body.hair.color;
                            character.stats.cor += 2;
                        }
                        if (character.body.skin.desc === "skin" && character.body.skin.adj === "latex") {
                            ContentView_1.CView.text("\n\nYour scalp tingles and your " + HairDescriptor_1.describeHair(character) + " thickens, the strands merging into ");
                            ContentView_1.CView.text(" shiny latex hair.");
                            character.body.hair.color = "latex-textured " + character.body.hair.color;
                            character.stats.cor += 2;
                        }
                    }
                }
            }
            // Large
            else {
                // Change skin to latex if smooth.
                if (character.body.skin.desc === "skin" && character.body.skin.adj === "smooth") {
                    ContentView_1.CView.text("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ");
                    if (SMath_1.randInt(2) === 0) {
                        character.body.skin.desc = "skin";
                        character.body.skin.adj = "latex";
                        ContentView_1.CView.text("a layer of pure latex.  ");
                    }
                    else {
                        character.body.skin.desc = "skin";
                        character.body.skin.adj = "rubber";
                        ContentView_1.CView.text("a layer of sensitive rubber.  ");
                    }
                    exports.EggFlags.PC_KNOWS_ABOUT_BLACK_EGGS = 1;
                    if (character.stats.cor < 66)
                        ContentView_1.CView.text("You feel like some kind of freak.");
                    else
                        ContentView_1.CView.text("You feel like some kind of sexy " + character.body.skin.desc + " love-doll.");
                    character.stats.spe -= 3;
                    character.stats.sens += 8;
                    character.stats.lust += 10;
                    character.stats.cor += 2;
                }
                // Change skin to normal if not flawless!
                if ((character.body.skin.adj !== "smooth" && character.body.skin.adj !== "latex" && character.body.skin.adj !== "rubber") || character.body.skin.desc !== "skin") {
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " tingles delightfully as it ");
                    if (character.body.skin.type === Skin_1.SkinType.PLAIN)
                        ContentView_1.CView.text(" loses its blemishes, becoming flawless smooth skin.");
                    if (character.body.skin.type === Skin_1.SkinType.FUR)
                        ContentView_1.CView.text(" falls out in clumps, revealing smooth skin underneath.");
                    if (character.body.skin.type === Skin_1.SkinType.SCALES)
                        ContentView_1.CView.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                    if (character.body.skin.type > Skin_1.SkinType.SCALES)
                        ContentView_1.CView.text(" shifts and changes into flawless smooth skin.");
                    character.body.skin.desc = "skin";
                    character.body.skin.adj = "smooth";
                    if (character.body.skin.tone === "rough gray")
                        character.body.skin.tone = "gray";
                    character.body.skin.type = Skin_1.SkinType.PLAIN;
                }
                // chance of hair change
                else {
                    // If hair isn't rubbery/latex yet
                    if (character.body.hair.color.indexOf("rubbery") === -1 && character.body.hair.color.indexOf("latex-textured") && character.body.hair.length !== 0) {
                        // if skin is already one...
                        if (character.body.skin.adj === "rubber" && character.body.skin.desc === "skin") {
                            ContentView_1.CView.text("\n\nYour scalp tingles and your " + HairDescriptor_1.describeHair(character) + " thickens, the strands merging into ");
                            ContentView_1.CView.text(" thick rubbery hair.");
                            character.body.hair.color = "rubbery " + character.body.hair.color;
                            character.stats.cor += 2;
                        }
                        if (character.body.skin.adj === "latex" && character.body.skin.desc === "skin") {
                            ContentView_1.CView.text("\n\nYour scalp tingles and your " + HairDescriptor_1.describeHair(character) + " thickens, the strands merging into ");
                            ContentView_1.CView.text(" shiny latex hair.");
                            character.body.hair.color = "latex-textured " + character.body.hair.color;
                            character.stats.cor += 2;
                        }
                    }
                }
            }
        }
    }
    exports.Eggs = Eggs;
});
//# sourceMappingURL=Eggs.js.map