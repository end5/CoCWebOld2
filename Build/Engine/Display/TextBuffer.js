define(["require", "exports", "Engine/Utilities/EventEmitter"], function (require, exports, EventEmitter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextBuffer {
        constructor() {
            this.textBuffer = "";
            this.emitter = new EventEmitter_1.EventEmitter();
            // public newline(): TextElement<T> {
            //     this.store("<br>", "");
            //     return this;
            // }
            // public endline(): TextElement<T> {
            //     this.store("", "<br>");
            //     return this;
            // }
            // public newParagraph(): TextElement<T> {
            //     this.store("<br><br>", "");
            //     return this;
            // }
            // public bold(): TextElement<T> {
            //     this.store("<b>", "</b>");
            //     return this;
            // }
            // public italic(): TextElement<T> {
            //     this.store("<i>", "</i>");
            //     return this;
            // }
            // public underscore(): TextElement<T> {
            //     this.store("<u>", "</u>");
            //     return this;
            // }
            // public say(): TextElement<T> {
            //     this.store("<b>", "</b>");
            //     return this;
            // }
            // public describe(): TextElement<T> {
            //     this.store("<i>", "</i>");
            //     return this;
            // }
            // public link(link: string): TextElement<T> {
            //     this.store("<a href='" + link + "'>", "</a>");
            //     return this;
            // }
        }
        getBuffer() {
            return this.textBuffer;
        }
        text(text) {
            this.emitter.dispatch('add', text);
            this.textBuffer = text + "";
            this.emitter.dispatch('modified', this.textBuffer);
            return this;
        }
        clear() {
            this.emitter.dispatch('clear', this.textBuffer);
            this.textBuffer = "";
        }
    }
    exports.TextBuffer = TextBuffer;
});
//# sourceMappingURL=TextBuffer.js.map