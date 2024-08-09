<script lang="ts" >
  import { Container, Rectangle } from 'pixi-svelte';
  import { slotReels, SYMBOL_SIZE } from './slot';
  import SlotReel from './SlotReel.svelte';
</script>

<Container x={200} y={200}>
  <Rectangle isMask width={SYMBOL_SIZE * 5} height={SYMBOL_SIZE * 3} backgroundColor={0x000000} />
  {#each slotReels as reel}
    <SlotReel {reel} />
  {/each}
</Container>
