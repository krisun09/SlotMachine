<script lang="ts">
  import { Container } from "pixi-svelte";
  import Symbol from "./Symbol.svelte";
  
  export let symbols: string[] = [];
  export let reelIndex: number;
</script>

<Container x={reelIndex * 50}>
  {#each symbols as symbol, symbolIndex}
    <Container y={symbolIndex * 50}>
      <Symbol {symbol} />
    </Container>
  {/each}
</Container>
