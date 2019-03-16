define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Skin", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/ButtDescriptor", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Skin_1, EffectType_1, ItemDesc_1, CockDescriptor_1, VaginaDescriptor_1, ButtDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NumbRock extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.NumbRock, new ItemDesc_1.ItemDesc("Numb Rox", "a strange packet of candy called 'Numb Rocks'", "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious."), 15);
        }
        use(character) {
            ContentView_1.CView.clear();
            // Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
            ContentView_1.CView.text("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.");
            if (character.stats.lust >= 33) {
                ContentView_1.CView.text("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.");
                character.stats.lust -= 20 + SMath_1.randInt(40);
            }
            if (SMath_1.randInt(5) === 0) {
                const dysfunction = character.effects.getByName(EffectType_1.EffectType.Dysfunction);
                if (!dysfunction) {
                    ContentView_1.CView.text("\n\nUnfortunately, the skin of ");
                    if (character.body.cocks.length > 0) {
                        ContentView_1.CView.text(CockDescriptor_1.describeOneOfYourCocks(character));
                        if (character.body.vaginas.length > 0)
                            ContentView_1.CView.text(" and");
                        ContentView_1.CView.text(" ");
                    }
                    if (character.body.vaginas.length > 0) {
                        if (character.body.cocks.length <= 0)
                            ContentView_1.CView.text("your ");
                        ContentView_1.CView.text(VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " ");
                    }
                    if (!(character.body.cocks.length > 0 || character.body.vaginas.length > 0))
                        ContentView_1.CView.text(ButtDescriptor_1.describeButthole(character.body.butt) + " ");
                    ContentView_1.CView.text(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...");
                    character.effects.create(EffectType_1.EffectType.Dysfunction, { hourExpire: 50 + SMath_1.randInt(100) });
                }
                else {
                    ContentView_1.CView.text("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.");
                    dysfunction.values.hourExpire = 50 + SMath_1.randInt(100);
                }
            }
            else if (SMath_1.randInt(4) === 0 && character.stats.int > 15) {
                ContentView_1.CView.text("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.");
                character.stats.int -= 1 + SMath_1.randInt(5);
            }
            if (!character.effects.has(EffectType_1.EffectType.ThickSkin) && character.stats.sens < 30 && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("Slowly, ");
                if (character.body.skin.type === Skin_1.SkinType.PLAIN)
                    ContentView_1.CView.text("your skin");
                else
                    ContentView_1.CView.text("the skin under your " + character.body.skin.desc);
                ContentView_1.CView.text(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>");
                character.effects.create(EffectType_1.EffectType.ThickSkin);
            }
            ContentView_1.CView.text("\n\nAfter the sensations pass, your " + character.body.skin.desc + " feels a little less receptive to touch.");
            character.stats.sens += -3;
            if (character.stats.sens < 1)
                character.stats.sens = 1;
        }
    }
    exports.NumbRock = NumbRock;
});
//# sourceMappingURL=NumbRock.js.map