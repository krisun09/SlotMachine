<script lang="ts" >
  import type { ReelType } from './slot';
  import SlotSymbol from './SlotSymbol.svelte';

  export let reel: ReelType;

  const { reelIndex, symbols } = reel;
</script>

{#each $symbols as symbol}
  {#key $symbols}
    <SlotSymbol {symbol} {reelIndex} />
  {/key}
{/each}