define(["require", "exports", "Engine/Display/MainScreen", "Engine/CharDict", "Engine/Display/BottomButtons"], function (require, exports, MainScreen_1, CharDict_1, BottomButtons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DisplayUpdateEvents = [];
    const previousScreens = [];
    let nextScreens = [];
    function clickFuncWrapper(clickFunc, needEvent) {
        if (typeof clickFunc === "function") {
            nextScreens.push(clickFunc.name);
            return (event) => {
                previousScreens.push(clickFunc.name);
                nextScreens = [];
                if (needEvent)
                    displayNextScreenChoices(clickFunc(CharDict_1.CharDict.player, event));
                else
                    displayNextScreenChoices(clickFunc(CharDict_1.CharDict.player));
            };
        }
        else if (typeof clickFunc === "object" && clickFunc.func) {
            nextScreens.push(clickFunc.func.name);
            return (event) => {
                if (clickFunc.func) {
                    previousScreens.push(clickFunc.func.name);
                    nextScreens = [];
                    if (needEvent)
                        displayNextScreenChoices(clickFunc.func(CharDict_1.CharDict.player, event));
                    else
                        displayNextScreenChoices(clickFunc.func(CharDict_1.CharDict.player));
                }
            };
        }
        return;
    }
    exports.clickFuncWrapper = clickFuncWrapper;
    function displayChoices(choices, persistantChoices, needEvent) {
        const fixedCount = persistantChoices ? persistantChoices.length : 0;
        if (choices && choices.length + fixedCount > BottomButtons_1.BottomButtons.NUM_BOT_BUTTONS) {
            displayPage(0, choices, persistantChoices, needEvent);
        }
        else {
            if (choices) {
                MainScreen_1.MainScreen.botButtons.hide();
                for (let index = 0; index < choices.length; index++) {
                    if (Array.isArray(choices[index])) {
                        MainScreen_1.MainScreen.botButtons.get(index).modify(choices[index][0], clickFuncWrapper(choices[index][1], needEvent));
                        if (choices[index][0] === "")
                            MainScreen_1.MainScreen.botButtons.get(index).hide();
                    }
                }
            }
            if (persistantChoices && fixedCount > 0) {
                const startingIndex = BottomButtons_1.BottomButtons.NUM_BOT_BUTTONS - fixedCount;
                for (let botButtonIndex = startingIndex; botButtonIndex < BottomButtons_1.BottomButtons.NUM_BOT_BUTTONS; botButtonIndex++) {
                    const fixedIndex = botButtonIndex - startingIndex;
                    if (Array.isArray(persistantChoices[fixedIndex])) {
                        MainScreen_1.MainScreen.botButtons.get(botButtonIndex).modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1], needEvent));
                        if (persistantChoices[fixedIndex][0] === "")
                            MainScreen_1.MainScreen.botButtons.get(botButtonIndex).hide();
                    }
                }
            }
        }
    }
    function displayPage(startingIndex, choices, persistantChoices, needEvent) {
        MainScreen_1.MainScreen.botButtons.hide();
        const pageNavIndex = BottomButtons_1.BottomButtons.NUM_BOT_BUTTONS - 2;
        const prevButtonIndex = pageNavIndex;
        const nextButtonIndex = pageNavIndex + 1;
        const fixedCount = persistantChoices ? persistantChoices.length : 0;
        const startingFixedIndex = pageNavIndex - fixedCount;
        for (let index = 0; index < startingFixedIndex && index + startingIndex < choices.length; index++) {
            MainScreen_1.MainScreen.botButtons.get(index).modify(choices[index + startingIndex][0], clickFuncWrapper(choices[index + startingIndex][1], needEvent));
            if (choices[index][0] === "")
                MainScreen_1.MainScreen.botButtons.get(index).hide();
        }
        if (persistantChoices && fixedCount > 0) {
            for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingFixedIndex;
                MainScreen_1.MainScreen.botButtons.get(botButtonIndex).modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1], needEvent));
                if (persistantChoices[fixedIndex][0] === "")
                    MainScreen_1.MainScreen.botButtons.get(botButtonIndex).hide();
            }
        }
        const hasPrevPage = startingIndex - startingFixedIndex >= 0 ? true : false;
        if (hasPrevPage) {
            MainScreen_1.MainScreen.botButtons.get(prevButtonIndex).modify("Prev", () => {
                displayPage(startingIndex - startingFixedIndex, choices, persistantChoices, needEvent);
            });
        }
        else {
            MainScreen_1.MainScreen.botButtons.get(prevButtonIndex).modify("Prev", undefined, true);
        }
        const hasNextPage = startingIndex + startingFixedIndex < choices.length ? true : false;
        if (hasNextPage) {
            MainScreen_1.MainScreen.botButtons.get(nextButtonIndex).modify("Next", () => {
                displayPage(startingIndex + startingFixedIndex, choices, persistantChoices, needEvent);
            });
        }
        else {
            MainScreen_1.MainScreen.botButtons.get(nextButtonIndex).modify("Next", undefined, true);
        }
    }
    function doNext(func, needEvent) {
        MainScreen_1.MainScreen.botButtons.hide();
        MainScreen_1.MainScreen.botButtons.get(BottomButtons_1.BottomButtons.NEXT_BUTTON_ID).modify("Next", clickFuncWrapper(func, needEvent));
    }
    function doYesNo(yesFunc, noFunc, needEvents) {
        MainScreen_1.MainScreen.botButtons.hide();
        MainScreen_1.MainScreen.botButtons.get(BottomButtons_1.BottomButtons.YES_BUTTON_ID).modify("Yes", clickFuncWrapper(yesFunc, needEvents));
        MainScreen_1.MainScreen.botButtons.get(BottomButtons_1.BottomButtons.NO_BUTTON_ID).modify("No", clickFuncWrapper(noFunc, needEvents));
    }
    function displayNextScreenChoices(nextScreen) {
        if (nextScreen) {
            for (const event of exports.DisplayUpdateEvents)
                event();
            if (nextScreen.yes && nextScreen.no) {
                doYesNo(nextScreen.yes, nextScreen.no, nextScreen.needEvent);
            }
            else if (nextScreen.next) {
                doNext(nextScreen.next, nextScreen.needEvent);
            }
            else if (nextScreen.choices && nextScreen.choices.length > 0 || (nextScreen.persistantChoices && nextScreen.persistantChoices.length > 0)) {
                displayChoices(nextScreen.choices, nextScreen.persistantChoices, nextScreen.needEvent);
            }
        }
        else {
            alert("No Next Screen could be found");
            console.trace("No Next Screen found.");
            console.log("Prev Screens: " + previousScreens);
            console.log("Next Screens: " + nextScreens);
        }
    }
    exports.displayNextScreenChoices = displayNextScreenChoices;
    function choiceWrap(func, ...argsBound) {
        const wrapper = (character, event) => {
            const args = argsBound;
            return func(character, ...args);
        };
        Object.defineProperty(wrapper, "name", { value: func.name });
        return wrapper;
    }
    exports.choiceWrap = choiceWrap;
    function choiceWrapWithChar(func, char, ...argsBound) {
        const wrapper = (character, event) => {
            const args = argsBound;
            return func(char, ...args);
        };
        Object.defineProperty(wrapper, "name", { value: func.name });
        return wrapper;
    }
    exports.choiceWrapWithChar = choiceWrapWithChar;
});
//# sourceMappingURL=ScreenDisplay.js.map