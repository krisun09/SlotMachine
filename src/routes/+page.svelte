<script>
    import { browser } from '$app/environment';

    let component = undefined;

    $: if(browser) {
        import("../stories/Game.svelte")
            .then(data => {
            component = data.default;
        });
    }
</script>

{#if browser && component}
    <svelte:component this={component} />
{/if}
