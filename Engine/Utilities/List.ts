﻿import { ISerializable } from "./ISerializable";

export type SortOption<T> = (a: T, b: T) => number;
export type FilterOption<T> = (value: T, index: number, array: T[]) => boolean;
export type ReduceOption<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;
export type MapOption<T, U> = (value: T, index: number, array: T[]) => U;
export type FindOption<T> = (value: T, index: number, array: T[]) => boolean;

export class List<T> implements Iterable<T>, ISerializable<T[]> {
    protected list: T[] = [];

    public add(item: T) {
        this.list.push(item);
    }

    public remove(index: number) {
        if (index < 0 || index >= this.list.length)
            throw new RangeError('List index out of bounds');
        this.list.splice(index, 1);
    }

    public removeEntry(entry: T): boolean {
        const index = this.list.indexOf(entry);
        if (index >= 0) {
            this.remove(index);
            return true;
        }
        return false;
    }

    public get(index: number): T | undefined {
        if (index < 0 || index >= this.list.length)
            throw new RangeError('List index out of bounds');
        return this.list[index];
    }

    public indexOf(object: T): number {
        return this.list.indexOf(object);
    }

    public clear() {
        this.list = [];
    }

    public get length(): number {
        return this.list.length;
    }

    /**
     * Returns a sorted copy of the list using the provided sort option
     * @param option SortOption
     */
    public sort(option: SortOption<T> | ((a: T, b: T) => number)): List<T> {
        return this.fromArray(this.list.slice().sort(option));
    }

    /**
     * Returns a filtered copy of the list using the provided filter option
     * @param option FilterOption or FindOption
     */
    public filter(option: FilterOption<T> | ((value: T, index: number, array: T[]) => boolean)): List<T> {
        return this.fromArray(this.list.filter(option));
    }

    /**
     * Reduces the list using reduce option provided
     * @param option ReduceOption
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    public reduce(option: ReduceOption<T, T> | ((prev: T, curr: T, index: number, array: T[]) => T), initialValue?: T): T;
    public reduce<U>(option: ReduceOption<T, U> | ((prev: U, curr: T, index: number, array: T[]) => U), initialValue: U): U;
    public reduce<U = T>(option: ReduceOption<T, U> | ((prev: U, curr: T, index: number, array: T[]) => U), initialValue: U): U {
        return this.list.reduce(option, initialValue);
    }

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param option FindOption or FilterOption
     */
    public find(option: FindOption<T> | ((value: T, index: number, array: T[]) => boolean)): T | undefined {
        return this.list.find(option);
    }

    /**
     * Returns the index of the first element in the array where option is true, and -1
     * otherwise.
     * @param option find calls option once for each element of the array, in ascending
     * order, until it finds one where option returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     */
    public findIndex(option: FindOption<T> | ((value: T, index: number, array: T[]) => boolean)): number {
        return this.list.findIndex(option);
    }

    public map<U>(option: MapOption<T, U> | ((value: T, index: number, array: T[]) => U)): List<U> {
        return this.fromArray(this.list.map(option));
    }

    public forEach(callbackfn: (value: T, index: number, array: T[]) => void): void {
        return this.list.forEach(callbackfn);
    }

    /**
     * Returns a random item from the list.
     */
    public random(): T | undefined {
        return this.list[Math.round(Math.random() * (this.list.length - 1))];
    }

    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    public concat(...items: (T | List<T> | ConcatArray<T>)[]): List<T> {
        if (items instanceof List)
            return this.fromArray(this.list.concat(items.list));
        else
            return this.fromArray(this.list.concat(...(items as (T | ConcatArray<T>)[])));
    }

    /**
     * Converts the list to an array
     */
    public toArray(): T[] {
        return this.list.slice(0);
    }

    private fromArray<U>(list: U[]): List<U> {
        const newList = new List<U>();
        newList.list = list.slice(0);
        return newList;
    }

    public [Symbol.iterator](): Iterator<T> {
        let counter = 0;
        const storedList = this.list;

        return {
            next(): IteratorResult<T> {
                return {
                    done: counter === storedList.length,
                    value: storedList[counter++]
                };
            }
        };
    }

    public serialize<U>(): U[] {
        return this.map((v) => {
            if ((v as any).serialize)
                return (v as any).serialize();
            else
                return v;
        }).toArray();
    }

    public deserialize<U>(saveObject: U[], entryConstructor?: new (...args: any[]) => any, ...args: any[]): void {
        this.clear();
        saveObject.forEach((entry, index) => {
            if (entryConstructor) {
                const newObj = new (Function.prototype.bind.apply(entryConstructor, [args]))();
                if (entry && typeof entry === 'object' && (newObj as any).deserialize)
                    newObj.deserialize(entry);
                this.add(newObj);
            }
            else
                this.add(entry as any as T);
        });
    }
}
