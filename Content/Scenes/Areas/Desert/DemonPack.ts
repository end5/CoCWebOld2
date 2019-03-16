import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { describeLegs } from 'Content/Descriptors/LegDescriptor';
import { EffectType } from 'Content/Effects/EffectType';
import { passTime } from 'Content/Scenes/PassTime';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { Cock, CockType } from 'Engine/Body/Cock';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { TailType, Tail } from 'Engine/Body/Tail';
import { HornType } from 'Engine/Body/Horns';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { CharacterType } from 'Content/Character/CharacterType';
import { Settings } from 'Content/Settings';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { CombatAction, IActionDamage } from 'Engine/Combat/Actions/CombatAction';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IReaction } from 'Engine/Combat/Actions/IReaction';
import { oasisSexing } from 'Content/Scenes/Areas/Desert/Oasis';

function rapeDemons(player: Character): NextScreenChoices {
    CView.clear().text("You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...");
    return { next: oasisSexing };
}

export function teased(player: Character, lustDelta: number): NextScreenChoices {
    CView.text("\n");
    if (lustDelta === 0) CView.text("\n" + capitalA + short + " seems unimpressed.");
    else if (lustDelta > 0 && lustDelta < 5) CView.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.");
    else if (lustDelta >= 5 && lustDelta < 10) CView.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.");
    else if (lustDelta >= 10) CView.text("The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.");
    applyTease(lustDelta);
}

const reactions = new Dictionary<string, IReaction>();

class PackAttack extends CombatAction {
    public name = "Pack Attack";

    protected checkMiss(char: Character, enemy: Character): boolean {
        // Determine if dodged!
        if (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80) {
            CView.text("You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.");
            return true;
        }
        // Determine if evaded
        else if (enemy.effects.has(EffectType.Evade) && randInt(100) < 10) {
            CView.text("Using your skills at evading attacks, you anticipate and sidestep " + char.desc.a + char.desc.name + "' attacks.");
            return true;
        }
        // "Misdirection"
        else if (enemy.effects.has(EffectType.Misdirection) && randInt(100) < 15 && enemy.inventory.armor.displayName === "red, high-society bodysuit") {
            CView.text("Using Raphael's teachings, you anticipate and sidestep " + char.desc.a + char.desc.name + "' attacks.");
            return true;
        }
        // Determine if cat'ed
        else if (enemy.effects.has(EffectType.Flexibility) && randInt(100) < 6) {
            CView.text("With your incredible flexibility, you squeeze out of the way of " + char.desc.a + char.desc.name + "' attacks.");
            return true;
        }
        return false;
    }

    protected calcDamage(char: Character, enemy: Character): undefined | IActionDamage {
        // Determine damage - str modified by enemy toughness!
        return { damage: Math.floor((char.stats.str + char.inventory.weapon.attack) - randInt(enemy.stats.tou) - enemy.combat.defense()) };
    }

    protected applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean) {
        if (damage <= 0) {
            damage = 0;
            if (!char.desc.plural)
                CView.text("You deflect and block every " + char.inventory.weapon.verb + " " + char.desc.a + char.desc.name + " throw at you.");
            else CView.text("You deflect " + char.desc.a + char.desc.name + " " + char.inventory.weapon.verb + ".");
        }
        else {
            damage = enemy.combat.loseHP(damage);
            if (damage <= 5)
                CView.text("You are struck a glancing blow by " + char.desc.a + char.desc.name + "! (" + damage + ")");
            else if (damage <= 10)
                CView.text(char.desc.capitalA + char.desc.name + " wound you! (" + damage + ")");
            else if (damage <= 20)
                CView.text(char.desc.capitalA + char.desc.name + " stagger you with the force of " + char.desc.possessivePronoun + " " + char.inventory.weapon.verb + "s! (" + damage + ")");
            else CView.text(char.desc.capitalA + char.desc.name + " <b>mutilates</b> you with powerful fists and " + char.inventory.weapon.verb + "s! (" + damage + ")");
        }

        CView.text("\n");

    }
}

class LustAttack extends CombatAction {
    public name = "Lust Attack";
    public useAction(char: Character, enemy: Character) {
        if (enemy.stats.lust < 35) {
            CView.text("The " + char.desc.name + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (enemy.stats.lust < 65) {
            CView.text("The push of the " + char.desc.name + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (enemy.body.cocks.length > 0)
                CView.text(describeCocksLight(enemy) + " hardening ");
            else if (enemy.body.vaginas.length > 0) CView.text(describeVagina(enemy, enemy.body.vaginas.get(0)) + " get wetter ");
            CView.text("in response to all the friction.");
        }
        else {
            CView.text("As the " + char.desc.name + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (enemy.gender === 1) CView.text(describeCocksLight(enemy) + " towards the nearest inviting hole.");
            if (enemy.gender === 2) CView.text(describeVagina(enemy, enemy.body.vaginas.get(0)) + " towards the nearest swinging cock.");
            if (enemy.gender === 3) CView.text("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (enemy.gender === 0) CView.text("groin, before remember there is nothing there to caress.");
        }
        enemy.stats.lust += 10 + enemy.stats.sens / 10;
    }
}

class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new PackAttack(), new LustAttack()];
    public use(char: Character, enemy: Character): void {
        randomChoice((this.subActions.filter((subAction) => subAction.isPossible(char) && subAction.canUse(char, enemy).canUse))).use(char, enemy);
    }
}

export class DemonPackEndScenes extends EndScenes {
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.gender === 0) {
            if (howYouWon === DefeatType.HP) {
                CView.clear().text("You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.");
            } else {
                CView.clear().text("You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.");
            }
            return { next: passTime(1) };
        }
        else if (howYouWon === DefeatType.HP) {
            CView.clear().text("The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...");
            return { next: oasisSexing };
        }
        else {
            CView.clear().text("You struggle to keep your mind on the fight and fail to do so. ");
            if (enemy.effects.has(EffectType.CameWorms)) {
                CView.text("\n\nThe demons joke and smile, obviously unconcerned with your state.\n\n");
            }
            if (enemy.body.cocks.length > 0) {
                if (enemy.body.cocks.length > 1) CView.text("Each of y");
                else CView.text("Y");
                CView.text("our " + describeCocksLight(enemy) + " throbs ");
                if (enemy.body.vaginas.length > 0) CView.text(" and your ");
            }
            if (enemy.body.vaginas.length > 0) {
                if (enemy.body.cocks.length <= 0) CView.text("Your ");
                CView.text(describeVagina(enemy, enemy.body.vaginas.get(0)) + " burns ");
            }
            CView.text("with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.");
            return { next: oasisSexing };
        }
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouLost === DefeatType.HP) {
            CView.clear().text("You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your " + describeLegs(enemy) + " off the head of the demon leader before you start to search the bodies.");
            enemy.stats.lust += 1;

        }
        else {
            CView.text("The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you.");
        }

        if (howYouLost === DefeatType.HP) {
            return { next: passTime(1) };
        }
        else {
            CView.text("  Do you rape them?");
            return { yes: rapeDemons, no: passTime(1) };
        }
    }
}

export class DemonPack extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.DemonPack);
        this.description = new CharacterDescription(this, "the ", "demons", "The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders." + (Settings.sillyMode ? "  You spot an odd patch that reads, \"<i>41st Engineer Company: Vaginal Clearance</i>\" on his shoulder." : ""), true);

        this.body.cocks.add(new Cock(18, 2));
        this.body.cocks.add(new Cock(18, 2, CockType.DEMON));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.cumMultiplier = 3;
        this.body.vaginas.add(new Vagina(VaginaWetness.SLICK, VaginaLooseness.LOOSE, false));
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.body.tallness = randInt(8) + 70;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "red";
        this.body.hair.color = "black";
        this.body.hair.length = 15;
        this.body.tails.add(new Tail(TailType.DEMONIC));
        this.body.horns.type = HornType.DEMON;
        this.body.horns.count = 2;

        this.stats.str = 80;
        this.stats.tou = 10;
        this.stats.spe = 10;
        this.stats.int = 5;
        this.stats.lib = 50;
        this.stats.sens = 60;
        this.stats.cor = 80;
        this.stats.maxHP = 200;
        this.stats.HP = this.stats.maxHP;
        this.stats.lust = 30;
        this.stats.level = 6;

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "claw", 0),
            new Armor("demonic skin" as ArmorName, new ItemDesc("demonic skin"), "demonic skin", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new MainAction(),
                endScenes: new DemonPackEndScenes(this),
                rewards: {
                    gems: randInt(25) + 10,
                    drop: new WeightedDrop<string>().addMany(1,
                        ConsumableName.SuccubiMilk,
                        ConsumableName.IncubusDraft,
                        ConsumableName.OvipositionElixir,
                        ConsumableName.BlackSpellbook)
                }
            });
    }
}
