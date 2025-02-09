import { currentTier, previousTier } from '@/data/gear'
import { WritableFancyStore } from '@/types/fancy-store'
import { ItemDataItem, type ItemData, DataItemBonus } from '@/types/data/item'
import type { ManualData } from '@/types/data/manual'


export class ItemDataStore extends WritableFancyStore<ItemData> {
    get dataUrl(): string {
        return document.getElementById('app').getAttribute('data-item')
    }

    initialize(data: ItemData) {
        console.time('ItemDataStore.initialize')

        const appearanceIds = new Map<number, Set<number>>()

        data.items = {}
        let itemId = 0;
        for (const itemArray of data.rawItems) {
            itemId += itemArray[0];
            const [classId, subclassId, inventoryType] = data.classIdSubclassIdInventoryTypes[itemArray[4]]
            const obj = new ItemDataItem(
                itemId,
                data.names[itemArray[1]],
                data.classMasks[itemArray[2]],
                data.raceMasks[itemArray[3]],
                classId,
                subclassId,
                inventoryType,
                ...itemArray
            )
            data.items[obj.id] = obj

            for (const appearanceData of (itemArray[10] || [])) {
                let appSet = appearanceIds.get(appearanceData[0])
                if (!appSet)
                {
                    appSet = new Set<number>()
                    appearanceIds.set(appearanceData[0], appSet)
                }
                appSet.add(itemId)
            }
        }
        data.rawItems = null

        data.oppositeFactionAppearance = {}
        for (let i = 0; i < data.oppositeFactionIds.length; i += 2) {
            const itemId1 = data.oppositeFactionIds[i]
            const itemId2 = data.oppositeFactionIds[i + 1]
            const item1 = data.items[itemId1]
            const item2 = data.items[itemId2]
            if (item1 && item2) {
                item1.oppositeFactionId = itemId2
                item2.oppositeFactionId = itemId1

                if (item1.appearances && item2.appearances) {
                    for (const [key, appearance] of Object.entries(item1.appearances)) {
                        const otherAppearance = item2.appearances[parseInt(key)]
                        if (otherAppearance) {
                            for (const [a, b] of [[appearance, otherAppearance], [otherAppearance, appearance]]) {
                                const ofa = data.oppositeFactionAppearance[a.appearanceId] ||= []
                                if (ofa.indexOf(b.appearanceId) === -1) {
                                    ofa.push(b.appearanceId)
                                }
                            }
                        }
                    }
                }
            }
        }

        data.itemBonuses = {}
        for (const itemBonusArray of data.rawItemBonuses) {
            const obj = new DataItemBonus(...itemBonusArray)
            data.itemBonuses[obj.id] = obj
        }
        data.rawItemBonuses = null

        data.appearanceToItems = {}
        for (const [appearanceId, itemIds] of appearanceIds.entries())
        {
            data.appearanceToItems[appearanceId] = Array.from(itemIds)
        }

        data.itemBonusToUpgrade = {}
        for (const bonusGroups of Object.values(data.itemBonusListGroups)) {
            for (const [sharedStringId, itemBonuses] of Object.entries(bonusGroups)) {
                if (itemBonuses.length > 1) {
                    for (let i = 0; i < itemBonuses.length; i++) {
                        const itemBonus = itemBonuses[i]
                        if (data.itemBonusToUpgrade[itemBonus]) {
                            console.log('ruh roh', itemBonus)
                        }
                        data.itemBonusToUpgrade[itemBonus] = [parseInt(sharedStringId), i + 1, itemBonuses.length]
                    }
                }
            }
        }

        console.timeEnd('ItemDataStore.initialize')
    }

    setup(
        manualData: ManualData,
    ) {
        // console.time('ItemDataStore.setup')

        this.update((state) => {
            state.currentTier = {}
            state.previousTier = {}

            for (const set of manualData.shared.itemSets) {
                if (currentTier.sets[set.name]) {
                    for (const itemIds of set.items) {
                        const item = this.value.items[itemIds[0]]
                        if (currentTier.slots.indexOf(item.inventoryType) >= 0)
                        {
                            state.currentTier[item.id] = item.inventoryType
                        }
                    }
                }
                if (previousTier?.sets[set.name]) {
                    for (const itemIds of set.items) {
                        const item = this.value.items[itemIds[0]]
                        if (previousTier.slots.indexOf(item.inventoryType) >= 0)
                        {
                            state.previousTier[item.id] = item.inventoryType
                        }
                    }
                }
            }

            return state
        })

        // console.timeEnd('ItemDataStore.setup')
    }
}

export const itemStore = new ItemDataStore()
