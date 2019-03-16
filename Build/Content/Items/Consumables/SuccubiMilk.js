define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Vagina", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Body/GenderIdentity", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/CockDescriptor", "./IncubusDraft", "Engine/Display/ContentView", "Content/Modifiers/BreastModifier", "Content/Modifiers/CockModifier", "Content/Modifiers/BodyModifier", "Content/Descriptors/BreastDescriptor", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Vagina_1, EffectType_1, ItemDesc_1, GenderIdentity_1, VaginaDescriptor_1, CockDescriptor_1, IncubusDraft_1, ContentView_1, BreastModifier_1, CockModifier_1, BodyModifier_1, BreastDescriptor_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SuccubiMilk extends Consumable_1.Consumable {
        constructor(tainted) {
            if (tainted)
                super(ConsumableName_1.ConsumableName.SuccubiMilk, new ItemDesc_1.ItemDesc("SucMilk", "a bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\""));
            else
                super(ConsumableName_1.ConsumableName.SuccubiMilkPure, new ItemDesc_1.ItemDesc("P.S.Mlk", "an untainted bottle of Succubi milk", "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption."), 20);
            this.tainted = tainted;
        }
        use(character) {
            let chance = SMath_1.randInt(100);
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                chance += 10;
            if (chance >= 90 && !this.tainted)
                chance -= 10;
            ContentView_1.CView.clear();
            if (character.stats.cor < 35)
                ContentView_1.CView.text("You wonder why in the gods' names you would drink such a thing, but you have to admit, it is the best thing you have ever tasted.");
            if (character.stats.cor >= 35 && character.stats.cor < 70) {
                ContentView_1.CView.text("You savor the incredible flavor as you greedily gulp it down.");
                if (character.gender === GenderIdentity_1.Gender.FEMALE || character.gender === GenderIdentity_1.Gender.HERM) {
                    const vagina = character.body.vaginas.get(0);
                    ContentView_1.CView.text("  The taste alone makes your " + VaginaDescriptor_1.describeVagina(character, vagina) + " feel ");
                    if (vagina.wetness === Vagina_1.VaginaWetness.DRY)
                        ContentView_1.CView.text("tingly.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.NORMAL)
                        ContentView_1.CView.text("wet.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.WET)
                        ContentView_1.CView.text("sloppy and wet.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.SLICK)
                        ContentView_1.CView.text("sopping and juicy.");
                    if (vagina.wetness >= Vagina_1.VaginaWetness.DROOLING)
                        ContentView_1.CView.text("dripping wet.");
                }
                else if (character.body.cocks.length > 0)
                    ContentView_1.CView.text("  You feel a building arousal, but it doesn't affect your cock.");
            }
            if (character.stats.cor >= 70) {
                ContentView_1.CView.text("You pour the milk down your throat, chugging the stuff as fast as you can.  You want more.");
                if (character.gender === GenderIdentity_1.Gender.FEMALE || character.gender === GenderIdentity_1.Gender.HERM) {
                    const vagina = character.body.vaginas.get(0);
                    ContentView_1.CView.text("  Your " + VaginaDescriptor_1.describeVagina(character, vagina));
                    if (character.body.vaginas.length > 1)
                        ContentView_1.CView.text(" quiver in orgasm, ");
                    if (character.body.vaginas.length === 1)
                        ContentView_1.CView.text(" quivers in orgasm, ");
                    if (vagina.wetness === Vagina_1.VaginaWetness.DRY)
                        ContentView_1.CView.text("becoming slightly sticky.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.NORMAL)
                        ContentView_1.CView.text("leaving your undergarments sticky.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.WET)
                        ContentView_1.CView.text("wet with girlcum.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.SLICK)
                        ContentView_1.CView.text("staining your undergarments with cum.");
                    if (vagina.wetness === Vagina_1.VaginaWetness.DROOLING)
                        ContentView_1.CView.text("leaving cunt-juice trickling down your leg.");
                    if (vagina.wetness >= Vagina_1.VaginaWetness.SLAVERING)
                        ContentView_1.CView.text("spraying your undergarments liberally with slick girl-cum.");
                    character.orgasm();
                }
                else if (character.gender !== 0) {
                    if (character.body.cocks.length === 1)
                        ContentView_1.CView.text("  You feel a strange sexual pleasure, but your " + CockDescriptor_1.describeCocks(character) + " remains unaffected.");
                    else
                        ContentView_1.CView.text("  You feel a strange sexual pleasure, but your " + CockDescriptor_1.describeCocks(character) + " remain unaffected.");
                }
            }
            if (this.tainted) {
                character.stats.spe += 1;
                character.stats.lust += 3;
                character.stats.cor += 1;
            }
            else {
                character.stats.spe += 1;
                character.stats.lust += 3;
            }
            // Breast growth (maybe cock reduction!)
            if (chance <= 75) {
                // Temp stores the level of growth...
                let breastGrowth = 1 + SMath_1.randInt(3);
                if (character.body.chest.length > 0) {
                    if (character.body.chest.firstRow.rating < 2 && SMath_1.randInt(3) === 0)
                        breastGrowth++;
                    if (character.body.chest.firstRow.rating < 5 && SMath_1.randInt(4) === 0)
                        breastGrowth++;
                    if (character.body.chest.firstRow.rating < 6 && SMath_1.randInt(5) === 0)
                        breastGrowth++;
                }
                ContentView_1.CView.text("\n\n");
                if (character.body.chest.length === 0) {
                    ContentView_1.CView.text("A perfect pair of B cup breasts, complete with tiny nipples, form on your chest.");
                    const newBreastRow = new BreastRow_1.BreastRow();
                    newBreastRow.nipples.count = 1;
                    newBreastRow.rating = 2;
                    character.body.chest.add(newBreastRow);
                    ContentView_1.CView.text("\n");
                }
                else {
                    BreastModifier_1.growTopBreastRow(character, breastGrowth, character.body.chest.length);
                    ContentView_1.CView.text(BreastDescriptor_1.describeTopRowBreastGrowth(character, breastGrowth));
                }
                if (!Settings_1.Settings.hyperHappy) {
                    // Shrink cocks if you have them.
                    if (character.body.cocks.length > 0) {
                        const longestCock = character.body.cocks.sort(Cock_1.Cock.Longest).get(0);
                        let lengthenAmount = 0;
                        // Shrink said cock
                        if (longestCock.length < 6 && longestCock.length >= 2.9) {
                            longestCock.length -= .5;
                            lengthenAmount -= .5;
                            if (longestCock.thickness * 6 > longestCock.length)
                                longestCock.thickness -= .2;
                            if (longestCock.thickness * 8 > longestCock.length)
                                longestCock.thickness -= .2;
                            if (longestCock.thickness < .5)
                                longestCock.thickness = .5;
                        }
                        lengthenAmount += CockModifier_1.growCock(character, longestCock, (SMath_1.randInt(3) + 1) * -1);
                        ContentView_1.CView.text("\n\n");
                        CockModifier_1.displayLengthChange(character, lengthenAmount, 1);
                        if (longestCock.length < 2) {
                            ContentView_1.CView.text("  ");
                            CockModifier_1.displayKillCocks(character, 1);
                        }
                    }
                }
            }
            if (character.body.vaginas.length === 0 && (SMath_1.randInt(3) === 0 || (chance > 75 && chance < 90))) {
                const newVagina = new Vagina_1.Vagina();
                newVagina.looseness = Vagina_1.VaginaLooseness.TIGHT;
                newVagina.wetness = Vagina_1.VaginaWetness.NORMAL;
                newVagina.virgin = true;
                character.body.vaginas.add(newVagina);
                if (character.body.fertility <= 5)
                    character.body.fertility = 6;
                ContentView_1.CView.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + "</b>!");
            }
            // Increase pussy wetness or grow one!!
            else if (chance > 75 && chance < 90) {
                // Shrink cawk
                if (character.body.cocks.length > 0 && !Settings_1.Settings.hyperHappy) {
                    ContentView_1.CView.text("\n\n");
                    const longestCock = character.body.cocks.sort(Cock_1.Cock.Longest).get(0);
                    // Shrink said cock
                    if (longestCock.length < 6 && longestCock.length >= 2.9)
                        longestCock.length -= .5;
                    const lengthChange = CockModifier_1.growCock(character, longestCock, -1 * (SMath_1.randInt(3) + 1));
                    CockModifier_1.displayLengthChange(character, lengthChange, 1);
                    if (longestCock.length < 3) {
                        ContentView_1.CView.text("  ");
                        CockModifier_1.displayKillCocks(character, 1);
                    }
                }
                if (character.body.vaginas.length > 0) {
                    ContentView_1.CView.text("\n\n");
                    const firstVagina = character.body.vaginas.get(0);
                    // 0 = dry, 1 = wet, 2 = extra wet, 3 = always slick, 4 = drools constantly, 5 = female ejaculator
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.SLAVERING) {
                        if (character.body.vaginas.length === 1)
                            ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " gushes fluids down your leg as you spontaneously orgasm.");
                        else
                            ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + "s gush fluids down your legs as you spontaneously orgasm, leaving a thick puddle of pussy-juice on the ground.  It is rapidly absorbed by the earth.");
                        character.orgasm();
                        if (this.tainted)
                            character.stats.cor += 1;
                    }
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.DROOLING) {
                        if (character.body.vaginas.length === 1)
                            ContentView_1.CView.text("Your pussy feels hot and juicy, aroused and tender.  You cannot resist as your hands dive into your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + ".  You quickly orgasm, squirting fluids everywhere.  <b>You are now a squirter</b>.");
                        if (character.body.vaginas.length > 1)
                            ContentView_1.CView.text("Your pussies feel hot and juicy, aroused and tender.  You cannot resist plunging your hands inside your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + "s.  You quiver around your fingers, squirting copious fluids over yourself and the ground.  The fluids quickly disappear into the dirt.");
                        character.orgasm();
                        if (this.tainted)
                            character.stats.cor += 1;
                    }
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.SLICK) {
                        if (character.body.vaginas.length === 1)
                            ContentView_1.CView.text("You feel a sudden trickle of fluid down your leg.  You smell it and realize it's your pussy-juice.  Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " now drools lubricant constantly down your leg.");
                        if (character.body.vaginas.length > 1)
                            ContentView_1.CView.text("You feel sudden trickles of fluids down your leg.  You smell the stuff and realize it's your pussies-juices.  They seem to drool lubricant constantly down your legs.");
                    }
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.WET) {
                        ContentView_1.CView.text("You flush in sexual arousal as you realize how moist your cunt-lips have become.  Once you've calmed down a bit you realize they're still slick and ready to fuck, and always will be.");
                    }
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.NORMAL) {
                        if (character.body.vaginas.length === 1)
                            ContentView_1.CView.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " felt much wetter than normal.");
                        else
                            ContentView_1.CView.text("A feeling of intense arousal passes through you, causing you to masturbate furiously.  You realize afterwards that your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " were much wetter than normal.");
                    }
                    if (firstVagina.wetness === Vagina_1.VaginaWetness.DRY) {
                        ContentView_1.CView.text("You feel a tingling in your crotch, but cannot identify it.");
                    }
                    for (const vagina of character.body.vaginas)
                        if (vagina.wetness < Vagina_1.VaginaWetness.SLAVERING)
                            vagina.wetness++;
                }
            }
            if (chance >= 90) {
                if (character.body.skin.tone === "blue" || character.body.skin.tone === "purple" || character.body.skin.tone === "indigo" || character.body.skin.tone === "shiny black") {
                    if (character.body.vaginas.length > 0) {
                        ContentView_1.CView.text("\n\nYour heart begins beating harder and harder as heat floods to your groin.  You feel your clit peeking out from under its hood, growing larger and longer as it takes in more and more blood.");
                        if (character.body.clit.length > 3 && !character.effects.has(EffectType_1.EffectType.BigClit))
                            ContentView_1.CView.text("  After some time it shrinks, returning to its normal aroused size.  You guess it can't get any bigger.");
                        if (character.body.clit.length > 5 && character.effects.has(EffectType_1.EffectType.BigClit))
                            ContentView_1.CView.text("  Eventually it shrinks back down to its normal (but still HUGE) size.  You guess it can't get any bigger.");
                        if (((character.effects.has(EffectType_1.EffectType.BigClit)) && character.body.clit.length < 6)
                            || character.body.clit.length < 3) {
                            character.body.clit.length += (SMath_1.randInt(4) + 2) / 10;
                        }
                        character.stats.sens += 3;
                        character.stats.lust += 8;
                    }
                    else {
                        const newVagina = new Vagina_1.Vagina();
                        newVagina.looseness = Vagina_1.VaginaLooseness.TIGHT;
                        newVagina.wetness = Vagina_1.VaginaWetness.NORMAL;
                        newVagina.virgin = true;
                        character.body.vaginas.add(newVagina);
                        ContentView_1.CView.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + "</b>!");
                    }
                }
                else {
                    const randomSkinColor = SMath_1.randInt(10);
                    if (randomSkinColor === 0)
                        character.body.skin.tone = "shiny black";
                    if (randomSkinColor === 1 || randomSkinColor === 2)
                        character.body.skin.tone = "indigo";
                    if (randomSkinColor === 3 || randomSkinColor === 4 || randomSkinColor === 5)
                        character.body.skin.tone = "purple";
                    if (randomSkinColor > 5)
                        character.body.skin.tone = "blue";
                    ContentView_1.CView.text("\n\nA tingling sensation runs across your skin in waves, growing stronger as <b>your skin's tone slowly shifts, darkening to become " + character.body.skin.tone + " in color.</b>");
                    if (this.tainted)
                        character.stats.cor += 1;
                    else
                        character.stats.cor += 0;
                }
            }
            // Demonic changes - higher chance with higher corruption.
            if (SMath_1.randInt(40) + character.stats.cor / 3 > 35 && this.tainted)
                IncubusDraft_1.demonChanges(character);
            if (this.tainted) {
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 100, 2));
                if (SMath_1.randInt(3) === 0)
                    ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 15, 2));
            }
            else {
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 90, 1));
                if (SMath_1.randInt(3) === 0)
                    ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 20, 2));
            }
        }
    }
    exports.SuccubiMilk = SuccubiMilk;
});
//# sourceMappingURL=SuccubiMilk.js.map