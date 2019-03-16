define(["require", "exports", "Engine/Display/ImageLib", "Engine/Display/TextBuffer", "Engine/Display/ImageLoading", "Engine/Utilities/SMath"], function (require, exports, ImageLib_1, TextBuffer_1, ImageLoading_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ContentView {
        constructor() {
            this.textBuffer = new TextBuffer_1.TextBuffer();
        }
        text(content) {
            this.textBuffer.text(content);
            return this;
        }
        image(imageName) {
            const info = ImageLib_1.ImageLib.get(imageName);
            if (info)
                if (info.absolutePaths.length === 0) {
                    ImageLoading_1.loadImages(info.arbitraryPath, (paths) => {
                        info.absolutePaths = paths;
                        if (this.imageElement)
                            this.loadRandomImage(this.imageElement, paths);
                    });
                }
                else if (this.imageElement)
                    this.loadRandomImage(this.imageElement, info.absolutePaths);
            return this;
        }
        loadRandomImage(element, list) {
            if (list.length > 0) {
                element.load(SMath_1.randomChoice(list));
                element.show();
            }
            else
                element.hide();
        }
        sprite(spriteName) {
            const info = ImageLib_1.ImageLib.get(spriteName);
            if (info)
                if (info.absolutePaths.length === 0) {
                    ImageLoading_1.loadImages(info.arbitraryPath, (paths) => {
                        info.absolutePaths = paths;
                        if (this.spriteElement)
                            this.loadRandomImage(this.spriteElement, paths);
                    });
                }
                else if (this.spriteElement)
                    this.loadRandomImage(this.spriteElement, info.absolutePaths);
            return this;
        }
        clear() {
            this.textBuffer.clear();
            if (this.imageElement)
                this.imageElement.hide();
            if (this.spriteElement)
                this.spriteElement.hide();
            return this;
        }
    }
    exports.CView = new ContentView();
});
//# sourceMappingURL=ContentView.js.map