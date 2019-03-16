import { Dictionary } from 'Engine/Utilities/Dictionary';
import { ClickFunction } from 'Engine/Display/ScreenDisplay';

export interface ISite {
    area: string;
    name: string;
    neighbors: string[];
    hidden?: boolean;
    noSave?: boolean;
    func: ClickFunction;
}

interface IArea {
    name: string;
    sites: Dictionary<string, ISite>;
}

class AreaTraveler {
    public inDungeon = false;
    public readonly areas = new Dictionary<string, IArea>();
    private curArea: IArea | undefined;

    public register(...sites: ISite[]) {
        let area: IArea | undefined;
        for (const site of sites) {
            area = this.areas.get(site.area);
            if (!area) {
                area = { name: site.area, sites: new Dictionary() };
                this.areas.set(site.area, area);
            }

            area.sites.set(site.name, site);
        }
    }

    public transistion(areaName: string, siteName: string) {
        this.curArea = this.areas.get(areaName);
        return this.travel(siteName);
    }

    public travel(siteName: string) {
        if (!this.curArea) throw new Error('Area not set');
        const site = this.curArea.sites.get(siteName);
        if (!site) throw new Error(`Site: ${siteName} doesn't exist in ${this.curArea}`);
        return site.func;
    }
}

export const Area = new AreaTraveler();
