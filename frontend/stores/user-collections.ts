import some from 'lodash/some'

import type {UserCollectionData} from '@/types/data'
import { StaticData, StaticDataSetCategory, UserCount, WritableFancyStore } from '@/types'
import { TypedArray } from '@/types/enums'
import base64ToRecord from '@/utils/base64-to-record'


export class UserCollectionDataStore extends WritableFancyStore<UserCollectionData> {
    get dataUrl(): string {
        let url = document.getElementById('app')?.getAttribute('data-user')
        if (url) {
            url += '/collections'
        }
        return url
    }

    setup(
        staticData: StaticData,
        userCollectionData: UserCollectionData
    ): void {
        if (userCollectionData.mountsPacked === null && userCollectionData.toysPacked === null) {
            return
        }
        
        console.time('UserCollectionDataStore.setup')

        let mounts: Record<number, boolean> = {}
        let toys: Record<number, boolean> = {}

        // Unpack packed data
        if (userCollectionData.mountsPacked) {
            mounts = base64ToRecord(TypedArray.Uint16, userCollectionData.mountsPacked)
        }
        if (userCollectionData.toysPacked) {
            toys = base64ToRecord(TypedArray.Int32, userCollectionData.toysPacked)
        }

        // Generate set counts
        const setCounts = {
            mounts: {},
            pets: {},
            toys: {},
        }

        const petsHas: Record<number, boolean> = {}
        for (const key in userCollectionData.pets) {
            petsHas[key] = true
        }

        UserCollectionDataStore.doSetCounts(
            setCounts['mounts'],
            staticData.mountSets,
            mounts,
            staticData.spellToMount
        )
        UserCollectionDataStore.doSetCounts(
            setCounts['pets'],
            staticData.petSets,
            petsHas,
            staticData.creatureToPet
        )
        UserCollectionDataStore.doSetCounts(
            setCounts['toys'],
            staticData.toySets,
            toys
        )

        this.update(state => {
            state.data.mounts = mounts
            state.data.mountsPacked = null
            state.data.toys = toys
            state.data.toysPacked = null

            state.data.petsHas = petsHas
            state.data.setCounts = setCounts

            return state
        })

        console.timeEnd('UserCollectionDataStore.setup')
    }

    private static doSetCounts(
        setCounts: Record<string, UserCount>,
        categories: StaticDataSetCategory[][],
        userHas: Record<number, boolean>,
        map?: Record<number, number>,
    ): void {
        const overallData = setCounts['OVERALL'] = new UserCount()
        const seen: Record<number, boolean> = {}

        for (const category of categories) {
            if (category === null) {
                continue
            }

            const categoryData = setCounts[category[0].slug] = new UserCount()

            for (const set of category) {
                const setData = setCounts[`${category[0].slug}--${set.slug}`] = new UserCount()

                for (const group of set.groups) {
                    // We only want to increase some counts if the set is not
                    // unavailable
                    const doCategory = (
                        category[0].slug === 'unavailable' ||
                        (
                            set.slug !== 'unavailable' &&
                            group.name.indexOf('Unavailable') < 0
                        )
                    )

                    for (const things of group.things) {
                        const hasThing = some(things, (t) => userHas[map?.[t] ?? t])
                        const seenThing = some(things, (t) => seen[t])

                        const doOverall = (
                            !seenThing &&
                            (
                                hasThing ||
                                (
                                    category[0].slug !== 'unavailable' &&
                                    doCategory
                                )
                            )
                        )

                        if (doCategory) {
                            categoryData.total++
                        }
                        if (doOverall) {
                            overallData.total++
                        }

                        setData.total++

                        if (hasThing) {
                            if (doCategory) {
                                categoryData.have++
                            }
                            if (doOverall) {
                                overallData.have++
                            }

                            setData.have++
                        }

                        for (const thing of things) {
                            seen[thing] = true
                        }
                    }
                }
            }
        }
    }
}

export const userCollectionStore = new UserCollectionDataStore()
