import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Effect, IEffectValue } from './Effect';

type EffectConstructor = new(type: string, values?: IEffectValue) => Effect;
export const EffectConstructorLib = new Dictionary<string, EffectConstructor>();
