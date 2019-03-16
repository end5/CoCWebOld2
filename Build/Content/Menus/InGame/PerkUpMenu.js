define(["require", "exports", "Engine/Display/ButtonElement", "Engine/Display/Elements/UnorderedListElement", "Engine/Display/MainScreen", "Engine/Effects/Effect", "Content/Effects/EffectType", "Engine/Display/ScreenDisplay", "Engine/Display/ContentView", "./PlayerMenu", "Content/Utilities/NumToText", "Engine/Display/Elements/TextElement"], function (require, exports, ButtonElement_1, UnorderedListElement_1, MainScreen_1, Effect_1, EffectType_1, ScreenDisplay_1, ContentView_1, PlayerMenu_1, NumToText_1, TextElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function perkUpMenu(character) {
        ContentView_1.CView.clear();
        const perkList = getAvailablePerks(character);
        if (perkList.length === 0) {
            ContentView_1.CView.text("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + NumToText_1.numToCardinalText(character.stats.perkPoints) + " perk point");
            if (character.stats.perkPoints > 1)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text(".");
            return { next: PlayerMenu_1.playerMenu };
        }
        else {
            ContentView_1.CView.text("Please select a perk from the list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.");
            ContentView_1.CView.text("\n\n");
            displayPerkList(character);
            MainScreen_1.MainScreen.topButtons.mainMenu.hide();
            // "Okay" button is modified in displayPerkList
            return { choices: [["Okay", undefined], ["Skip", PlayerMenu_1.playerMenu]] };
        }
    }
    exports.perkUpMenu = perkUpMenu;
    function confirmPerk(character, selectedPerk) {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("You have selected the following perk:");
        ContentView_1.CView.text("\n\n");
        ContentView_1.CView.text("<b>" + selectedPerk.desc.name + "</b>: ");
        ContentView_1.CView.text(selectedPerk.desc.longDesc);
        ContentView_1.CView.text("\n\n");
        ContentView_1.CView.text("If you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
        return { choices: [["Okay", ScreenDisplay_1.choiceWrap(applyPerk, selectedPerk)], ["Skip", PlayerMenu_1.playerMenu]] };
    }
    function displayPerkList(character) {
        const perkList = getAvailablePerks(character);
        const perkListDisplay = new UnorderedListElement_1.UnorderedListElement();
        MainScreen_1.MainScreen.textElement.appendChild(perkListDisplay);
        perkList.forEach((perk) => {
            const listEntry = new TextElement_1.TextElement(document.createElement('li'));
            perkListDisplay.appendChild(listEntry);
            const buttonElement = new ButtonElement_1.ButtonElement();
            buttonElement.style.position = "inherit";
            listEntry.appendChild(buttonElement);
            buttonElement.modify(perk.desc.name, () => {
                // Okay button is disabled until perk is selected
                ScreenDisplay_1.displayNextScreenChoices({ choices: [["Okay", ScreenDisplay_1.choiceWrap(confirmPerk, perk)], ["Skip", PlayerMenu_1.playerMenu]] });
            });
            const longDescElement = new TextElement_1.TextElement(document.createElement('p'));
            listEntry.appendChild(longDescElement);
            longDescElement.text(perk.desc.description(perk, character));
        });
    }
    function getAvailablePerks(character) {
        let perkList = [];
        // STRENGTH PERKS
        if (character.stats.str >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.StrongBack));
        }
        if (character.effects.has(EffectType_1.EffectType.StrongBack) && character.stats.str >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.StrongBack2));
        }
        // Tier 1 Strength Perks
        if (character.stats.level >= 6) {
            // Thunderous Strikes - +20% basic attack damage while str > 80.
            if (character.stats.str >= 80) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.ThunderousStrikes));
            }
            // Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
            if (character.stats.str > 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.WeaponMastery));
            }
            if (character.stats.str >= 75)
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.BrutalBlows));
        }
        // Tier 2 Strength Perks
        if (character.stats.level >= 12) {
            if (character.stats.str >= 75)
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Berzerker));
        }
        // slot 2 - toughness perk 1
        if (!character.effects.has(EffectType_1.EffectType.Tank) && character.stats.tou >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Tank));
        }
        // slot 2 - regeneration perk
        if (character.effects.has(EffectType_1.EffectType.Tank) && character.stats.tou >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Regeneration));
        }
        // Tier 1 Toughness Perks
        if (character.stats.level >= 6) {
            if (character.effects.has(EffectType_1.EffectType.Tank) && character.stats.tou >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Tank2));
            }
            if (character.effects.has(EffectType_1.EffectType.Regeneration) && character.stats.tou >= 70) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Regeneration2));
            }
            if (character.stats.tou >= 75) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.ImmovableObject));
            }
        }
        // Tier 2 Toughness Perks
        if (character.stats.level >= 12) {
            if (character.stats.tou >= 75) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Resolute));
            }
            if (character.stats.tou >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.IronMan));
            }
        }
        // slot 3 - speed perk
        if (character.stats.spe >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Evade));
        }
        // slot 3 - run perk
        if (character.stats.spe >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Runner));
        }
        // slot 3 - Double Attack perk
        if (character.effects.has(EffectType_1.EffectType.Evade) && character.effects.has(EffectType_1.EffectType.Runner) && character.stats.spe >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.DoubleAttack));
        }
        // Tier 1 Speed Perks
        if (character.stats.level >= 6) {
            // Speedy Recovery - Regain Fatigue 50% faster speed.
            if (character.effects.has(EffectType_1.EffectType.Evade) && character.stats.spe >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.SpeedyRecovery));
            }
            // Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
            if (character.stats.spe > 75 && character.effects.has(EffectType_1.EffectType.Runner) &&
                (character.inventory.armor.armorClass === "Light" || character.inventory.armor.armorClass === "Medium")) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Agility));
            }
            if (character.stats.spe >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.LightningStrikes));
            }
        }
        // Tier 2 Speed Perks
        if (character.stats.level >= 12) {
            if (character.stats.spe >= 75) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.LungingAttacks));
            }
        }
        // Slot 4 - precision - -10 enemy toughness for damage calc
        if (character.stats.int >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Precision));
        }
        // Spellpower - boosts spell power
        if (character.stats.int >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Spellpower));
        }
        if (character.effects.has(EffectType_1.EffectType.Spellpower) && character.stats.int >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Mage));
        }
        // Tier 1 Intelligence Perks
        if (character.stats.level >= 6) {
            if (character.stats.int >= 50)
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Tactician));
            if (character.combat.spellCount() > 0 && character.effects.has(EffectType_1.EffectType.Spellpower) && character.effects.has(EffectType_1.EffectType.Mage) && character.stats.int >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Channeling));
            }
            if (character.stats.int >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Medicine));
            }
        }
        // Tier 2 Intelligence perks
        if (character.stats.level >= 12) {
            if (character.effects.has(EffectType_1.EffectType.Mage) && character.stats.int >= 75) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Archmage));
            }
        }
        // LIBIDO PERKZ
        // slot 5 - libido perks
        // Slot 5 - Fertile+ increases cum production and fertility (+15%)
        if (character.stats.lib >= 25) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.FertilityPlus));
        }
        // Slot 5 - minimum libido
        if (character.stats.lib >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.HotBlooded, { minLust: 20 }));
        }
        // Tier 1 Libido Perks
        if (character.stats.level >= 6) {
            // Slot 5 - minimum libido
            if (character.stats.lib >= 60) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.WellAdjusted));
            }
            // Slot 5 - minimum libido
            if (character.stats.lib >= 60 && character.stats.cor >= 50) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Masochist));
            }
        }
        // Corruption Perks - slot 7
        // Slot 7 - Corrupted Libido - lust raises 10% slower.
        // if (character.stats.cor >= 25) {
        //     perkList.push(new Perk(PerkType.CorruptedLibido, { lust: { min: { flat: 20 } } }));
        // }
        // Slot 7 - Seduction (Must have seduced Jojo
        // if (!character.perks.has(PerkType.Seduction) && character.stats.cor >= 50 && playerFlags.monk >= 5) {
        //     perkList.push(new Perk(PerkType.Seduction));
        // }
        // Slot 7 - Nymphomania
        else if (character.effects.has(EffectType_1.EffectType.CorruptedLibido) && character.stats.cor >= 75) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Nymphomania));
        }
        // Slot 7 - UNFINISHED :3
        if (character.stats.minLust() >= 20 && character.effects.has(EffectType_1.EffectType.CorruptedLibido) && character.stats.cor >= 50) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Acclimation));
        }
        // Tier 1 Corruption Perks - acclimation over-rides
        if (character.stats.level >= 6) {
            if (character.stats.cor >= 60 && character.effects.has(EffectType_1.EffectType.CorruptedLibido)) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Sadist));
            }
            if (character.effects.has(EffectType_1.EffectType.CorruptedLibido) && character.stats.cor >= 70) {
                perkList.push(new Effect_1.Effect(EffectType_1.EffectType.ArousingAura));
            }
        }
        // Tier 1 Misc Perks
        if (character.stats.level >= 6) {
            perkList.push(new Effect_1.Effect(EffectType_1.EffectType.Resistance));
        }
        // FILTER PERKS
        perkList = perkList.filter((perk) => !character.effects.has(perk.type) ? perk : undefined);
        return perkList;
    }
    function applyPerk(character, selectedPerk) {
        ContentView_1.CView.clear();
        character.stats.perkPoints--;
        // Apply perk here.
        ContentView_1.CView.text("<b>" + selectedPerk.type + "</b>");
        ContentView_1.CView.text(" gained!");
        character.effects.create(selectedPerk.type);
        if (selectedPerk.type === EffectType_1.EffectType.StrongBack2)
            character.inventory.items.unlock();
        if (selectedPerk.type === EffectType_1.EffectType.StrongBack)
            character.inventory.items.unlock();
        if (selectedPerk.type === EffectType_1.EffectType.Tank2) {
            character.stats.HP += character.stats.tou;
        }
        return { next: PlayerMenu_1.playerMenu };
    }
});
//# sourceMappingURL=PerkUpMenu.js.map