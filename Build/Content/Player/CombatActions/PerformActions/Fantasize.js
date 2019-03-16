define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/BreastDescriptor", "Engine/Combat/Actions/CombatActionType"], function (require, exports, SMath_1, BreastRow_1, CombatAction_1, ContentView_1, BallsDescriptor_1, BreastDescriptor_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Fantasize extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Fantasize";
            this.type = CombatActionType_1.CombatActionType.Fantasize;
        }
        useAction(character, target) {
            let lustChange = 0;
            ContentView_1.CView.clear();
            if (character.inventory.armor.displayName === "goo armor") {
                ContentView_1.CView.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
                if (character.gender > 0)
                    ContentView_1.CView.text(" and genitals");
                ContentView_1.CView.text(", arousing you even further.\n");
                lustChange = 25 + SMath_1.randInt(character.stats.lib / 8 + character.stats.cor / 8);
            }
            else if (character.body.balls.count > 0 && character.body.balls.size >= 10 && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("You daydream about fucking " + target.desc.a + target.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + target.desc.objectivePronoun + " full of cum.\n");
                lustChange = 5 + SMath_1.randInt(character.stats.lib / 8 + character.stats.cor / 8);
                ContentView_1.CView.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor_1.describeBalls(true, true, character) + " do feel fuller than before...\n");
                character.hoursSinceCum += 50;
            }
            else if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 6 && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and shoving " + target.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + target.desc.objectivePronoun + " as you have your way.\n");
                lustChange = 5 + SMath_1.randInt(character.stats.lib / 8 + character.stats.cor / 8);
            }
            else if (character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier >= 6 && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and forcing " + target.desc.objectivePronoun + " against a " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n");
                lustChange = 5 + SMath_1.randInt(character.stats.lib / 8 + character.stats.cor / 8);
            }
            else {
                ContentView_1.CView.text("You fill your mind with perverted thoughts about " + target.desc.a + target.desc.short + ", picturing " + target.desc.objectivePronoun + " in all kinds of perverse situations with you.\n");
                lustChange = 10 + SMath_1.randInt(character.stats.lib / 5 + character.stats.cor / 8);
            }
            if (lustChange >= 20)
                ContentView_1.CView.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + target.desc.a + target.desc.short + " can tell what you were thinking.\n\n");
            else
                ContentView_1.CView.text("\n");
            character.stats.raw.lust += lustChange;
        }
    }
    exports.Fantasize = Fantasize;
});
//# sourceMappingURL=Fantasize.js.map