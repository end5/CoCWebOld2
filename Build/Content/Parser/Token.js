define(["require", "exports", "./TokenTypes"], function (require, exports, TokenTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Token {
        constructor(
        /** The token type the mode assigned to the token, such as "keyword" or "comment" (may also be null). */
        type, 
        /** The token's string. */
        text, 
        /** The character(on the given line) at which the token starts. */
        start, 
        /** The character at which the token ends. */
        end) {
            this.type = type;
            this.text = text;
            this.start = start;
            this.end = end;
        }
        toString() {
            return "\"" + (this.text === '\n' ? '\\n' : this.text) + "\" : [" + this.type + ":" + this.start + ":" + this.end + "]";
        }
    }
    exports.Token = Token;
    class ErrorToken extends Token {
        constructor(
        /** The reason for the error. */
        reason, 
        /** The token's string. */
        text, 
        /** The line which this toke is on */
        start, 
        /** The character at which the token ends. */
        end) {
            super(TokenTypes_1.TokenType.Error, text, start, end);
            this.reason = reason;
            this.text = text;
            this.start = start;
            this.end = end;
        }
        toString() {
            return this.reason + ' - ' + super.toString();
        }
    }
    exports.ErrorToken = ErrorToken;
});
//# sourceMappingURL=Token.js.map