define(["require", "exports", "./SyntaxNode", "./TokenStream", "./ParserTracker", "./TokenTypes", "./SyntaxType", "./Logger"], function (require, exports, SyntaxNode_1, TokenStream_1, ParserTracker_1, TokenTypes_1, SyntaxType_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SyntaxErr = new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.Error);
    const OperatorMap = {
        [TokenTypes_1.TokenType.Equal]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.Equal },
        [TokenTypes_1.TokenType.SingleEqual]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.Equal },
        [TokenTypes_1.TokenType.NotEqual]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.NotEqual },
        [TokenTypes_1.TokenType.LessThanOrEqual]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.LessThanOrEqual },
        [TokenTypes_1.TokenType.LessThan]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.LessThan },
        [TokenTypes_1.TokenType.GreaterThanOrEqual]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.GreaterThanOrEqual },
        [TokenTypes_1.TokenType.GreaterThan]: { priority: 0, syntaxType: SyntaxType_1.SyntaxType.GreaterThan },
    };
    const Operators = Object.keys(OperatorMap);
    class Parser {
        parse(tokenList) {
            if (tokenList === undefined || tokenList.length <= 0)
                return new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.String, '');
            this.stream = new TokenStream_1.TokenStream(tokenList);
            this.tracker = new ParserTracker_1.ParserTracker(this.stream, SyntaxErr);
            if (this.stream.current.type === TokenTypes_1.TokenType.Error) {
                const errToken = this.stream.current;
                return new SyntaxNode_1.ErrorNode(errToken.reason + ' \'' + errToken.text + '\' ' + '@ Pos ' + errToken.start);
            }
            let result = this.tracker.call(this, this.text);
            if (result === SyntaxErr) {
                result = this.tracker.getResult();
                Logger_1.parserLog.error(this.tracker.toString());
            }
            Logger_1.parserLog.debug('----- Parser -----\n' + this.tracker.getStackTrace() + '\n------------------\n');
            Logger_1.parserLog.debug('-----  AST   -----\n' + result + '\n------------------\n');
            return result;
        }
        text() {
            let nextNode;
            const combineNode = new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.Combine);
            while (!this.stream.eos()) {
                if (nextNode) {
                    combineNode.children.push(nextNode);
                    nextNode = undefined;
                }
                nextNode = this.tracker.call(this, this.string);
                if (nextNode !== SyntaxErr)
                    continue;
                nextNode = this.tracker.call(this, this.codeBlock);
                if (nextNode !== SyntaxErr)
                    continue;
                return SyntaxErr;
            }
            if (nextNode && nextNode !== SyntaxErr)
                combineNode.children.push(nextNode);
            if (nextNode && combineNode.children.length === 0)
                return nextNode;
            else if (combineNode.children.length === 0)
                return SyntaxErr;
            else if (combineNode.children.length === 1)
                return combineNode.left;
            else
                return combineNode;
        }
        codeBlock() {
            let nextNode;
            if (!this.tracker.expect(TokenTypes_1.TokenType.BracketOpen))
                return SyntaxErr;
            this.stream.pos++;
            nextNode = this.tracker.call(this, this.shallow);
            if (nextNode === SyntaxErr)
                return SyntaxErr;
            if (!this.tracker.expect(TokenTypes_1.TokenType.BracketClose))
                return SyntaxErr;
            this.stream.pos++;
            return nextNode;
        }
        shallow() {
            let nextNode;
            nextNode = this.tracker.call(this, this.ifStatement);
            if (nextNode === SyntaxErr)
                nextNode = this.tracker.call(this, this.lookup);
            if (nextNode === SyntaxErr)
                return SyntaxErr;
            return nextNode;
        }
        ifStatement() {
            if (!this.tracker.expect(TokenTypes_1.TokenType.If))
                return SyntaxErr;
            this.stream.pos++;
            if (!this.tracker.expect(TokenTypes_1.TokenType.ParenthesisOpen))
                return SyntaxErr;
            this.stream.pos++;
            const condNode = this.tracker.call(this, this.conditional);
            if (condNode === SyntaxErr)
                return SyntaxErr;
            if (!this.tracker.expect(TokenTypes_1.TokenType.ParenthesisClose))
                return SyntaxErr;
            this.stream.pos++;
            const leftString = this.tracker.call(this, this.string);
            if (leftString === SyntaxErr)
                return SyntaxErr;
            const ifNode = new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.If, condNode, leftString);
            if (this.tracker.expect(TokenTypes_1.TokenType.Bar)) {
                this.stream.pos++;
                const rightString = this.tracker.call(this, this.string);
                if (rightString === SyntaxErr)
                    return SyntaxErr;
                return new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.Else, ifNode, rightString);
            }
            return ifNode;
        }
        conditional() {
            const leftNode = this.tracker.call(this, this.value);
            if (leftNode === SyntaxErr)
                return SyntaxErr;
            let opNode;
            for (const type of Operators) {
                if (this.tracker.expect(type)) {
                    opNode = new SyntaxNode_1.SyntaxNode(OperatorMap[type].syntaxType);
                    this.stream.pos++;
                    break;
                }
            }
            if (opNode === undefined)
                return SyntaxErr;
            opNode.left = leftNode;
            const rightNode = this.tracker.call(this, this.value);
            if (rightNode === SyntaxErr)
                return SyntaxErr;
            opNode.right = rightNode;
            return opNode;
        }
        value() {
            let newNode;
            if (this.tracker.expect(TokenTypes_1.TokenType.Number)) {
                newNode = new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.Number, this.stream.current.text);
                this.stream.pos++;
                return newNode;
            }
            else if (this.tracker.expect(TokenTypes_1.TokenType.Identity)) {
                newNode = new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.ConditionalTagIdentity, this.stream.current.text);
                this.stream.pos++;
                return newNode;
            }
            return SyntaxErr;
        }
        lookup() {
            if (!this.tracker.expect(TokenTypes_1.TokenType.Identity))
                return SyntaxErr;
            const identityNode = new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.TagIdentity, this.stream.current.text);
            this.stream.pos++;
            const argsNode = new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.Args);
            let newNode;
            do {
                newNode = this.tracker.call(this, this.string);
                if (newNode === SyntaxErr && this.tracker.expect(TokenTypes_1.TokenType.Number)) {
                    newNode = new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.Number, this.stream.current.text);
                    this.stream.pos++;
                }
                if (newNode === SyntaxErr)
                    newNode = this.tracker.call(this, this.codeBlock);
                if (newNode === SyntaxErr)
                    break;
                argsNode.children.push(newNode);
            } while (newNode !== undefined);
            return new SyntaxNode_1.SyntaxNode(SyntaxType_1.SyntaxType.Caller, identityNode, argsNode);
        }
        string() {
            let value = '';
            if (this.tracker.expect(TokenTypes_1.TokenType.Escape)) {
                this.stream.pos++;
                if (!this.tracker.expect(TokenTypes_1.TokenType.String))
                    return SyntaxErr;
                value = this.stream.current.text;
                this.stream.pos++;
            }
            else if (this.tracker.expect(TokenTypes_1.TokenType.String)) {
                value = this.stream.current.text;
                this.stream.pos++;
            }
            else
                return SyntaxErr;
            return new SyntaxNode_1.ValueNode(SyntaxType_1.SyntaxType.String, value);
        }
    }
    exports.Parser = Parser;
});
//# sourceMappingURL=Parser.js.map