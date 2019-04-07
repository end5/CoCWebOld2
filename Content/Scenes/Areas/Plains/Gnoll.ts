import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { CView } from 'Engine/Display/ContentView';
import { ExgartuanFlags } from 'Content/Scenes/NPCs/Exgartuan';
import { CharacterType } from 'Content/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { breastCupInverse } from 'Content/Descriptors/BreastDescriptor';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { SkinType } from 'Engine/Body/Skin';
import { ChainedDrop } from 'Engine/Utilities/Drops/ChainedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';

/**
 * ...
 * @author ...
 */

// Gnoll Description
function gnollAttackText(player: Character): NextScreenChoices {
    let damage: number = 0;
    const attack: number = randInt(6);

    // return to combat menu when finished
    // return { next: playerMenu };

    // Blind dodge change
    if (findStatusAffect(EffectType.Blind) >= 0 && randInt(3) < 2) {
        CView.text(capitalA + short + " completely misses you with a blind attack!\n");
    }
    // Determine if dodged!
    else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
        if (player.stats.spe - spe < 8) CView.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n");
        else if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) CView.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n");
        else if (player.stats.spe - spe >= 20) CView.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n");
    }
    // Determine if evaded
    else if (player.effects.has(EffectType.Evade) && randInt(100) < 10) {
        CView.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
    }
    // ("Misdirection"
    else if (player.effects.has(EffectType.Misdirection) && randInt(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
        CView.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
    }
    // Determine if cat'ed
    else if (player.effects.has(EffectType.Flexibility) && randInt(100) < 6) {
        CView.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
        if (plural) CView.text("' attacks.\n");
        else CView.text("'s attack.\n");
    }
    else {
        // Determine damage - str modified by enemy toughness!
        damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.combat.stats.defense);
        if (damage <= 0) {
            damage = 0;
            // hapies have their own shit
            if (short == "harpy") CView.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.");
            // Due to toughness or amor...
            else if (randInt(player.combat.stats.defense + player.stats.tou) < player.combat.stats.defense) CView.text("Your " + player.inventory.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
            else CView.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
        }
        // everyone else
        else {
            // Gnoll Attack #1
            if (attack == 0) {
                CView.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.");
                damage += 10;
            }
            // Gnoll Attack #2
            else if (attack == 1) {
                CView.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.");
                damage += 3;
            }
            // Gnoll Attack #3
            else if (attack == 2) {
                CView.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.");
                damage += 13;
            }
            // Gnoll Attack #4
            else if (attack == 3) {
                CView.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.");
                damage += 8;
            }
            // Gnoll Attack #5
            else if (attack == 4) {
                CView.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.");
                damage += 25;
            }
            // Gnoll Attack #6
            else {
                CView.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.");
            }
            damage = player.takeDamage(damage);
            CView.text(" (" + damage + ")\n");

        }

    }
}

function gnollTease(player: Character): NextScreenChoices {
    const tease: number = randInt(6);
    let bonus: number = 0;
    // Gnoll Tease #1
    if (tease == 0) {
        CView.text("The gnoll takes a moment to stretch her sleek, athletic body.  Her free hand runs up her side and she leers knowingly at you.");
        bonus += 5;
    }
    // Gnoll Tease #2
    else if (tease == 1) {
        CView.text("With one hand, the hyena girl grasps her eight-inch clitoris and strokes it.  \"<i>I know you're curious!</i>\" she laughs.  \"<i>You want to try this.</i>\"");
        bonus += 5;
    }
    // Gnoll Tease #3
    else if (tease == 2) {
        CView.text("The gnoll bounds forward, but instead of clobbering you she slides her lithe body against yours.  \"<i>We don't have to fight,</i>\" she titters.  \"<i>It's lots easier if I just fuck you.</i>\"");
        bonus += 10;
    }
    // Gnoll Tease #4
    else if (tease == 3) {
        CView.text("The gnoll slides her fingers down the length of her pseudo-penis and collects the cream that drips from its end.  With two steps, she's inside your guard, but all she does is wave her hand in front of your nose.  The reek of sex nearly bowls you over.");
        bonus += 12;
    }
    // Gnoll Tease #5
    else if (tease == 4) CView.text("\"<i>I love outlanders,</i>\" the gnoll confides in you as she circles.  \"<i>You have such interesting cries when you get fucked in a new way.</i>\"  She laughs, and the sound is far louder than it has any right to be.\n\n");
    // Gnoll Tease #6
    else {
        CView.text("The gnoll dances forward, then back, her whole body alive with sensual movement.  She catches the way you watch her and smirks, throwing in a hip-shake just for you.");
        bonus += 6;
    }
    player.stats.lust += (bonus + 10 + player.stats.lib / 20 + randInt(player.stats.cor / 20));

    CView.text("\n");
}

export function eAttack(player: Character): NextScreenChoices {
    let damage: number = 0;
    const attack: number = randInt(6);

    // return to combat menu when finished
    // return { next: playerMenu };

    // Blind dodge change
    if (findStatusAffect(EffectType.Blind) >= 0 && randInt(3) < 2) {
        CView.text(capitalA + short + " completely misses you with a blind attack!\n");
    }
    // Determine if dodged!
    else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
        if (player.stats.spe - spe < 8) CView.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n");
        else if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) CView.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n");
        else if (player.stats.spe - spe >= 20) CView.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n");
    }
    // Determine if evaded
    else if (player.effects.has(EffectType.Evade) && randInt(100) < 10) {
        CView.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
    }
    // ("Misdirection"
    else if (player.effects.has(EffectType.Misdirection) && randInt(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
        CView.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
    }
    // Determine if cat'ed
    else if (player.effects.has(EffectType.Flexibility) && randInt(100) < 6) {
        CView.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
        if (plural) CView.text("' attacks.\n");
        else CView.text("'s attack.\n");
    }
    else {
        // Determine damage - str modified by enemy toughness!
        damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.combat.stats.defense);
        if (damage <= 0) {
            damage = 0;
            // hapies have their own shit
            if (short == "harpy") CView.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.");
            // Due to toughness or amor...
            else if (randInt(player.combat.stats.defense + player.stats.tou) < player.combat.stats.defense) CView.text("Your " + player.inventory.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
            else CView.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
        }
        // everyone else
        else {
            // Gnoll Attack #1
            if (attack == 0) {
                CView.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.");
                damage += 10;
            }
            // Gnoll Attack #2
            else if (attack == 1) {
                CView.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.");
                damage += 3;
            }
            // Gnoll Attack #3
            else if (attack == 2) {
                CView.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.");
                damage += 13;
            }
            // Gnoll Attack #4
            else if (attack == 3) {
                CView.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.");
                damage += 8;
            }
            // Gnoll Attack #5
            else if (attack == 4) {
                CView.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.");
                damage += 25;
            }
            // Gnoll Attack #6
            else {
                CView.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.");
            }
            damage = player.takeDamage(damage);
            CView.text(" (" + damage + ")\n");
        }

    }
}

function performCombatAction(player: Character): NextScreenChoices {
    if (findStatusAffect(EffectType.Stunned) >= 0) {
        if (plural) CView.text("Your foes are too dazed from your last hit to strike back!");
        else CView.text("Your foe is too dazed from your last hit to strike back!");
        removeStatusAffect(EffectType.Stunned);
        combatRoundOver();
    }
    if (findStatusAffect(EffectType.Fear) >= 0) {
        if (statusAffectv1(EffectType.Fear) == 0) {
            if (plural) {
                removeStatusAffect(EffectType.Fear);
                CView.text("Your foes shake free of their fear and ready themselves for battle.");
            }
            else {
                removeStatusAffect(EffectType.Fear);
                CView.text("Your foe shakes free of its fear and readies itself for battle.");
            }
        }
        else {
            addStatusValue(EffectType.Fear, 1, -1);
            if (plural) CView.text(capitalA + short + " are too busy shivering with fear to fight.");
            else CView.text(capitalA + short + " is too busy shivering with fear to fight.");
        }
        combatRoundOver();
    }
    const select: number = 1;
    const rando: number = 1;
    // Exgartuan gets to do stuff!
    if (player.effects.has(EffectType.Exgartuan) && ExgartuanFlags.SLEEP_COUNTER == 0 && randInt(3) == 0) {
        exgartuan.exgartuanCombatUpdate();
        CView.text("\n\n");
    }
    if (findStatusAffect(EffectType.Constricted) >= 0) {
        // Enemy struggles -
        CView.text("Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.");
        if (statusAffectv1(EffectType.Constricted) <= 0) {
            CView.text("  " + capitalA + short + " proves to be too much for your tail to handle, breaking free of your tightly bound coils.");
            removeStatusAffect(EffectType.Constricted);
        }
        addStatusValue(EffectType.Constricted, 1, -1);
        combatRoundOver();
    }
    // If grappling...
    /* Grappling was never included
                if (gameState == 2) {
                    //temperment - used for determining grapple behaviors
                    //0 - avoid grapples/break grapple
                    //1 - lust determines > 50 grapple
                    //2 - random
                    //3 - love grapples
                    //		if(temperment == 0) eGrappleRetreat();
                    if (temperment == 1) {
                        //			if(lust < 50) eGrappleRetreat();
                        return { next: 3 };
                    }
                    CView.text("Lust Placeholder!!");
                    return { next: 3 };
                }
    */
    if (randInt(2) == 0) return gnollTease(player);
    else {
        let damage: number = 0;
        const attack: number = randInt(6);

        // return to combat menu when finished
        // return { next: playerMenu };

        // Blind dodge change
        if (findStatusAffect(EffectType.Blind) >= 0 && randInt(3) < 2) {
            CView.text(capitalA + short + " completely misses you with a blind attack!\n");
        }
        // Determine if dodged!
        else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            if (player.stats.spe - spe < 8) CView.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n");
            else if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) CView.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n");
            else if (player.stats.spe - spe >= 20) CView.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n");
        }
        // Determine if evaded
        else if (player.effects.has(EffectType.Evade) && randInt(100) < 10) {
            CView.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
        }
        // ("Misdirection"
        else if (player.effects.has(EffectType.Misdirection) && randInt(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
            CView.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
        }
        // Determine if cat'ed
        else if (player.effects.has(EffectType.Flexibility) && randInt(100) < 6) {
            CView.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
            if (plural) CView.text("' attacks.\n");
            else CView.text("'s attack.\n");
        }
        else {
            // Determine damage - str modified by enemy toughness!
            damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.combat.stats.defense);
            if (damage <= 0) {
                damage = 0;
                // hapies have their own shit
                if (short == "harpy") CView.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.");
                // Due to toughness or amor...
                else if (randInt(player.combat.stats.defense + player.stats.tou) < player.combat.stats.defense) CView.text("Your " + player.inventory.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
                else CView.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
            }
            // everyone else
            else {
                // Gnoll Attack #1
                if (attack == 0) {
                    CView.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.");
                    damage += 10;
                }
                // Gnoll Attack #2
                else if (attack == 1) {
                    CView.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.");
                    damage += 3;
                }
                // Gnoll Attack #3
                else if (attack == 2) {
                    CView.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.");
                    damage += 13;
                }
                // Gnoll Attack #4
                else if (attack == 3) {
                    CView.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.");
                    damage += 8;
                }
                // Gnoll Attack #5
                else if (attack == 4) {
                    CView.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.");
                    damage += 25;
                }
                // Gnoll Attack #6
                else {
                    CView.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.");
                }
                damage = player.takeDamage(damage);
                CView.text(" (" + damage + ")\n");
            }

        }
        return gnollAttackText(player);
    }
    combatRoundOver();
}

export function defeated(player: Character, hpVictory: boolean): NextScreenChoices {
    if (findStatusAffect(EffectType.PhyllaFight) >= 0) {
        removeStatusAffect(EffectType.PhyllaFight);
        desert.antsScene.phyllaPCBeatsGnoll();
        return;
    }
    plains.gnollScene.defeatHyena();
}

export function won(player: Character, hpVictory: boolean, pcCameWorms: boolean): NextScreenChoices {
    if (findStatusAffect(EffectType.PhyllaFight) >= 0) {
        removeStatusAffect(EffectType.PhyllaFight);
        desert.antsScene.phyllaGnollBeatsPC();
    } else if (pcCameWorms) {
        CView.text("\n\nYour foe doesn't seem put off enough to leave...");
        return { next: endLustLoss };
    } else {
        plains.gnollScene.getRapedByGnoll();
    }
}

export class Gnoll extends Character {
    public constructor() {
        super(CharacterType.Gnoll);
        this.desc.a = "the ";
        this.desc.name = "gnoll";
        this.imageName = "gnoll";
        this.long = "This lanky figure is dappled with black spots across rough, tawny fur. Wiry muscle ripples along long legs and arms, all of it seeming in perpetual frenetic motion: every moment half flinching and half lunging.  The head bears a dark muzzle curled in a perpetual leer and bright orange eyes watching with a savage animal cunning.  Between the legs hang what appears at first to be a long, thin dong; however, on closer inspection it is a fused tube of skin composed of elongated pussy lips and clitoris.  The hyena girl is sporting a pseudo-penis, and judging by the way it bobs higher as she jinks back and forth, she's happy to see you!\n\nShe wears torn rags scavenged from some other, somewhat smaller, creature, and in one hand clutches a twisted club.";
        // this.plural = false;

        this.body.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.LOOSE, false));
        this.body.chest.add(new BreastRow(breastCupInverse("C")));
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 25 });
        this.body.tallness = 6 * 12;
        this.body.hips.rating = HipRating.AMPLE;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.skin.tone = "tawny";
        this.body.skin.type = SkinType.FUR;
        // this.body.skin.desc = DEFAULT_SKIN_DESCS[SkinType.FUR];
        this.body.hair.color = "black";
        this.body.hair.length = 22;

        this.stats.str = 80;
        this.stats.tou = 70;
        this.stats.spe = 75;
        this.stats.int = 60;
        this.stats.lib = 65;
        this.stats.sens = 25;
        this.stats.cor = 60;
        this.baseStats.bonusHP = 250;
        this.stats.lust = 30;
        this.stats.lustVuln = .35;
        this.stats.level = 14;

        this.inventory.weapon.displayName = "twisted club";
        this.inventory.weapon.verb = "smash";
        this.combat.stats.weaponAttack = 0;
        this.weaponPerk = "";
        this.inventory.weapon.value = 25;
        this.inventory.armor.displayName = "skin";
        this.combat.stats.defense = 2;

        this.inventory.gems = 10 + randInt(5);
        this.drop = new ChainedDrop().
            add(ConsumableName.Reducto, 1 / 5).
            add(ConsumableName.SuccubiMilk, 1 / 2).
            elseDrop(ConsumableName.HairDyeBlack);
    }
}
