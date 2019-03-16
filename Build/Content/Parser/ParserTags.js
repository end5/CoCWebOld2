define(["require", "exports", "Engine/Utilities/Dictionary", "Engine/CharDict", "../Descriptors/ButtDescriptor", "../Descriptors/BallsDescriptor", "../Descriptors/GenderDescriptor", "../Descriptors/BreastDescriptor", "../Descriptors/VaginaDescriptor", "../Descriptors/CockDescriptor", "../Descriptors/FaceDescriptor", "../Descriptors/LegDescriptor", "../Descriptors/HairDescriptor", "../Descriptors/HipDescriptor", "../Descriptors/BodyDescriptor", "../Descriptors/SkinDescriptor", "Engine/Body/BreastRow", "Engine/Utilities/Time", "Engine/Body/Pregnancy/Womb", "Engine/Body/Cock"], function (require, exports, Dictionary_1, CharDict_1, ButtDescriptor_1, BallsDescriptor_1, GenderDescriptor_1, BreastDescriptor_1, VaginaDescriptor_1, CockDescriptor_1, FaceDescriptor_1, LegDescriptor_1, HairDescriptor_1, HipDescriptor_1, BodyDescriptor_1, SkinDescriptor_1, BreastRow_1, Time_1, Womb_1, Cock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParserFuncTags = new Dictionary_1.Dictionary();
    exports.ParserCondTags = new Dictionary_1.Dictionary();
    exports.ParserFuncTags.set("color:", (colorName, ...other) => `<span style="color:${colorName}">${other.join(' ')}</span>`);
    exports.ParserFuncTags.set("say:", (...other) => `<i>"${other.join(' ')}"</i>`);
    exports.ParserFuncTags.set("b:", (...other) => `<b>${other.join(' ')}</b>`);
    exports.ParserFuncTags.set("i:", (...other) => `<i>${other.join(' ')}</i>`);
    exports.ParserFuncTags.set("u:", (...other) => `<u>${other.join(' ')}</u>`);
    function wrapper(func) {
        return (...args) => {
            if (CharDict_1.CharDict.player)
                return func(CharDict_1.CharDict.player, ...args);
            return 'Error: Player does not exist';
        };
    }
    // Single arg
    exports.ParserFuncTags.set("agility", () => "[Agility]");
    exports.ParserFuncTags.set("armor", wrapper((player) => player.inventory.armor.displayName));
    exports.ParserFuncTags.set("armorname", wrapper((player) => player.inventory.armor.displayName));
    exports.ParserFuncTags.set("ass", wrapper((player) => ButtDescriptor_1.describeButt(player)));
    exports.ParserFuncTags.set("asshole", wrapper((player) => ButtDescriptor_1.describeButthole(player.body.butt)));
    exports.ParserFuncTags.set("balls", wrapper((player) => BallsDescriptor_1.describeBalls(true, true, player)));
    exports.ParserFuncTags.set("boyfriend", wrapper((player) => GenderDescriptor_1.mf(player, "boyfriend", "girlfriend")));
    exports.ParserFuncTags.set("butt", wrapper((player) => ButtDescriptor_1.describeButt(player)));
    exports.ParserFuncTags.set("butthole", wrapper((player) => ButtDescriptor_1.describeButthole(player.body.butt)));
    exports.ParserFuncTags.set("chest", wrapper((player) => BreastDescriptor_1.describeChest(player)));
    exports.ParserFuncTags.set("clit", wrapper((player) => VaginaDescriptor_1.describeClit(player)));
    exports.ParserFuncTags.set("cock", wrapper((player, arg, ...args) => {
        if (player.body.cocks.length <= 0)
            return "<b>(Attempt to parse cock when none present.)</b>";
        if (exports.ParserFuncTags.get(arg) !== undefined)
            return exports.ParserFuncTags.get(arg)(player, args);
        if (typeof arg === "number") {
            if (arg - 1 >= 0 && arg - 1 < player.body.cocks.length)
                return CockDescriptor_1.describeCock(player, player.body.cocks.get(arg - 1));
            else
                return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
        }
        return CockDescriptor_1.describeCock(player, player.body.cocks.get(0));
    }));
    exports.ParserFuncTags.set("cockhead", wrapper((player, arg, ...args) => {
        if (player.body.cocks.length <= 0)
            return "<b>(Attempt to parse cockHead when none present.)</b>";
        if (exports.ParserFuncTags.get(arg) !== undefined)
            return exports.ParserFuncTags.get(arg)(player, args);
        if (typeof arg === "number") {
            const numOffset = Math.floor(arg - 1);
            if (numOffset >= 0 && numOffset < player.body.cocks.length)
                return CockDescriptor_1.describeCockHead(player.body.cocks.get(numOffset));
            else
                return "<b>(Attempt To Parse CockHeadDescript for Invalid Cock)</b>";
        }
        return CockDescriptor_1.describeCockHead(player.body.cocks.get(0));
    }));
    exports.ParserFuncTags.set("cocks", wrapper((player) => CockDescriptor_1.describeCocksLight(player)));
    exports.ParserFuncTags.set("cunt", wrapper((player) => VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0))));
    exports.ParserFuncTags.set("eachcock", wrapper((player) => CockDescriptor_1.describeOneOfYourCocks(player)));
    exports.ParserFuncTags.set("evade", () => "[Evade]");
    exports.ParserFuncTags.set("face", wrapper((player) => FaceDescriptor_1.describeFaceShort(player)));
    exports.ParserFuncTags.set("feet", wrapper((player) => LegDescriptor_1.describeFeet(player)));
    exports.ParserFuncTags.set("foot", wrapper((player) => LegDescriptor_1.describeFoot(player)));
    exports.ParserFuncTags.set("fullchest", wrapper((player) => BreastDescriptor_1.describeAllChest(player)));
    exports.ParserFuncTags.set("hair", wrapper((player) => HairDescriptor_1.describeHair(player)));
    exports.ParserFuncTags.set("hairorfur", wrapper((player) => HairDescriptor_1.hairOrFur(player)));
    exports.ParserFuncTags.set("he", wrapper((player) => GenderDescriptor_1.mf(player, "he", "she")));
    // "he2": (player: Character) => player2.mf("he", "she"),
    exports.ParserFuncTags.set("him", wrapper((player) => GenderDescriptor_1.mf(player, "him", "her")));
    // "him2": (player: Character) => player2.mf("him", "her"),
    exports.ParserFuncTags.set("himself", wrapper((player) => GenderDescriptor_1.mf(player, "himself", "herself")));
    exports.ParserFuncTags.set("herself", wrapper((player) => GenderDescriptor_1.mf(player, "himself", "herself")));
    exports.ParserFuncTags.set("hips", wrapper((player) => HipDescriptor_1.describeHips(player)));
    exports.ParserFuncTags.set("his", wrapper((player) => GenderDescriptor_1.mf(player, "his", "her")));
    // "his2": (player: Character) => player2.mf("his", "her"),
    exports.ParserFuncTags.set("leg", wrapper((player) => LegDescriptor_1.describeLeg(player)));
    exports.ParserFuncTags.set("legs", wrapper((player) => LegDescriptor_1.describeLegs(player)));
    exports.ParserFuncTags.set("man", wrapper((player) => GenderDescriptor_1.mf(player, "man", "woman")));
    exports.ParserFuncTags.set("men", wrapper((player) => GenderDescriptor_1.mf(player, "men", "women")));
    exports.ParserFuncTags.set("master", wrapper((player) => GenderDescriptor_1.mf(player, "master", "mistress")));
    exports.ParserFuncTags.set("misdirection", () => "[Misdirection]");
    exports.ParserFuncTags.set("multicock", wrapper((player) => CockDescriptor_1.describeCocksLight(player)));
    exports.ParserFuncTags.set("multicockdescriptlight", wrapper((player) => CockDescriptor_1.describeCocksLight(player)));
    exports.ParserFuncTags.set("name", wrapper((player) => player.desc.name));
    exports.ParserFuncTags.set("nipple", wrapper((player) => BreastDescriptor_1.describeNipple(player, player.body.chest.get(0))));
    exports.ParserFuncTags.set("nipples", wrapper((player) => BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s"));
    exports.ParserFuncTags.set("onecock", wrapper((player) => CockDescriptor_1.describeEachOfYourCocks(player)));
    exports.ParserFuncTags.set("pg", () => "\n\n");
    exports.ParserFuncTags.set("pussy", wrapper((player) => VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0))));
    exports.ParserFuncTags.set("race", wrapper((player) => BodyDescriptor_1.describeRace(player)));
    exports.ParserFuncTags.set("sack", wrapper((player) => BallsDescriptor_1.describeSack(player)));
    exports.ParserFuncTags.set("sheath", wrapper((player) => CockDescriptor_1.describeCockSheath(player.body.cocks.get(0))));
    exports.ParserFuncTags.set("skin", wrapper((player) => SkinDescriptor_1.describeSkin(player)));
    exports.ParserFuncTags.set("skinfurscales", wrapper((player) => SkinDescriptor_1.skinFurScales(player)));
    // "teasetext": (player: Character) => teaseText(),
    exports.ParserFuncTags.set("tongue", wrapper((player) => FaceDescriptor_1.describeTongue(player.body.tongue.type)));
    exports.ParserFuncTags.set("vag", wrapper((player) => VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0))));
    exports.ParserFuncTags.set("vagina", wrapper((player) => VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0))));
    exports.ParserFuncTags.set("vagorass", wrapper((player) => (player.body.vaginas.length > 0 ? VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) : ButtDescriptor_1.describeButthole(player.body.butt))));
    exports.ParserFuncTags.set("weapon", wrapper((player) => player.inventory.weapon.displayName));
    exports.ParserFuncTags.set("weaponname", wrapper((player) => player.inventory.weapon.displayName));
    // "latexyname": (player: Character) => undefinedFlags.GOO_NAME,
    // "bathgirlname": (player: Character) => undefinedFlags.MILK_NAME,
    exports.ParserFuncTags.set("cockplural", wrapper((player) => (player.body.cocks.length === 1) ? "cock" : "cocks"));
    exports.ParserFuncTags.set("dickplural", wrapper((player) => (player.body.cocks.length === 1) ? "dick" : "dicks"));
    exports.ParserFuncTags.set("headplural", wrapper((player) => (player.body.cocks.length === 1) ? "head" : "heads"));
    exports.ParserFuncTags.set("prickplural", wrapper((player) => (player.body.cocks.length === 1) ? "prick" : "pricks"));
    exports.ParserFuncTags.set("boy", wrapper((player) => GenderDescriptor_1.mf(player, "boy", "girl")));
    exports.ParserFuncTags.set("guy", wrapper((player) => GenderDescriptor_1.mf(player, "guy", "girl")));
    // "wings": (player: Character) => wingsDescript(),
    // "tail": (player: Character) => tailDescript(),
    // "onetail": (player: Character) => oneTailDescript(),
    // Conditional
    exports.ParserCondTags.set("strength", wrapper((player) => player.stats.str));
    exports.ParserCondTags.set("toughness", wrapper((player) => player.stats.tou));
    exports.ParserCondTags.set("speed", wrapper((player) => player.stats.spe));
    exports.ParserCondTags.set("intelligence", wrapper((player) => player.stats.int));
    exports.ParserCondTags.set("libido", wrapper((player) => player.stats.lib));
    exports.ParserCondTags.set("sensitivity", wrapper((player) => player.stats.sens));
    exports.ParserCondTags.set("corruption", wrapper((player) => player.stats.cor));
    exports.ParserCondTags.set("fatigue", wrapper((player) => player.stats.fatigue));
    exports.ParserCondTags.set("hp", wrapper((player) => player.stats.HP));
    exports.ParserCondTags.set("hour", wrapper(() => Time_1.Time.hour));
    exports.ParserCondTags.set("days", wrapper(() => Time_1.Time.day));
    exports.ParserCondTags.set("tallness", wrapper((player) => player.body.tallness));
    exports.ParserCondTags.set("hairlength", wrapper((player) => player.body.hair.length));
    exports.ParserCondTags.set("femininity", wrapper((player) => player.body.femininity));
    exports.ParserCondTags.set("masculinity", wrapper((player) => 100 - player.body.femininity));
    exports.ParserCondTags.set("cocks", wrapper((player) => player.body.cocks.length));
    exports.ParserCondTags.set("breastrows", wrapper((player) => player.body.chest.length));
    exports.ParserCondTags.set("biggesttitsize", wrapper((player) => player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating));
    exports.ParserCondTags.set("vagcapacity", wrapper((player) => player.vaginalCapacity()));
    exports.ParserCondTags.set("analcapacity", wrapper((player) => player.analCapacity()));
    exports.ParserCondTags.set("balls", wrapper((player) => player.body.balls.count));
    exports.ParserCondTags.set("cumquantity", wrapper((player) => player.cumQ()));
    exports.ParserCondTags.set("milkquantity", wrapper((player) => player.lactationQ()));
    exports.ParserCondTags.set("hasvagina", wrapper((player) => player.body.vaginas.length > 0));
    exports.ParserCondTags.set("istaur", wrapper((player) => player.body.legs.isTaur()));
    exports.ParserCondTags.set("isnaga", wrapper((player) => player.body.legs.isNaga()));
    exports.ParserCondTags.set("isgoo", wrapper((player) => player.body.legs.isGoo()));
    exports.ParserCondTags.set("isbiped", wrapper((player) => player.body.legs.isBiped()));
    exports.ParserCondTags.set("hasbreasts", wrapper((player) => (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 1)));
    exports.ParserCondTags.set("hasballs", wrapper((player) => (player.body.balls.count > 0)));
    exports.ParserCondTags.set("hascock", wrapper((player) => player.body.cocks.length > 0));
    exports.ParserCondTags.set("isherm", wrapper((player) => (player.gender === 3)));
    exports.ParserCondTags.set("cumnormal", wrapper((player) => (player.cumQ() <= 150)));
    exports.ParserCondTags.set("cummedium", wrapper((player) => (player.cumQ() > 150 && player.cumQ() <= 350)));
    exports.ParserCondTags.set("cumhigh", wrapper((player) => (player.cumQ() > 350 && player.cumQ() <= 1000)));
    exports.ParserCondTags.set("cumveryhigh", wrapper((player) => (player.cumQ() > 1000 && player.cumQ() <= 2500)));
    exports.ParserCondTags.set("cumextreme", wrapper((player) => (player.cumQ() > 2500)));
    exports.ParserCondTags.set("issquirter", wrapper((player) => (player.body.vaginas.get(0).wetness >= 4)));
    exports.ParserCondTags.set("ispregnant", wrapper((player) => !!(player.body.wombs.find(Womb_1.Womb.Pregnant))));
    exports.ParserCondTags.set("isbuttpregnant", wrapper((player) => (player.body.buttWomb.isPregnant())));
    exports.ParserCondTags.set("hasnipplecunts", wrapper((player) => !!player.body.chest.find(BreastRow_1.BreastRow.FuckableNipples)));
    exports.ParserCondTags.set("canfly", wrapper((player) => player.canFly()));
    exports.ParserCondTags.set("islactating", wrapper((player) => (player.lactationQ() > 0)));
    exports.ParserCondTags.set("true", () => true);
    exports.ParserCondTags.set("false", () => false);
    // Double arg
    // For subject: "cock"
    exports.ParserFuncTags.set("all", wrapper((player) => CockDescriptor_1.describeCocksLight(player)));
    exports.ParserFuncTags.set("each", wrapper((player) => CockDescriptor_1.describeOneOfYourCocks(player)));
    exports.ParserFuncTags.set("one", wrapper((player) => CockDescriptor_1.describeEachOfYourCocks(player)));
    exports.ParserFuncTags.set("largest", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Largest).get(0))));
    exports.ParserFuncTags.set("biggest", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Largest).get(0))));
    exports.ParserFuncTags.set("biggest2", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Largest).get(1))));
    exports.ParserFuncTags.set("biggest3", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Largest).get(2))));
    exports.ParserFuncTags.set("smallest", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Smallest).get(0))));
    exports.ParserFuncTags.set("smallest2", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Smallest).get(1))));
    exports.ParserFuncTags.set("longest", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Longest).get(0))));
    exports.ParserFuncTags.set("shortest", wrapper((player) => CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Shortest).get(0))));
    // For subject: "cockHead"
    exports.ParserFuncTags.set("biggest", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Largest).get(0))));
    exports.ParserFuncTags.set("biggest2", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Largest).get(1))));
    exports.ParserFuncTags.set("biggest3", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Largest).get(2))));
    exports.ParserFuncTags.set("largest", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Largest).get(0))));
    exports.ParserFuncTags.set("smallest", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Smallest).get(0))));
    exports.ParserFuncTags.set("smallest2", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Smallest).get(1))));
    // the *head* of a cock has a length? Wut?
    exports.ParserFuncTags.set("longest", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Longest).get(0))));
    exports.ParserFuncTags.set("shortest", wrapper((player) => CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Shortest).get(0))));
    // These tags take a two-word tag with a **numberic** attribute for lookup.
    // [object NUMERIC-attribute]
    // if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
    // If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
    // like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
    //
    // if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
    exports.ParserFuncTags.set("cockfit", wrapper((player, num) => {
        if (player.body.cocks.length <= 0)
            return "<b>(Attempt to parse cock when none present.)</b>";
        else {
            if (player.body.cocks.find(Cock_1.Cock.CockThatFits(num)))
                return CockDescriptor_1.describeCock(player, player.body.cocks.find(Cock_1.Cock.CockThatFits(num)));
            else
                return CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Smallest).get(0));
        }
    }));
    exports.ParserFuncTags.set("cockfit2", wrapper((player, num) => {
        if (player.body.cocks.length <= 0)
            return "<b>(Attempt to parse cock when none present.)</b>";
        else {
            if (player.body.cocks.filter(Cock_1.Cock.CocksThatFit(num)).get(1))
                return CockDescriptor_1.describeCock(player, player.body.cocks.filter(Cock_1.Cock.CocksThatFit(num)).get(1));
            else
                return CockDescriptor_1.describeCock(player, player.body.cocks.sort(Cock_1.Cock.Smallest).get(0));
        }
    }));
    exports.ParserFuncTags.set("cockheadfit", wrapper((player, num) => {
        if (player.body.cocks.length <= 0) {
            return "<b>(Attempt to parse cockhead when none present.)</b>";
        }
        else {
            if (player.body.cocks.find(Cock_1.Cock.CockThatFits(num)))
                return CockDescriptor_1.describeCockHead(player.body.cocks.find(Cock_1.Cock.CockThatFits(num)));
            else
                return CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Smallest).get(0));
        }
    }));
    exports.ParserFuncTags.set("cockheadfit2", wrapper((player, num) => {
        if (player.body.cocks.length <= 0)
            return "<b>(Attempt to parse cockhead when none present.)</b>";
        else {
            if (player.body.cocks.filter(Cock_1.Cock.CocksThatFit(num)).get(1))
                return CockDescriptor_1.describeCockHead(player.body.cocks.filter(Cock_1.Cock.CocksThatFit(num)).get(1));
            else
                return CockDescriptor_1.describeCockHead(player.body.cocks.sort(Cock_1.Cock.Smallest).get(0));
        }
    }));
    // Add previous tags with the first letter of each key uppercased for first letter uppercase
    for (const tag of exports.ParserFuncTags.entries()) {
        exports.ParserFuncTags.set(tag[0][0].toUpperCase() + tag[0].slice(1), (...args) => {
            const results = tag[1](args);
            if (typeof results === "string" && results.length > 0)
                return results[0].toUpperCase() + results.slice(1);
            return results;
        });
    }
});
//# sourceMappingURL=ParserTags.js.map