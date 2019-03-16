define(["require", "exports", "./StatPanel", "Engine/Utilities/Html", "Engine/Display/Elements/ScreenElement"], function (require, exports, StatPanel_1, Html_1, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatsPanel extends ScreenElement_1.ScreenElement {
        constructor() {
            super(...arguments);
            this.str = new StatPanel_1.StatPanel();
            this.tou = new StatPanel_1.StatPanel();
            this.spe = new StatPanel_1.StatPanel();
            this.int = new StatPanel_1.StatPanel();
            this.lib = new StatPanel_1.StatPanel();
            this.sens = new StatPanel_1.StatPanel();
            this.cor = new StatPanel_1.StatPanel();
            this.hp = new StatPanel_1.StatPanel();
            this.lust = new StatPanel_1.StatPanel();
            this.fatigue = new StatPanel_1.StatPanel();
            this.level = new StatPanel_1.StatPanel();
            this.xp = new StatPanel_1.StatPanel();
            this.gems = new StatPanel_1.StatPanel();
        }
        get element() {
            return super.element;
        }
        set element(htmlElement) {
            super.element = htmlElement;
            this.setStatPanels();
        }
        setStatPanels() {
            this.str.element = Html_1.loadFromId("strengthPanel");
            this.tou.element = Html_1.loadFromId("toughnessPanel");
            this.spe.element = Html_1.loadFromId("speedPanel");
            this.int.element = Html_1.loadFromId("intelligencePanel");
            this.lib.element = Html_1.loadFromId("libidoPanel");
            this.sens.element = Html_1.loadFromId("sensitivityPanel");
            this.cor.element = Html_1.loadFromId("corruptionPanel");
            this.hp.element = Html_1.loadFromId("hpPanel");
            this.lust.element = Html_1.loadFromId("lustPanel");
            this.fatigue.element = Html_1.loadFromId("fatiguePanel");
            this.level.element = Html_1.loadFromId("levelPanel");
            this.xp.element = Html_1.loadFromId("xpPanel");
            this.gems.element = Html_1.loadFromId("gemsPanel");
        }
    }
    exports.StatsPanel = StatsPanel;
});
//# sourceMappingURL=StatsPanel.js.map