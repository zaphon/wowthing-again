<script lang="ts">
    import { afterUpdate } from 'svelte'

    import getSavedRoute from '@/utils/get-saved-route'

    import Sidebar from './TransmogSetsSidebar.svelte'
    import Table from './TransmogSetsTable.svelte'

    export let params: {
        slug1: string
        slug2: string
    }

    afterUpdate(() => getSavedRoute('transmog-sets', params.slug1, params.slug2))
</script>

<div class="view">
    <Sidebar />
    <Table
        slug1={params.slug1}
        slug2={params.slug2}
    />
</div>
