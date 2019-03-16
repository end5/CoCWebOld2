define(["require", "exports", "Engine/Display/ScreenDisplay", "./Menus/MainMenu", "Engine/Display/ContentView", "./Parser/Parser", "./Parser/Interpreter", "./Parser/Lexer", "Engine/Utilities/Html", "Engine/Display/MainScreen", "Engine/Display/BottomButtons", "Engine/Display/ButtonElement", "Engine/Display/TopButtons", "Engine/CharDict", "./Character/CharConstructors", "./Display/Images", "./Display/Sprites", "./Display/DisplayUpdateEvents", "./Items/Armors", "./Items/CockSocks", "./Items/Consumables", "./Items/Materials", "./Items/Piercings", "./Items/Weapons", "./Effects/EffectConstructors", "./Effects/EffectDescriptions"], function (require, exports, ScreenDisplay_1, MainMenu_1, ContentView_1, Parser_1, Interpreter_1, Lexer_1, Html_1, MainScreen_1, BottomButtons_1, ButtonElement_1, TopButtons_1, CharDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    for (let index = 0; index < TopButtons_1.TopButtons.NUM_TOP_BUTTONS; index++) {
        const newButton = new ButtonElement_1.ButtonElement();
        newButton.element = Html_1.loadFromId("buttontop" + index);
        MainScreen_1.MainScreen.topButtons.buttons.push(newButton);
    }
    for (let index = 0; index < BottomButtons_1.BottomButtons.NUM_BOT_BUTTONS; index++) {
        const newButton = new ButtonElement_1.ButtonElement();
        newButton.element = Html_1.loadFromId("button" + index);
        MainScreen_1.MainScreen.botButtons.buttons.push(newButton);
    }
    MainScreen_1.MainScreen.nameDisplay.element = Html_1.loadFromId("nameDisplay");
    MainScreen_1.MainScreen.levelupIcon.element = Html_1.loadFromId("levelupIcon");
    MainScreen_1.MainScreen.timeDayElement.element = Html_1.loadFromId("timeDay");
    MainScreen_1.MainScreen.timeHourElement.element = Html_1.loadFromId("timeHour");
    MainScreen_1.MainScreen.statsPanel.element = Html_1.loadFromId("statsPanel");
    MainScreen_1.MainScreen.textElement.element = Html_1.loadFromId("mainTextDisplay");
    MainScreen_1.MainScreen.imageElement.element = Html_1.loadFromId("mainImageDisplay");
    MainScreen_1.MainScreen.spriteElement.element = Html_1.loadFromId("mainSpriteDisplay");
    ContentView_1.CView.imageElement = MainScreen_1.MainScreen.imageElement;
    ContentView_1.CView.spriteElement = MainScreen_1.MainScreen.spriteElement;
    MainScreen_1.MainScreen.imageElement.hide = () => {
        MainScreen_1.MainScreen.imageElement.element.style.display = "none";
    };
    MainScreen_1.MainScreen.imageElement.show = () => {
        MainScreen_1.MainScreen.imageElement.element.style.display = "inline";
    };
    const parser = new Parser_1.Parser();
    ContentView_1.CView.textBuffer.emitter.on('modified', (text) => {
        MainScreen_1.MainScreen.textElement.text(Interpreter_1.Interpret(parser.parse(Lexer_1.Lex(text))));
    });
    ContentView_1.CView.textBuffer.emitter.on('clear', () => {
        MainScreen_1.MainScreen.textElement.clear();
    });
    ScreenDisplay_1.displayNextScreenChoices(MainMenu_1.mainMenu());
    // tslint:disable-next-line:no-string-literal
    window["chars"] = CharDict_1.CharDict;
});
//# sourceMappingURL=Loader.js.map