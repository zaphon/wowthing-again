import { ManualDataVendorItem, type ManualDataVendorItemArray } from './vendor'
import { FarmIdType, FarmResetType, FarmType, RewardType } from '@/types/enums'
import type { ManualDataZoneMapDrop, ManualDataZoneMapFarm } from './zone-map'


export class ManualDataSharedVendor {
    public sells: ManualDataVendorItem[]
    public sets: ManualDataSharedVendorSet[]

    constructor(
        public id: number,
        public name: string,
        public tags: string[],
        public locations: Record<string, string[]>,
        sells: ManualDataVendorItemArray[],
        sets: ManualDataSharedVendorSetArray[],
        public note?: string
    )
    {
        this.sells = sells.map((itemArray) => new ManualDataVendorItem(...itemArray))
        this.sets = sets.map((setArray) => new ManualDataSharedVendorSet(...setArray))
    }

    asFarms(mapName: string): ManualDataZoneMapFarm[] {
        const ret: ManualDataZoneMapFarm[] = []
        
        const drops: ManualDataZoneMapDrop[] = []
        const seen: Record<number, boolean> = {}

        if (this.sets) {
            for (const set of this.sets) {
                const itemIds = this.sells
                    .slice(set.range[0], set.range[0] + set.range[1])
                    .map((item) => item.id)
                
                drops.push({
                    id: 0,
                    type: RewardType.SetSpecial,
                    subType: 0,
                    classMask: 0,
                    itemIds: itemIds,
                    limit: [set.name],
                })
                
                for (const itemId of itemIds) {
                    seen[itemId] = true
                }
            }

            for (const item of this.sells) {
                if (!seen[item.id]) {
                    drops.push({
                        id: item.id,
                        type: item.type,
                        subType: item.subType,
                        classMask: item.classMask,
                        note: item.getNote(),
                    })
                }
            }
        }

        for (const location of (this.locations[mapName] || [])) {
            ret.push(<ManualDataZoneMapFarm>{
                faction: location[2],
                id: this.id > 1000000 ? this.id - 1000000 : this.id,
                idType: FarmIdType.Npc,
                location: [location[0], location[1]],
                name: this.name,
                note: this.note,
                questIds: [],
                reset: FarmResetType.None,
                type: FarmType.Vendor,
                drops: drops,
            })
        }

        return ret
    }
}
export type ManualDataSharedVendorArray = ConstructorParameters<typeof ManualDataSharedVendor>

export class ManualDataSharedVendorSet {
    constructor(
        public name: string,
        public range: number[],
        public sortKey?: string
    )
    { }
}
export type ManualDataSharedVendorSetArray = ConstructorParameters<typeof ManualDataSharedVendorSet>
