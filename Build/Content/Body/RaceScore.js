define(["require", "exports", "Engine/Body/Arms", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Hair", "Engine/Body/Antennae", "Engine/Body/Horns", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Tongue", "Engine/Body/Vagina", "Engine/Body/Wings", "Content/Effects/EffectType"], function (require, exports, Arms_1, BreastRow_1, Cock_1, Ears_1, Eyes_1, Face_1, Hair_1, Antennae_1, Horns_1, Legs_1, Skin_1, Tail_1, Tongue_1, Vagina_1, Wings_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function demonRaceScore(character) {
        let demonCounter = 0;
        if (character.body.horns.count === Horns_1.HornType.DEMON && character.body.horns.count > 0) {
            demonCounter++;
            if (character.body.horns.count > 4)
                demonCounter++;
        }
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.DEMONIC)).length > 1)
            demonCounter++;
        if (character.body.wings.type === Wings_1.WingType.BAT_LIKE_LARGE ||
            character.body.wings.type === Wings_1.WingType.BAT_LIKE_TINY)
            demonCounter++;
        if (character.body.skin.type === Skin_1.SkinType.PLAIN && character.stats.cor > 50)
            demonCounter++;
        if (character.body.face.type === Face_1.FaceType.HUMAN && character.stats.cor > 50)
            demonCounter++;
        if (character.body.legs.type === Legs_1.LegType.DEMONIC_HIGH_HEELS ||
            character.body.legs.type === Legs_1.LegType.DEMONIC_CLAWS)
            demonCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DEMON)).length > 0)
            demonCounter++;
        return demonCounter;
    }
    exports.demonRaceScore = demonRaceScore;
    // Determine Human Rating
    function humanRaceScore(character) {
        let humanCounter = 0;
        if (character.body.face.type === Face_1.FaceType.HUMAN)
            humanCounter++;
        if (character.body.skin.type === Skin_1.SkinType.PLAIN)
            humanCounter++;
        if (character.body.horns.count === Horns_1.HornType.NONE)
            humanCounter++;
        if (character.body.tails.length === 0)
            humanCounter++;
        if (character.body.wings.type === Wings_1.WingType.NONE)
            humanCounter++;
        if (character.body.legs.type === Legs_1.LegType.HUMAN)
            humanCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HUMAN)).length === 1 && character.body.cocks.length === 1)
            humanCounter++;
        if (character.body.chest.length === 1 && character.body.skin.type === Skin_1.SkinType.PLAIN)
            humanCounter++;
        return humanCounter;
    }
    exports.humanRaceScore = humanRaceScore;
    // Determine minotaur rating
    function minotaurRaceScore(character) {
        let minoCounter = 0;
        if (character.body.face.type === Face_1.FaceType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.ears.type === Ears_1.EarType.COW)
            minoCounter++;
        if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false))
            minoCounter++;
        if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.legs.type === Legs_1.LegType.HOOFED && minoCounter > 0)
            minoCounter++;
        if (character.body.tallness > 80 && minoCounter > 0)
            minoCounter++;
        if (character.body.cocks.length > 0 && minoCounter > 0) {
            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)))
                minoCounter++;
        }
        if (character.body.vaginas.length > 0)
            minoCounter--;
        return minoCounter;
    }
    exports.minotaurRaceScore = minotaurRaceScore;
    // Determine cow rating
    function cowRaceScore(character) {
        let minoCounter = 0;
        if (character.body.face.type === 0)
            minoCounter++;
        if (character.body.face.type === Face_1.FaceType.COW_MINOTAUR)
            minoCounter--;
        if (character.body.ears.type === Ears_1.EarType.COW)
            minoCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.COW)).length > 0)
            minoCounter++;
        if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR)
            minoCounter++;
        if (character.body.legs.type === 1 && minoCounter > 0)
            minoCounter++;
        if (character.body.tallness >= 73 && minoCounter > 0)
            minoCounter++;
        if (character.body.vaginas.length > 0)
            minoCounter++;
        if (character.body.chest.length > 0) {
            if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 4 && minoCounter > 0)
                minoCounter++;
            if (character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).rating > 2 && minoCounter > 0)
                minoCounter++;
        }
        return minoCounter;
    }
    exports.cowRaceScore = cowRaceScore;
    function sandTrapRaceScore(character) {
        let counter = 0;
        if (character.effects.has(EffectType_1.EffectType.BlackNipples))
            counter++;
        if (character.body.vaginas.length > 0 && character.body.vaginas.get(0).type === Vagina_1.VaginaType.BLACK_SAND_TRAP)
            counter++;
        if (character.body.eyes.type === Eyes_1.EyeType.BLACK_EYES_SAND_TRAP)
            counter++;
        if (character.body.wings.type === 12)
            counter++;
        if (character.effects.has(EffectType_1.EffectType.Uniball))
            counter++;
        return counter;
    }
    exports.sandTrapRaceScore = sandTrapRaceScore;
    // Determine Bee Rating
    function beeRaceScore(character) {
        let beeCounter = 0;
        if (character.body.hair.color === "shiny black")
            beeCounter++;
        if (character.body.hair.color === "black and yellow")
            beeCounter += 2;
        if (character.body.antennae.type > 0) {
            beeCounter++;
            if (character.body.face.type === Face_1.FaceType.HUMAN)
                beeCounter++;
        }
        if (character.body.legs.type === Legs_1.LegType.BEE) {
            beeCounter++;
            if (character.body.vaginas.length === 1)
                beeCounter++;
        }
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.BEE_ABDOMEN)).length > 0)
            beeCounter++;
        if (character.body.wings.type === Wings_1.WingType.BEE_LIKE_LARGE)
            beeCounter++;
        if (character.body.wings.type === Wings_1.WingType.BEE_LIKE_SMALL)
            beeCounter++;
        return beeCounter;
    }
    exports.beeRaceScore = beeRaceScore;
    // Determine Ferret Rating!
    function ferretRaceScore(character) {
        let counter = 0;
        if (character.body.face.type === Face_1.FaceType.FERRET_MASK)
            counter++;
        if (character.body.face.type === Face_1.FaceType.FERRET)
            counter += 2;
        if (character.body.ears.type === Ears_1.EarType.FERRET)
            counter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FERRET)).length > 0)
            counter++;
        if (character.body.legs.type === Legs_1.LegType.FERRET)
            counter++;
        if (character.body.skin.type === Skin_1.SkinType.FUR && counter > 0)
            counter++;
        return counter;
    }
    exports.ferretRaceScore = ferretRaceScore;
    // Determine Dog Rating
    function dogRaceScore(character) {
        let dogCounter = 0;
        if (character.body.face.type === Face_1.FaceType.DOG)
            dogCounter++;
        if (character.body.ears.type === Ears_1.EarType.DOG)
            dogCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.DOG)).length > 0)
            dogCounter++;
        if (character.body.legs.type === Legs_1.LegType.DOG)
            dogCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length > 0)
            dogCounter++;
        if (character.body.chest.length > 1)
            dogCounter++;
        if (character.body.chest.length === 3)
            dogCounter++;
        if (character.body.chest.length > 3)
            dogCounter--;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && dogCounter > 0)
            dogCounter++;
        return dogCounter;
    }
    exports.dogRaceScore = dogRaceScore;
    function mouseRaceScore(character) {
        let coonCounter = 0;
        if (character.body.ears.type === Ears_1.EarType.MOUSE)
            coonCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.MOUSE)).length > 0)
            coonCounter++;
        if (character.body.face.type === Face_1.FaceType.BUCKTEETH)
            coonCounter++;
        if (character.body.face.type === Face_1.FaceType.MOUSE)
            coonCounter += 2;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && coonCounter > 0)
            coonCounter++;
        if (character.body.tallness < 55 && coonCounter > 0)
            coonCounter++;
        if (character.body.tallness < 45 && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }
    exports.mouseRaceScore = mouseRaceScore;
    function raccoonRaceScore(character) {
        let coonCounter = 0;
        if (character.body.face.type === Face_1.FaceType.RACCOON)
            coonCounter++;
        if (character.body.face.type === Face_1.FaceType.RACCOON_MASK)
            coonCounter += 2;
        if (character.body.ears.type === Ears_1.EarType.RACCOON)
            coonCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.RACCOON)).length > 0)
            coonCounter++;
        if (character.body.legs.type === Legs_1.LegType.RACCOON)
            coonCounter++;
        if (coonCounter > 0 && character.body.balls.count > 0)
            coonCounter++;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && coonCounter > 0)
            coonCounter++;
        return coonCounter;
    }
    exports.raccoonRaceScore = raccoonRaceScore;
    // Determine Fox Rating
    function foxRaceScore(character) {
        let foxCounter = 0;
        if (character.body.face.type === Face_1.FaceType.FOX)
            foxCounter++;
        if (character.body.ears.type === Ears_1.EarType.FOX)
            foxCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length > 0)
            foxCounter++;
        if (character.body.legs.type === Legs_1.LegType.FOX)
            foxCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length > 0 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.length > 1 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.length === 3 && foxCounter > 0)
            foxCounter++;
        if (character.body.chest.length === 4 && foxCounter > 0)
            foxCounter++;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && foxCounter > 0)
            foxCounter++;
        return foxCounter;
    }
    exports.foxRaceScore = foxRaceScore;
    // Determine cat Rating
    function catRaceScore(character) {
        let catCounter = 0;
        if (character.body.face.type === Face_1.FaceType.CAT)
            catCounter++;
        if (character.body.ears.type === Ears_1.EarType.CAT)
            catCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.CAT)).length > 0)
            catCounter++;
        if (character.body.legs.type === Legs_1.LegType.CAT)
            catCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.CAT)).length > 0)
            catCounter++;
        if (character.body.chest.length > 1 && catCounter > 0)
            catCounter++;
        if (character.body.chest.length === 3 && catCounter > 0)
            catCounter++;
        if (character.body.chest.length > 3)
            catCounter -= 2;
        // Fur only counts if some canine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && catCounter > 0)
            catCounter++;
        return catCounter;
    }
    exports.catRaceScore = catRaceScore;
    // Determine lizard rating
    function lizardRaceScore(character) {
        let lizardCounter = 0;
        if (character.body.face.type === Face_1.FaceType.LIZARD)
            lizardCounter++;
        if (character.body.ears.type === Ears_1.EarType.LIZARD)
            lizardCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.LIZARD)).length > 0)
            lizardCounter++;
        if (character.body.legs.type === Legs_1.LegType.LIZARD)
            lizardCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length > 0)
            lizardCounter++;
        if (character.body.horns.count > 0 &&
            (character.body.horns.type === Horns_1.HornType.DRACONIC_X2 ||
                character.body.horns.type === Horns_1.HornType.DRACONIC_X4_12_INCH_LONG))
            lizardCounter++;
        if (character.body.skin.type === 2)
            lizardCounter++;
        return lizardCounter;
    }
    exports.lizardRaceScore = lizardRaceScore;
    function spiderRaceScore(character) {
        let score = 0;
        if (character.body.eyes.type === Eyes_1.EyeType.FOUR_SPIDER_EYES)
            score += 2;
        if (character.body.face.type === Face_1.FaceType.SPIDER_FANGS)
            score++;
        if (character.body.arms.type === Arms_1.ArmType.SPIDER)
            score++;
        if (character.body.legs.type === Legs_1.LegType.CHITINOUS_SPIDER_LEGS || character.body.legs.type === Legs_1.LegType.DRIDER_LOWER_BODY)
            score += 2;
        else if (score > 0)
            score--;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.SPIDER_ABDOMEN)).length > 0)
            score += 2;
        if (character.body.skin.type !== Skin_1.SkinType.PLAIN && score > 0)
            score--;
        return score;
    }
    exports.spiderRaceScore = spiderRaceScore;
    // Determine Horse Rating
    function horseRaceScore(character) {
        let horseCounter = 0;
        if (character.body.face.type === Face_1.FaceType.HORSE)
            horseCounter++;
        if (character.body.ears.type === Ears_1.EarType.HORSE)
            horseCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.HORSE)).length > 0)
            horseCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 0)
            horseCounter++;
        if (character.body.legs.type === Legs_1.LegType.HOOFED || character.body.legs.type === Legs_1.LegType.CENTAUR)
            horseCounter++;
        // Fur only counts if some equine features are present
        if (character.body.skin.type === Skin_1.SkinType.FUR && horseCounter > 0)
            horseCounter++;
        return horseCounter;
    }
    exports.horseRaceScore = horseRaceScore;
    // Determine kitsune Rating
    function kitsuneRaceScore(character) {
        let kitsuneCounter = 0;
        if (character.body.ears.type === Ears_1.EarType.FOX)
            kitsuneCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length > 0)
            kitsuneCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length > 0 && character.body.tails.length >= 2)
            kitsuneCounter += 2;
        if (character.body.vaginas.length > 0 && character.body.vaginas.get(0).capacity() >= 8000)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.body.face.type === Face_1.FaceType.HUMAN)
            kitsuneCounter++;
        if (kitsuneCounter > 0 && (character.body.hair.color === "golden blonde" ||
            character.body.hair.color === "black" ||
            character.body.hair.color === "red" ||
            character.body.hair.color === "white" ||
            character.body.hair.color === "silver blonde"))
            kitsuneCounter++;
        if (kitsuneCounter > 0 && character.body.femininity >= 40)
            kitsuneCounter++;
        if (character.body.skin.type !== Skin_1.SkinType.PLAIN)
            kitsuneCounter -= 2;
        if (character.body.skin.type === Skin_1.SkinType.FUR)
            kitsuneCounter--;
        if (character.body.legs.type !== Legs_1.LegType.HUMAN)
            kitsuneCounter--;
        if (character.body.face.type !== Face_1.FaceType.HUMAN)
            kitsuneCounter--;
        if (character.body.ears.type !== Ears_1.EarType.FOX)
            kitsuneCounter--;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length <= 0)
            kitsuneCounter--;
        return kitsuneCounter;
    }
    exports.kitsuneRaceScore = kitsuneRaceScore;
    // Determine Horse Rating
    function dragonRaceScore(character) {
        let dragonCounter = 0;
        if (character.body.face.type === Face_1.FaceType.DRAGON)
            dragonCounter++;
        if (character.body.ears.type === Ears_1.EarType.DRAGON)
            dragonCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.DRACONIC)).length > 0)
            dragonCounter++;
        if (character.body.tongue.type === Tongue_1.TongueType.DRACONIC)
            dragonCounter++;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DRAGON)).length > 0)
            dragonCounter++;
        if (character.body.wings.type === Wings_1.WingType.DRACONIC_SMALL)
            dragonCounter++;
        if (character.body.wings.type === Wings_1.WingType.DRACONIC_LARGE)
            dragonCounter += 2;
        if (character.body.legs.type === Legs_1.LegType.DRAGON)
            dragonCounter++;
        if (character.body.skin.type === Skin_1.SkinType.SCALES && dragonCounter > 0)
            dragonCounter++;
        if (character.body.horns.type === Horns_1.HornType.DRACONIC_X4_12_INCH_LONG || character.body.horns.type === Horns_1.HornType.DRACONIC_X2)
            dragonCounter++;
        return dragonCounter;
    }
    exports.dragonRaceScore = dragonRaceScore;
    // Goblinscore
    function goblinRaceScore(character) {
        let goblinCounter = 0;
        if (character.body.ears.type === Ears_1.EarType.ELFIN)
            goblinCounter++;
        if (character.body.skin.tone === "pale yellow" || character.body.skin.tone === "grayish-blue" || character.body.skin.tone === "green" || character.body.skin.tone === "dark green")
            goblinCounter++;
        if (goblinCounter > 0) {
            if (character.body.face.type === Face_1.FaceType.HUMAN)
                goblinCounter++;
            if (character.body.tallness < 48)
                goblinCounter++;
            if (character.body.vaginas.length > 0)
                goblinCounter++;
            if (character.body.legs.type === 0)
                goblinCounter++;
        }
        return goblinCounter;
    }
    exports.goblinRaceScore = goblinRaceScore;
    // Gooscore
    function gooRaceScore(character) {
        let gooCounter = 0;
        if (character.body.hair.type === Hair_1.HairType.GOO)
            gooCounter++;
        if (character.body.skin.adj === "slimy")
            gooCounter++;
        if (character.body.legs.type === Legs_1.LegType.GOO)
            gooCounter++;
        if (character.body.vaginas.length > 0 && character.body.vaginas.get(0).capacity() > 9000)
            gooCounter++;
        if (character.effects.has(EffectType_1.EffectType.SlimeCraving))
            gooCounter++;
        return gooCounter;
    }
    exports.gooRaceScore = gooRaceScore;
    // Nagascore
    function nagaRaceScore(character) {
        let nagaCounter = 0;
        if (character.body.face.type === Face_1.FaceType.SNAKE_FANGS)
            nagaCounter++;
        if (character.body.tongue.type === Tongue_1.TongueType.SNAKE)
            nagaCounter++;
        if (nagaCounter > 0 && character.body.antennae.type === Antennae_1.AntennaeType.NONE)
            nagaCounter++;
        if (nagaCounter > 0 && character.body.wings.type === Wings_1.WingType.NONE)
            nagaCounter++;
        return nagaCounter;
    }
    exports.nagaRaceScore = nagaRaceScore;
    // Bunnyscore
    function bunnyRaceScore(character) {
        let bunnyCounter = 0;
        if (character.body.face.type === Face_1.FaceType.BUNNY)
            bunnyCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.BUNNY)).length > 0)
            bunnyCounter++;
        if (character.body.ears.type === Ears_1.EarType.BUNNY)
            bunnyCounter++;
        if (character.body.legs.type === Legs_1.LegType.BUNNY)
            bunnyCounter++;
        // More than 2 balls reduces bunny score
        if (character.body.balls.count > 2 && bunnyCounter > 0)
            bunnyCounter--;
        // Human skin on bunmorph adds
        if (character.body.skin.type === Skin_1.SkinType.PLAIN && bunnyCounter > 1)
            bunnyCounter++;
        // No wings and character.torso.antennae a plus
        if (bunnyCounter > 0 && character.body.antennae.type === Antennae_1.AntennaeType.NONE)
            bunnyCounter++;
        if (bunnyCounter > 0 && character.body.wings.type === Wings_1.WingType.NONE)
            bunnyCounter++;
        return bunnyCounter;
    }
    exports.bunnyRaceScore = bunnyRaceScore;
    // Harpyscore
    function harpyRaceScore(character) {
        let harpy = 0;
        if (character.body.arms.type === Arms_1.ArmType.HARPY)
            harpy++;
        if (character.body.hair.type === Hair_1.HairType.FEATHER)
            harpy++;
        if (character.body.wings.type === Wings_1.WingType.HARPY)
            harpy++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.HARPY)).length > 0)
            harpy++;
        if (character.body.legs.type === Legs_1.LegType.HARPY)
            harpy++;
        if (harpy >= 2 && character.body.face.type === Face_1.FaceType.HUMAN)
            harpy++;
        if (harpy >= 2 && (character.body.ears.type === Ears_1.EarType.HUMAN || character.body.ears.type === Ears_1.EarType.ELFIN))
            harpy++;
        return harpy;
    }
    exports.harpyRaceScore = harpyRaceScore;
    // Kangascore
    function kangaRaceScore(character) {
        let kanga = 0;
        if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.KANGAROO)).length > 0)
            kanga++;
        if (character.body.ears.type === Ears_1.EarType.KANGAROO)
            kanga++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.KANGAROO)).length > 0)
            kanga++;
        if (character.body.legs.type === Legs_1.LegType.KANGAROO)
            kanga++;
        if (character.body.face.type === Face_1.FaceType.KANGAROO)
            kanga++;
        if (kanga >= 2 && character.body.skin.type === Skin_1.SkinType.FUR)
            kanga++;
        return kanga;
    }
    exports.kangaRaceScore = kangaRaceScore;
    // sharkscore
    function sharkRaceScore(character) {
        let sharkCounter = 0;
        if (character.body.face.type === Face_1.FaceType.SHARK_TEETH)
            sharkCounter++;
        if (character.body.wings.type === Wings_1.WingType.SHARK_FIN)
            sharkCounter++;
        if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.SHARK)).length > 0)
            sharkCounter++;
        return sharkCounter;
    }
    exports.sharkRaceScore = sharkRaceScore;
    // Determine Mutant Rating
    function mutantRaceScore(character) {
        let mutantCounter = 0;
        if (character.body.face.type > 0)
            mutantCounter++;
        if (character.body.skin.type !== Skin_1.SkinType.PLAIN)
            mutantCounter++;
        if (character.body.tails.length > 0)
            mutantCounter++;
        if (character.body.cocks.length > 1)
            mutantCounter++;
        if (character.body.cocks.length > 0 && character.body.vaginas.length > 0)
            mutantCounter++;
        if (character.body.chest.find(BreastRow_1.BreastRow.FuckableNipples))
            mutantCounter++;
        if (character.body.chest.length > 1)
            mutantCounter++;
        /*if (character.torso.face.type == FaceType.HORSE) {
            if (character.body.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == TailType.HORSE)
                mutantCounter--;
        }
        if (character.torso.face.type == 2) {
            if (character.body.skin.type == SkinType.FUR)
                mutantCounter--;
            if (character.torso.tailType == 2)
                mutantCounter--;
        }*/
        return mutantCounter--;
    }
    exports.mutantRaceScore = mutantRaceScore;
});
//# sourceMappingURL=RaceScore.js.map