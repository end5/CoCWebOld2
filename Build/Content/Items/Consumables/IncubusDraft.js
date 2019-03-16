define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Cock", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Engine/Body/Tail", "Engine/Body/Horns", "Content/Descriptors/BreastDescriptor", "Engine/Body/Face", "Engine/Body/Skin", "Engine/Body/Tongue", "Engine/Body/Legs", "Content/Descriptors/LegDescriptor", "Engine/Body/Wings", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier", "Content/Modifiers/CockModifier", "Content/Modifiers/BreastModifier", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Cock_1, EffectType_1, NumToText_1, ItemDesc_1, CockDescriptor_1, Tail_1, Horns_1, BreastDescriptor_1, Face_1, Skin_1, Tongue_1, Legs_1, LegDescriptor_1, Wings_1, ContentView_1, BodyModifier_1, CockModifier_1, BreastModifier_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IncubusDraft extends Consumable_1.Consumable {
        constructor(tainted) {
            if (tainted)
                super(ConsumableName_1.ConsumableName.IncubusDraft, new ItemDesc_1.ItemDesc("IncubiD", "an Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass."));
            else
                super(ConsumableName_1.ConsumableName.IncubusDraftPure, new ItemDesc_1.ItemDesc("P.Draft", "an untainted Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use."), 20);
            this.tainted = tainted;
        }
        use(character) {
            let changeAmount = SMath_1.randInt(100);
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeAmount += 10;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("The draft is slick and sticky, ");
            if (character.stats.cor <= 33)
                ContentView_1.CView.text("just swallowing it makes you feel unclean.");
            if (character.stats.cor > 33 && character.stats.cor <= 66)
                ContentView_1.CView.text("reminding you of something you just can't place.");
            if (character.stats.cor > 66)
                ContentView_1.CView.text("deliciously sinful in all the right ways.");
            if (character.stats.cor >= 90)
                ContentView_1.CView.text("  You're sure it must be distilled from the cum of an incubus.");
            // Lowlevel changes..
            if (changeAmount < 50)
                this.lowLevelChanges(character);
            // Mid-level changes
            if (changeAmount >= 50 && changeAmount < 93)
                this.midLevelChanges(character);
            // High level change
            if (changeAmount >= 93)
                this.highLevelChanges(character);
            // Demonic changes - higher chance with higher corruption.
            if (SMath_1.randInt(40) + character.stats.cor / 3 > 35 && this.tainted)
                demonChanges(character);
            if (SMath_1.randInt(4) === 0 && this.tainted)
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 5, 2));
            if (SMath_1.randInt(4) === 0 && this.tainted)
                ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 30, 2));
        }
        lowLevelChanges(character) {
            const cockCount = character.body.cocks.length;
            let selectedCock;
            let cockGrowth;
            if (cockCount === 1) {
                cockGrowth = 0;
                selectedCock = character.body.cocks.get(0);
                if (selectedCock.type !== Cock_1.CockType.DEMON)
                    ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.");
                else
                    ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.");
                if (SMath_1.randInt(4) === 0)
                    cockGrowth = CockModifier_1.growCock(character, selectedCock, 3);
                else
                    cockGrowth = CockModifier_1.growCock(character, selectedCock, 3);
                character.stats.int += 1;
                character.stats.lib += 2;
                character.stats.sens += 1;
                character.stats.lust += 5 + cockGrowth * 3;
                character.stats.cor += this.tainted ? 1 : 0;
                if (cockGrowth < .5)
                    ContentView_1.CView.text("  It stops almost as soon as it starts, growing only a tiny bit longer.");
                if (cockGrowth >= .5 && cockGrowth < 1)
                    ContentView_1.CView.text("  It grows slowly, stopping after roughly half an inch of growth.");
                if (cockGrowth >= 1 && cockGrowth <= 2)
                    ContentView_1.CView.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
                if (cockGrowth > 2)
                    ContentView_1.CView.text("  You smile and idly stroke your lengthening " + CockDescriptor_1.describeCock(character, selectedCock) + " as a few more inches sprout.");
                if (selectedCock.type !== Cock_1.CockType.DEMON)
                    ContentView_1.CView.text("  With the transformation complete, your " + CockDescriptor_1.describeCock(character, selectedCock) + " returns to its normal coloration.");
                else
                    ContentView_1.CView.text("  With the transformation complete, your " + CockDescriptor_1.describeCock(character, selectedCock) + " throbs in an almost happy way as it goes flaccid once more.");
            }
            if (cockCount > 1) {
                selectedCock = character.body.cocks.sort(Cock_1.Cock.Shortest).get(0);
                cockGrowth = 0;
                if (SMath_1.randInt(4) === 0)
                    cockGrowth = CockModifier_1.growCock(character, selectedCock, 3);
                else
                    cockGrowth = CockModifier_1.growCock(character, selectedCock, 1);
                character.stats.int += 1;
                character.stats.lib += 2;
                character.stats.sens += 1;
                character.stats.lust += 5 + cockGrowth * 3;
                character.stats.cor += this.tainted ? 1 : 0;
                if (character.body.cocks.length === 2)
                    ContentView_1.CView.text("\n\nBoth of your " + CockDescriptor_1.describeCocksLight(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to grow.");
                else
                    ContentView_1.CView.text("\n\nAll of your " + CockDescriptor_1.describeCocksLight(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to grow.");
                if (cockGrowth < .5)
                    ContentView_1.CView.text("  It stops almost as soon as it starts, growing only a tiny bit longer.");
                if (cockGrowth >= .5 && cockGrowth < 1)
                    ContentView_1.CView.text("  It grows slowly, stopping after roughly half an inch of growth.");
                if (cockGrowth >= 1 && cockGrowth <= 2)
                    ContentView_1.CView.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
                if (cockGrowth > 2)
                    ContentView_1.CView.text("  You smile and idly stroke your lengthening " + CockDescriptor_1.describeCock(character, selectedCock) + " as a few more inches sprout.");
                ContentView_1.CView.text("  With the transformation complete, your " + CockDescriptor_1.describeCocksLight(character) + " return to their normal coloration.");
            }
            // NO CAWKS?
            if (cockCount === 0) {
                selectedCock = new Cock_1.Cock();
                selectedCock.length = SMath_1.randInt(3) + 4;
                selectedCock.thickness = 1;
                character.body.cocks.add(selectedCock);
                ContentView_1.CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
                ContentView_1.CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor_1.describeCock(character, selectedCock) + " fades to a more normal " + character.body.skin.tone + " tone.");
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 1 : 0;
            }
            // TIT CHANGE 25% chance of shrinkage
            if (SMath_1.randInt(4) === 0) {
                if (!Settings_1.Settings.hyperHappy) {
                    BreastModifier_1.shrinkTits(character);
                }
            }
        }
        midLevelChanges(character) {
            const cockCount = character.body.cocks.length;
            let selectedCock;
            let cockGrowth = 0;
            let thickness = 0;
            if (cockCount > 1) {
                ContentView_1.CView.text("\n\nYour cocks fill to full-size... and begin growing obscenely.  ");
                for (const cock of character.body.cocks) {
                    cockGrowth = CockModifier_1.growCock(character, cock, SMath_1.randInt(3) + 2);
                    thickness = CockModifier_1.thickenCock(cock, 1);
                    if (thickness < .1)
                        cock.thickness += .05;
                }
                CockModifier_1.displayLengthChange(character, cockGrowth, cockCount);
                // Display the degree of thickness change.
                if (thickness >= 1) {
                    if (cockCount === 1)
                        ContentView_1.CView.text("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                    else
                        ContentView_1.CView.text("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                }
                if (thickness <= .5) {
                    if (cockCount > 1)
                        ContentView_1.CView.text("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                    else
                        ContentView_1.CView.text("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                }
                if (thickness > .5 && cockGrowth < 1) {
                    if (cockCount === 1)
                        ContentView_1.CView.text("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                    if (cockCount > 1)
                        ContentView_1.CView.text("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                }
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 3 : 0;
            }
            if (cockCount === 1) {
                ContentView_1.CView.text("\n\nYour cock fills to its normal size and begins growing... ");
                selectedCock = character.body.cocks.get(0);
                thickness = CockModifier_1.thickenCock(selectedCock, 1);
                cockGrowth = CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(3) + 2);
                CockModifier_1.displayLengthChange(character, cockGrowth, cockCount);
                // Display the degree of thickness change.
                if (thickness >= 1) {
                    if (character.body.cocks.length === 1)
                        ContentView_1.CView.text("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                    else
                        ContentView_1.CView.text("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                }
                if (thickness <= .5) {
                    if (character.body.cocks.length > 1)
                        ContentView_1.CView.text("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                    else
                        ContentView_1.CView.text("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                }
                if (thickness > .5 && cockGrowth < 1) {
                    if (character.body.cocks.length === 1)
                        ContentView_1.CView.text("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                    if (character.body.cocks.length > 1)
                        ContentView_1.CView.text("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                }
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 3 : 0;
            }
            if (cockCount === 0) {
                selectedCock = new Cock_1.Cock();
                selectedCock.length = SMath_1.randInt(3) + 4;
                selectedCock.thickness = 1;
                character.body.cocks.add(selectedCock);
                ContentView_1.CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
                ContentView_1.CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + CockDescriptor_1.describeCock(character, selectedCock) + " fades to a more normal " + character.body.skin.tone + " tone.");
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 3 : 0;
            }
            // Shrink breasts a more
            // TIT CHANGE 50% chance of shrinkage
            if (SMath_1.randInt(2) === 0) {
                if (!Settings_1.Settings.hyperHappy) {
                    BreastModifier_1.shrinkTits(character);
                }
            }
        }
        highLevelChanges(character) {
            if (character.body.cocks.length < 10) {
                if (SMath_1.randInt(10) < Math.floor(character.stats.cor / 25)) {
                    ContentView_1.CView.text("\n\n");
                    this.growDemonCock(character, SMath_1.randInt(2) + 2);
                    character.stats.lib += 3;
                    character.stats.sens += 5;
                    character.stats.lust += 10;
                    character.stats.cor += this.tainted ? 5 : 0;
                }
                else {
                    this.growDemonCock(character, 1);
                }
            }
            if (!Settings_1.Settings.hyperHappy) {
                BreastModifier_1.shrinkTits(character);
                BreastModifier_1.shrinkTits(character);
            }
        }
        growDemonCock(character, growCocks) {
            let numOfCockGrown = 0;
            while (growCocks > 0) {
                character.body.cocks.add(new Cock_1.Cock(SMath_1.randInt(3) + 4, 0.75));
                growCocks--;
                numOfCockGrown++;
            }
            ContentView_1.CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
            if (numOfCockGrown === 1)
                ContentView_1.CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ");
            else
                ContentView_1.CView.text("The skin bulges obscenely, darkening and splitting around " + NumToText_1.numToCardinalText(numOfCockGrown) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ");
            if (numOfCockGrown > 4)
                ContentView_1.CView.text("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.");
            character.orgasm();
        }
    }
    exports.IncubusDraft = IncubusDraft;
    function demonChanges(character) {
        // Change tail if already horned.
        if (!character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.DEMONIC), false) && character.body.horns.count > 0) {
            if (character.body.tails.length === 0) {
                ContentView_1.CView.text("\n\n");
                if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.SPIDER_ABDOMEN), false) || character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.BEE_ABDOMEN), false))
                    ContentView_1.CView.text("You feel a tingling in your insectile abdomen as it stretches, narrowing, the exoskeleton flaking off as it transforms into a flexible demon-tail, complete with a round spaded tip.  ");
                else
                    ContentView_1.CView.text("You feel a tingling in your tail.  You are amazed to discover it has shifted into a flexible demon-tail, complete with a round spaded tip.  ");
                ContentView_1.CView.text("<b>Your tail is now demonic in appearance.</b>");
            }
            else
                ContentView_1.CView.text("\n\nA pain builds in your backside... growing more and more pronounced.  The pressure suddenly disappears with a loud ripping and tearing noise.  <b>You realize you now have a demon tail</b>... complete with a cute little spade.");
            character.stats.cor += 4;
            const newTail = new Tail_1.Tail();
            newTail.type = Tail_1.TailType.DEMONIC;
            character.body.tails.add(newTail);
        }
        // grow horns!
        if (character.body.horns.count === 0 || (SMath_1.randInt(character.body.horns.count + 3) === 0)) {
            if (character.body.horns.count < 12 && (character.body.horns.type === Horns_1.HornType.NONE || character.body.horns.type === Horns_1.HornType.DEMON)) {
                ContentView_1.CView.text("\n\n");
                if (character.body.horns.count === 0) {
                    ContentView_1.CView.text("A small pair of demon horns.amount erupts from your forehead.  They actually look kind of cute.  <b>You have horns!</b>");
                }
                else
                    ContentView_1.CView.text("Another pair of demon horns, larger than the last, forms behind the first row.");
                if (character.body.horns.type === Horns_1.HornType.NONE)
                    character.body.horns.type = Horns_1.HornType.DEMON;
                character.body.horns.count++;
                character.body.horns.count++;
                character.stats.cor += 3;
            }
            // Text for shifting horns
            else if (character.body.horns.type > Horns_1.HornType.DEMON) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("Your horns.amount shift, shrinking into two small demonic-looking horns.");
                character.body.horns.count = 2;
                character.body.horns.type = Horns_1.HornType.DEMON;
                character.stats.cor += 3;
            }
        }
        // Nipples Turn Back:
        if (character.effects.has(EffectType_1.EffectType.BlackNipples) && SMath_1.randInt(3) === 0) {
            ContentView_1.CView.text("\n\nSomething invisible brushes against your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            character.effects.removeByName(EffectType_1.EffectType.BlackNipples);
        }
        // remove fur
        if ((character.body.face.type !== Face_1.FaceType.HUMAN || character.body.skin.type !== Skin_1.SkinType.PLAIN) && SMath_1.randInt(3) === 0) {
            // Remove face before fur!
            if (character.body.face.type !== Face_1.FaceType.HUMAN) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("Your visage twists painfully, returning to a more normal human shape, albeit with flawless skin.  <b>Your face is human again!</b>");
                character.body.face.type = Face_1.FaceType.HUMAN;
            }
            // De-fur
            else if (character.body.skin.type !== Skin_1.SkinType.PLAIN) {
                ContentView_1.CView.text("\n\n");
                if (character.body.skin.type === Skin_1.SkinType.FUR)
                    ContentView_1.CView.text("Your skin suddenly feels itchy as your fur begins falling out in clumps, <b>revealing inhumanly smooth skin</b> underneath.");
                if (character.body.skin.type === Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text("Your scales begin to itch as they begin falling out in droves, <b>revealing your inhumanly smooth " + character.body.skin.tone + " skin</b> underneath.");
                character.body.skin.type = Skin_1.SkinType.PLAIN;
                character.body.skin.desc = "skin";
            }
        }
        // Demon tongue
        if (character.body.tongue.type === Tongue_1.TongueType.SNAKE && SMath_1.randInt(3) === 0) {
            ContentView_1.CView.text("\n\nYour snake-like tongue tingles, thickening in your mouth until it feels more like your old human tongue, at least for the first few inches.  It bunches up inside you, and when you open up your mouth to release it, roughly two feet of tongue dangles out.  You find it easy to move and control, as natural as walking.  <b>You now have a long demon-tongue.</b>");
            character.body.tongue.type = Tongue_1.TongueType.DEMONIC;
        }
        // foot changes - requires furless
        if (character.body.skin.type === Skin_1.SkinType.PLAIN && SMath_1.randInt(4) === 0) {
            // Males/genderless get clawed feet
            if (character.gender <= 1) {
                if (character.body.legs.type !== Legs_1.LegType.DEMONIC_CLAWS) {
                    ContentView_1.CView.text("\n\n");
                    ContentView_1.CView.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LegDescriptor_1.describeFeet(character) + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>");
                    character.body.legs.type = Legs_1.LegType.DEMONIC_CLAWS;
                }
            }
            // Females/futa get high heels
            else if (character.body.legs.type !== Legs_1.LegType.DEMONIC_HIGH_HEELS) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + LegDescriptor_1.describeFeet(character) + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.");
                character.body.legs.type = Legs_1.LegType.DEMONIC_HIGH_HEELS;
            }
        }
        // Grow demon wings
        if (character.body.wings.type !== Wings_1.WingType.BAT_LIKE_LARGE && SMath_1.randInt(8) === 0 && character.stats.cor >= 50) {
            // grow smalls to large
            if (character.body.wings.type === Wings_1.WingType.BAT_LIKE_TINY && character.stats.cor >= 75) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("Your small demonic wings stretch and grow, tingling with the pleasure of being attached to such a tainted body.  You stretch over your shoulder to stroke them as they unfurl, turning into full-sized demon-wings.  <b>Your demonic wings have grown!</b>");
                character.body.wings.type = Wings_1.WingType.BAT_LIKE_LARGE;
                character.body.wings.desc = "large, bat-like";
            }
            else if (character.body.wings.type === Wings_1.WingType.SHARK_FIN) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("The muscles around your shoulders bunch up uncomfortably, changing to support the new bat-like wings growing from your back.  You twist your head as far as you can for a look and realize your fin has changed into ");
                ContentView_1.CView.text("small ");
                character.body.wings.type = Wings_1.WingType.BAT_LIKE_TINY;
                character.body.wings.desc = "tiny, bat-like";
                ContentView_1.CView.text("bat-like demon-wings!");
            }
            else if (character.body.wings.type === Wings_1.WingType.BEE_LIKE_SMALL || character.body.wings.type === Wings_1.WingType.BEE_LIKE_LARGE) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("The muscles around your shoulders bunch up uncomfortably, changing to support your wings as you feel their weight increasing.  You twist your head as far as you can for a look and realize they've changed into ");
                if (character.body.wings.type === Wings_1.WingType.BEE_LIKE_SMALL) {
                    ContentView_1.CView.text("small ");
                    character.body.wings.type = Wings_1.WingType.BAT_LIKE_TINY;
                    character.body.wings.desc = "tiny, bat-like";
                }
                else {
                    ContentView_1.CView.text("large ");
                    character.body.wings.type = Wings_1.WingType.BAT_LIKE_LARGE;
                    character.body.wings.desc = "large, bat-like";
                }
                ContentView_1.CView.text("<b>bat-like demon-wings!</b>");
            }
            // No wings
            else if (character.body.wings.type === Wings_1.WingType.NONE) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + character.inventory.armor.displayName + ".  <b>You now have tiny demonic wings</b>.");
                character.body.wings.type = Wings_1.WingType.BAT_LIKE_TINY;
                character.body.wings.desc = "tiny, bat-like";
            }
        }
    }
    exports.demonChanges = demonChanges;
});
//# sourceMappingURL=IncubusDraft.js.map