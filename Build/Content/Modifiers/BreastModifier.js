define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Content/Effects/EffectType", "Content/Descriptors/BreastDescriptor", "Engine/Display/ContentView", "Content/Settings"], function (require, exports, SMath_1, BreastRow_1, EffectType_1, BreastDescriptor_1, ContentView_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Finds and grows the smallest breast row N times.
     * Pair with describeBreastGrowth to show output.
     * @param character The character
     * @param amount How much to grow each row
     * @param times The number of times to grow
     */
    function growSmallestBreastRow(character, amount, times) {
        const chest = character.body.chest;
        if (chest.length === 0)
            return;
        // Chance for "big tits" perked characters to grow larger!
        if (character.effects.has(EffectType_1.EffectType.BigTits) && SMath_1.randInt(3) === 0 && amount < 1)
            amount = 1;
        // Select smallest breast, grow it, move on
        let smallestBreastRow;
        while (times > 0) {
            let growthAmount = amount;
            smallestBreastRow = chest.sort(BreastRow_1.BreastRow.Smallest).get(0);
            if (!Settings_1.Settings.hyperHappy) {
                // Diminishing returns!
                if (character.effects.has(EffectType_1.EffectType.BigTits)) {
                    growthAmount /= smallestBreastRow.rating > 3 ? 1.3 : 1.5;
                    growthAmount /= smallestBreastRow.rating > 7 ? 1.5 : 2;
                    growthAmount /= smallestBreastRow.rating > 9 ? 1.5 : 2;
                    growthAmount /= smallestBreastRow.rating > 12 ? 1.5 : 2;
                }
            }
            smallestBreastRow.rating += growthAmount;
            times--;
        }
    }
    exports.growSmallestBreastRow = growSmallestBreastRow;
    /**
     * Grow N rows by a specified amount starting from the top.
     * Loops back to the top if N is greater than the number of rows.
     * Pair with describeBreastGrowth to show output.
     * @param character The character
     * @param amount How much to grow each row
     * @param times The number of rows to grow
     */
    function growTopBreastRowDownwards(character, amount, times) {
        const chest = character.body.chest;
        if (chest.length === 0)
            return;
        if (character.effects.has(EffectType_1.EffectType.BigTits) && SMath_1.randInt(3) === 0 && amount < 1)
            amount = 1;
        if (!Settings_1.Settings.hyperHappy) {
            const topBreastRow = chest.firstRow.rating;
            // Diminishing returns!
            if (character.effects.has(EffectType_1.EffectType.BigTits)) {
                amount /= topBreastRow > 3 ? 1.3 : 1.5;
                amount /= topBreastRow > 7 ? 1.5 : 2;
                amount /= topBreastRow > 9 ? 1.5 : 2;
                amount /= topBreastRow > 12 ? 1.5 : 2;
            }
        }
        let breastIndex = 0;
        // Start at top and keep growing down, back to top if hit bottom before done.
        while (times > 0) {
            if (breastIndex >= chest.length)
                breastIndex = 0;
            chest.get(breastIndex).rating += amount;
            breastIndex++;
            times--;
        }
    }
    exports.growTopBreastRowDownwards = growTopBreastRowDownwards;
    /**
     * Grow the top breast row N times.
     * Pair with describeTopRowBreastGrowth to show output.
     * @param character The character
     * @param amount How much to grow each row
     * @param times The number of times to grow the top row
     */
    function growTopBreastRow(character, amount, times) {
        const chest = character.body.chest;
        if (chest.length === 0)
            return;
        if (character.effects.has(EffectType_1.EffectType.BigTits) && SMath_1.randInt(3) === 0 && amount < 1)
            amount = 1;
        if (!Settings_1.Settings.hyperHappy) {
            const topBreastRow = chest.firstRow.rating;
            // Diminishing returns!
            if (character.effects.has(EffectType_1.EffectType.BigTits)) {
                amount /= topBreastRow > 3 ? 1.3 : 1.5;
                amount /= topBreastRow > 7 ? 1.5 : 2;
                amount /= topBreastRow > 9 ? 1.5 : 2;
                amount /= topBreastRow > 12 ? 1.5 : 2;
            }
        }
        while (times > 0) {
            times--;
            chest.firstRow.rating += amount;
        }
    }
    exports.growTopBreastRow = growTopBreastRow;
    /**
     * Note: Only here as reference to the old function
     * GrowthType 1 = smallest grows - growSmallestBreastRow
     * GrowthType 2 = Top Row working downward - growTopBreastRowDownwards
     * GrowthType 3 = Only top row - growTopBreastRow
     * @param character
     * @param amount
     * @param rowsGrown
     * @param display
     * @param growthType
     */
    function growTits(character, amount, rowsGrown, display, growthType) {
    }
    exports.growTits = growTits;
    function shrinkTits(character, ignoreHyperHappy = false) {
        if (Settings_1.Settings.hyperHappy && !ignoreHyperHappy) {
            return;
        }
        if (character.body.chest.length === 1) {
            const topRow = character.body.chest.firstRow;
            if (topRow.rating > 0) {
                // Shrink if bigger than N/A cups
                let superShrink = false;
                topRow.rating--;
                // Shrink again 50% chance
                if (topRow.rating >= 1 && SMath_1.randInt(100 / 2) && !character.effects.has(EffectType_1.EffectType.BigTits)) {
                    superShrink = true;
                    topRow.rating--;
                }
                if (topRow.rating < 0)
                    topRow.rating = 0;
                // Talk about shrinkage
                if (!superShrink)
                    ContentView_1.CView.text("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + BreastDescriptor_1.breastCup(topRow.rating) + "s.");
                if (superShrink)
                    ContentView_1.CView.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + BreastDescriptor_1.breastCup(topRow.rating) + "s.");
            }
        }
        else if (character.body.chest.length > 1) {
            // multiple
            ContentView_1.CView.text("\n");
            // temp2 = amount changed
            // temp3 = counter
            let shrinkAmount = 0;
            let breastRowIndex = character.body.chest.length;
            let curBreastRow;
            while (breastRowIndex > 0) {
                breastRowIndex--;
                curBreastRow = character.body.chest.get(breastRowIndex);
                if (curBreastRow.rating > 0) {
                    curBreastRow.rating--;
                    if (curBreastRow.rating < 0)
                        curBreastRow.rating = 0;
                    shrinkAmount++;
                    ContentView_1.CView.text("\n");
                    if (breastRowIndex < character.body.chest.length - 1)
                        ContentView_1.CView.text("...and y");
                    else
                        ContentView_1.CView.text("Y");
                    ContentView_1.CView.text("our " + BreastDescriptor_1.describeBreastRow(curBreastRow) + " shrink, dropping to " + BreastDescriptor_1.breastCup(curBreastRow.rating) + "s.");
                }
                if (curBreastRow.rating < 0)
                    curBreastRow.rating = 0;
            }
            if (shrinkAmount === 2)
                ContentView_1.CView.text("\nYou feel so much lighter after the change.");
            if (shrinkAmount === 3)
                ContentView_1.CView.text("\nWithout the extra weight you feel particularly limber.");
            if (shrinkAmount >= 4)
                ContentView_1.CView.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
        }
    }
    exports.shrinkTits = shrinkTits;
    // TODO: Fix this function
    function boostLactation(character, boostAmt) {
        if (character.body.chest.length <= 0)
            return 0;
        let breasts;
        let changes = 0;
        let temp2 = 0;
        // Prevent lactation decrease if lactating.
        if (boostAmt >= 0) {
            const lacReducEffect = character.effects.getByName(EffectType_1.EffectType.LactationReduction);
            if (lacReducEffect && lacReducEffect.values)
                lacReducEffect.values.hourExpire = 0;
            if (character.effects.has(EffectType_1.EffectType.LactationReduc0))
                character.effects.removeByName(EffectType_1.EffectType.LactationReduc0);
            if (character.effects.has(EffectType_1.EffectType.LactationReduc1))
                character.effects.removeByName(EffectType_1.EffectType.LactationReduc1);
            if (character.effects.has(EffectType_1.EffectType.LactationReduc2))
                character.effects.removeByName(EffectType_1.EffectType.LactationReduc2);
            if (character.effects.has(EffectType_1.EffectType.LactationReduc3))
                character.effects.removeByName(EffectType_1.EffectType.LactationReduc3);
        }
        if (boostAmt > 0) {
            while (boostAmt > 0) {
                breasts = character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0);
                boostAmt -= .1;
                temp2 = .1;
                if (breasts.lactationMultiplier > 1.5)
                    temp2 /= 2;
                if (breasts.lactationMultiplier > 2.5)
                    temp2 /= 2;
                if (breasts.lactationMultiplier > 3)
                    temp2 /= 2;
                changes += temp2;
                breasts.lactationMultiplier += temp2;
            }
        }
        else {
            while (boostAmt < 0) {
                if (boostAmt > -.1) {
                    breasts = character.body.chest.sort(BreastRow_1.BreastRow.LactationLeast).get(0);
                    // trace(biggestLactation());
                    breasts.lactationMultiplier += boostAmt;
                    if (breasts.lactationMultiplier < 0)
                        breasts.lactationMultiplier = 0;
                    boostAmt = 0;
                }
                else {
                    boostAmt += .1;
                    breasts = character.body.chest.sort(BreastRow_1.BreastRow.LactationLeast).get(0);
                    temp2 = boostAmt;
                    changes += temp2;
                    breasts.lactationMultiplier += temp2;
                    if (breasts.lactationMultiplier < 0)
                        breasts.lactationMultiplier = 0;
                }
            }
        }
        return changes;
    }
    exports.boostLactation = boostLactation;
});
//# sourceMappingURL=BreastModifier.js.map