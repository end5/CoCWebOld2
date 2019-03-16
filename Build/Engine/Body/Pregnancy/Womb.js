define(["require", "exports", "./Pregnancy", "Engine/Utilities/SMath", "Engine/Display/ContentView"], function (require, exports, Pregnancy_1, SMath_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Womb {
        constructor(body) {
            this.body = body;
        }
        static PregnantWithType(type) {
            return (a) => {
                return !!a.pregnancy && a.pregnancy.type === type;
            };
        }
        get pregnancy() {
            return this.currentPregnancy;
        }
        isPregnant() {
            return !!this.pregnancy;
        }
        removeHeat() {
            ContentView_1.CView.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
        }
        /**
         * Knocks up a womb.
         * If it guaranteed or the fertility score is greater than the virility,
         * the womb is fertilized and a pregnancy is added.
         * @param pregnancy The pregnancy
         * @param event An event that happens as the pregnancy progresses
         * @param virility A number, default 100
         * @param guarantee If true, guarantees pregnancy
         */
        knockUp(pregnancy, event, virility = 100, guarantee) {
            if (!this.pregnancy && (guarantee || this.body.fertility > SMath_1.randInt(virility))) {
                this.removeHeat();
                this.currentPregnancy = pregnancy;
                this.pregEvent = event;
            }
        }
        clear() {
            this.currentPregnancy = undefined;
        }
        update() {
            if (this.currentPregnancy) {
                this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            }
        }
        serialize() {
            if (this.currentPregnancy)
                return {
                    pregnancy: this.currentPregnancy
                };
        }
        deserialize(saveObject) {
            if (saveObject) {
                this.currentPregnancy = new Pregnancy_1.Pregnancy('', 0);
                this.currentPregnancy.deserialize(saveObject.pregnancy);
            }
        }
    }
    Womb.LargestPregnancy = (a, b) => {
        return (a.pregnancy ? a.pregnancy.incubation : 0) - (b.pregnancy ? b.pregnancy.incubation : 0);
    };
    Womb.SmallestPregnancy = (a, b) => {
        return (b.pregnancy ? b.pregnancy.incubation : 0) - (a.pregnancy ? a.pregnancy.incubation : 0);
    };
    Womb.Pregnant = (a) => {
        return a.isPregnant();
    };
    Womb.NotPregnant = (a) => {
        return !a.isPregnant();
    };
    exports.Womb = Womb;
});
//# sourceMappingURL=Womb.js.map