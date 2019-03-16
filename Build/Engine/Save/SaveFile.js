define(["require", "exports", "Engine/Utilities/Time", "Engine/Character/CharConstructorLib", "Engine/CharDict", "Engine/Flags", "Engine/Display/MainScreen", "Engine/Combat/CombatManager", "Engine/PartyDict"], function (require, exports, Time_1, CharConstructorLib_1, CharDict_1, Flags_1, MainScreen_1, CombatManager_1, PartyDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let lastSave;
    function generateSave(notes) {
        if (!CharDict_1.CharDict.player)
            throw new Error('Tried to save without a character');
        const player = CharDict_1.CharDict.player;
        lastSave = {
            name: player.desc.name,
            days: Time_1.Time.day,
            hour: Time_1.Time.hour,
            gender: player.gender,
            notes: notes ? notes : (lastSave && lastSave.notes ? lastSave.notes : ""),
            user: {
                activeChar: CharDict_1.CharDict.player.uuid,
                chars: CharDict_1.CharDict.serialize(),
                parties: PartyDict_1.PartyDict.serialize(),
                flags: Flags_1.Flags.serialize(),
            }
        };
        return lastSave;
    }
    exports.generateSave = generateSave;
    function loadFromSave(save) {
        CombatManager_1.CombatManager.encounter = undefined;
        for (const charKey of Object.keys(save.user.chars)) {
            const charConstr = CharConstructorLib_1.CharConstructorLib.get(save.user.chars[charKey].type);
            if (charConstr) {
                const char = new charConstr();
                if (char.deserialize)
                    char.deserialize(save.user.chars[charKey]);
                CharDict_1.CharDict.set(charKey, char);
            }
        }
        const player = CharDict_1.CharDict.get(save.user.activeChar);
        if (!player)
            throw new Error('Player does not exist');
        CharDict_1.CharDict.player = player;
        MainScreen_1.MainScreen.statsPanel.show();
        Flags_1.Flags.deserialize(save.user.flags);
        Time_1.Time.day = save.days;
        Time_1.Time.hour = save.hour;
        lastSave = save;
    }
    exports.loadFromSave = loadFromSave;
});
//# sourceMappingURL=SaveFile.js.map