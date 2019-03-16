define(["require", "exports", "Content/Effects/EffectType", "./CombatEffects/Blind", "./CombatEffects/Disarmed", "./CombatEffects/Heat", "./CombatEffects/KissOfDeath", "./CombatEffects/LustAura", "./CombatEffects/Poison", "./CombatEffects/Rut", "./CombatEffects/Stunned", "Engine/Effects/EffectConstructorLib"], function (require, exports, EffectType_1, Blind_1, Disarmed_1, Heat_1, KissOfDeath_1, LustAura_1, Poison_1, Rut_1, Stunned_1, EffectConstructorLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Blind, Blind_1.Blind);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Disarmed, Disarmed_1.Disarmed);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Heat, Heat_1.Heat);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.KissOfDeath, KissOfDeath_1.KissOfDeath);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.LustAura, LustAura_1.LustAura);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Poison, Poison_1.Poison);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Rut, Rut_1.Rut);
    EffectConstructorLib_1.EffectConstructorLib.set(EffectType_1.EffectType.Stunned, Stunned_1.Stunned);
});
/*
export const AbilityFlagsLib = new Dictionary<CombatEffectType, CombatActionType>();
AbilityFlagsLib.set(CombatEffectType.IsabellaStunned, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Stunned, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Whispered, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Confusion, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.HarpyBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.GooBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.TentacleBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.NagaBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.QueenBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.PCTailTangle, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.HolliConstrict, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.GooArmorBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Constricted, CombatActionType.Attack | CombatActionType.Tease | CombatActionType.MoveAway);
AbilityFlagsLib.set(CombatEffectType.Bound, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.MinotaurEntangled, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.UBERWEB, CombatActionType.Attack | CombatActionType.MagicSpec);
AbilityFlagsLib.set(CombatEffectType.Chokeslam, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Titsmother, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Tentagrappled, CombatActionType.Attack | CombatActionType.Wait);
*/
//# sourceMappingURL=EffectConstructors.js.map