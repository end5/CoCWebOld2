define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class List {
        constructor() {
            this.list = [];
        }
        add(item) {
            this.list.push(item);
        }
        remove(index) {
            if (index < 0 || index >= this.list.length)
                throw new RangeError('List index out of bounds');
            this.list.splice(index, 1);
        }
        removeEntry(entry) {
            const index = this.list.indexOf(entry);
            if (index >= 0) {
                this.remove(index);
                return true;
            }
            return false;
        }
        get(index) {
            if (index < 0 || index >= this.list.length)
                throw new RangeError('List index out of bounds');
            return this.list[index];
        }
        indexOf(object) {
            return this.list.indexOf(object);
        }
        clear() {
            this.list = [];
        }
        get length() {
            return this.list.length;
        }
        /**
         * Returns a sorted copy of the list using the provided sort option
         * @param option SortOption
         */
        sort(option) {
            return this.fromArray(this.list.slice().sort(option));
        }
        /**
         * Returns a filtered copy of the list using the provided filter option
         * @param option FilterOption or FindOption
         */
        filter(option) {
            return this.fromArray(this.list.filter(option));
        }
        reduce(option, initialValue) {
            return this.list.reduce(option, initialValue);
        }
        /**
         * Returns the value of the first element in the array where predicate is true, and undefined
         * otherwise.
         * @param option FindOption or FilterOption
         */
        find(option) {
            return this.list.find(option);
        }
        /**
         * Returns the index of the first element in the array where option is true, and -1
         * otherwise.
         * @param option find calls option once for each element of the array, in ascending
         * order, until it finds one where option returns true. If such an element is found,
         * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
         */
        findIndex(option) {
            return this.list.findIndex(option);
        }
        map(option) {
            return this.fromArray(this.list.map(option));
        }
        forEach(callbackfn) {
            return this.list.forEach(callbackfn);
        }
        /**
         * Returns a random item from the list.
         */
        random() {
            return this.list[Math.round(Math.random() * (this.list.length - 1))];
        }
        /**
         * Combines two or more arrays.
         * @param items Additional items to add to the end of array1.
         */
        concat(...items) {
            if (items instanceof List)
                return this.fromArray(this.list.concat(items.list));
            else
                return this.fromArray(this.list.concat(...items));
        }
        /**
         * Converts the list to an array
         */
        toArray() {
            return this.list.slice(0);
        }
        fromArray(list) {
            const newList = new List();
            newList.list = list.slice(0);
            return newList;
        }
        [Symbol.iterator]() {
            let counter = 0;
            const storedList = this.list;
            return {
                next() {
                    return {
                        done: counter === storedList.length,
                        value: storedList[counter++]
                    };
                }
            };
        }
        serialize() {
            return this.map((v) => {
                if (v.serialize)
                    return v.serialize();
                else
                    return v;
            }).toArray();
        }
        deserialize(saveObject, entryConstructor, ...args) {
            this.clear();
            saveObject.forEach((entry, index) => {
                if (entryConstructor) {
                    const newObj = new (Function.prototype.bind.apply(entryConstructor, [args]))();
                    if (entry && typeof entry === 'object' && newObj.deserialize)
                        newObj.deserialize(entry);
                    this.add(newObj);
                }
                else
                    this.add(entry);
            });
        }
    }
    exports.List = List;
});
//# sourceMappingURL=List.js.map