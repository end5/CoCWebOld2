import { CharacterType } from 'Content/Character/CharacterType';
import { Gender } from 'Engine/Body/GenderIdentity';
import { AntennaeType } from 'Engine/Body/Antennae';
import { HornType } from 'Engine/Body/Horns';
import { HairType } from 'Engine/Body/Hair';
import { EarType } from 'Engine/Body/Ears';
import { FaceType } from 'Engine/Body/Face';
import { EyeType } from 'Engine/Body/Eyes';
import { TongueType } from 'Engine/Body/Tongue';
import { ArmType } from 'Engine/Body/Arms';
import { BreastCup } from 'Engine/Body/BreastRow';
import { WingType } from 'Engine/Body/Wings';
import { HipRating } from 'Engine/Body/Hips';
import { TailType } from 'Engine/Body/Tail';
import { ButtRating, ButtWetness, ButtLooseness } from 'Engine/Body/Butt';
import { CockType } from 'Engine/Body/Cock';
import { VaginaType, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { LegType } from 'Engine/Body/Legs';
import { SkinType } from 'Engine/Body/Skin';
import { EffectType } from 'Content/Effects/EffectType';
import { EffectValues } from 'Engine/Effects/EffectValues';
import { WeaponName } from 'Content/Items/WeaponName';
import { ArmorName } from 'Content/Items/ArmorName';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { MaterialName } from 'Content/Items/MaterialName';
import { CockSockName } from 'Content/Items/CockSockName';
import { PiercingName } from 'Content/Items/PiercingName';
import { ItemType } from 'Engine/Items/ItemType';
import { IDictionary } from 'Engine/Utilities/Dictionary';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { IncubationTime } from 'Content/Body/Pregnancy/IncubationTime';

/*
    all
        label - The display name of the variable
        desc - A description of the variable
        type - Varialbe type (boolean, number, string, array, object, multioption)
        options - List of names or numbers that the variable can be
        groupTag - The display group the variable is part of
    array
        properties - The properties of each array entry
        min - The minimum size of the array
        max - The maximum size of the array
    multioption
        customCallback - Callback function used to change the output
    object
        properties - The properties of the object
        canBeNull - Can the value be null
        create - Function to create a new value
    string
    boolean
    number
        default - The default value if it doesn't exist
*/

export type AnyProp = ArrayEntryProp & Prop;
export type ArrayEntryProp = ValueProp | ArrayProp | ObjectProp;

export interface Prop {
    label: string;
    desc?: string;
    type: 'boolean' | 'number' | 'string' | 'array' | 'object';
}

export interface PropDict {
    [x: string]: AnyProp;
}

export interface ValueProp {
    type: 'boolean' | 'number' | 'string';
    options?: IDictionary<any> | any[];
}

export interface ObjectProp {
    type: 'object';
    properties: PropDict;
    create?: () => any;
}

export interface ArrayProp {
    type: 'array';
    min?: number;
    max?: number;
    entry: ArrayEntryProp;
}

const allItemNames = Object.assign({}, WeaponName, ArmorName, ConsumableName, MaterialName, CockSockName, PiercingName);

export const CharMap: PropDict = {
    type: { label: "Type", type: "string", options: CharacterType },
    uuid: { label: "UUID", type: "string" },
    partyUUID: { label: "Party UUID", type: "string" },
    genderPref: { label: "Gender Pref", type: "number", options: Gender },
    hoursSinceCum: { label: "Hours Since Cum", type: "number" },
    body: {
        label: "Body",
        type: "object",
        properties: {
            antennae: {
                label: "Antennae",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: AntennaeType }
                }
            },
            horns: {
                label: "Horns",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: HornType },
                    count: { label: "Count", type: "number" }
                }
            },
            hair: {
                label: "Hair",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: HairType },
                    color: { label: "Color", type: "string" },
                    length: { label: "Length", type: "number" }
                }
            },
            ears: {
                label: "Ears",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: EarType },
                    value: { label: "Value", type: "number" }
                }
            },
            face: {
                label: "Face",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: FaceType },
                }
            },
            eyes: {
                label: "Eyes",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: EyeType },
                }
            },
            tongue: {
                label: "Tongue",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: TongueType },
                }
            },
            beard: {
                label: "Beard",
                type: "object",
                properties: {
                    style: { label: "Style", type: "string" },
                    length: { label: "Length", type: "number" }
                }
            },
            neck: {
                label: "Neck",
                type: "object",
                properties: {
                    gills: { label: "Gills", type: "boolean" }
                }
            },
            arms: {
                label: "Arms",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: ArmType },
                }
            },
            chest: {
                label: "Chest",
                type: "array",
                min: 1,
                max: 10,
                entry: {
                    type: "object",
                    create: createBreastRow,
                    properties: {
                        rating: { label: "Rating", type: "number", options: BreastCup },
                        lactationMultiplier: { label: "Lactation Multiplier", type: "number" },
                        milkFullness: { label: "Milk Fullness", type: "number" },
                        fullness: { label: "Fullness", type: "number" },
                        nipples: {
                            label: "Nipples",
                            type: "object",
                            properties: {
                                count: { label: "Count", type: "number" },
                                length: { label: "Length", type: "number" },
                                fuckable: { label: "Fuckable", type: "boolean" },
                            }
                        },
                        count: { label: "Count", type: "number" },
                    },
                },
            },
            wings: {
                label: "Wings",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: WingType },
                    desc: { label: "Desc", type: "string" },
                }
            },
            hips: {
                label: "Hips",
                type: "object",
                properties: {
                    rating: { label: "Rating", type: "number", options: HipRating },
                }
            },
            tails: {
                label: "Tails",
                type: "array",
                entry: {
                    type: "object",
                    create: createTail,
                    properties: {
                        type: { label: "Type", type: "number", options: TailType },
                        venom: { label: "Venom", type: "number" },
                        recharge: { label: "Recharge", type: "number" },
                    }
                }
            },
            butt: {
                label: "Butt",
                type: "object",
                properties: {
                    rating: { label: "Rating", type: "number", options: ButtRating },
                    wetness: { label: "Wetness", type: "number", options: ButtWetness },
                    looseness: { label: "Looseness", type: "number", options: ButtLooseness },
                }
            },
            cocks: {
                label: "Cocks",
                type: "array",
                entry: {
                    type: "object",
                    create: createCock,
                    properties: {
                        length: { label: "Length", type: "number" },
                        thickness: { label: "Thickness", type: "number" },
                        type: { label: "Type", type: "number", options: CockType },
                        knotMultiplier: { label: "Knot Multiplier", type: "number" },
                    }
                }
            },
            balls: {
                label: "Balls",
                type: "object",
                properties: {
                    count: { label: "Count", type: "number" },
                    size: { label: "Size", type: "number" },
                }
            },
            vaginas: {
                label: "Vaginas",
                type: "array",
                entry: {
                    type: "object",
                    create: createVagina,
                    properties: {
                        type: { label: "Type", type: "number", options: VaginaType },
                        virgin: { label: "Virgin", type: "boolean" },
                        wetness: { label: "Wetness", type: "number", options: VaginaWetness },
                        looseness: { label: "Looseness", type: "number", options: VaginaLooseness },
                        fullness: { label: "Fullness", type: "number" },
                    }
                }
            },
            clit: {
                label: "Clit",
                type: "object",
                properties: {
                    length: { label: "Length", type: "number" },
                }
            },
            legs: {
                label: "Legs",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: LegType },
                }
            },
            skin: {
                label: "Skin",
                type: "object",
                properties: {
                    type: { label: "Type", type: "number", options: SkinType },
                    tone: { label: "Tone", type: "string" },
                    desc: { label: "Desc", type: "string" },
                    adj: { label: "Virgin", type: "string" },
                }
            },
            tallness: { label: "Tallness", type: "number", },
            thickness: { label: "Thickness", type: "number", },
            tone: { label: "Tone", type: "number", },
            cumMultiplier: { label: "Cum Multiplier", type: "number", },
            femininity: createRangedStatMap("Femininity"),
            fertility: createRangedStatMap("Fertility"),
            wombs: {
                label: "Wombs",
                type: "array",
                entry: createWombMap()
            },
            buttWomb: {
                label: "ButtWomb",
                type: "object",
                properties: {
                    pregnancy: createPregMap()
                }
            },
            ovipositor: {
                label: "Ovipositor",
                type: "object",
                properties: {
                    unfertileEggs: { label: "Unfertile Eggs", type: "number" },
                    fertileEggs: { label: "Fertile Eggs", type: "number" },
                }
            },
        }
    },
    stats: {
        label: "Stats",
        type: "object",
        properties: {
            str: createRangedStatMap("Strength"),
            tou: createRangedStatMap("Toughness"),
            spe: createRangedStatMap("Speed"),
            int: createRangedStatMap("Intelligence"),
            lib: createRangedStatMap("Libido"),
            sens: createRangedStatMap("Sensitivity"),
            cor: createRangedStatMap("Corruption"),
            fatigue: createRangedStatMap("Fatigue"),
            HP: createRangedStatMap("Hit Points"),
            lust: createRangedStatMap("Lust"),
            lustVuln: { label: "Lust Vulnerability", type: "number" },
            XP: createStatMap("Experience"),
            level: createStatMap("Level"),
            perkPoints: { label: "Perk Points", type: "number" },
            teaseXP: { label: "Tease XP", type: "number" },
            teaseLevel: { label: "Tease Level", type: "number" },
        }
    },
    effects: {
        label: "Effects",
        type: "array",
        entry: {
            type: "object",
            create: createEffect,
            properties: {
                type: { label: "Type", type: "string", options: EffectType },
                values: createEffectValuesMap()
            }
        }
    },
    inventory: {
        label: "Inventory",
        type: "object",
        properties: {
            items: {
                label: "Items",
                type: "array",
                entry: {
                    type: "object",
                    create: createItemStack,
                    properties: {
                        item: createItemMap(allItemNames),
                        amount: { label: "Amount", type: "number" },
                        maxAmount: { label: "Max Amount", type: "number" },
                    }
                }
            },
            gems: createStatMap("Gems"),
            weapon: createEquipSlotMap("Equipped Weapon", WeaponName),
            armor: createEquipSlotMap("Equipped Armor", ArmorName),
            piercings: {
                label: "Piercings",
                type: "object",
                properties: {
                    clit: createPiercingSlotMap("Clit", PiercingName),
                    ears: createPiercingSlotMap("Ears", PiercingName),
                    eyebrow: createPiercingSlotMap("Eyebrow", PiercingName),
                    lip: createPiercingSlotMap("Lip", PiercingName),
                    nose: createPiercingSlotMap("Nose", PiercingName),
                    tongue: createPiercingSlotMap("Tongue", PiercingName),
                    labia: createPiercingSlotMap("Labia", PiercingName),
                    nipples: {
                        label: "Nipples",
                        type: "array",
                        entry: {
                            type: "object",
                            create: createPiercing,
                            properties: {
                                item: createPiercingSlotMap("Nipple", PiercingName)
                            }
                        }
                    },
                    cocks: {
                        label: "Cocks",
                        type: "array",
                        create: createPiercing,
                        entry: {
                            type: "object",
                            create: createPiercing,
                            properties: {
                                item: createPiercingSlotMap("Cock", PiercingName)
                            }
                        }
                    },
                }
            },
            cockSocks: {
                label: "Cock Socks",
                type: "array",
                entry: createEquipSlotMap("Slot", CockSockName)
            },
            armorDescMod: { label: "Armor Mod Desc", type: "string" }
        }
    },
};

function createPiercingSlotMap(name: string, itemNames: any): ObjectProp & Prop {
    return createEquipSlotMap(name, PiercingName, {
        shortDesc: { label: "Short Desc", type: "string" },
        longDesc: { label: "Long Desc", type: "string" },
    });
}

function createEquipSlotMap(name: string, options: any, mod?: PropDict): ObjectProp & Prop {
    return {
        label: name,
        type: "object",
        properties: {
            item: createItemMap(options, mod),
        }
    };
}

function createItemMap(options: any, mod?: PropDict): ObjectProp & Prop {
    return {
        label: "Item",
        type: "object",
        create: createItem,
        properties: Object.assign({
            name: { label: "Name", type: "string", options },
            type: { label: "Type", type: "number", options: ItemType },
        }, mod)
    };
}

function createWombMap(): ObjectProp {
    return {
        type: "object",
        create: createWomb,
        properties: {
            pregnancy: createPregMap()
        }
    };
}

function createPregMap(): ObjectProp & Prop {
    return {
        label: "Pregnancy",
        type: "object",
        create: createPregnancy,
        properties: {
            type: { label: "Type", type: "number", options: PregnancyType },
            incubation: { label: "Incubation", type: "number" },
        }
    };
}

function createEffectValuesMap(): ObjectProp & Prop {
    return {
        label: "Values",
        type: "object",
        properties:
        {
            expireCountdown: { label: "Expiration Countdown", type: "number" },
            attack: createRangedStatMap("Attack"),
            weapon: createRangedStatMap("Weapon"),
            spell: createRangedStatMap("Spell"),
            spellCost: createStatMap("Spell Cost"),
            defense: createRangedStatMap("Defense"),
            teaseChance: { label: "Tease Chance", type: "number" },
            teaseDamage: { label: "Tease Damage", type: "number" },
            str: createRangedStatMap("Strength"),
            tou: createRangedStatMap("Toughness"),
            spe: createRangedStatMap("Speed"),
            int: createRangedStatMap("Intelligence"),
            lib: createRangedStatMap("Libido"),
            sens: createRangedStatMap("Sensitivity"),
            cor: createRangedStatMap("Corruption"),
            fatigue: createRangedStatMap("Fatigue"),
            hp: createRangedStatMap("Hit Points"),
            lust: createRangedStatMap("Lust"),
            femininity: createRangedStatMap("Femininity"),
            fertility: createRangedStatMap("Fertility"),
            cumQuantity: createRangedStatMap("Cum Quanitity"),
            virility: { label: "Virility", type: "number" },
            vaginalCapacity: { label: "Vaginal Capacity", type: "number" },
            analCapacity: { label: "Anal Capacity", type: "number" },
        }
    };
}

function createRangedStatMap(name: string): ObjectProp & Prop {
    return {
        label: name,
        type: "object",
        properties: {
            value: { label: "Value", type: "number" },
            min: { label: "Min", type: "number" },
            max: { label: "Max", type: "number" },
        }
    };
}

function createStatMap(name: string): ObjectProp & Prop {
    return {
        label: name,
        type: "object",
        properties: {
            value: { label: "Value", type: "number" },
        }
    };
}

// function createRangedEffectMap(name: string): ObjectProp & Prop {
//     return {
//         label: name,
//         type: "object",
//         properties: {
//             value: createStatMap("Raw"),
//             min: createStatMap("Min"),
//             max: createStatMap("Max"),
//         }
//     };
// }

// function createEffectMap(name: string): ObjectProp & Prop {
//     return {
//         label: name,
//         type: "object",
//         properties: {
//             flat: { label: "Flat", type: "number" },
//             multi: { label: "Multiplier", type: "number" },
//         }
//     };
// }

//
// Default create functions
//

function createPiercing() {
    return {
        name: PiercingName.Chain,
        type: ItemType.Misc,
        shortDesc: "",
        longDesc: ""
    };
}

function createItemStack() {
    return {
        slot: {
            item: undefined,
            amount: 0,
            maxAmount: 5
        }
    };
}

function createItem() {
    return {
        name: ConsumableName.BeeHoney,
        type: ItemType.Consumable
    };
}

function createPregnancy() {
    return {
        type: PregnancyType.IMP,
        incubation: IncubationTime.IMP,
    };
}

function createWomb() {
    return {
        pregnancy: undefined,
    };
}

function createTail() {
    return {
        type: TailType.DOG,
        venom: 0,
        recharge: 0,
    };
}

function createCock() {
    return {
        type: CockType.HUMAN,
        length: 5,
        thickness: 1,
        knotMultiplier: 1,
    };
}

function createVagina() {
    return {
        type: VaginaType.HUMAN,
        virgin: true,
        wetness: 0,
        looseness: 0,
        fullness: 0,
    };
}

function createBreastRow() {
    return {
        rating: 0,
        lactationMultiplier: 0,
        milkFullness: 0,
        fullness: 0,
        nipples: {
            count: 2,
            length: 1,
            fuckable: false
        },
        count: 2,
    };
}

function createEffect() {
    return {
        type: "Not An Effect",
        values: new EffectValues()
    };
}
