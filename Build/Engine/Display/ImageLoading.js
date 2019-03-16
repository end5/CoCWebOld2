define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const extentions = [".jpg", ".png", ".jpeg", ".gif"];
    function loadImages(path, onSuccess) {
        loadNextImage({
            path,
            paths: [],
            index: 1,
            fileExtension: extentions.slice(),
            concretePath: "",
            onFinish: (info) => {
                onSuccess(info.paths);
            }
        });
    }
    exports.loadImages = loadImages;
    function loadNextImage(info) {
        info.concretePath = info.path + "_" + info.index + info.fileExtension[0];
        const img = new Image();
        img.onload = () => {
            info.paths.push(info.concretePath);
            info.fileExtension.shift();
            if (info.fileExtension.length > 0) {
                loadNextImage(info);
            }
        };
        img.onerror = () => {
            info.fileExtension.shift();
            if (info.fileExtension.length > 0) {
                info.index = 1;
                loadNextImage(info);
            }
            else {
                info.onFinish(info);
            }
        };
        img.src = info.concretePath;
    }
});
//# sourceMappingURL=ImageLoading.js.map