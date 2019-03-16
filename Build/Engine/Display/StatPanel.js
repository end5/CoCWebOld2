define(["require", "exports", "Engine/Utilities/Html", "Engine/Display/Elements/ScreenElement"], function (require, exports, Html_1, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatPanel extends ScreenElement_1.ScreenElement {
        constructor() {
            super(...arguments);
            this.statValue = 0;
            this.statMin = 0;
            this.statMax = 100;
        }
        get element() {
            return super.element;
        }
        set element(htmlElement) {
            super.element = htmlElement;
            this.setStats();
        }
        setStats() {
            this.statBarElement = this.element.getElementsByClassName("statsBar")[0];
            this.statCurrentElement = Html_1.loadFromClassName("statsCurrent", this.element);
            this.statMaxElement = this.element.getElementsByClassName("statsMax")[0];
            this.statValue = 0;
            this.statMin = 0;
            this.statMax = 100;
        }
        get value() {
            return this.statValue;
        }
        set value(num) {
            this.statValue = num;
            this.update();
        }
        get min() {
            return this.statMin;
        }
        set min(num) {
            this.statMin = num;
            this.update();
        }
        get max() {
            return this.statMax;
        }
        set max(num) {
            this.statMax = num;
            this.update();
        }
        update() {
            if (this.statCurrentElement) {
                this.statCurrentElement.textContent = this.statValue.toString();
                if (this.statBarElement) {
                    if (this.statMaxElement && this.statMax >= 0) {
                        this.statMaxElement.textContent = this.statMax.toString();
                    }
                    if (this.statMax <= 0 || this.statValue <= 0)
                        this.statBarElement.style.width = "0%";
                    else
                        this.statBarElement.style.width = (this.statValue / this.statMax * 100).toString() + "%";
                }
            }
        }
    }
    exports.StatPanel = StatPanel;
});
//# sourceMappingURL=StatPanel.js.map