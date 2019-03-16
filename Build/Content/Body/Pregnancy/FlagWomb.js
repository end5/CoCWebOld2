define(["require", "exports", "Engine/Body/Pregnancy/Pregnancy", "Engine/Utilities/Dictionary"], function (require, exports, Pregnancy_1, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FlagWomb {
        constructor() {
            this.eventSets = new Dictionary_1.Dictionary();
            this.lastEvent = 0;
        }
        get pregnancy() {
            return this.currentPregnancy;
        }
        get event() {
            if (this.currentPregnancy) {
                if (this.currentPregnancy.incubation <= 0)
                    return 0;
                const eventSet = this.eventSets.get(this.currentPregnancy.type);
                if (eventSet)
                    for (let index = 0; index < eventSet.length; index++) {
                        if (this.currentPregnancy && this.currentPregnancy.incubation > eventSet[index])
                            return index;
                    }
            }
            return 1;
        }
        eventTriggered() {
            if (this.lastEvent === this.event)
                return 0;
            this.lastEvent = this.event;
            return this.lastEvent;
        }
        isPregnant() {
            return !!this.pregnancy;
        }
        knockUp(type, time) {
            this.currentPregnancy = new Pregnancy_1.Pregnancy(type, time);
            this.lastEvent = 0;
        }
        clear() {
            this.currentPregnancy = undefined;
            this.lastEvent = 0;
        }
        update() {
            if (this.currentPregnancy) {
                this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
                if (this.currentPregnancy.incubation === 0) {
                    this.clear();
                }
            }
        }
        serialize() {
            if (this.currentPregnancy)
                return {
                    pregnancy: this.currentPregnancy.serialize(),
                    lastEvent: this.lastEvent,
                };
        }
        deserialize(saveObject) {
            if (saveObject) {
                if (saveObject.pregnancy) {
                    this.currentPregnancy = new Pregnancy_1.Pregnancy('', 0);
                    this.currentPregnancy.deserialize(saveObject.pregnancy);
                }
                this.lastEvent = saveObject.lastEvent;
            }
        }
    }
    exports.FlagWomb = FlagWomb;
});
//# sourceMappingURL=FlagWomb.js.map