define(["require", "exports", "./EquipSlot", "./EquipSlotList"], function (require, exports, EquipSlot_1, EquipSlotList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PiercingInventory {
        constructor(character) {
            this.nipples = new EquipSlotList_1.EquipSlotList();
            this.cocks = new EquipSlotList_1.EquipSlotList();
            this.char = character;
            this.clit = new EquipSlot_1.EquipSlot(character);
            this.ears = new EquipSlot_1.EquipSlot(character);
            this.eyebrow = new EquipSlot_1.EquipSlot(character);
            this.lip = new EquipSlot_1.EquipSlot(character);
            this.nose = new EquipSlot_1.EquipSlot(character);
            this.tongue = new EquipSlot_1.EquipSlot(character);
            this.labia = new EquipSlot_1.EquipSlot(character);
            character.body.chest.forEach(() => this.nipples.add(new EquipSlot_1.EquipSlot(character)));
            character.body.cocks.forEach(() => this.cocks.add(new EquipSlot_1.EquipSlot(character)));
            character.body.chest.on('add', () => {
                this.nipples.add(new EquipSlot_1.EquipSlot(character));
            });
            character.body.chest.on('remove', (cock, index) => {
                this.nipples.remove(index);
            });
            character.body.cocks.on('add', () => {
                this.cocks.add(new EquipSlot_1.EquipSlot(character));
            });
            character.body.cocks.on('remove', (cock, index) => {
                this.cocks.remove(index);
            });
        }
        serialize() {
            const saveObject = {};
            if (this.clit.item)
                saveObject.clit = this.clit.serialize();
            if (this.ears.item)
                saveObject.ears = this.ears.serialize();
            if (this.eyebrow.item)
                saveObject.eyebrow = this.eyebrow.serialize();
            if (this.lip.item)
                saveObject.lip = this.lip.serialize();
            if (this.nose.item)
                saveObject.nose = this.nose.serialize();
            if (this.tongue.item)
                saveObject.tongue = this.tongue.serialize();
            if (this.labia.item)
                saveObject.labia = this.labia.serialize();
            saveObject.nipples = this.nipples.serialize();
            saveObject.cocks = this.cocks.serialize();
            return saveObject;
        }
        deserialize(saveObject) {
            if (saveObject.clit)
                this.clit.deserialize(saveObject.clit);
            if (saveObject.ears)
                this.ears.deserialize(saveObject.ears);
            if (saveObject.eyebrow)
                this.eyebrow.deserialize(saveObject.eyebrow);
            if (saveObject.lip)
                this.lip.deserialize(saveObject.lip);
            if (saveObject.nose)
                this.nose.deserialize(saveObject.nose);
            if (saveObject.tongue)
                this.tongue.deserialize(saveObject.tongue);
            if (saveObject.labia)
                this.labia.deserialize(saveObject.labia);
            this.nipples.deserialize(saveObject.nipples, EquipSlot_1.EquipSlot, this.char);
            while (this.nipples.length < this.char.body.chest.length) {
                this.nipples.add(new EquipSlot_1.EquipSlot(this.char));
            }
            while (this.nipples.length > this.char.body.chest.length) {
                this.nipples.remove(this.nipples.length - 1);
            }
            this.cocks.deserialize(saveObject.cocks, EquipSlot_1.EquipSlot, this.char);
            while (this.cocks.length < this.char.body.cocks.length) {
                this.cocks.add(new EquipSlot_1.EquipSlot(this.char));
            }
            while (this.cocks.length > this.char.body.cocks.length) {
                this.cocks.remove(this.cocks.length - 1);
            }
        }
    }
    exports.PiercingInventory = PiercingInventory;
});
//# sourceMappingURL=PiercingInventory.js.map