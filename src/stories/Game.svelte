<script lang="ts">
    import {App, type Assets, createApp, setAppContext} from 'pixi-svelte';

    export let assets: Assets = undefined;

    const app = createApp();

    const { loaded } = app;
    const { pixiApplication } = app
    $: globalThis.__PIXI_APP__ = $pixiApplication

    setAppContext({ ...app, assets });

</script>

<App>
    {#if $loaded}
        <slot />
    {/if}
</App>
