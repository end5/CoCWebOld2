﻿import { Arms, IArms } from './Arms';
import { Balls, IBalls } from './Balls';
import { BreastRow } from './BreastRow';
import { Butt, IButt } from './Butt';
import { Chest } from './Chest';
import { Clit, IClit } from './Clit';
import { Cock } from './Cock';
import { Hips, IHips } from './Hips';
import { Neck, INeck } from './Neck';
import { Tail } from './Tail';
import { Vagina } from './Vagina';
import { Wings, IWings } from './Wings';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { ObservableList } from 'Engine/Utilities/ObservableList';
import { Skin, ISkin } from './Skin';
import { Hair, IHair } from './Hair';
import { Ears, IEars } from './Ears';
import { Horns, IHorns } from './Horns';
import { Face, IFace } from './Face';
import { Legs, ILegs } from './Legs';
import { Eyes, IEyes } from './Eyes';
import { Tongue, ITongue } from './Tongue';
import { Beard, IBeard } from './Beard';
import { Antennae, IAntennae } from './Antennae';
import { Womb, IWomb } from './Pregnancy/Womb';
import { Ovipositor, IOvipositor } from './Pregnancy/Ovipositor';
import { ButtWomb } from './Pregnancy/ButtWomb';

export interface IBody {
    antennae: IAntennae;
    horns: IHorns;
    hair: IHair;
    ears: IEars;
    face: IFace;
    eyes: IEyes;
    tongue: ITongue;
    beard: IBeard;
    neck: INeck;
    arms: IArms;
    chest: BreastRow[];
    wings: IWings;
    hips: IHips;
    tails: Tail[];
    butt: IButt;
    cocks: Cock[];
    balls: IBalls;
    vaginas: Vagina[];
    clit: IClit;
    legs: ILegs;
    skin: ISkin;
    tallness: number;
    thickness: number;
    tone: number;
    cumMultiplier: number;
    femininity: number;
    fertility: number;
    wombs: Womb[];
    buttWomb: IWomb | void;
    ovipositor: IOvipositor;
}

export class Body implements ISerializable<IBody> {
    public readonly antennae = new Antennae();
    public readonly horns = new Horns();
    public readonly hair = new Hair();
    public readonly ears = new Ears();

    public readonly face = new Face();
    public readonly eyes = new Eyes();
    public readonly tongue = new Tongue();
    public readonly beard = new Beard();

    public readonly neck = new Neck();
    public readonly arms = new Arms();
    public readonly chest = new Chest();
    public readonly wings = new Wings();

    public readonly hips = new Hips();
    public readonly tails = new ObservableList<Tail>();
    public readonly butt = new Butt();
    public readonly cocks = new ObservableList<Cock>();
    public readonly balls = new Balls();
    public readonly vaginas = new ObservableList<Vagina>();
    public readonly clit = new Clit();
    public readonly legs = new Legs();

    public skin: Skin = new Skin();
    public tallness: number = 0;
    public thickness: number = 0;
    public tone: number = 0;

    public cumMultiplier = 0;
    protected femStat = 50;
    public get femininity() { return this.femStat; }
    public set femininity(value: number) {
        this.femStat = value;
        if (this.femStat > 100) this.femStat = 100;
        if (this.femStat < 0) this.femStat = 0;
    }
    public fertility = 10;

    public wombs = new ObservableList<Womb>();
    public buttWomb = new ButtWomb(this);
    public ovipositor = new Ovipositor();

    public constructor() {
        this.vaginas.on('add', () => {
            this.wombs.add(new Womb(this));
        }, false);
        this.vaginas.on('remove', (vagina, index) => {
            this.wombs.remove(index);
        }, false);
    }

    public update(hours: number) {
        for (let timeCountdown: number = 0; timeCountdown < hours; timeCountdown++) {
            for (const womb of this.wombs)
                womb.update();
            this.buttWomb.update();
        }
    }

    public serialize(): IBody {
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

    public deserialize(saveObject: IBody) {
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
        this.chest.deserialize(saveObject.chest, BreastRow);
        this.wings.deserialize(saveObject.wings);
        this.hips.deserialize(saveObject.hips);
        this.tails.deserialize(saveObject.tails, Tail);
        this.butt.deserialize(saveObject.butt);
        this.cocks.deserialize(saveObject.cocks, Cock);
        this.balls.deserialize(saveObject.balls);
        this.vaginas.deserialize(saveObject.vaginas, Vagina);
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
        this.wombs.deserialize(saveObject.wombs, Womb);
        this.ovipositor.deserialize(saveObject.ovipositor);
    }
}
