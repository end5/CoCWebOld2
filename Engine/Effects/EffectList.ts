import { IEffectValues } from './EffectValues';
import { Effect } from './Effect';
import { ObservableList } from 'Engine/Utilities/ObservableList';
import { EffectConstructorLib } from './EffectConstructorLib';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class EffectList extends ObservableList<Effect> {
    public create(key: string, values?: IEffectValues): Effect {
        let newEffect;
        const effectConstr = EffectConstructorLib.get(key);
        if (effectConstr) {
            newEffect = new effectConstr(key, values);
        }
        newEffect = new Effect(key, values);
        this.add(newEffect);
        return newEffect;
    }

    public getByName(name: string): Effect | undefined {
        return this.list.find((effect) => effect.type === name);
    }

    public removeByName(name: string) {
        const index = this.list.findIndex((effect) => effect.type === name);
        if (index !== -1)
            this.remove(index);
        return index !== -1;
    }

    public has(name: string): boolean {
        return this.list.some((effect) => effect.type === name);
    }

    public get blockedCombatActions(): CombatActionType {
        let flags = CombatActionType.None;
        for (const effect of this) {
            if (effect && effect.values.blockedTypes)
                flags &= effect.values.blockedTypes;
        }
        return flags;
    }
}
