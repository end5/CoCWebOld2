define(["require", "exports", "Engine/Display/ButtonElement", "Engine/Input/BindableAction", "Engine/Input/InputManager", "Engine/Input/KeyCombination", "Engine/Display/ContentView", "./SettingsMenu", "Engine/Display/MainScreen", "../../Engine/Display/Elements/ScreenElement"], function (require, exports, ButtonElement_1, BindableAction_1, InputManager_1, KeyCombination_1, ContentView_1, SettingsMenu_1, MainScreen_1, ScreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function controlsMenu() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b>Keyboard Control Bindings:</b>\n\n");
        ContentView_1.CView.text("Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n");
        ContentView_1.CView.text("Custom bindings are stored inside your save game files.\n\n");
        ContentView_1.CView.text("Duplicate keys are automatically unbound from their old control action.\n\n");
        ContentView_1.CView.text("<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n");
        ContentView_1.CView.text("<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n");
        const bindListGrid = document.createElement('table');
        MainScreen_1.MainScreen.textElement.appendChild(new ScreenElement_1.ScreenElement(bindListGrid));
        const listBind = (l, b) => { listBindableAction(bindListGrid, l, b); };
        listBind("Stats", BindableAction_1.BindableAction.Stats);
        listBind("Level Up", BindableAction_1.BindableAction.LevelUp);
        listBind("Quicksave 1", BindableAction_1.BindableAction.Quicksave1);
        listBind("Quicksave 2", BindableAction_1.BindableAction.Quicksave2);
        listBind("Quicksave 3", BindableAction_1.BindableAction.Quicksave3);
        listBind("Quicksave 4", BindableAction_1.BindableAction.Quicksave4);
        listBind("Quicksave 5", BindableAction_1.BindableAction.Quicksave5);
        listBind("Quickload 1", BindableAction_1.BindableAction.Quickload1);
        listBind("Quickload 2", BindableAction_1.BindableAction.Quickload2);
        listBind("Quickload 3", BindableAction_1.BindableAction.Quickload3);
        listBind("Quickload 4", BindableAction_1.BindableAction.Quickload4);
        listBind("Quickload 5", BindableAction_1.BindableAction.Quickload5);
        listBind("Show Menu", BindableAction_1.BindableAction.MainMenu);
        listBind("Data Menu", BindableAction_1.BindableAction.SaveLoad);
        listBind("Appearance Page", BindableAction_1.BindableAction.Appearance);
        listBind("No", BindableAction_1.BindableAction.No);
        listBind("Yes", BindableAction_1.BindableAction.Yes);
        listBind("Show Perks", BindableAction_1.BindableAction.Perks);
        listBind("Continue", BindableAction_1.BindableAction.Back);
        listBind("Cycle Background", BindableAction_1.BindableAction.CycleBackground);
        listBind("Button 1", BindableAction_1.BindableAction.Button0);
        listBind("Button 2", BindableAction_1.BindableAction.Button1);
        listBind("Button 3", BindableAction_1.BindableAction.Button2);
        listBind("Button 4", BindableAction_1.BindableAction.Button3);
        listBind("Button 5", BindableAction_1.BindableAction.Button4);
        listBind("Button 6", BindableAction_1.BindableAction.Button5);
        listBind("Button 7", BindableAction_1.BindableAction.Button6);
        listBind("Button 8", BindableAction_1.BindableAction.Button7);
        listBind("Button 9", BindableAction_1.BindableAction.Button8);
        listBind("Button 10", BindableAction_1.BindableAction.Button9);
        return { choices: [["Reset Ctrls", resetControls], ["Clear Ctrls", clearControls]], persistantChoices: [["Back", SettingsMenu_1.settingsMenu]] };
    }
    exports.controlsMenu = controlsMenu;
    function listBindableAction(bindListElement, text, bindableAction) {
        const keyPair = InputManager_1.InputManager.get(bindableAction);
        if (!keyPair)
            throw new Error('Incorrect bindable action');
        const bindElement = bindListElement.insertRow();
        bindListElement.appendChild(bindElement);
        bindElement.insertCell().innerHTML = "<b>" + text + "</b>";
        const button1 = new ButtonElement_1.ButtonElement();
        button1.element = document.createElement("a");
        bindElement.insertCell().appendChild(button1.element);
        let primaryKeyName = "";
        if (keyPair.primaryKey)
            primaryKeyName = keyPair.primaryKey.toString();
        button1.modify(primaryKeyName, () => {
            document.addEventListener("keypress", function keyBind(event) {
                const key = new KeyCombination_1.KeyCombination();
                key.keyCode = event.keyCode;
                key.shiftKey = event.shiftKey;
                key.altKey = event.altKey;
                key.ctrlKey = event.ctrlKey;
                key.metaKey = event.metaKey;
                if (keyPair)
                    keyPair.primaryKey = key;
                controlsMenu();
                document.removeEventListener("keypress", keyBind);
            });
        });
        const button2 = new ButtonElement_1.ButtonElement();
        button2.element = document.createElement("a");
        bindElement.insertCell().appendChild(button2.element);
        let secondaryKeyName = "";
        if (keyPair.secondaryKey)
            secondaryKeyName = keyPair.secondaryKey.toString();
        button2.modify(secondaryKeyName, () => {
            document.addEventListener("keypress", function keyBind(event) {
                const key = new KeyCombination_1.KeyCombination();
                key.keyCode = event.keyCode;
                key.shiftKey = event.shiftKey;
                key.altKey = event.altKey;
                key.ctrlKey = event.ctrlKey;
                key.metaKey = event.metaKey;
                if (keyPair)
                    keyPair.secondaryKey = key;
                controlsMenu();
                document.removeEventListener("keypress", keyBind);
            });
        });
        bindElement.style.height = button1.computedStyle.height;
        bindElement.style.width = "200px";
        button1.style.marginLeft = "200px";
        if (button1.computedStyle.width)
            button2.style.marginLeft = parseFloat(button1.computedStyle.width) + 200 + "px";
    }
    function resetControls() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Are you sure you want to reset all of the currently bound controls to their defaults?");
        return { yes: resetControlsYes, no: controlsMenu };
    }
    function resetControlsYes() {
        InputManager_1.InputManager.resetAll();
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Controls have been reset to defaults!");
        return { next: controlsMenu };
    }
    function clearControls() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Are you sure you want to clear all of the currently bound controls?");
        return { yes: clearControlsYes, no: controlsMenu };
    }
    function clearControlsYes() {
        InputManager_1.InputManager.clearAll();
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Controls have been cleared!");
        return { next: controlsMenu };
    }
});
/*
--Default controls
    Show Stats		S
    Level Up		L
    Quicksave1...5	F1..F5
    Quickload1...5	F6..F10
    Show Menu		backspace
    Data Menu		D
    Appearance Page	A
    No				N
    Yes				Y
    Show Perks		P
    Continue		Enter		Space
    Cycle Background	Home
    Button 1..5		Number 1..5
    Button 6..10	Number 6..0	QWERT

*/
//# sourceMappingURL=ControlsMenu.js.map