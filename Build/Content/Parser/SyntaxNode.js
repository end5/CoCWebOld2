define(["require", "exports", "./SyntaxType"], function (require, exports, SyntaxType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SyntaxNode {
        constructor(type, left, right) {
            this.type = type;
            this.children = [];
            if (left !== undefined)
                this.left = left;
            if (right !== undefined)
                this.right = right;
        }
        get left() {
            return this.children[0];
        }
        set left(node) {
            this.children[0] = node;
        }
        get right() {
            return this.children[1];
        }
        set right(node) {
            this.children[1] = node;
        }
        toString(indent = 0) {
            const text = this.type + this.children.reduce((prev, next) => prev + '\n' + '  '.repeat(indent + 1) + (next ? next.toString(indent + 1) : 'undefined'), '');
            return text;
        }
    }
    exports.SyntaxNode = SyntaxNode;
    class ValueNode extends SyntaxNode {
        constructor(type, value, silentFail) {
            super(type);
            this.type = type;
            this.value = value;
            this.silentFail = silentFail;
        }
        toString(indent = 0) {
            return '"' + (this.value === '\n' ? '\\n' : this.value) + '" : ' + super.toString(indent);
        }
    }
    exports.ValueNode = ValueNode;
    class ErrorNode extends SyntaxNode {
        constructor(reason) {
            super(SyntaxType_1.SyntaxType.Error);
            this.reason = reason;
        }
    }
    exports.ErrorNode = ErrorNode;
});
//# sourceMappingURL=SyntaxNode.js.map