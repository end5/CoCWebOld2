define(["require", "exports", "./BindableAction", "./KeyCombination", "./KeyPair"], function (require, exports, BindableAction_1, KeyCombination_1, KeyPair_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.DefaultKeyBinds = {};
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Stats] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(83));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.LevelUp] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(76));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quicksave1] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(112));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quicksave2] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(113));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quicksave3] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(114));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quicksave4] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(115));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quicksave5] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(116));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quickload1] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(117));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quickload2] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(118));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quickload3] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(119));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quickload4] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(120));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Quickload5] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(121));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.MainMenu] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(8));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.SaveLoad] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(68));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Appearance] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(65));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.No] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(78));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Yes] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(89));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Perks] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(80));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Back] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(13), new KeyCombination_1.KeyCombination(32));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.CycleBackground] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(36));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button0] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(49));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button1] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(50));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button2] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(51));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button3] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(52));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button4] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(53));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button5] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(54), new KeyCombination_1.KeyCombination(81));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button6] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(55), new KeyCombination_1.KeyCombination(87));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button7] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(56), new KeyCombination_1.KeyCombination(69));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button8] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(57), new KeyCombination_1.KeyCombination(82));
    exports.DefaultKeyBinds[BindableAction_1.BindableAction.Button9] = new KeyPair_1.KeyPair(new KeyCombination_1.KeyCombination(48), new KeyCombination_1.KeyCombination(84));
});
//# sourceMappingURL=DefaultKeyBinds.js.map