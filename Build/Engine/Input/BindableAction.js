/**
 * List of known bound keyboard methods
 *
 * Some of the methods use an undefined "Event" parameter to pass into the actual UI components...
 * ... strip this out and instead modify the handlers on the execution end to have a default undefined parameter?
 *
 * ** Bypass handler if mainView.eventTestInput.x == 270.5
 * ** Bypass handler if mainView.nameBox.visible && stage.focus == mainView.nameBox
 *
 * 38	-- UpArrow			-- Cheat code for Humus stage 1
 * 40	-- DownArrow		-- Cheat code for Humus stage 2
 * 37 	-- LeftArrow		-- Cheat code for Humus stage 3
 * 39	-- RightArrow		-- Cheat code for Humus stage 4 IF str > 0, not gameover, give humus
 *
 * 83	-- s				-- Display stats if main menu button displayed
 * 76	-- l				-- Level up if level up button displayed
 * 112	-- F1				-- Quicksave to slot 1 if menu_data displayed
 * 113	-- F2				-- Quicksave slot 2
 * 114	-- F3				-- Quicksave slot 3
 * 115	-- F4				-- Quicksave slot 4
 * 116	-- F5				-- Quicksave slot 5
 *
 * 117	-- F6				-- Quickload slot 1
 * 118	-- F7				-- Quickload slot 2
 * 119	-- F8				-- Quickload slot 3
 * 120	-- F9				-- Quickload slot 4
 * 121	-- F10				-- Quickload slot 5
 *
 * 8	-- Backspace		-- Go to "Main" menu if in game
 * 68	-- d				-- Open saveload if in game
 * 65	-- a				-- Open apperance if in game
 * 78	-- n				-- "no" if button index 1 displays no		<--
 * 89	-- y				-- "yes" if button index 0 displays yes		<-- These two seem akward
 * 80	-- p				-- display perks if in game
 *
 * 13/32 -- Enter/Space		-- if button index 0,4,5 or 9 has text of (nevermind, abandon, next, return, back, leave, resume) execute it
 *
 * 36	-- Home				-- Cycle the background of the maintext area
 *
 * 49	-- 1				-- Execute button index 0 if visisble
 * 50	-- 2				-- ^ index 1
 * 51	-- 3				-- ^ index 2
 * 52	-- 4				-- ^ index 3
 * 53	-- 5				-- ^ index 4
 * 54/81-- 6/q				-- ^ index 5
 * 55/87-- 7/w				-- ^ index 6
 * 56/69-- 8/e				-- ^ index 7
 * 57/82-- 9/r				-- ^ index 8
 * 48/84-- 0/t				-- ^ index 9
 *
 * 68	-- ???				-- ??? Unknown, theres a conditional check for the button, but no code is ever executed
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BindableAction;
    (function (BindableAction) {
        BindableAction[BindableAction["Stats"] = 0] = "Stats";
        BindableAction[BindableAction["LevelUp"] = 1] = "LevelUp";
        BindableAction[BindableAction["Quicksave1"] = 2] = "Quicksave1";
        BindableAction[BindableAction["Quicksave2"] = 3] = "Quicksave2";
        BindableAction[BindableAction["Quicksave3"] = 4] = "Quicksave3";
        BindableAction[BindableAction["Quicksave4"] = 5] = "Quicksave4";
        BindableAction[BindableAction["Quicksave5"] = 6] = "Quicksave5";
        BindableAction[BindableAction["Quickload1"] = 7] = "Quickload1";
        BindableAction[BindableAction["Quickload2"] = 8] = "Quickload2";
        BindableAction[BindableAction["Quickload3"] = 9] = "Quickload3";
        BindableAction[BindableAction["Quickload4"] = 10] = "Quickload4";
        BindableAction[BindableAction["Quickload5"] = 11] = "Quickload5";
        BindableAction[BindableAction["MainMenu"] = 12] = "MainMenu";
        BindableAction[BindableAction["SaveLoad"] = 13] = "SaveLoad";
        BindableAction[BindableAction["Appearance"] = 14] = "Appearance";
        BindableAction[BindableAction["No"] = 15] = "No";
        BindableAction[BindableAction["Yes"] = 16] = "Yes";
        BindableAction[BindableAction["Perks"] = 17] = "Perks";
        BindableAction[BindableAction["Back"] = 18] = "Back";
        BindableAction[BindableAction["CycleBackground"] = 19] = "CycleBackground";
        BindableAction[BindableAction["Button0"] = 20] = "Button0";
        BindableAction[BindableAction["Button1"] = 21] = "Button1";
        BindableAction[BindableAction["Button2"] = 22] = "Button2";
        BindableAction[BindableAction["Button3"] = 23] = "Button3";
        BindableAction[BindableAction["Button4"] = 24] = "Button4";
        BindableAction[BindableAction["Button5"] = 25] = "Button5";
        BindableAction[BindableAction["Button6"] = 26] = "Button6";
        BindableAction[BindableAction["Button7"] = 27] = "Button7";
        BindableAction[BindableAction["Button8"] = 28] = "Button8";
        BindableAction[BindableAction["Button9"] = 29] = "Button9";
    })(BindableAction = exports.BindableAction || (exports.BindableAction = {}));
});
//# sourceMappingURL=BindableAction.js.map