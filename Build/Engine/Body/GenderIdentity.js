define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Gender;
    (function (Gender) {
        Gender[Gender["NONE"] = 0] = "NONE";
        Gender[Gender["MALE"] = 1] = "MALE";
        Gender[Gender["FEMALE"] = 2] = "FEMALE";
        Gender[Gender["HERM"] = 3] = "HERM";
    })(Gender = exports.Gender || (exports.Gender = {}));
    class GenderIdentity {
        constructor(char) {
            this.sex = Gender.NONE;
            this.forced = false;
            this.preferredGender = Gender.NONE;
            this.char = char;
        }
        update() {
            if (this.char.body.cocks.length > 0 && this.char.body.vaginas.length > 0)
                this.sex = Gender.HERM;
            else if (this.char.body.cocks.length > 0)
                this.sex = Gender.MALE;
            else if (this.char.body.vaginas.length > 0)
                this.sex = Gender.FEMALE;
            else
                this.sex = Gender.NONE;
        }
        get preference() {
            if (this.forced)
                return this.preferredGender;
            else {
                this.update();
                return this.preferredGender;
            }
        }
        set preference(gender) {
            this.forced = gender === undefined ? false : true;
            this.preferredGender = gender;
        }
        get gender() {
            this.update();
            return this.sex;
        }
        reset() {
            this.forced = false;
        }
    }
    exports.GenderIdentity = GenderIdentity;
});
//# sourceMappingURL=GenderIdentity.js.map