<script lang="ts">
  import { Sprite } from "pixi-svelte";

  // export let id: number;
  // export let index: number;
  export let symbol: string;

  const SIZES = { width: 70, height: 70 };
</script>

<Sprite key={symbol} {...SIZES}/>
