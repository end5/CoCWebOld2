define(["require", "exports", "./StringStream", "./Token", "./TokenSymbols", "./TokenTypes", "./Logger"], function (require, exports, StringStream_1, Token_1, TokenSymbols_1, TokenTypes_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LexerState {
        constructor() {
            this.code = false;
            this.escape = false;
            this.nest = [];
            this.errorMsg = '';
        }
    }
    exports.LexerState = LexerState;
    function logTokens(tokens) {
        Logger_1.parserLog.debug('----- Tokens -----\n' +
            tokens.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "") +
            '\n------------------\n');
    }
    function Lex(text) {
        Logger_1.parserLog.debug('------ Text ------\n' +
            text +
            '\n------------------\n');
        const state = new LexerState();
        const stream = new StringStream_1.StringStream(text, 4);
        let tokens = [];
        let start = stream.pos;
        let result;
        while (!stream.eos()) {
            result = tokenizer(stream, state);
            state.prevToken = result;
            if (result === TokenTypes_1.TokenType.Error) {
                tokens = [new Token_1.ErrorToken(state.errorMsg, text.substring(start, stream.pos), start, stream.pos)];
                logTokens(tokens);
                return tokens;
            }
            if (result !== TokenTypes_1.TokenType.Ignore)
                tokens.push(new Token_1.Token(result, text.substring(start, stream.pos), start, stream.pos));
            start = stream.pos;
        }
        logTokens(tokens);
        return tokens;
    }
    exports.Lex = Lex;
    function tokenEscape(stream, state, escapeType) {
        if (stream.eos && stream.eos()) {
            state.errorMsg = 'Unescaped character';
            return TokenTypes_1.TokenType.Error;
        }
        state.escape = false;
        stream.pos++;
        return escapeType;
    }
    function tokenCode(stream, state) {
        if (stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.ParenthesisOpen]))
            return TokenTypes_1.TokenType.ParenthesisOpen;
        if (state.nest[0] && stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.ParenthesisClose])) {
            state.nest[0].innerStringOnly = true;
            return TokenTypes_1.TokenType.ParenthesisClose;
        }
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.Equal]))
            return TokenTypes_1.TokenType.Equal;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.SingleEqual]))
            return TokenTypes_1.TokenType.SingleEqual;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.NotEqual]))
            return TokenTypes_1.TokenType.NotEqual;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.LessThanOrEqual]))
            return TokenTypes_1.TokenType.LessThanOrEqual;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.LessThan]))
            return TokenTypes_1.TokenType.LessThan;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.GreaterThanOrEqual]))
            return TokenTypes_1.TokenType.GreaterThanOrEqual;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.GreaterThan]))
            return TokenTypes_1.TokenType.GreaterThan;
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.Bar]))
            return TokenTypes_1.TokenType.Bar;
        if (state.nest[0] && stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.BracketClose])) {
            state.nest.shift();
            if (state.nest.length === 0)
                state.code = false;
            return TokenTypes_1.TokenType.BracketClose;
        }
        if (stream.eat(/[ \t\n\r]/)) {
            stream.eatWhile(/[ \t\n\r]+/);
            return TokenTypes_1.TokenType.Ignore;
        }
        if (stream.match(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.If]))
            return TokenTypes_1.TokenType.If;
        if (stream.eatWhile(/\d/)) {
            return TokenTypes_1.TokenType.Number;
        }
        if (state.nest[0] && state.nest[0].innerStringOnly && stream.eatWhile(/[^\]|]/)) {
            return TokenTypes_1.TokenType.String;
        }
        if (stream.eatWhile(/[^\s[\]]/)) {
            if (state.nest[0] && !state.nest[0].gotFuncName) {
                state.nest[0].gotFuncName = true;
                return TokenTypes_1.TokenType.Identity;
            }
            return TokenTypes_1.TokenType.String;
        }
        if (stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.BracketOpen])) {
            state.nest.unshift({ gotFuncName: false, innerStringOnly: false });
            return TokenTypes_1.TokenType.BracketOpen;
        }
        // if (stream.eat(/[a-zA-Z]/)) {
        //     stream.eatWhile(/[a-zA-Z\d]/);
        //     state.gotFuncName = true;
        //     return TokenType.Identity;
        // }
    }
    function tokenNotCode(stream, state) {
        if (state.escape) {
            return tokenEscape(stream, state, TokenTypes_1.TokenType.String);
        }
        if (stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.BracketOpen])) {
            state.code = true;
            state.nest.unshift({ gotFuncName: false, innerStringOnly: false });
            return TokenTypes_1.TokenType.BracketOpen;
        }
        if (stream.eat(TokenSymbols_1.TokenSymbol[TokenTypes_1.TokenType.Escape])) {
            state.escape = true;
            return TokenTypes_1.TokenType.Escape;
        }
        if (stream.eatWhile(/[^\[]/)) {
            return TokenTypes_1.TokenType.String;
        }
    }
    function tokenizer(stream, state) {
        const result = state.code ? tokenCode(stream, state) : tokenNotCode(stream, state);
        if (result !== undefined)
            return result;
        stream.pos++;
        state.errorMsg = 'Invalid character';
        return TokenTypes_1.TokenType.Error;
    }
    exports.tokenizer = tokenizer;
});
//# sourceMappingURL=Lexer.js.map