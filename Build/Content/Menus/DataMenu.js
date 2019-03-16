define(["require", "exports", "Engine/Display/Elements/AnchorElement", "Engine/Save/SaveManager", "Engine/Save/SaveFile", "Engine/Display/ScreenDisplay", "Engine/Display/ContentView", "./SaveMenu", "./LoadMenu", "./DeleteMenu", "./MainMenu", "Engine/CharDict", "./InGame/PlayerMenu", "Engine/Display/MainScreen"], function (require, exports, AnchorElement_1, SaveManager_1, SaveFile_1, ScreenDisplay_1, ContentView_1, SaveMenu_1, LoadMenu_1, DeleteMenu_1, MainMenu_1, CharDict_1, PlayerMenu_1, MainScreen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dataMenu() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b>Where are my saves located?</b>\n");
        ContentView_1.CView.text("<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Character/#Shared Objects/{GIBBERISH}/</pre>\n\n");
        ContentView_1.CView.text("In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n");
        ContentView_1.CView.text("Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n");
        ContentView_1.CView.text("<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or character is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n");
        ContentView_1.CView.text("<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n");
        ContentView_1.CView.text("<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n");
        ContentView_1.CView.text("<b>Why does the Save File and Load File option not work?</b>\n");
        ContentView_1.CView.text("<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>");
        const choices = [
            ["Save", SaveMenu_1.saveMenu],
            ["Load", LoadMenu_1.loadMenu],
            ["AutoSav: ON", autosaveToggle],
            ["Delete", DeleteMenu_1.deleteMenu],
            ["Save File", saveToFile],
            ["Load File", loadFromFile]
        ];
        if (!SaveManager_1.SaveManager.autoSave) {
            choices[2][0] = "AutoSav: OFF";
        }
        return { choices, persistantChoices: [["Back", CharDict_1.CharDict.player ? PlayerMenu_1.playerMenu : MainMenu_1.mainMenu]], needEvent: true };
    }
    exports.dataMenu = dataMenu;
    function autosaveToggle() {
        SaveManager_1.SaveManager.autosaveToggle();
        return dataMenu();
    }
    function saveToFile() {
        const saveFile = SaveFile_1.generateSave();
        const anchor = new AnchorElement_1.AnchorElement(document.createElement('a'));
        MainScreen_1.MainScreen.textElement.appendChild(anchor);
        const blob = new Blob([JSON.stringify(saveFile)], { type: 'text/json' });
        // if (!!window["StyleMedia"]) // IE Edge
        // window.navigator.msSaveBlob(blob, saveFile.name);
        // else
        anchor.href = URL.createObjectURL(blob);
        anchor.download = saveFile.name;
        anchor.click();
        return dataMenu();
    }
    function loadFromFile(character, event) {
        if (!event)
            throw new Error('No event was passed');
        const target = event.target;
        if (!target.files || target.files.length === 0) {
            alert("Error in file loading");
        }
        else {
            const file = target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.addEventListener("loadend", () => {
                let obj;
                try {
                    obj = JSON.parse(fileReader.result);
                }
                catch (e) {
                    console.error(e);
                    alert("Error parsing file");
                }
                if (obj) {
                    SaveFile_1.loadFromSave(obj);
                    ScreenDisplay_1.displayNextScreenChoices({ next: dataMenu });
                }
            });
            fileReader.addEventListener("error", (evnt) => {
                console.log(evnt);
                alert("Error reading file");
            });
        }
        return dataMenu();
    }
});
//# sourceMappingURL=DataMenu.js.map