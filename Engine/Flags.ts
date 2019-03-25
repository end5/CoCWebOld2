import { IDictionary } from 'Engine/Utilities/Dictionary';
import { ISerializable } from 'Engine/Utilities/ISerializable';

class FlagDict implements ISerializable<object> {
    private defaultFlags: IDictionary<object> = {};
    private flags: IDictionary<object> = {};

    /**
     * Registers a object. This is the default entry for the key.
     * Returns the original object.
     * @param key
     * @param entry
     */
    public register<T extends object>(key: string, entry: T): T {
        this.flags[key] = entry;
        this.defaultFlags[key] = JSON.parse(JSON.stringify(entry));
        return entry;
    }

    /**
     * Resets the flags. Does not change objects.
     */
    public reset() {
        this.overwriteFlags(this.flags, JSON.parse(JSON.stringify(this.defaultFlags)));
    }

    private overwriteFlags(flags: IDictionary<any>, defaultFlags: IDictionary<any>) {
        for (const key of Object.keys(flags)) {
            if (typeof flags[key] === 'object' && flags[key] !== null)
                this.overwriteFlags(flags[key] as object, defaultFlags[key] as object);
            else if (
                typeof flags[key] === 'boolean' ||
                typeof flags[key] === 'number' ||
                typeof flags[key] === 'string' ||
                typeof flags[key] === 'undefined'
            )
                flags[key] = defaultFlags[key];
        }
    }

    public serialize(): object {
        return this.flags;
    }

    public deserialize(saveObject: object) {
        this.overwriteFlags(this.flags, saveObject);
    }
}

export const Flags = new FlagDict();
