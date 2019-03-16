define(["require", "exports", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Display/ContentView", "Content/Player/PlayerFlags", "./PlayerMenu", "./PerkUpMenu"], function (require, exports, EffectType_1, NumToText_1, ContentView_1, PlayerFlags_1, PlayerMenu_1, PerkUpMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function perksMenu(character) {
        ContentView_1.CView.clear();
        for (const parks of character.effects) {
            ContentView_1.CView.text("<b>" + parks.type + "</b>");
            ContentView_1.CView.text(" - " + parks.desc.longDesc);
            ContentView_1.CView.text("\n\n");
        }
        const choices = [["Next", PlayerMenu_1.playerMenu]];
        if (character.stats.perkPoints > 0) {
            ContentView_1.CView.text("<b>You have " + NumToText_1.numToCardinalText(character.stats.perkPoints) + " perk point");
            if (character.stats.perkPoints > 1)
                ContentView_1.CView.text("s");
            ContentView_1.CView.text(" to spend.</b>");
            choices.push(["Perk Up", PerkUpMenu_1.perkUpMenu]);
        }
        if (character.effects.has(EffectType_1.EffectType.DoubleAttack)) {
            ContentView_1.CView.text("<b>You can adjust your double attack settings.</b>");
            choices.push(["Dbl Options", doubleAttackOptions]);
        }
        return { choices };
    }
    exports.perksMenu = perksMenu;
    function doubleAttackOptions() {
        ContentView_1.CView.clear();
        const choices = [["All Double", doubleAttackForce], ["Dynamic", doubleAttackDynamic], ["Single", doubleAttackOff]];
        if (PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE === 0) {
            ContentView_1.CView.text("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            ContentView_1.CView.text("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            ContentView_1.CView.text("\nYou can change it to always single attack.");
            choices[0][1] = undefined;
        }
        else if (PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE === 1) {
            ContentView_1.CView.text("You will currently double attack until your strength exceeds sixty, and then single attack.");
            ContentView_1.CView.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            ContentView_1.CView.text("\nYou can change it to always single attack.");
            choices[1][1] = undefined;
        }
        else {
            ContentView_1.CView.text("You will always single attack your foes in combat.");
            ContentView_1.CView.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            ContentView_1.CView.text("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
            choices[2][1] = undefined;
        }
        return { choices, persistantChoices: [["Back", perksMenu]] };
    }
    function doubleAttackForce() {
        PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE = 0;
        return doubleAttackOptions();
    }
    function doubleAttackDynamic() {
        PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE = 1;
        return doubleAttackOptions();
    }
    function doubleAttackOff() {
        PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE = 2;
        return doubleAttackOptions();
    }
});
//# sourceMappingURL=PerksMenu.js.map