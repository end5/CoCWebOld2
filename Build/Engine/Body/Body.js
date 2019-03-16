define(["require", "exports", "./Arms", "./Balls", "./BreastRow", "./Butt", "./Chest", "./Clit", "./Cock", "./Hips", "./Neck", "./Tail", "./Vagina", "./Wings", "Engine/Utilities/ObservableList", "./Skin", "./Hair", "./Ears", "./Horns", "./Face", "./Legs", "./Eyes", "./Tongue", "./Beard", "./Antennae", "./Pregnancy/Womb", "./Pregnancy/Ovipositor", "./Pregnancy/ButtWomb"], function (require, exports, Arms_1, Balls_1, BreastRow_1, Butt_1, Chest_1, Clit_1, Cock_1, Hips_1, Neck_1, Tail_1, Vagina_1, Wings_1, ObservableList_1, Skin_1, Hair_1, Ears_1, Horns_1, Face_1, Legs_1, Eyes_1, Tongue_1, Beard_1, Antennae_1, Womb_1, Ovipositor_1, ButtWomb_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Body {
        constructor() {
            this.antennae = new Antennae_1.Antennae();
            this.horns = new Horns_1.Horns();
            this.hair = new Hair_1.Hair();
            this.ears = new Ears_1.Ears();
            this.face = new Face_1.Face();
            this.eyes = new Eyes_1.Eyes();
            this.tongue = new Tongue_1.Tongue();
            this.beard = new Beard_1.Beard();
            this.neck = new Neck_1.Neck();
            this.arms = new Arms_1.Arms();
            this.chest = new Chest_1.Chest();
            this.wings = new Wings_1.Wings();
            this.hips = new Hips_1.Hips();
            this.tails = new ObservableList_1.ObservableList();
            this.butt = new Butt_1.Butt();
            this.cocks = new ObservableList_1.ObservableList();
            this.balls = new Balls_1.Balls();
            this.vaginas = new ObservableList_1.ObservableList();
            this.clit = new Clit_1.Clit();
            this.legs = new Legs_1.Legs();
            this.skin = new Skin_1.Skin();
            this.tallness = 0;
            this.thickness = 0;
            this.tone = 0;
            this.cumMultiplier = 0;
            this.femStat = 50;
            this.fertility = 10;
            this.wombs = new ObservableList_1.ObservableList();
            this.buttWomb = new ButtWomb_1.ButtWomb(this);
            this.ovipositor = new Ovipositor_1.Ovipositor();
            this.vaginas.on('add', () => {
                this.wombs.add(new Womb_1.Womb(this));
            }, false);
            this.vaginas.on('remove', (vagina, index) => {
                this.wombs.remove(index);
            }, false);
        }
        get femininity() { return this.femStat; }
        set femininity(value) {
            this.femStat = value;
            if (this.femStat > 100)
                this.femStat = 100;
            if (this.femStat < 0)
                this.femStat = 0;
        }
        update(hours) {
            for (let timeCountdown = 0; timeCountdown < hours; timeCountdown++) {
                for (const womb of this.wombs)
                    womb.update();
                this.buttWomb.update();
            }
        }
        serialize() {
            return {
                antennae: this.antennae.serialize(),
                horns: this.horns.serialize(),
                hair: this.hair.serialize(),
                ears: this.ears.serialize(),
                face: this.face.serialize(),
                eyes: this.eyes.serialize(),
                tongue: this.tongue.serialize(),
                beard: this.beard.serialize(),
                neck: this.neck.serialize(),
                arms: this.arms.serialize(),
                chest: this.chest.serialize(),
                wings: this.wings.serialize(),
                hips: this.hips.serialize(),
                tails: this.tails.serialize(),
                butt: this.butt.serialize(),
                cocks: this.cocks.serialize(),
                balls: this.balls.serialize(),
                vaginas: this.vaginas.serialize(),
                clit: this.clit.serialize(),
                legs: this.legs.serialize(),
                skin: this.skin.serialize(),
                tallness: this.tallness,
                thickness: this.thickness,
                tone: this.tone,
                cumMultiplier: this.cumMultiplier,
                femininity: this.femininity,
                fertility: this.fertility,
                buttWomb: this.buttWomb.serialize(),
                wombs: this.wombs.serialize(),
                ovipositor: this.ovipositor.serialize()
            };
        }
        deserialize(saveObject) {
            this.antennae.deserialize(saveObject.antennae);
            this.horns.deserialize(saveObject.horns);
            this.hair.deserialize(saveObject.hair);
            this.ears.deserialize(saveObject.ears);
            this.face.deserialize(saveObject.face);
            this.eyes.deserialize(saveObject.eyes);
            this.tongue.deserialize(saveObject.tongue);
            this.beard.deserialize(saveObject.beard);
            this.neck.deserialize(saveObject.neck);
            this.arms.deserialize(saveObject.arms);
            this.chest.deserialize(saveObject.chest, BreastRow_1.BreastRow);
            this.wings.deserialize(saveObject.wings);
            this.hips.deserialize(saveObject.hips);
            this.tails.deserialize(saveObject.tails, Tail_1.Tail);
            this.butt.deserialize(saveObject.butt);
            this.cocks.deserialize(saveObject.cocks, Cock_1.Cock);
            this.balls.deserialize(saveObject.balls);
            this.vaginas.deserialize(saveObject.vaginas, Vagina_1.Vagina);
            this.clit.deserialize(saveObject.clit);
            this.legs.deserialize(saveObject.legs);
            this.skin.deserialize(saveObject.skin);
            this.tallness = saveObject.tallness;
            this.thickness = saveObject.thickness;
            this.tone = saveObject.tone;
            this.cumMultiplier = saveObject.cumMultiplier;
            this.femininity = saveObject.femininity;
            this.fertility = saveObject.fertility;
            if (saveObject.buttWomb)
                this.buttWomb.deserialize(saveObject.buttWomb);
            this.wombs.deserialize(saveObject.wombs, Womb_1.Womb);
            this.ovipositor.deserialize(saveObject.ovipositor);
        }
    }
    exports.Body = Body;
});
//# sourceMappingURL=Body.js.map