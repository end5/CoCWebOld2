define(["require", "exports", "./BindableAction", "./DefaultKeyBinds", "./KeyPair", "../Utilities/List"], function (require, exports, BindableAction_1, DefaultKeyBinds_1, KeyPair_1, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InputManager {
        reset(bindableAction) {
            const keyPair = this.keyBinds.get(bindableAction);
            if (keyPair) {
                const primaryKey = DefaultKeyBinds_1.DefaultKeyBinds[bindableAction].primaryKey;
                if (primaryKey)
                    keyPair.primaryKey = primaryKey.clone();
                else
                    keyPair.primaryKey = undefined;
                const secondaryKey = DefaultKeyBinds_1.DefaultKeyBinds[bindableAction].secondaryKey;
                if (secondaryKey)
                    keyPair.secondaryKey = secondaryKey.clone();
                else
                    keyPair.secondaryKey = undefined;
            }
        }
        resetAll() {
            for (let index = 0; index < this.keyBinds.length; index++) {
                this.reset(index);
            }
        }
        clear(bindableAction) {
            const keyPair = this.keyBinds.get(bindableAction);
            if (keyPair) {
                keyPair.primaryKey = undefined;
                keyPair.secondaryKey = undefined;
            }
        }
        clearAll() {
            for (let index = 0; index < this.keyBinds.length; index++) {
                this.clear(index);
            }
        }
        get(bindableAction) {
            return this.keyBinds.get(bindableAction);
        }
        constructor() {
            this.keyBinds = new List_1.List();
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Stats);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.LevelUp);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quicksave1);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quicksave2);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quicksave3);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quicksave4);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quicksave5);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quickload1);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quickload2);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quickload3);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quickload4);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Quickload5);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.MainMenu);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.SaveLoad);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Appearance);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.No);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Yes);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Perks);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Back);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.CycleBackground);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button0);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button1);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button2);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button3);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button4);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button5);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button6);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button7);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button8);
            this.initDefaultKeyBind(BindableAction_1.BindableAction.Button9);
        }
        initDefaultKeyBind(bindableAction) {
            const keyPair = DefaultKeyBinds_1.DefaultKeyBinds[bindableAction];
            if (keyPair) {
                let primaryKey = keyPair.primaryKey;
                if (primaryKey)
                    primaryKey = primaryKey.clone();
                let secondaryKey = keyPair.secondaryKey;
                if (secondaryKey)
                    secondaryKey = secondaryKey.clone();
                this.keyBinds.add(new KeyPair_1.KeyPair(primaryKey, secondaryKey));
            }
        }
        serialize() {
            return { keyBinds: this.keyBinds.serialize() };
        }
        deserialize(saveObject) {
            // tslint:disable-next-line:no-string-literal
            this.keyBinds.deserialize(saveObject.keyBinds, KeyPair_1.KeyPair);
        }
    }
    const inputManager = new InputManager();
    exports.InputManager = inputManager;
});
//# sourceMappingURL=InputManager.js.map