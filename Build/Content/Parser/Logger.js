define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Logger {
        constructor() {
            this.debugOut = [];
            this.errorOut = [];
            this.on = false;
            this.bufferDebug = '';
            this.bufferError = '';
        }
        flush() {
            for (const output of this.debugOut)
                output(this.bufferDebug);
            for (const output of this.errorOut)
                output(this.bufferError);
            this.bufferDebug = '';
            this.bufferError = '';
        }
        debug(text) {
            this.bufferDebug += text;
        }
        error(text, prefix) {
            this.bufferError += (prefix ? prefix : 'Error: ') + text;
        }
        registerOutput(logType, outputCallback) {
            if (logType === 'error')
                this.errorOut.push(outputCallback);
            if (logType === 'debug')
                this.debugOut.push(outputCallback);
        }
    }
    exports.parserLog = new Logger();
});
//# sourceMappingURL=Logger.js.map