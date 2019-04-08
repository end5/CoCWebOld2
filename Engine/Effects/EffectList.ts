import { Effect, IEffectValue } from './Effect';
import { ObservableList } from 'Engine/Utilities/ObservableList';
import { EffectConstructorLib } from './EffectConstructorLib';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

type MapObject<T> = { [K in keyof T]: T[K] };
type MaybeValues<T extends string, M> = T extends keyof M ? M[T] : {};
type EffectMaybeValues<T extends string, M> = Effect<T, MaybeValues<T, M>>;

export class EffectList<T extends string, M extends MapObject<M>> extends ObservableList<EffectMaybeValues<T, M>> {
    public create<K extends keyof M & string>(key: K, values: M[K]): Effect<K, M[K]>;
    public create<K extends Exclude<T, keyof M> & string>(key: K): Effect<K>;
    public create<K extends T>(type: K, values?: MaybeValues<K, M>) {
        let newEffect;
        const effectConstr = EffectConstructorLib.get(type);
        if (effectConstr) {
            newEffect = new effectConstr(type, values);
        }
        newEffect = new Effect(type, values);
        this.add(newEffect);
        return newEffect;
    }

    public getByName<K extends T>(name: K) {
        return this.list.find((effect) => effect.type === name) as EffectMaybeValues<K, M> | undefined;
    }

    public removeByName<K extends T>(name: K) {
        const index = this.list.findIndex((effect) => effect.type === name);
        if (index !== -1)
            this.remove(index);
        return index !== -1;
    }

    public has<K extends T>(name: K): boolean {
        return this.list.some((effect) => effect.type === name);
    }

    public get blockedCombatActions(): CombatActionType {
        let flags = CombatActionType.None;
        for (const effect of this.list as Effect<T, IEffectValue>[]) {
            if (effect.values.blockedTypes)
                flags &= effect.values.blockedTypes;
        }
        return flags;
    }
}
