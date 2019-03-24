import { CharDict } from './CharDict';
import { NextScreenChoices } from './Display/ScreenDisplay';
import { Character } from './Character/Character';

export type TimeEventFunc<T extends Character> = (player: T) => void | boolean | NextScreenChoices;

class TimeEventManager {
    private events: [string, TimeEventFunc<Character>][] = [];

    public register(key: string, entry: TimeEventFunc<Character>) {
        this.events.push([key, entry]);
    }

    /**
     * Runs the events one hour at a time
     * @param hours The number of hours / The number of times to run
     * @param postEvents A function that is called after all events are ran returns the next scene
     */
    public update(hours: number, postEvents: () => NextScreenChoices): NextScreenChoices {
        return this.runEvents(hours, postEvents);
    }

    private runEvents(times: number, next: () => NextScreenChoices, index: number = 0): NextScreenChoices {
        let nextScreen;

        // Keep running events until a scene or true is returned
        while ((nextScreen === false || nextScreen === undefined) && index < this.events.length) {
            nextScreen = this.events[index][1](CharDict.player!);
            index++;
        }

        if (index >= this.events.length) {
            index = 0;
            times--;
        }

        if (nextScreen === true) return { next: ((player: Character) => this.runEvents(times, next, index)) };
        else if (nextScreen === false) return this.runEvents(times, next, index);
        else if (nextScreen === undefined) {
            if (times > 0)
                return this.runEvents(times, next, index);
            return next();
        }
        else return nextScreen;
    }
}

export const TimeEvents = new TimeEventManager();
