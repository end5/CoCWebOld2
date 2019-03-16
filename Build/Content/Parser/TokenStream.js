define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TokenStream {
        constructor(tokens) {
            this.tokens = tokens;
            this.pos = 0;
        }
        get current() {
            return this.tokens[this.pos];
        }
        at(index) {
            return this.tokens[index];
        }
        eos() {
            return this.pos >= this.tokens.length;
        }
        consume(type) {
            if (!this.eos() && this.tokens[this.pos].type === type)
                return this.tokens[this.pos++].text;
            return "";
        }
    }
    exports.TokenStream = TokenStream;
});
//# sourceMappingURL=TokenStream.js.map