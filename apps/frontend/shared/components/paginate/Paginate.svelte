<script lang="ts">
    import { location } from 'svelte-spa-router'

    import PaginateBar from './PaginateBar.svelte'

    export let items: any[]
    export let page: number
    export let perPage: number

    let end: number
    let pages: number
    let start: number
    let url: string
    $: {
        pages = Math.ceil(items.length / perPage)
        page = Math.max(1, Math.min(pages, page))
        start = (page - 1) * perPage
        end = start + perPage

        url = '#' + $location.replace(/\/?\d+$/, '')
    }
</script>

{#if items.length > 0}
    <PaginateBar
        total={items.length}
        {page}
        {pages}
        {perPage}
        {url}
    >
        <slot name="bar-end" slot="bar-end"></slot>
    </PaginateBar>
{/if}

<slot paginated={items.slice(start, end)} />

{#if items.length > 0}
    <PaginateBar
        total={items.length}
        {page}
        {pages}
        {perPage}
        {url}
    />
{/if}
