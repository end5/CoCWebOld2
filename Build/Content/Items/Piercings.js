define(["require", "exports", "Content/Items/PiercingName", "Engine/Items/Piercing", "Engine/Items/ItemDict"], function (require, exports, PiercingName_1, Piercing_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ItemDict_1.ItemDict.add(new Piercing_1.Piercing(PiercingName_1.PiercingName.Chain));
    ItemDict_1.ItemDict.add(new Piercing_1.Piercing(PiercingName_1.PiercingName.Hoop));
    ItemDict_1.ItemDict.add(new Piercing_1.Piercing(PiercingName_1.PiercingName.Ladder));
    ItemDict_1.ItemDict.add(new Piercing_1.Piercing(PiercingName_1.PiercingName.Ring));
    ItemDict_1.ItemDict.add(new Piercing_1.Piercing(PiercingName_1.PiercingName.Stud));
});
//# sourceMappingURL=Piercings.js.map