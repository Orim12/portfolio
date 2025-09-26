<script lang="ts">
    import { _checkDevMode } from './+page';

    let devMode = _checkDevMode();
</script>

{#if devMode != 'true'}
<h1>de website word opniew van scratch gemaakt</h1>
{:else}
<h1>de website is in de ontwikkelingsmodus</h1>
{/if}