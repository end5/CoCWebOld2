define(["require", "exports", "Engine/Utilities/Dictionary"], function (require, exports, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageLibrary extends Dictionary_1.Dictionary {
        getFilename(path) {
            const filenameRegex = /(?:[\w .-]+\/)*([\w .-]+)/;
            const filename = path.match(filenameRegex);
            if (filename && filename[1])
                return filename[1];
            throw new Error("No filename found");
        }
        register(path) {
            const name = this.getFilename(path);
            this.set(name, { arbitraryPath: path, absolutePaths: [], doesNotExist: false });
        }
    }
    exports.ImageLib = new ImageLibrary();
});
//# sourceMappingURL=ImageLib.js.map