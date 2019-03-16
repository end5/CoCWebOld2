define(["require", "exports", "./TokenSymbols"], function (require, exports, TokenSymbols_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParserTracker {
        constructor(stream, error) {
            this.expected = new Set();
            this.results = [];
            this.failIndex = 0;
            this.indent = 0;
            this.debugStack = [];
            this.stream = stream;
            this.error = error;
        }
        call(obj, func, ...args) {
            const start = this.stream.pos;
            this.indent++;
            this.debugStack.push('  '.repeat(this.indent) + '> ' + func.name + ': ' + this.stream.current);
            const value = func.apply(obj, args);
            let debugStr = '  '.repeat(this.indent) + '< ' + func.name + ': ';
            if (('' + value).includes('\n')) {
                debugStr += '\n' + value;
                debugStr = debugStr.replace(/\n/g, '\n' + '  '.repeat(this.indent + 2));
            }
            else
                debugStr += value;
            this.debugStack.push(debugStr);
            this.indent--;
            if (value === this.error) {
                this.stream.pos = start;
                return this.error;
            }
            else {
                this.results.push(value);
                return value;
            }
        }
        expect(type) {
            const visibleType = TokenSymbols_1.TokenSymbol[type] ? TokenSymbols_1.TokenSymbol[type] : type;
            if (this.stream.pos >= this.failIndex) {
                if (this.stream.pos > this.failIndex) {
                    this.failIndex = this.stream.pos;
                    this.expected.clear();
                }
                this.expected.add(visibleType);
            }
            if (!this.stream.eos() && this.stream.current.type === type) {
                this.debugStack.push('  '.repeat(this.indent + 1) + '= true: ' + visibleType);
            }
            else {
                this.debugStack.push('  '.repeat(this.indent + 1) + '= false: ' + visibleType);
            }
            return !this.stream.eos() && this.stream.current.type === type;
        }
        addSuggestion(type, symbol) {
            if (symbol && /[\w\d]+/.test(symbol))
                this.expected.add(symbol);
            else
                this.expected.add(type);
        }
        toString() {
            return this.getError() + "\n" + this.getExpected();
        }
        getError() {
            const index = this.failIndex === 0 ? 0 : this.failIndex - 1;
            return "Error at " + (this.stream.current ? this.stream.at(index) : "End of Line");
        }
        getResult() {
            return this.results[0];
        }
        getExpected() {
            return "Expected: " + Array.from(this.expected).reduce((prev, curr) => prev + ", " + (Array.isArray(curr) ? curr.join(", ") : curr));
        }
        getStackTrace() {
            return this.debugStack.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "");
        }
    }
    exports.ParserTracker = ParserTracker;
});
//# sourceMappingURL=ParserTracker.js.map