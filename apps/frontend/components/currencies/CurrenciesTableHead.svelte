<script lang="ts">
    import { itemStore } from '@/stores'
    import { currencyState } from '@/stores/local-storage'
    import { componentTooltip } from '@/shared/utils/tooltips'
    import type { StaticDataCurrency } from '@/shared/stores/static/types'

    import TableSortedBy from '@/components/common/TableSortedBy.svelte'
    import Tooltip from '@/components/tooltips/currency/TooltipCurrency.svelte'
    import WowheadLink from '@/shared/components/links/WowheadLink.svelte'
    import WowthingImage from '@/shared/components/images/sources/WowthingImage.svelte'

    export let currency: StaticDataCurrency = undefined
    export let itemId = 0
    export let slug: string
    export let sortingBy: boolean

    let cls: string
    let onClick: (event: Event) => void
    $: {
        cls = itemId ? `quality${$itemStore.items[itemId]?.quality || 1}` : 'quality1'

        onClick = function(event: Event) {
            event.preventDefault()
            $currencyState.sortOrder[slug] = sortingBy ? 0 : (itemId || currency.id)
        }
    }
</script>

<style lang="scss">
    th {
        @include cell-width($width-currency, $maxWidth: $width-currency-max);

        --image-border-width: 2px;
        --padding: 0;

        background: $thing-background;
        border: 1px solid $border-color;
        border-right-width: 0;
        border-top-width: 0;
        padding-bottom: $width-padding;
        padding-top: $width-padding;
        position: relative;
        text-align: center;
    }
</style>

<th
    class={cls}
    use:componentTooltip={{
        component: Tooltip,
        props: {
            currency,
            item: $itemStore.items[itemId],
        }
    }}
>
    <WowheadLink
        on:click={onClick}
        type={itemId ? 'item' : 'currency'}
        id={itemId || currency.id}
        noTooltip={true}
    >
        <WowthingImage
            name={itemId ? `item/${itemId}` : `currency/${currency.id}`}
            size={40}
            border={2}
        />

        {#if sortingBy}
            <TableSortedBy />
        {/if}
    </WowheadLink>
</th>
