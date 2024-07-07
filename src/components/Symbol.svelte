<script lang="ts">
  import { Sprite } from "pixi-svelte";

  export let symbol: string;

  const SIZES = { width: 50, height: 50 };
</script>

<Sprite key={symbol} {...SIZES} />