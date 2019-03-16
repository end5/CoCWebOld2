define(["require", "exports", "./Logger", "./SyntaxType", "./ParserTags"], function (require, exports, Logger_1, SyntaxType_1, ParserTags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InterpreterTracker {
        constructor() {
            this.stack = [];
            this.indent = 0;
        }
        convertToStr(value, indent = 0) {
            if (value === InterpretFailed) {
                return "Interpret Failed";
            }
            else if (Array.isArray(value)) {
                return value.map((item) => this.convertToStr(item)).join(', ');
            }
            else if (typeof value === 'object' && value.toString === Object.prototype.toString) {
                return Object.keys(value).map((key) => key + ': ' + (typeof value[key] === 'object' ? '\n' + '  '.repeat(indent + 1) : '') + this.convertToStr(value[key], indent + 1)).join('\n');
            }
            else if (typeof value === 'function') {
                return value.name;
            }
            else
                return value;
        }
        traverse(node) {
            this.indent++;
            const indentStr = '  '.repeat(this.indent);
            this.stack.push(indentStr + '> ' + node.type);
            const value = postorder.call(undefined, this, node);
            this.stack.push(indentStr + '< ' + node.type + ': ' + this.convertToStr(value));
            this.indent--;
            return value;
        }
        getStackTrace() {
            return this.stack.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "");
        }
    }
    const InterpretFailed = { toString: () => "" };
    function Interpret(node) {
        if (node === undefined)
            return 'Error: Interpreted Nothing';
        const tracker = new InterpreterTracker();
        let resultText = tracker.traverse(node);
        if (resultText === InterpretFailed)
            resultText = '';
        if (typeof resultText === 'function')
            resultText = resultText.name;
        if (resultText === undefined)
            resultText = '';
        if (typeof resultText === 'object')
            resultText = JSON.stringify(resultText);
        Logger_1.parserLog.debug('---- Interpret ---\n' + tracker.getStackTrace() + '\n------------------\n' +
            '----- Result -----\n' + resultText + '\n------------------\n');
        return resultText;
    }
    exports.Interpret = Interpret;
    function postorder(tracker, node) {
        let result;
        const results = [];
        if (!node)
            return;
        if (node.type !== SyntaxType_1.SyntaxType.Args) {
            for (const child of node.children) {
                result = tracker.traverse(child);
                if (result !== undefined)
                    results.push(result);
            }
        }
        return visit(tracker, node, results);
    }
    function visit(tracker, node, values) {
        const left = values[0];
        const right = values[1];
        switch (node.type) {
            case SyntaxType_1.SyntaxType.Equal: {
                return left === right;
            }
            case SyntaxType_1.SyntaxType.NotEqual: {
                return left !== right;
            }
            case SyntaxType_1.SyntaxType.LessThan: {
                return left < right;
            }
            case SyntaxType_1.SyntaxType.GreaterThan: {
                return left > right;
            }
            case SyntaxType_1.SyntaxType.LessThanOrEqual: {
                return left <= right;
            }
            case SyntaxType_1.SyntaxType.GreaterThanOrEqual: {
                return left >= right;
            }
            case SyntaxType_1.SyntaxType.Combine: {
                return values.reduce((prev, curr) => {
                    return curr === InterpretFailed ? prev : prev + curr;
                }, '');
            }
            case SyntaxType_1.SyntaxType.Number: {
                return +(node.value);
            }
            case SyntaxType_1.SyntaxType.String: {
                return node.value;
            }
            case SyntaxType_1.SyntaxType.TagIdentity: {
                return ParserTags_1.ParserFuncTags.get(node.value);
            }
            case SyntaxType_1.SyntaxType.ConditionalTagIdentity: {
                return ParserTags_1.ParserCondTags.get(node.value);
            }
            case SyntaxType_1.SyntaxType.ConditionalTagIdentity: {
                return node.value;
            }
            case SyntaxType_1.SyntaxType.Caller: {
                if (left === InterpretFailed) {
                    return InterpretFailed;
                }
                else if (typeof left === 'function') {
                    if (Array.isArray(right)) {
                        return left.apply(undefined, right.map((value) => typeof value === 'function' ? value() : value));
                    }
                    else if (typeof right === 'function')
                        return left.call(undefined, right());
                    else
                        return left.call(undefined, right);
                }
                else
                    return left;
            }
            case SyntaxType_1.SyntaxType.Args: {
                return node.children.map((child) => function memoryAccess() { return postorder(tracker, child); });
            }
            case SyntaxType_1.SyntaxType.If: {
                return left && left !== InterpretFailed ? right : InterpretFailed;
            }
            case SyntaxType_1.SyntaxType.Else: {
                return left && left !== InterpretFailed ? left : right;
            }
            case SyntaxType_1.SyntaxType.Error: {
                Logger_1.parserLog.error(node.reason);
                return '';
            }
            default: { }
        }
    }
});
//# sourceMappingURL=Interpreter.js.map