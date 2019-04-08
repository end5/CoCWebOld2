import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Effect, IEffectValue } from './Effect';

type EffectConstructor<T extends string = string, V extends IEffectValue | {} = {}> = new (type: T, values?: V) => Effect<T, V>;
export const EffectConstructorLib = new Dictionary<string, EffectConstructor>();
