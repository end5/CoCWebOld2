define(["require", "exports", "Engine/Flags", "Engine/Display/ContentView", "../PassTime", "Engine/Body/Cock", "Content/Descriptors/CockDescriptor", "Content/Utilities/NumToText", "Content/Descriptors/HipDescriptor", "Engine/Body/BreastRow", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/VaginaDescriptor", "Engine/Body/Vagina", "Content/Descriptors/LegDescriptor", "Engine/Utilities/SMath", "Content/Scenes/NotImplemented"], function (require, exports, Flags_1, ContentView_1, PassTime_1, Cock_1, CockDescriptor_1, NumToText_1, HipDescriptor_1, BreastRow_1, BreastDescriptor_1, BallsDescriptor_1, ButtDescriptor_1, VaginaDescriptor_1, Vagina_1, LegDescriptor_1, SMath_1, NotImplemented_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DesertFlags = Flags_1.Flags.register("Desert", {
        TIMES_EXPLORED: 0,
    });
    function exploreDesert(player) {
        return NotImplemented_1.sceneNotImplimented();
    }
    exports.exploreDesert = exploreDesert;
    // Massive bodyparts scene
    // [DESERT]
    // [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT,
    // AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
    function bigJunkDesertScene(player) {
        const longestCock = player.body.cocks.sort(Cock_1.Cock.Longest).get(0);
        // PARAGRAPH 1
        ContentView_1.CView.text("Walking along the sandy dunes of the desert you find yourself increasingly impeded by the bulk of your " + CockDescriptor_1.describeCock(player, longestCock) + " dragging along the sandscape behind you.  The incredibly hot surface of the desert causes your loins to sweat heavily and fills them with relentless heat.");
        if (player.body.cocks.length === 1)
            ContentView_1.CView.text("  As it drags along the dunes, the sensation forces you to imagine the rough textured tongue of a monstrous animal sliding along the head of your " + CockDescriptor_1.nounCock(longestCock.type) + ".");
        else if (player.body.cocks.length >= 2)
            ContentView_1.CView.text("  With all of your " + CockDescriptor_1.describeCocksLight(player) + " dragging through the sands they begin feeling as if the rough textured tongues of " + NumToText_1.numToCardinalText(player.body.cocks.length) + " different monstrous animals were slobbering over each one.");
        ContentView_1.CView.text("\n\n");
        // PARAGRAPH 2
        // FOR NON-CENTAURS]
        if (!player.body.legs.isTaur()) {
            ContentView_1.CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor_1.describeCocksLight(player) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward but your genitals have grown too large and heavy for your " + HipDescriptor_1.describeHips(player) + " to hold them aloft.  Instead you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down on top of your obscene " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 35)
                ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeAllBreasts(player) + " hang lewdly off your torso to rest on the desert sands, seeming to bury the dunes on either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The burning heat of the desert teases your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s mercilessly as they grind in the sand.");
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (player.body.balls.count > 0)
                ContentView_1.CView.text("  Your " + player.body.skin.tone + BallsDescriptor_1.describeSack(player) + " rests beneath your raised " + ButtDescriptor_1.describeButt(player) + ".  The fiery warmth of the desert caresses it, causing your " + BallsDescriptor_1.describeBalls(true, true, player) + " to pulse with the need to release their sperm through your " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (player.body.vaginas.length >= 1) {
                ContentView_1.CView.text("  Your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " and " + VaginaDescriptor_1.describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor_1.describeButt(player) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (player.body.vaginas.get(0).wetness >= Vagina_1.VaginaWetness.DROOLING)
                    ContentView_1.CView.text("  Juices stream from your womanhood and begin pooling on the hot sand beneath you.  Wisps of steam rise up into the air only to tease your genitals further.  ");
            }
        }
        // FOR CENTAURS
        else {
            ContentView_1.CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor_1.describeCocksLight(player) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + HipDescriptor_1.describeHips(player) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hindquarters until you rest atop your " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 35)
                ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeAllBreasts(player) + " pull your human torso forward until it also is forced to rest facedown, just like your horse half.  Your tits rest, pinned on the desert sand to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The burning heat of the desert teases your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s incessantly.");
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (player.body.balls.count > 0)
                ContentView_1.CView.text("  Your " + player.body.skin.tone + BallsDescriptor_1.describeSack(player) + " rests beneath your raised " + ButtDescriptor_1.describeButt(player) + ".  The airy warmth of the desert teases it, causing your " + BallsDescriptor_1.describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (player.body.vaginas.length >= 1) {
                ContentView_1.CView.text("  Your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " and " + VaginaDescriptor_1.describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor_1.describeButt(player) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (player.body.vaginas.get(0).wetness >= Vagina_1.VaginaWetness.DROOLING)
                    ContentView_1.CView.text("  The desert sun beats down on your body, its fiery heat inflaming the senses of your vaginal lips.  Juices stream from your womanhood and begin pooling on the hot sand beneath you.");
            }
        }
        ContentView_1.CView.text("\n\n");
        // PARAGRAPH 3
        ContentView_1.CView.text("You realize you are effectively trapped here by your own body.");
        // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
        if (player.stats.cor < 33)
            ContentView_1.CView.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
        else if (player.stats.cor < 66)
            ContentView_1.CView.text("  You realize that if any dangerous predator were to find you in this state you'd be completely defenseless.  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
        else
            ContentView_1.CView.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you're exhilarated at the prospect.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might die of thirst in the desert, you'd be incredibly tempted to remain right where you are.");
        // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
        if (player.canFly())
            ContentView_1.CView.text("  You extend your wings and flap as hard as you can, until at last you manage to lighten the bulk of your body somewhat - enough to allow yourself to drag your genitals across the hot sands and back to camp.  The ordeal takes nearly an hour.");
        // SCENE END IF CHARACTER HAS CENTAUR BODY
        else if (player.body.legs.isTaur())
            ContentView_1.CView.text("  You struggle and work your equine legs against the surface of the dune you are trapped on.  Your " + LegDescriptor_1.describeFeet(player) + " have consistent trouble finding footing, the soft sand failing to provide enough leverage to lift your bulk.  You breath in deeply and lean from side to side, trying to find some easier vertical leverage.  Eventually, with a crude crawl, your legs manage to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals across the sandscape and back to camp.");
        // SCENE END = FOR ALL OTHER CHARACTERS
        else
            ContentView_1.CView.text("  You struggle and push with your " + LegDescriptor_1.describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + CockDescriptor_1.describeCocksLight(player) + " with as much vigor as you can muster.  Eventually your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're simply too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later " + CockDescriptor_1.describeOneOfYourCocks(player) + " softens enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the warm sand.");
        player.stats.raw.lust += 25 + SMath_1.randInt(player.stats.cor / 5);
        player.stats.fatigue += 5;
        return { next: PassTime_1.passTime(1) };
    }
    exports.bigJunkDesertScene = bigJunkDesertScene;
});
//# sourceMappingURL=Desert.js.map