define(["require", "exports", "./Elements/ImageElement", "./StatsPanel", "./TopButtons", "./BottomButtons", "Engine/Display/Elements/TextElement"], function (require, exports, ImageElement_1, StatsPanel_1, TopButtons_1, BottomButtons_1, TextElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainScreenFacade {
        constructor() {
            this.botButtons = new BottomButtons_1.BottomButtons();
            this.topButtons = new TopButtons_1.TopButtons();
            this.nameDisplay = new TextElement_1.TextElement();
            this.statsPanel = new StatsPanel_1.StatsPanel();
            this.levelupIcon = new ImageElement_1.ImageElement();
            this.timeDayElement = new TextElement_1.TextElement();
            this.timeHourElement = new TextElement_1.TextElement();
            this.imageElement = new ImageElement_1.ImageElement();
            this.textElement = new TextElement_1.TextElement();
            this.spriteElement = new ImageElement_1.ImageElement();
        }
    }
    exports.MainScreen = new MainScreenFacade();
});
//# sourceMappingURL=MainScreen.js.map