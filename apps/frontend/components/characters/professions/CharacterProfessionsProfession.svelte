<script lang="ts">
    import { expansionSlugMap } from '@/data/expansion'
    import { professionSpecializationSpells } from '@/data/professions'
    import { Faction } from '@/enums/faction'
    import { staticStore } from '@/shared/stores/static'
    import { getNameForFaction } from '@/utils/get-name-for-faction'
    import { UserCount, type Character, type CharacterProfession, type Expansion, type MultiSlugParams } from '@/types'
    import type { StaticDataProfession, StaticDataProfessionAbility, StaticDataProfessionCategory } from '@/shared/stores/static/types'

    import ProgressBar from '@/components/common/ProgressBar.svelte'
    import Table from './CharacterProfessionsProfessionTable.svelte'

    export let character: Character
    export let params: MultiSlugParams
    export let staticProfession: StaticDataProfession

    let charSubProfession: CharacterProfession
    let expansion: Expansion
    let filteredCategories: Record<number, StaticDataProfessionAbility[]>
    let knownRecipes: Set<number>
    let rootCategory: StaticDataProfessionCategory
    let stats: UserCount
    $: {
        expansion = expansionSlugMap[params.slug5]
        const charProfession = character.professions[staticProfession.id]
        if (!expansion || !charProfession) {
            break $
        }
        
        charSubProfession = charProfession[staticProfession.subProfessions[expansion.id].id]
        knownRecipes = new Set<number>()
        for (const subProfession of Object.values(charProfession)) {
            for (const abilityId of subProfession.knownRecipes) {
                knownRecipes.add(abilityId)
            }
        }

        rootCategory = staticProfession.categories?.[expansion.id]
        if (rootCategory) {
            while (rootCategory.children.length === 1) {
                rootCategory = rootCategory.children[0]
            }
        }

        filteredCategories = {}
        stats = new UserCount()
        recurse(rootCategory)
    }

    const recurse = function(category: StaticDataProfessionCategory) {
        filteredCategories[category.id] = []

        for (const ability of (category.abilities || [])) {
            if (ability.faction !== Faction.Neutral && ability.faction !== character.faction) {
                continue
            }

            const requiredAbility = $staticStore.itemToRequiredAbility[ability.itemIds[0]]
            if (professionSpecializationSpells[requiredAbility]) {
                const charSpecialization = character.professionSpecializations[staticProfession.id]
                if (charSpecialization !== undefined && charSpecialization !== requiredAbility) {
                    continue
                }
            }

            filteredCategories[category.id].push(ability)

            if (ability.extraRanks) {
                stats.total += (ability.extraRanks.length + 1)

                for (let rankIndex = ability.extraRanks.length - 1; rankIndex >= 0; rankIndex--) {
                    if (knownRecipes.has(ability.extraRanks[rankIndex][0])) {
                        stats.have += (rankIndex + 2)
                        break
                    }
                }
                if (knownRecipes.has(ability.id)) {
                    stats.have++
                }
            }
            else {
                stats.total++
                if (knownRecipes.has(ability.id)) {
                    stats.have++
                }
            }
        }

        for (const child of (category.children || [])) {
            recurse(child)
        }
    }
</script>

<style lang="scss">
    .professions-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
    .professions-container {
        column-count: 2;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;
    }
</style>

{#if expansion}
    <div class="professions-wrapper">
        {#if charSubProfession}
            <div class="professions-container">
                <ProgressBar
                    have={charSubProfession.currentSkill}
                    total={charSubProfession.maxSkill}
                    title={getNameForFaction(staticProfession.subProfessions[expansion.id].name, character.faction)}
                />

                {#if stats.total > 0}
                    <ProgressBar
                        have={stats.have}
                        total={stats.total}
                        title="Known recipes"
                    />
                {/if}
            </div>
        {/if}

        {#if rootCategory}
            <div class="professions-container">
                {#if rootCategory.abilities.length > 0}
                    <Table
                        category={rootCategory}
                        {character}
                        {charSubProfession}
                        {expansion}
                        {filteredCategories}
                        {knownRecipes}
                    />
                {/if}

                {#each rootCategory.children as child}
                    <Table
                        category={child}
                        {character}
                        {charSubProfession}
                        {expansion}
                        {filteredCategories}
                        {knownRecipes}
                    />
                {/each}
            </div>
        {/if}
    </div>
{/if}
