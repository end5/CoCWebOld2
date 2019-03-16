define(["require", "exports", "Engine/Utilities/Time", "Engine/TimeEvents", "Content/Menus/InGame/PlayerMenu", "Engine/Display/ContentView", "Content/Utilities/NumToText"], function (require, exports, Time_1, TimeEvents_1, PlayerMenu_1, ContentView_1, NumToText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function passTime(num) {
        return function passHour(char) {
            ContentView_1.CView.clear();
            if (num === 1)
                ContentView_1.CView.text("An hour passes...\n");
            else
                ContentView_1.CView.text(NumToText_1.numToCardinalCapText(num) + " hours pass...\n");
            Time_1.Time.hour += num;
            TimeEvents_1.TimeEvents.update(num);
            return PlayerMenu_1.playerMenu(char);
        };
    }
    exports.passTime = passTime;
});
//# sourceMappingURL=PassTime.js.map