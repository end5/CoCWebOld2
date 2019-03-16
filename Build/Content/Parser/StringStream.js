define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringStream {
        constructor(str, tabSize) {
            this.pos = 0;
            this.lines = [];
            this.lineStartPos = 0;
            this.str = str;
            this.tabSize = tabSize;
        }
        advStream(amount) {
            if (!amount)
                amount = 0;
            do {
                if (this.str[this.pos] === '\n') {
                    this.lines.push(this.str.substring(this.lineStartPos, this.pos));
                    this.lineStartPos = this.pos + 1;
                }
                this.pos++;
                amount--;
            } while (amount > 0);
        }
        /**
         * Returns true only if the stream is at the end of the string.
         */
        eos() {
            return this.pos === this.str.length;
        }
        /**
         * Returns true only if the stream is at the end of the line.
         */
        eol() {
            return this.str[this.pos] === "\n";
        }
        /**
         * Returns true only if the stream is at the start of the line.
         */
        sol() {
            return this.pos === this.lineStartPos;
        }
        /**
         * The current line's content.
         */
        line() {
            return this.str.substring(this.lineStartPos, this.pos);
        }
        /**
         * The current line's content.
         */
        lineAt(index) {
            return this.lines[index];
        }
        /**
         * The current line number.
         */
        lineNum() {
            return this.lines.length;
        }
        /**
         * Returns the next character in the stream without advancing it. Returns undefined when at end of file
         */
        peek() {
            return this.str[this.pos];
        }
        /**
         * Returns the next character in the stream and advances it. Returns undefined when at end of string
         */
        next() {
            if (!this.eos()) {
                const char = this.str[this.pos];
                this.advStream();
                return char;
            }
            return;
        }
        /**
         * If the next character in the stream 'matches' the given argument, it is consumed and returned.
         * Otherwise, undefined is returned.
         * @param match A character or regular expression
         */
        eat(match) {
            if (match instanceof RegExp && match.test(this.str[this.pos]))
                return this.next();
            else if (this.str[this.pos] === match)
                return this.next();
            return;
        }
        /**
         * Repeatedly calls eat with the given argument, until it fails. Returns true if any characters were eaten.
         * @param match A character or regular expression
         */
        eatWhile(match) {
            const startPos = this.pos;
            while (this.eat(match)) { }
            return this.pos > startPos;
        }
        /**
         * A multi-character eat. If characters are matched, returns true, else returns false.
         * @param pattern A string or a regular expression starting with ^
         * @param consume Eats pattern
         * @param caseInsensitive Make the match case-insensitive
         */
        match(pattern, consume, caseInsensitive) {
            if (typeof pattern === "string") {
                const cased = (str) => caseInsensitive ? str.toLowerCase() : str;
                const substr = this.str.substr(this.pos, pattern.length);
                if (cased(substr) === cased(pattern)) {
                    if (consume !== false)
                        this.advStream(pattern.length);
                    return true;
                }
            }
            else {
                const match = this.str.slice(this.pos).match(pattern);
                if (match && match.index && match.index > 0)
                    return false;
                if (match && consume !== false)
                    this.advStream(match[0].length);
                return true;
            }
            return false;
        }
        /**
         * Tells you how far the current line has been indented. Tab and space are the same amount.
         */
        indentation() {
            let count = 0;
            let pos = this.lineStartPos;
            if (this.str[pos] === " ") {
                while (this.str[pos] === " ") {
                    count++;
                    pos++;
                }
            }
            else if (this.str[pos] === "\t") {
                while (this.str[pos] === "\t") {
                    count++;
                    pos++;
                }
            }
            return count;
        }
    }
    exports.StringStream = StringStream;
});
//# sourceMappingURL=StringStream.js.map