<script lang="ts">
    import { searchStore } from './store'
    import { auctionsAppState } from '@/auctions/stores/state'
    import { Region } from '@/enums/region'
    import type { MultiSlugParams } from '@/types'

    import Results from '@/auctions/components/results/Results.svelte'
    import UnderConstruction from '@/components/common/UnderConstruction.svelte'

    export let params: MultiSlugParams
</script>

<style lang="scss">
    .wrapper-column {
        gap: 0;
    }
    .header {
        display: flex;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
    }
</style>

<div class="wrapper-column">
    <UnderConstruction />

    {#if params.slug2}
        <div class="header">
            <span>
                <code>[{Region[$auctionsAppState.region]}]</code>
                Search
            </span>
            <span>&gt;</span>
            <span>"{params.slug2}"</span>
        </div>

        <Results
            loadFunc={async () => await searchStore.search($auctionsAppState, params.slug2)}
            selected={params.slug3}
            url={`#/search/${params.slug1}/${params.slug2}`}
        />
    {/if}
</div>
