<script lang="ts">
  import { App, createApp, setAppContext } from "pixi-svelte";

  import SlotMachine from "./SlotMachine.svelte";
  import assets from "../assets/index";

  const app = createApp();
  const { loaded } = app;

  setAppContext({ ...app, assets });
</script>

<App>
  {#if $loaded}
    <SlotMachine />
  {/if}
</App>
