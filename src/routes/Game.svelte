<script lang="ts">
    import {App, createApp, setAppContext, Text} from 'pixi-svelte';
    import SlotMachine from "./SlotMachine.svelte";

    const app = createApp();
    const { pixiApplication } = app
    $: globalThis.__PIXI_APP__ = $pixiApplication

    setAppContext(app)

</script>

<App>
    <SlotMachine ></SlotMachine>
    aaaaaaaa HEEEEELP

    <Text value="Hello world!" style={{ fill: 0xff1010 }} />


</App>
