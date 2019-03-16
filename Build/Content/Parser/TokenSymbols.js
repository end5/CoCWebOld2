define(["require", "exports", "./TokenTypes"], function (require, exports, TokenTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenSymbol = {
        [TokenTypes_1.TokenType.Escape]: '\\',
        [TokenTypes_1.TokenType.BracketOpen]: '[',
        [TokenTypes_1.TokenType.BracketClose]: ']',
        [TokenTypes_1.TokenType.ParenthesisOpen]: '(',
        [TokenTypes_1.TokenType.ParenthesisClose]: ')',
        [TokenTypes_1.TokenType.Equal]: '==',
        [TokenTypes_1.TokenType.SingleEqual]: '=',
        [TokenTypes_1.TokenType.NotEqual]: '!=',
        [TokenTypes_1.TokenType.LessThanOrEqual]: '<=',
        [TokenTypes_1.TokenType.LessThan]: '<',
        [TokenTypes_1.TokenType.GreaterThanOrEqual]: '>=',
        [TokenTypes_1.TokenType.GreaterThan]: '>',
        [TokenTypes_1.TokenType.If]: 'if',
        [TokenTypes_1.TokenType.Bar]: '|',
        [TokenTypes_1.TokenType.String]: 'string',
    };
});
//# sourceMappingURL=TokenSymbols.js.map