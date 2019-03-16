define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Ears", "Engine/Body/Tail", "Content/Effects/EffectType", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Content/Descriptors/LegDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/HipDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/BreastDescriptor", "Engine/Combat/Actions/CombatActionType"], function (require, exports, SMath_1, BreastRow_1, Ears_1, Tail_1, EffectType_1, CombatAction_1, ContentView_1, LegDescriptor_1, BallsDescriptor_1, HipDescriptor_1, ButtDescriptor_1, BreastDescriptor_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Run extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Run";
            this.type = CombatActionType_1.CombatActionType.MoveAway;
        }
        use(character, target) {
            ContentView_1.CView.clear();
            // Rut doesnt let you run from dicks.
            if (character.effects.has(EffectType_1.EffectType.Rut) && target.body.cocks.length > 0) {
                ContentView_1.CView.text("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!");
                return;
            }
            if (character.canFly())
                ContentView_1.CView.text("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
            // Nonflying PCs
            else {
                // Stuck!
                if (character.effects.has(EffectType_1.EffectType.NoFlee)) {
                    if (target.desc.short === "goblin")
                        ContentView_1.CView.text("You try to flee but get stuck in the sticky white goop surrounding you.\n\n");
                    else
                        ContentView_1.CView.text("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n");
                    return;
                }
                // Nonstuck!
                else
                    ContentView_1.CView.text("You turn tail and attempt to flee!  ");
            }
            // Calculations
            let escapeMod = 20 + target.stats.level * 3;
            // if(debug) escapeMod -= 300;
            if (character.canFly())
                escapeMod -= 20;
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.RACCOON), false) &&
                character.body.ears.type === Ears_1.EarType.RACCOON &&
                character.effects.has(EffectType_1.EffectType.Runner))
                escapeMod -= 25;
            // Big tits doesn't matter as much if ya can fly!
            else {
                if (character.body.chest.length > 0) {
                    const largestBreastSize = character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating;
                    if (largestBreastSize >= 35)
                        escapeMod += 5;
                    if (largestBreastSize >= 66)
                        escapeMod += 10;
                }
                if (character.body.hips.rating >= 20)
                    escapeMod += 5;
                if (character.body.butt.rating >= 20)
                    escapeMod += 5;
                if (character.body.balls.count > 0) {
                    if (character.body.balls.size >= 24)
                        escapeMod += 5;
                    if (character.body.balls.size >= 48)
                        escapeMod += 10;
                    if (character.body.balls.size >= 120)
                        escapeMod += 10;
                }
            }
            // SUCCESSFUL FLEE
            if (character.stats.spe > SMath_1.randInt(target.stats.spe + escapeMod)) {
                // Fliers flee!
                if (character.canFly())
                    ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " can't catch you.");
                // sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.RACCOON), false) && character.body.ears.type === Ears_1.EarType.RACCOON && character.effects.has(EffectType_1.EffectType.Runner)) {
                    ContentView_1.CView.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + target.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + target.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
                }
                // Non-fliers flee
                else
                    ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " rapidly disappears into the shifting landscape behind you.");
                return;
            }
            // Runner perk chance
            else if (character.effects.has(EffectType_1.EffectType.Runner) && SMath_1.randInt(100) < 50) {
                ContentView_1.CView.text("Thanks to your talent for running, you manage to escape.");
                return;
            }
            // FAIL FLEE
            else {
                // Flyers get special failure message.
                if (character.canFly()) {
                    if (target.desc.plural)
                        ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " manage to grab your " + LegDescriptor_1.describeLegs(character) + " and drag you back to the ground before you can fly away!");
                    else
                        ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " manages to grab your " + LegDescriptor_1.describeLegs(character) + " and drag you back to the ground before you can fly away!");
                }
                // fail
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.RACCOON), false) && character.body.ears.type === Ears_1.EarType.RACCOON && character.effects.has(EffectType_1.EffectType.Runner))
                    ContentView_1.CView.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
                // Nonflyer messages
                else {
                    // Huge balls messages
                    if (character.body.balls.count > 0 && character.body.balls.size >= 24) {
                        if (character.body.balls.size < 48)
                            ContentView_1.CView.text("With your " + BallsDescriptor_1.describeBalls(true, true, character) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
                        else
                            ContentView_1.CView.text("With your " + BallsDescriptor_1.describeBalls(true, true, character) + " dragging along the ground, getting away is far harder than it should be.  ");
                    }
                    // FATASS BODY MESSAGES
                    const largestBreastRating = character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating;
                    if (largestBreastRating >= 35 || character.body.butt.rating >= 20 || character.body.hips.rating >= 20) {
                        // FOR PLAYERS WITH GIANT BREASTS
                        if (largestBreastRating >= 35 && largestBreastRating < 66) {
                            if (character.body.hips.rating >= 20) {
                                ContentView_1.CView.text("Your " + HipDescriptor_1.describeHips(character) + " forces your gait to lurch slightly side to side, which causes the fat of your " + character.body.skin.tone + " ");
                                if (character.body.butt.rating >= 20)
                                    ContentView_1.CView.text(ButtDescriptor_1.describeButt(character) + " and ");
                                ContentView_1.CView.text(BreastDescriptor_1.describeChest(character) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                            }
                            else if (character.body.butt.rating >= 20)
                                ContentView_1.CView.text("Your " + character.body.skin.tone + ButtDescriptor_1.describeButt(character) + " and " + BreastDescriptor_1.describeChest(character) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                            else
                                ContentView_1.CView.text("Your " + BreastDescriptor_1.describeChest(character) + " jiggle and wobble side to side like the " + character.body.skin.tone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                        }
                        // FOR PLAYERS WITH MASSIVE BREASTS
                        else if (largestBreastRating >= 66) {
                            if (character.body.hips.rating >= 20) {
                                ContentView_1.CView.text("Your " + BreastDescriptor_1.describeChest(character) + " nearly drag along the ground while your " + HipDescriptor_1.describeHips(character) + " swing side to side ");
                                if (character.body.butt.rating >= 20)
                                    ContentView_1.CView.text("causing the fat of your " + character.body.skin.tone + ButtDescriptor_1.describeButt(character) + " to wobble heavily, ");
                                ContentView_1.CView.text("forcing your body off balance and preventing you from moving quick enough to get escape.");
                            }
                            else if (character.body.butt.rating >= 20)
                                ContentView_1.CView.text("Your " + BreastDescriptor_1.describeChest(character) + " nearly drag along the ground while the fat of your " + character.body.skin.tone + ButtDescriptor_1.describeButt(character) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                            else
                                ContentView_1.CView.text("Your " + BreastDescriptor_1.describeChest(character) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                        }
                        // FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                        else if (character.body.hips.rating >= 20) {
                            ContentView_1.CView.text("Your " + HipDescriptor_1.describeHips(character) + " swing heavily from side to side ");
                            if (character.body.butt.rating >= 20)
                                ContentView_1.CView.text("causing your " + character.body.skin.tone + ButtDescriptor_1.describeButt(character) + " to wobble obscenely ");
                            ContentView_1.CView.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                        }
                        // JUST DA BOOTAH
                        else if (character.body.butt.rating >= 20)
                            ContentView_1.CView.text("Your " + character.body.skin.tone + ButtDescriptor_1.describeButt(character) + " wobbles so heavily that you're unable to move quick enough to escape.");
                    }
                    // NORMAL RUN FAIL MESSAGES
                    else if (target.desc.plural)
                        ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " stay hot on your heels, denying you a chance at escape!");
                    else
                        ContentView_1.CView.text(target.desc.capitalA + target.desc.short + " stays hot on your heels, denying you a chance at escape!");
                }
            }
        }
    }
    exports.Run = Run;
});
//# sourceMappingURL=Run.js.map