define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Items/ItemDesc", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/CockDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BreastModifier", "Content/Modifiers/CockModifier", "Content/Menus/InGame/PlayerInventoryMenu"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, ItemDesc_1, BallsDescriptor_1, BreastDescriptor_1, VaginaDescriptor_1, CockDescriptor_1, ContentView_1, BreastModifier_1, CockModifier_1, PlayerInventoryMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GroPlus extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.GroPlus, new ItemDesc_1.ItemDesc("GroPlus", "a needle filled with Gro+", "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious."), 50);
        }
        canUse(character) {
            return true;
        }
        use(character) {
            const gpBalls = (character.body.balls.count > 0 ? this.growPlusBalls : undefined);
            const gpBreasts = (character.body.chest.length > 0 ? this.growPlusBreasts : undefined);
            const gpClit = (character.body.vaginas.length > 0 ? this.growPlusClit : undefined);
            const gpCock = (character.body.cocks.length > 0 ? this.growPlusCock : undefined);
            const gpNipples = (character.body.chest.reduce(BreastRow_1.BreastRow.TotalNipples, 0) > 0 ? this.growPlusNipples : undefined);
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
            return {
                choices: [["Balls", gpBalls], ["Breasts", gpBreasts], ["Clit", gpClit], ["Cock", gpCock], ["Nipples", gpNipples]],
                persistantChoices: [["Nevermind", this.growPlusCancel]]
            };
        }
        growPlusBalls(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You sink the needle deep into your " + BallsDescriptor_1.describeSack(character) + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
            // 1 in 4 BIG growth.
            if (SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("You feel a trembling in your " + BallsDescriptor_1.describeBallsShort(character) + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
                character.body.balls.size += SMath_1.randInt(4) + 2;
                ContentView_1.CView.text("They shift, stretching your " + BallsDescriptor_1.describeSack(character) + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + BallsDescriptor_1.describeBallsShort(character) + ".  ");
            }
            else {
                character.body.balls.size += SMath_1.randInt(2) + 1;
                ContentView_1.CView.text("You feel your testicles shift, pulling the skin of your " + BallsDescriptor_1.describeSack(character) + " a little bit as they grow to " + BallsDescriptor_1.describeBallsShort(character) + ".  ");
            }
            if (character.body.balls.size > 10)
                ContentView_1.CView.text("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
            character.stats.lust += 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        growPlusBreasts(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You sink the needle into the flesh of your " + BreastDescriptor_1.describeAllBreasts(character) + " injecting each with a portion of the needle.\n\n");
            if (character.body.chest.length === 1) {
                const amount = SMath_1.randInt(5) + 1;
                BreastModifier_1.growSmallestBreastRow(character, amount, 1);
                ContentView_1.CView.text(BreastDescriptor_1.describeBreastGrowth(character, amount));
            }
            else {
                const amount = SMath_1.randInt(2) + 1;
                BreastModifier_1.growSmallestBreastRow(character, amount, character.body.chest.length);
                ContentView_1.CView.text(BreastDescriptor_1.describeBreastGrowth(character, amount));
            }
            character.stats.lust += 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        growPlusClit(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
            character.body.clit.length++;
            ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeClit(character) + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");
            character.stats.sens += 2;
            character.stats.lust += 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        growPlusCock(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You sink the needle into the base of your " + CockDescriptor_1.describeCocksLight(character) + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
            if (character.body.cocks.length === 1) {
                const firstCock = character.body.cocks.get(0);
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, firstCock) + " twitches and thickens, pouring more than an inch of thick new length from your ");
                CockModifier_1.growCock(character, firstCock, 4);
                firstCock.length += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
                firstCock.thickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
            }
            // MULTI
            else {
                ContentView_1.CView.text("Your " + CockDescriptor_1.describeCocksLight(character) + " twitch and thicken, each member pouring out more than an inch of new length from your ");
                for (const cock of character.body.cocks) {
                    CockModifier_1.growCock(character, cock, 2);
                    cock.length += 1;
                    cock.thickness += 0.5;
                }
            }
            if (character.body.cocks.find(Cock_1.Cock.HasSheath))
                ContentView_1.CView.text("sheath.");
            else
                ContentView_1.CView.text("crotch.");
            character.stats.sens += 2;
            character.stats.lust += 10;
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        growPlusNipples(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You sink the needle into each of your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
            // Grow nipples
            ContentView_1.CView.text("Your nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
            character.body.chest.get(SMath_1.randInt(character.body.chest.length - 1)).nipples.length += (SMath_1.randInt(2) + 3) / 10;
            character.stats.lust += 15;
            // NIPPLECUNTZZZ
            if (character.body.chest.find(BreastRow_1.BreastRow.NonFuckableNipples) && SMath_1.randInt(4) === 0) {
                let nowFuckable = false;
                for (const breastRow of character.body.chest) {
                    if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                        breastRow.nipples.fuckable = true;
                        nowFuckable = true;
                    }
                }
                // Talk about if anything was changed.
                if (nowFuckable)
                    ContentView_1.CView.text("Your " + BreastDescriptor_1.describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
            }
            return { next: PlayerInventoryMenu_1.inventoryMenu };
        }
        growPlusCancel(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You put the vial away.\n\n");
            return character.inventory.items.createAdd(character, ConsumableName_1.ConsumableName.GroPlus, PlayerInventoryMenu_1.inventoryMenu);
            // InventoryDisplay.reverseAction();
            // return { next: Inventory };
        }
    }
    exports.GroPlus = GroPlus;
});
//# sourceMappingURL=GroPlus.js.map