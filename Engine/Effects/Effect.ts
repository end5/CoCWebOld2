import { EffectDesc } from './EffectDesc';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { IEffectValues } from './EffectValues';
import { EffectDescLib } from './EffectDescLib';
import { Character } from 'Engine/Character/Character';

export interface IEffect {
    type: string;
    values?: IEffectValues;
}

export class Effect implements ISerializable<IEffect> {
    private effectType: string;
    public readonly desc: EffectDesc;
    private effectValues: IEffectValues;

    public constructor(type: string, values?: IEffectValues) {
        this.effectType = type;
        this.desc = EffectDescLib.get(name);
        this.effectValues = values ? values : {};
    }

    public get values() {
        return this.effectValues;
    }

    public get type(): string {
        return this.effectType;
    }

    public combatStart(char: Character): void { }
    public combatTurnStart(char: Character, ...enemies: Character[]): void { }
    public combatTurnEnd(char: Character, ...enemies: Character[]): void { }
    public combatEnd(char: Character): void { }

    public serialize(): IEffect {
        if (Object.keys(this.values).length > 0)
            return {
                type: this.effectType,
                values: this.values
            };
        else
            return { type: this.effectType };
    }

    public deserialize(saveObject: IEffect) {
        this.effectType = saveObject.type;
        if (saveObject.values)
            this.effectValues = saveObject.values;
    }
}
