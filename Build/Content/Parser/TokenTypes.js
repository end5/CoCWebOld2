define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TokenType;
    (function (TokenType) {
        TokenType["Identity"] = "identity";
        TokenType["Escape"] = "escape";
        TokenType["BracketOpen"] = "bracket open";
        TokenType["BracketClose"] = "bracket close";
        TokenType["ParenthesisOpen"] = "parenthesis open";
        TokenType["ParenthesisClose"] = "parenthesis close";
        TokenType["Equal"] = "equal";
        TokenType["SingleEqual"] = "single equal";
        TokenType["NotEqual"] = "not equal";
        TokenType["LessThan"] = "less than";
        TokenType["LessThanOrEqual"] = "less than or equal";
        TokenType["GreaterThan"] = "greater than";
        TokenType["GreaterThanOrEqual"] = "greater than or equal";
        TokenType["Whitespace"] = "whitespace";
        TokenType["If"] = "if";
        TokenType["Bar"] = "bar";
        TokenType["Number"] = "number";
        TokenType["String"] = "string";
        TokenType["Ignore"] = "ignore";
        TokenType["Error"] = "error";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
});
//# sourceMappingURL=TokenTypes.js.map