import { EndScenes } from 'Engine/Combat/EndScenes';
import { ButtLooseness, ButtWetness } from 'Engine/Body/Butt';
import { FaceType } from 'Engine/Body/Face';
import { SkinType } from 'Engine/Body/Skin';
import { TongueType } from 'Engine/Body/Tongue';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { randInt } from 'Engine/Utilities/SMath';
import { PlayerResponses } from './PlayerResponses';
import { PlayerAction } from './CombatActions/PlayerActionPerform';
import { ItemDict } from 'Engine/Items/ItemDict';
import { PlayerStats } from 'Content/Player/PlayerStats';
import { PlayerBody } from 'Content/Player/PlayerBody';

class BlankEndScenes extends EndScenes { }

export class Player extends Character {
    protected description: CharacterDescription = new CharacterDescription(this, "", "", "");
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Player);
        this.body = new PlayerBody(this);
        this.stats = new PlayerStats(this);
        this.desc.isPlayer = true;
        this.stats.str = 15;
        this.stats.tou = 15;
        this.stats.spe = 15;
        this.stats.int = 15;
        this.stats.sens = 15;
        this.stats.lib = 15;
        this.stats.cor = 0;
        this.stats.lust = 15;
        this.stats.fatigue = 0;
        this.stats.level = 1;

        this.body.skin.type = SkinType.PLAIN;
        this.body.skin.desc = "skin";
        this.body.face.type = FaceType.HUMAN;
        this.body.tongue.type = TongueType.HUMAN;
        this.body.cumMultiplier = 1;
        this.hoursSinceCum = 0;
        this.body.butt.looseness = ButtLooseness.VIRGIN;
        this.body.butt.wetness = ButtWetness.DRY;

        // Inventory
        this.inventory = new CharacterInventory(this, ItemDict.getByName(WeaponName.Fists) as Weapon, ItemDict.getByName(ArmorName.ComfortUndercloth) as Armor);
        this.inventory.items.unlock(6);

        // Combat
        this.combatContainer = new CombatContainer(this, {
            mainAction: new PlayerAction(this),
            reactions: PlayerResponses,
            endScenes: new BlankEndScenes(this),
            rewards: {
                gems: () => randInt(10)
            }
        });
        this.combatContainer.useAI = false;
    }
}
