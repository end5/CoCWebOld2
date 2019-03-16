define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/Flags"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, ContentView_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DragonShellShieldFlags = Flags_1.Flags.register("Dragon-Shell Shield", {
        TIMES_EQUIPPED_EMBER_SHIELD: 0,
    });
    class DragonShellShield extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.DragonShellShield, new ItemDesc_1.ItemDesc("DrgnShl", "a dragon-shell shield", "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless."), "dragon-shell shield", "smack", 0, 1500, [WeaponPerks_1.WeaponPerkType.Large]);
        }
        useText(character) {
            if (exports.DragonShellShieldFlags.TIMES_EQUIPPED_EMBER_SHIELD === 0) {
                ContentView_1.CView.clear();
                ContentView_1.CView.text("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
                if (character.stats.str < 80)
                    ContentView_1.CView.text("bits and pieces from the surface of the");
                else
                    ContentView_1.CView.text("huge shards of the shattered");
                ContentView_1.CView.text(" rock are sent flying in all directions.");
                ContentView_1.CView.text("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
            }
            exports.DragonShellShieldFlags.TIMES_EQUIPPED_EMBER_SHIELD++;
        }
    }
    exports.DragonShellShield = DragonShellShield;
});
//# sourceMappingURL=DragonShellShield.js.map