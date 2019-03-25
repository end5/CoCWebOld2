import { Pregnancy } from 'Engine/Body/Pregnancy/Pregnancy';
import { IncubationTime } from './IncubationTime';
import { PregnancyType } from './PregnancyType';
import { Dictionary } from 'Engine/Utilities/Dictionary';

export class FlagWomb {
    public readonly eventSets: Dictionary<string, number[]> = new Dictionary();
    protected currentPregnancy?: Pregnancy;
    protected lastEvent: number = 0;

    public get pregnancy(): Pregnancy | undefined {
        return this.currentPregnancy;
    }

    public get event(): number {
        if (this.currentPregnancy) {
            if (this.currentPregnancy.incubation <= 0) return 0;

            const eventSet = this.eventSets.get(this.currentPregnancy.type);
            if (eventSet)
                for (let index = 0; index < eventSet.length; index++) {
                    if (this.currentPregnancy && this.currentPregnancy.incubation > eventSet[index]) return index;
                }
        }
        return 1;
    }

    public eventTriggered(): number {
        if (this.lastEvent === this.event) return 0;
        this.lastEvent = this.event;
        return this.lastEvent;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    public knockUp(type: PregnancyType, time: IncubationTime): void {
        this.currentPregnancy = new Pregnancy(type, time);
        this.lastEvent = 0;
    }

    public clear() {
        this.currentPregnancy = undefined;
        this.lastEvent = 0;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            if (this.currentPregnancy.incubation === 0) {
                this.clear();
            }
        }
    }
}
