define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Body/Arms", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Antennae", "Engine/Body/Horns", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tongue", "Engine/Body/Vagina", "Engine/Body/Wings", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Body/GenderIdentity", "Engine/Display/ContentView", "Content/Body/RaceScore"], function (require, exports, Consumable_1, ConsumableName_1, Arms_1, BreastRow_1, Cock_1, Eyes_1, Face_1, Antennae_1, Horns_1, Legs_1, Skin_1, Tongue_1, Vagina_1, Wings_1, EffectType_1, ItemDesc_1, GenderIdentity_1, ContentView_1, RaceScore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hummus extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Hummus, new ItemDesc_1.ItemDesc("Hummus ", "a blob of cheesy-looking hummus", "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it."));
        }
        use(character) {
            ContentView_1.CView.clear();
            /*if (Game.debug) {
                CView.text("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.");
                character.inventory.items.destroyItems(consumables.HUMMUS_, 1);
                return;
            }*/
            ContentView_1.CView.text("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.");
            character.stats.str = 30;
            character.stats.spe = 30;
            character.stats.tou = 30;
            character.stats.int = 30;
            character.stats.sens = 20;
            character.stats.lib = 25;
            character.stats.cor = 5;
            character.stats.lust = 10;
            character.body.hair.type = 0;
            if (RaceScore_1.humanRaceScore(character) > 4) {
                ContentView_1.CView.text("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?");
            }
            else {
                ContentView_1.CView.text("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?");
            }
            character.body.arms.type = Arms_1.ArmType.HUMAN;
            character.body.eyes.type = Eyes_1.EyeType.HUMAN;
            character.body.tongue.type = Tongue_1.TongueType.HUMAN;
            character.body.face.type = Face_1.FaceType.HUMAN;
            character.body.horns.count = 0;
            character.body.horns.type = Horns_1.HornType.NONE;
            character.body.antennae.type = Antennae_1.AntennaeType.NONE;
            character.body.legs.type = Legs_1.LegType.HUMAN;
            character.body.wings.type = Wings_1.WingType.NONE;
            character.body.wings.desc = "non-existant";
            character.body.tails.clear();
            character.body.skin.type = Skin_1.SkinType.PLAIN;
            character.body.skin.desc = "skin";
            character.body.skin.adj = "";
            if (character.body.fertility > 15)
                character.body.fertility = 15;
            if (character.body.cumMultiplier > 50)
                character.body.cumMultiplier = 50;
            // Clear cocks
            character.body.cocks.clear();
            // Reset dongs!
            if (character.gender === GenderIdentity_1.Gender.MALE || character.gender === GenderIdentity_1.Gender.HERM) {
                character.body.cocks.add(new Cock_1.Cock(6, 1));
                character.body.balls.size = 2;
                if (character.body.balls.count > 2)
                    character.body.balls.count = 2;
            }
            // Non duders lose any nuts
            else {
                character.body.balls.count = 0;
                character.body.balls.size = 2;
            }
            // Clear vaginas
            let virgin = false;
            for (const vagina of character.body.vaginas) {
                if (vagina.virgin) {
                    virgin = true;
                    break;
                }
            }
            character.body.vaginas.clear();
            // Reset vaginal virginity to correct state
            if (character.gender >= 2) {
                const newVagina = new Vagina_1.Vagina();
                newVagina.virgin = virgin;
                newVagina.type = Vagina_1.VaginaType.HUMAN;
                character.body.vaginas.add(newVagina);
            }
            character.body.clit.length = .25;
            // Tighten butt!
            character.body.butt.rating = 2;
            character.body.hips.rating = 2;
            if (character.body.butt.looseness > 1)
                character.body.butt.looseness = 1;
            if (character.body.butt.wetness > 1)
                character.body.butt.wetness = 1;
            // Clear breasts
            character.body.chest.clear();
            const newBreastRow = new BreastRow_1.BreastRow();
            newBreastRow.nipples.length = .25;
            character.body.chest.add(newBreastRow);
            // Girls and herms get bewbs back
            if (character.gender > 2) {
                character.body.chest.firstRow.rating = 2;
            }
            else
                character.body.chest.firstRow.rating = 0;
            character.body.neck.gills = false;
            character.effects.removeByName(EffectType_1.EffectType.Uniball);
            character.effects.removeByName(EffectType_1.EffectType.BlackNipples);
        }
    }
    exports.Hummus = Hummus;
});
//# sourceMappingURL=Hummus.js.map