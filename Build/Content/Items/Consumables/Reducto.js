define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Items/ItemDesc", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/CockDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BreastModifier", "Content/Menus/InGame/PlayerInventoryMenu"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, ItemDesc_1, BallsDescriptor_1, BreastDescriptor_1, ButtDescriptor_1, VaginaDescriptor_1, CockDescriptor_1, ContentView_1, BreastModifier_1, PlayerInventoryMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Reducto extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Reducto, new ItemDesc_1.ItemDesc("Reducto", "a salve marked as 'Reducto'", "This container full of paste can be used to shrink a body part down by a significant amount."), 30);
        }
        canUse(character) {
            return true;
        }
        use(character) {
            const rdtBalls = (character.body.balls.count > 0 && character.body.balls.size > 1 ? this.reductoBalls : undefined);
            const rdtBreasts = (character.body.chest.length > 0 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 0 ? this.reductoBreasts : undefined);
            const rdtButt = (character.body.butt.rating > 1 ? this.reductoButt : undefined);
            const rdtClit = (character.body.vaginas.length > 0 && character.body.clit.length > 0.25 ? this.reductoClit : undefined);
            const rdtCock = (character.body.cocks.length > 0 && character.body.cocks.sort(Cock_1.Cock.Largest).get(0).area > 6 ? this.reductoCock : undefined);
            const rdtHips = (character.body.hips.rating > 2 ? this.reductoHips : undefined);
            const rdtNipples = (character.body.chest.length > 0 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length > 0.25 ? this.reductoNipples : undefined);
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
            return {
                choices: [["Balls", rdtBalls], ["Breasts", rdtBreasts], ["Butt", rdtButt], ["Clit", rdtClit], ["Cock", rdtCock], ["Hips", rdtHips], ["Nipples", rdtNipples]], persistantChoices: [["Nevermind", this.reductoCancel]]
            };
        }
        reductoBalls(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You smear the foul-smelling paste onto your " + BallsDescriptor_1.describeSack(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
            character.body.balls.size -= SMath_1.randInt(4) + 2;
            if (character.body.balls.size < 1)
                character.body.balls.size = 1;
            ContentView_1.CView.text("You feel your scrotum shift, shrinking down along with your " + BallsDescriptor_1.describeBallsShort(character) + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
            character.stats.lib -= 2;
            character.stats.lust -= 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoBreasts(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You smear the foul-smelling ointment all over your " + BreastDescriptor_1.describeAllBreasts(character) + ", covering them entirely as the paste begins to get absorbed into your " + character.body.skin.desc + ".\n");
            BreastModifier_1.shrinkTits(character, true);
            if (SMath_1.randInt(2) === 0 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 1) {
                ContentView_1.CView.text("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
                BreastModifier_1.shrinkTits(character, true);
            }
            ContentView_1.CView.text("\nThe last of it wicks away into your skin, completing the changes.");
            character.stats.sens -= 2;
            character.stats.lust -= 5;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoButt(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You smear the foul-smelling paste onto your " + ButtDescriptor_1.describeButt(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
            if (character.body.butt.rating >= 15) {
                character.body.butt.rating -= (3 + Math.floor(character.body.butt.rating / 3));
                ContentView_1.CView.text("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
            }
            else if (character.body.butt.rating >= 10) {
                character.body.butt.rating -= 3;
                ContentView_1.CView.text("You feel much lighter as your " + ButtDescriptor_1.describeButt(character) + " jiggles slightly, adjusting to its smaller size.");
            }
            else {
                character.body.butt.rating -= SMath_1.randInt(3) + 1;
                if (character.body.butt.rating < 1)
                    character.body.butt.rating = 1;
                ContentView_1.CView.text("After a few seconds your " + ButtDescriptor_1.describeButt(character) + " has shrunk to a much smaller size!");
            }
            character.stats.lib -= 2;
            character.stats.lust -= 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoClit(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You carefully apply the paste to your " + VaginaDescriptor_1.describeClit(character) + ", being very careful to avoid getting it on your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ".  It burns with heat as it begins to make its effects known...\n\n");
            character.body.clit.length /= 1.7;
            // Set clitlength down to 2 digits in length
            character.body.clit.length = Math.floor(character.body.clit.length * 100) / 100;
            ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeClit(character) + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
            character.stats.sens += 2;
            character.stats.lust += 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoCock(character) {
            ContentView_1.CView.clear();
            const firstCock = character.body.cocks.get(0);
            if (firstCock.type === Cock_1.CockType.BEE) {
                ContentView_1.CView.text("The gel produces an odd effect when you rub it into your " + CockDescriptor_1.describeCock(character, firstCock) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + CockDescriptor_1.describeCock(character, firstCock) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
                firstCock.type = Cock_1.CockType.HUMAN;
            }
            else {
                ContentView_1.CView.text("You smear the repulsive smelling paste over your " + CockDescriptor_1.describeCocksLight(character) + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + CockDescriptor_1.describeCocksLight(character) + " begins to shrink.\n\n");
                if (character.body.cocks.length === 1) {
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, firstCock) + " twitches as it shrinks, disappearing steadily into your " + (firstCock.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                    firstCock.length *= 2 / 3;
                    firstCock.thickness *= 2 / 3;
                }
                else { // MULTI
                    ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " twitch and shrink, each member steadily disappearing into your " + (character.body.cocks.find(Cock_1.Cock.HasSheath) ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                    for (const cock of character.body.cocks) {
                        cock.length *= 2 / 3;
                        cock.thickness *= 2 / 3;
                    }
                }
            }
            character.stats.sens -= 2;
            character.stats.lust -= 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoHips(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
            if (character.body.hips.rating >= 15) {
                character.body.hips.rating -= (3 + Math.floor(character.body.hips.rating / 3));
                ContentView_1.CView.text("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
            }
            else if (character.body.hips.rating >= 10) {
                character.body.hips.rating -= 3;
                ContentView_1.CView.text("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
            }
            else {
                character.body.hips.rating -= SMath_1.randInt(3) + 1;
                if (character.body.hips.rating < 1)
                    character.body.hips.rating = 1;
                ContentView_1.CView.text("After a few seconds your [hips] have shrunk to a much smaller size!");
            }
            character.stats.lib -= 2;
            character.stats.lust -= 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoNipples(character) {
            ContentView_1.CView.clear();
            const largestBreasts = character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0);
            ContentView_1.CView.text("You rub the paste evenly over your " + BreastDescriptor_1.describeNipple(character, largestBreasts) + "s, being sure to cover them completely.\n\n");
            // Shrink
            if (largestBreasts.nipples.length / 2 < 0.25) {
                ContentView_1.CView.text("Your nipples continue to shrink down until they stop at 1/4\" long.");
                largestBreasts.nipples.length = 0.25;
            }
            else {
                ContentView_1.CView.text("Your " + BreastDescriptor_1.describeNipple(character, largestBreasts) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
                largestBreasts.nipples.length /= 2;
            }
            character.stats.sens -= 5;
            character.stats.lust -= 5;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        reductoCancel(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You put the salve away.\n\n");
            return character.inventory.items.createAdd(character, ConsumableName_1.ConsumableName.Reducto, PlayerInventoryMenu_1.inventoryMenu);
        }
    }
    exports.Reducto = Reducto;
});
//# sourceMappingURL=Reducto.js.map