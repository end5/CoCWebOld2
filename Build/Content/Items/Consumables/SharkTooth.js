define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Cock", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Vagina", "Engine/Body/Wings", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Body/GenderIdentity", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/FaceDescriptor", "Content/Descriptors/LegDescriptor", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Cock_1, Eyes_1, Face_1, Skin_1, Tail_1, Vagina_1, Wings_1, EffectType_1, ItemDesc_1, GenderIdentity_1, BallsDescriptor_1, CockDescriptor_1, VaginaDescriptor_1, FaceDescriptor_1, LegDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SharkTooth extends Consumable_1.Consumable {
        constructor(enhanced) {
            if (!enhanced)
                super(ConsumableName_1.ConsumableName.SharkTooth, new ItemDesc_1.ItemDesc("Shark.T", "a sharp shark tooth", "A glinting white tooth, very sharp and intimidating."));
            else
                super(ConsumableName_1.ConsumableName.SharkToothEnhanced, new ItemDesc_1.ItemDesc("TSTooth", "a glowing tiger shark tooth", "This looks like a normal shark tooth, though with an odd purple glow."));
            this.enhanced = enhanced;
        }
        use(character) {
            let changes = 0;
            let changeLimit = 2;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            ContentView_1.CView.clear();
            if (!this.enhanced)
                ContentView_1.CView.text("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.");
            else
                ContentView_1.CView.text("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.");
            // STATS
            // Increase strength 1-2 points (Up to 50) (60 for tiger)
            if (((character.stats.str < 60 && this.enhanced) || character.stats.str < 50) && SMath_1.randInt(3) === 0) {
                character.stats.str += 1 + SMath_1.randInt(2);
                ContentView_1.CView.text("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.");
                changes++;
            }
            // Increase Speed 1-3 points (Up to 75) (100 for tigers)
            if (((character.stats.spe < 100 && this.enhanced) || character.stats.spe < 75) && SMath_1.randInt(3) === 0) {
                character.stats.spe += 1 + SMath_1.randInt(3);
                changes++;
                ContentView_1.CView.text("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.");
            }
            // Reduce sensitivity 1-3 Points (Down to 25 points)
            if (character.stats.sens > 25 && SMath_1.randInt(1.5) === 0 && changes < changeLimit) {
                character.stats.sens += -1 - SMath_1.randInt(3);
                changes++;
                ContentView_1.CView.text("\n\nIt takes a while, but you eventually realize your body has become less sensitive.");
            }
            // Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
            if (((character.stats.lib < 100 && this.enhanced) || character.stats.lib < 75) && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                character.stats.lib += 1 + SMath_1.randInt(3);
                changes++;
                ContentView_1.CView.text("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.");
            }
            // Decrease intellect 1-3 points (Down to 40 points)
            if (character.stats.int > 40 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                character.stats.int += -1 - SMath_1.randInt(3);
                changes++;
                ContentView_1.CView.text("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.");
            }
            // Smexual stuff!
            // -TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
            if (this.enhanced && (character.gender === GenderIdentity_1.Gender.NONE || (character.body.vaginas.length <= 0 && changes < changeLimit && SMath_1.randInt(3) === 0))) {
                changes++;
                // (balls)
                if (character.body.balls.count > 0)
                    ContentView_1.CView.text("\n\nAn itch starts behind your " + BallsDescriptor_1.describeBalls(true, true, character) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + BallsDescriptor_1.describeSack(character) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
                // (dick)
                else if (character.body.cocks.length > 0)
                    ContentView_1.CView.text("\n\nAn itch starts on your groin, just below your " + CockDescriptor_1.describeCocksLight(character) + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
                // (neither)
                else
                    ContentView_1.CView.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + character.inventory.armor.displayName + " to discover your brand new vagina, complete with pussy lips and a tiny clit.</b>");
                const newVagina = new Vagina_1.Vagina();
                character.body.vaginas.add(newVagina);
                character.stats.sens += 10;
            }
            // WANG GROWTH - TIGGERSHARK ONLY
            if (this.enhanced && (character.body.cocks.length <= 0) && changes < changeLimit && SMath_1.randInt(3) === 0) {
                // Genderless:
                if (character.body.vaginas.length <= 0)
                    ContentView_1.CView.text("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis");
                // Female:
                else
                    ContentView_1.CView.text("\n\nYou feel a sudden stabbing pain just above your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ", but a new human-shaped penis");
                if (character.body.balls.count === 0) {
                    ContentView_1.CView.text(" and a pair of balls");
                    character.body.balls.count = 2;
                    character.body.balls.size = 2;
                }
                ContentView_1.CView.text("!");
                const newCock = new Cock_1.Cock(7, 1.4);
                character.body.cocks.add(newCock);
                character.stats.lib += 4;
                character.stats.sens += 5;
                character.stats.lust += 20;
                changes++;
            }
            // (Requires the character having two testicles)
            if (this.enhanced && (character.body.balls.count === 0 || character.body.balls.count === 2) && character.body.cocks.length > 0 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                if (character.body.balls.count === 2) {
                    ContentView_1.CView.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + BallsDescriptor_1.describeSack(character) + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>");
                    character.body.balls.count = 4;
                }
                else if (character.body.balls.count === 0) {
                    ContentView_1.CView.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>");
                    character.body.balls.count = 2;
                    character.body.balls.size = 2;
                }
                character.stats.lib += 2;
                character.stats.sens += 3;
                character.stats.lust += 10;
                changes++;
            }
            // Transformations:
            // Mouth TF
            if (character.body.face.type !== Face_1.FaceType.SHARK_TEETH && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\n");
                if (character.body.face.type > Face_1.FaceType.HUMAN && character.body.face.type < Face_1.FaceType.SHARK_TEETH)
                    ContentView_1.CView.text("Your " + FaceDescriptor_1.describeFaceShort(character) + " explodes with agony, reshaping into a more human-like visage.  ");
                character.body.face.type = Face_1.FaceType.SHARK_TEETH;
                ContentView_1.CView.text("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)");
                changes++;
            }
            // Remove odd eyes
            if (changes < changeLimit && SMath_1.randInt(5) === 0 && character.body.eyes.type > Eyes_1.EyeType.HUMAN) {
                if (character.body.eyes.type === Eyes_1.EyeType.BLACK_EYES_SAND_TRAP) {
                    ContentView_1.CView.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
                }
                else {
                    ContentView_1.CView.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor_1.describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                    if (character.body.eyes.type === Eyes_1.EyeType.FOUR_SPIDER_EYES)
                        ContentView_1.CView.text("  Your multiple, arachnid eyes are gone!</b>");
                    ContentView_1.CView.text("  <b>You have normal, humanoid eyes again.</b>");
                }
                character.body.eyes.type = Eyes_1.EyeType.HUMAN;
                changes++;
            }
            // Tail TF
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.SHARK), false) && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                changes++;
                if (character.body.tails.length >= 1)
                    ContentView_1.CView.text("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + character.inventory.armor.displayName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your brand new shark tail.");
                else
                    ContentView_1.CView.text("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.");
                character.body.tails.clear();
                character.body.tails.add(new Tail_1.Tail(Tail_1.TailType.SHARK));
            }
            // Hair
            if (character.body.hair.color !== "silver" && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                changes++;
                ContentView_1.CView.text("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!");
                character.body.hair.color = "silver";
            }
            // Skin
            if (((character.body.skin.tone !== "rough gray" && character.body.skin.tone !== "orange and black striped") || character.body.skin.type !== Skin_1.SkinType.PLAIN) && SMath_1.randInt(7) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\n");
                if (character.body.skin.type === Skin_1.SkinType.FUR || character.body.skin.type === Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text("Your " + character.body.skin.desc + " falls out, collecting on the floor and exposing your supple skin underneath.  ");
                else if (character.body.skin.type === Skin_1.SkinType.GOO)
                    ContentView_1.CView.text("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ");
                else if (!this.enhanced)
                    ContentView_1.CView.text("Your skin itches and tingles becoming slightly rougher and turning gray.  ");
                if (!this.enhanced) {
                    ContentView_1.CView.text("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.");
                    character.body.skin.type = Skin_1.SkinType.PLAIN;
                    character.body.skin.desc = "skin";
                    character.body.skin.tone = "rough gray";
                    changes++;
                }
                else {
                    ContentView_1.CView.text("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by randIntom black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!");
                    character.body.skin.type = Skin_1.SkinType.PLAIN;
                    character.body.skin.desc = "skin";
                    character.body.skin.tone = "orange and black striped";
                    changes++;
                }
            }
            // FINZ R WINGS
            if (character.body.wings.type !== Wings_1.WingType.SHARK_FIN && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\n");
                if (character.body.wings.type > Wings_1.WingType.NONE)
                    ContentView_1.CView.text("Your wings fold into themselves, merging together with your back.  ");
                ContentView_1.CView.text("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + character.inventory.armor.displayName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + character.inventory.armor.displayName + " to accommodate your new fin.");
                character.body.wings.type = Wings_1.WingType.SHARK_FIN;
                character.body.wings.desc = "";
                changes++;
            }
            if (changes === 0) {
                ContentView_1.CView.text("\n\nNothing happened.  Weird.");
            }
        }
    }
    exports.SharkTooth = SharkTooth;
});
//# sourceMappingURL=SharkTooth.js.map