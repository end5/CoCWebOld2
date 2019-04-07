import { Effect, IEffectValue } from './Effect';
import { ObservableList } from 'Engine/Utilities/ObservableList';
import { EffectConstructorLib } from './EffectConstructorLib';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export interface IEffectValueMap {
    [type: string]: IEffectValue;
}

export class EffectList<M extends IEffectValueMap> extends ObservableList<Effect<any, M[any]>> {
    public create<K extends keyof M & string>(key: K, values?: M[K]): Effect<K, M[K]> {
        let newEffect;
        const effectConstr = EffectConstructorLib.get(key);
        if (effectConstr) {
            newEffect = new effectConstr(key, values);
        }
        newEffect = new Effect(key, values);
        this.add(newEffect);
        return newEffect;
    }

    public getByName<K extends keyof M & string>(name: K): Effect<K, M[K]> | undefined {
        return this.list.find((effect) => effect.type === name);
    }

    public removeByName<K extends keyof M & string>(name: K) {
        const index = this.list.findIndex((effect) => effect.type === name);
        if (index !== -1)
            this.remove(index);
        return index !== -1;
    }

    public has<K extends keyof M>(name: K): boolean {
        return this.list.some((effect) => effect.type === name);
    }

    public get blockedCombatActions(): CombatActionType {
        let flags = CombatActionType.None;
        for (const effect of this.list) {
            if (effect && effect.values.blockedTypes)
                flags &= effect.values.blockedTypes;
        }
        return flags;
    }
}
