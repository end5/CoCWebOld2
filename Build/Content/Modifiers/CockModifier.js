define(["require", "exports", "Engine/Body/BreastRow", "Engine/Body/Cock", "Content/Effects/EffectType", "Content/Items/CockSockName", "Content/Utilities/NumToText", "Content/Descriptors/CockDescriptor", "Content/Descriptors/BallsDescriptor", "Engine/Display/ContentView", "Content/Settings"], function (require, exports, BreastRow_1, Cock_1, EffectType_1, CockSockName_1, NumToText_1, CockDescriptor_1, BallsDescriptor_1, ContentView_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function growEachCock(character, lengthDelta) {
        let totalGrowth = 0;
        for (const cock of character.body.cocks) {
            totalGrowth += growCock(character, cock, lengthDelta);
        }
        return totalGrowth;
    }
    exports.growEachCock = growEachCock;
    /**
     * Increases size of cock. Returns growth length.
     * @param cock
     * @param lengthDelta
     * @param bigCock
     */
    function growCock(character, cock, lengthDelta) {
        let bigCock = false;
        if (character.effects.has(EffectType_1.EffectType.BigCock))
            bigCock = true;
        if (lengthDelta === 0) {
            return lengthDelta;
        }
        let threshhold = 0;
        const cockIndex = character.body.cocks.indexOf(cock);
        if (cockIndex !== -1)
            return 0;
        const cockSockSlot = character.inventory.cockSocks.get(cockIndex);
        if (lengthDelta > 0) { // growing
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (cock.type !== Cock_1.CockType.HUMAN)
                threshhold *= 2;
            // Modify growth for cock socks
            if (cockSockSlot && cockSockSlot.item && cockSockSlot.item.name === CockSockName_1.CockSockName.Scarlet) {
                lengthDelta *= 1.5;
            }
            else if (cockSockSlot && cockSockSlot.item && cockSockSlot.item.name === CockSockName_1.CockSockName.Cobalt) {
                lengthDelta *= .5;
            }
            // Do diminishing returns
            if (cock.length > threshhold)
                lengthDelta /= 4;
            else if (cock.length > threshhold / 2)
                lengthDelta /= 2;
        }
        else {
            threshhold = 0;
            // BigCock Perk doubles the incoming change value and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                lengthDelta *= 0.5;
                threshhold += 12;
            }
            // Not a human cock? Add 12 to the length before dimishing returns set in
            if (cock.type !== Cock_1.CockType.HUMAN)
                threshhold += 12;
            // Modify growth for cock socks
            if (cockSockSlot && cockSockSlot.item && cockSockSlot.item.name === CockSockName_1.CockSockName.Scarlet) {
                lengthDelta *= 0.5;
            }
            else if (cockSockSlot && cockSockSlot.item && cockSockSlot.item.name === CockSockName_1.CockSockName.Cobalt) {
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (cock.length > threshhold)
                lengthDelta /= 3;
            else if (cock.length > threshhold / 2)
                lengthDelta /= 2;
        }
        cock.length += lengthDelta;
        if (cock.length < 1)
            cock.length = 1;
        if (cock.thickness > cock.length * .33)
            cock.thickness = cock.length * .33;
        return lengthDelta;
    }
    exports.growCock = growCock;
    function thickenCock(cock, increase) {
        let amountGrown = 0;
        let thickened = 0;
        if (increase > 0) {
            while (increase > 0) {
                if (increase < 1)
                    thickened = increase;
                else
                    thickened = 1;
                // Cut thickness growth for huge dicked
                if (cock.thickness > 1 && cock.length < 12) {
                    thickened /= 4;
                }
                if (cock.thickness > 1.5 && cock.length < 18)
                    thickened /= 5;
                if (cock.thickness > 2 && cock.length < 24)
                    thickened /= 5;
                if (cock.thickness > 3 && cock.length < 30)
                    thickened /= 5;
                // proportional thickness diminishing returns.
                if (cock.thickness > cock.length * .15)
                    thickened /= 3;
                if (cock.thickness > cock.length * .20)
                    thickened /= 3;
                if (cock.thickness > cock.length * .30)
                    thickened /= 5;
                // massive thickness limiters
                if (cock.thickness > 4)
                    thickened /= 2;
                if (cock.thickness > 5)
                    thickened /= 2;
                if (cock.thickness > 6)
                    thickened /= 2;
                if (cock.thickness > 7)
                    thickened /= 2;
                // Start adding up bonus length
                amountGrown += thickened;
                cock.thickness += thickened;
                thickened = 0;
                increase--;
            }
            increase = 0;
        }
        else if (increase < 0) {
            while (increase < 0) {
                thickened = -1;
                // Cut length growth for huge dicked
                if (cock.thickness <= 1)
                    thickened /= 2;
                if (cock.thickness < 2 && cock.length < 10)
                    thickened /= 2;
                // Cut again for massively dicked
                if (cock.thickness < 3 && cock.length < 18)
                    thickened /= 2;
                if (cock.thickness < 4 && cock.length < 24)
                    thickened /= 2;
                // MINIMUM Thickness of OF .5!
                if (cock.thickness <= .5)
                    thickened = 0;
                // Start adding up bonus length
                amountGrown += thickened;
                cock.thickness += thickened;
                thickened = 0;
                increase++;
            }
        }
        return amountGrown;
    }
    exports.thickenCock = thickenCock;
    function displayKillCocks(character, numOfCocksToRemove) {
        const cocks = character.body.cocks;
        // Count removal for text bits
        let removed = 0;
        // Less than 0 = PURGE ALL
        if (numOfCocksToRemove < 0) {
            numOfCocksToRemove = cocks.length;
        }
        const smallestCocks = cocks.sort(Cock_1.Cock.Smallest);
        while (numOfCocksToRemove > 0 && cocks.length > 0) {
            // Find shortest cock and prune it
            cocks.remove(cocks.indexOf(smallestCocks.get(removed)));
            removed++;
            numOfCocksToRemove--;
        }
        if (cocks.length === 0 && character.body.balls.count > 0) {
            character.body.balls.count = 0;
            character.body.balls.size = 1;
        }
        // Texts
        if (removed === 1) {
            if (cocks.length === 0) {
                ContentView_1.CView.text("<b>Your manhood shrinks into your body, disappearing completely.</b>");
                if (character.effects.has(EffectType_1.EffectType.Infested))
                    ContentView_1.CView.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.");
            }
            if (cocks.length === 1) {
                ContentView_1.CView.text("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + CockDescriptor_1.describeCock(character, character.body.cocks.get(0)) + ".</b>");
            }
            if (cocks.length > 1) {
                ContentView_1.CView.text("<b>Your smallest penis disappears forever, leaving you with just your " + CockDescriptor_1.describeCocksLight(character) + ".</b>");
            }
        }
        if (removed > 1) {
            if (cocks.length === 0) {
                ContentView_1.CView.text("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>");
                if (character.effects.has(EffectType_1.EffectType.Infested))
                    ContentView_1.CView.text("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.");
            }
            if (cocks.length === 1) {
                ContentView_1.CView.text("<b>You feel " + NumToText_1.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with just your " + CockDescriptor_1.describeCock(character, character.body.cocks.get(0)) + ".");
            }
            if (cocks.length > 1) {
                ContentView_1.CView.text("<b>You feel " + NumToText_1.numToCardinalText(removed) + " cocks disappear into your groin, leaving you with " + CockDescriptor_1.describeCocksLight(character) + ".");
            }
        }
        // remove infestation if cockless
        if (cocks.length === 0 && character.effects.has(EffectType_1.EffectType.Infested))
            character.effects.removeByName(EffectType_1.EffectType.Infested);
        if (cocks.length === 0 && character.body.balls.count > 0) {
            ContentView_1.CView.text("  <b>Your " + BallsDescriptor_1.describeSack(character) + " and " + BallsDescriptor_1.describeBallsShort(character) + " shrink and disappear, vanishing into your groin.</b>");
            character.body.balls.count = 0;
            character.body.balls.size = 1;
        }
        return removed;
    }
    exports.displayKillCocks = displayKillCocks;
    function displayLengthChange(character, lengthChange, ncocks) {
        if (lengthChange < 0 && Settings_1.Settings.hyperHappy) { // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
            return;
        }
        const cocks = character.body.cocks;
        const firstCock = cocks.get(0);
        if (!firstCock)
            return;
        // DIsplay the degree of length change.
        if (lengthChange <= 1 && lengthChange > 0) {
            if (cocks.length === 1)
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, firstCock) + " has grown slightly longer.");
            if (cocks.length > 1) {
                if (ncocks === 1)
                    ContentView_1.CView.text("One of your " + CockDescriptor_1.describeCocksLight(character) + " grows slightly longer.");
                if (ncocks > 1 && ncocks < cocks.length)
                    ContentView_1.CView.text("Some of your " + CockDescriptor_1.describeCocksLight(character) + " grow slightly longer.");
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " seem to fill up... growing a little bit larger.");
            }
        }
        if (lengthChange > 1 && lengthChange < 3) {
            if (cocks.length === 1)
                ContentView_1.CView.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor_1.describeCock(character, firstCock) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.");
            if (cocks.length > 1) {
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("A very pleasurable feeling spreads from your groin as your " + CockDescriptor_1.describeCocksLight(character) + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.");
                if (ncocks === 1)
                    ContentView_1.CView.text("A very pleasurable feeling spreads from your groin as one of your " + CockDescriptor_1.describeCocksLight(character) + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.");
                if (ncocks > 1 && ncocks < cocks.length)
                    ContentView_1.CView.text("A very pleasurable feeling spreads from your groin as " + NumToText_1.numToCardinalText(ncocks) + " of your " + CockDescriptor_1.describeCocksLight(character) + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.");
            }
        }
        if (lengthChange >= 3) {
            if (cocks.length === 1)
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, firstCock) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.");
            if (cocks.length > 1) {
                if (ncocks === 1)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " feel incredibly tight as one of their number begins to grow inch after inch of length.");
                if (ncocks > 1 && ncocks < cocks.length)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " feel incredibly number as " + NumToText_1.numToCardinalText(ncocks) + " of them begin to grow inch after inch of added length.");
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " feel incredibly tight as inch after inch of length pour out from your groin.");
            }
        }
        // Display LengthChange
        if (lengthChange > 0) {
            if (firstCock.length >= 8 && firstCock.length - lengthChange < 8) {
                if (cocks.length === 1)
                    ContentView_1.CView.text("  <b>Most men would be overly proud to have a tool as long as yours.</b>");
                if (cocks.length > 1)
                    ContentView_1.CView.text("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + CockDescriptor_1.describeCocks(character) + ".</b>");
            }
            if (firstCock.length >= 12 && firstCock.length - lengthChange < 12) {
                if (cocks.length === 1)
                    ContentView_1.CView.text("  <b>Your " + CockDescriptor_1.describeCock(character, firstCock) + " is so long it nearly swings to your knee at its full length.</b>");
                if (cocks.length > 1)
                    ContentView_1.CView.text("  <b>Your " + CockDescriptor_1.describeCocksLight(character) + " are so long they nearly reach your knees when at full length.</b>");
            }
            if (firstCock.length >= 16 && firstCock.length - lengthChange < 16) {
                if (cocks.length === 1)
                    ContentView_1.CView.text("  <b>Your " + CockDescriptor_1.describeCock(character, firstCock) + " would look more at home on a large horse than you.</b>");
                if (cocks.length > 1)
                    ContentView_1.CView.text("  <b>Your " + CockDescriptor_1.describeCocksLight(character) + " would look more at home on a large horse than on your body.</b>");
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= BreastRow_1.BreastCup.C) {
                    if (cocks.length === 1)
                        ContentView_1.CView.text("  You could easily stuff your " + CockDescriptor_1.describeCock(character, firstCock) + " between your breasts and give yourself the titty-fuck of a lifetime.");
                    if (cocks.length > 1)
                        ContentView_1.CView.text("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.");
                }
                else {
                    if (cocks.length === 1)
                        ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCock(character, firstCock) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.");
                    if (cocks.length > 1)
                        ContentView_1.CView.text("  Your " + CockDescriptor_1.describeCocksLight(character) + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.");
                }
            }
            if (firstCock.length >= 20 && firstCock.length - lengthChange < 20) {
                if (cocks.length === 1)
                    ContentView_1.CView.text("  <b>As if the pulsing heat of your " + CockDescriptor_1.describeCock(character, firstCock) + " wasn't enough, the tip of your " + CockDescriptor_1.describeCock(character, firstCock) + " keeps poking its way into your view every time you get hard.</b>");
                if (cocks.length > 1)
                    ContentView_1.CView.text("  <b>As if the pulsing heat of your " + CockDescriptor_1.describeCocksLight(character) + " wasn't bad enough, every time you get hard, the tips of your " + CockDescriptor_1.describeCocksLight(character) + " wave before you, obscuring the lower portions of your vision.</b>");
                if (character.stats.cor > 40 && character.stats.cor <= 60) {
                    if (cocks.length > 1)
                        ContentView_1.CView.text("  You wonder if there is a demon or beast out there that could take the full length of one of your " + CockDescriptor_1.describeCocksLight(character) + "?");
                    if (cocks.length === 1)
                        ContentView_1.CView.text("  You wonder if there is a demon or beast out there that could handle your full length.");
                }
                if (character.stats.cor > 60 && character.stats.cor <= 80) {
                    if (cocks.length > 1)
                        ContentView_1.CView.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor_1.describeCocksLight(character) + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.");
                    if (cocks.length === 1)
                        ContentView_1.CView.text("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + CockDescriptor_1.describeCock(character, firstCock) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.");
                }
                if (character.stats.cor > 80) {
                    if (cocks.length > 1)
                        ContentView_1.CView.text("  You find yourself fantasizing about impaling nubile young champions on your " + CockDescriptor_1.describeCocksLight(character) + " in a year's time.");
                }
            }
        }
        // Display the degree of length loss.
        if (lengthChange < 0 && lengthChange >= -1) {
            if (cocks.length === 1)
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " has shrunk to a slightly shorter length.");
            if (cocks.length > 1) {
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " have shrunk to a slightly shorter length.");
                if (ncocks > 1 && ncocks < cocks.length)
                    ContentView_1.CView.text("You feel " + NumToText_1.numToCardinalText(ncocks) + " of your " + CockDescriptor_1.describeCocksLight(character) + " have shrunk to a slightly shorter length.");
                if (ncocks === 1)
                    ContentView_1.CView.text("You feel " + NumToText_1.numToCardinalText(ncocks) + " of your " + CockDescriptor_1.describeCocksLight(character) + " has shrunk to a slightly shorter length.");
            }
        }
        if (lengthChange < -1 && lengthChange > -3) {
            if (cocks.length === 1)
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " shrinks smaller, flesh vanishing into your groin.");
            if (cocks.length > 1) {
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " shrink smaller, the flesh vanishing into your groin.");
                if (ncocks === 1)
                    ContentView_1.CView.text("You feel " + NumToText_1.numToCardinalText(ncocks) + " of your " + CockDescriptor_1.describeCocksLight(character) + " shrink smaller, the flesh vanishing into your groin.");
                if (ncocks > 1 && ncocks < cocks.length)
                    ContentView_1.CView.text("You feel " + NumToText_1.numToCardinalText(ncocks) + " of your " + CockDescriptor_1.describeCocksLight(character) + " shrink smaller, the flesh vanishing into your groin.");
            }
        }
        if (lengthChange <= -3) {
            if (cocks.length === 1)
                ContentView_1.CView.text("A large portion of your " + CockDescriptor_1.describeCocksLight(character) + "'s length shrinks and vanishes.");
            if (cocks.length > 1) {
                if (ncocks === cocks.length)
                    ContentView_1.CView.text("A large portion of your " + CockDescriptor_1.describeCocksLight(character) + " receeds towards your groin, receding rapidly in length.");
                if (ncocks === 1)
                    ContentView_1.CView.text("A single member of your " + CockDescriptor_1.describeCocksLight(character) + " vanishes into your groin, receding rapidly in length.");
                if (ncocks > 1 && cocks.length > ncocks)
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " tingles as " + NumToText_1.numToCardinalText(ncocks) + " of your members vanish into your groin, receding rapidly in length.");
            }
        }
    }
    exports.displayLengthChange = displayLengthChange;
});
//# sourceMappingURL=CockModifier.js.map