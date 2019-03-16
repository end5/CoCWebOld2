define(["require", "exports", "Engine/Utilities/Dictionary", "./Utilities/Uuid", "./CharDict"], function (require, exports, Dictionary_1, Uuid_1, CharDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PartyDictionary {
        constructor() {
            // { partyUUID: { charUUID: { type: charType } } }
            this.dictionary = new Dictionary_1.Dictionary();
        }
        /**
         * Adds newMembers to the char's party. If their is no party, a new one is created.
         * All existing parties between the newMembers are combined.
         * @param char Character
         * @param newMembers List of Characters
         */
        addToParty(char, ...newMembers) {
            const party = {};
            const partyUUID = Uuid_1.generateUUID();
            for (const newMember of [char].concat(newMembers)) {
                if (newMember.partyUUID) {
                    const existingParty = this.dictionary.get(newMember.partyUUID);
                    if (existingParty) {
                        for (const partyMemberUUID in existingParty)
                            party[partyMemberUUID] = existingParty[partyMemberUUID];
                    }
                }
                if (!party[newMember.uuid])
                    party[newMember.uuid] = { type: newMember.charType };
                if (newMember.partyUUID !== partyUUID)
                    newMember.partyUUID = partyUUID;
            }
            this.dictionary.set(partyUUID, party);
        }
        /**
         * Returns specified char's party members, excluding the specified char, as an array of chars.
         * Returns empty array if their is no party.
         * @param char Character
         */
        getMembers(char) {
            if (!char.partyUUID)
                return [];
            const partyInfo = this.dictionary.get(char.partyUUID);
            if (!partyInfo)
                return [];
            return Object.keys(partyInfo).reduce((party, key) => {
                const member = CharDict_1.CharDict.get(key);
                if (!member) {
                    console.error("Error - Unknown character - UUID: " + key);
                    delete partyInfo[key];
                }
                else if (member.uuid !== char.uuid)
                    party.push(member);
                return party;
            }, []);
        }
        /**
         * Remove membersToRemove from the char's party.
         * @param char Character
         * @param membersToRemove List of Characters
         */
        removeFromParty(char, ...membersToRemove) {
            if (!char.partyUUID)
                return;
            const partyInfo = this.dictionary.get(char.partyUUID);
            if (!partyInfo)
                return;
            for (const member of membersToRemove)
                delete partyInfo[member.uuid];
        }
        serialize() {
            return this.dictionary.serialize();
        }
        deserialize(saveObject) {
            this.dictionary.deserialize(saveObject);
        }
    }
    exports.PartyDict = new PartyDictionary();
    // tslint:disable-next-line:no-string-literal
    window["parties"] = exports.PartyDict;
});
//# sourceMappingURL=PartyDict.js.map