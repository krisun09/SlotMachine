<script lang="ts">
  import { Sprite } from "pixi-svelte";
  import { SYMBOL_SIZE, type SymbolType } from "./slot";

  const SIZES = { width: SYMBOL_SIZE, height: SYMBOL_SIZE };

  export let symbol: SymbolType;
  export let reelIndex: number;

  const { positionY, symbolValue } = symbol;
</script>

<Sprite key={$symbolValue} {...SIZES} x={reelIndex * SYMBOL_SIZE} y={$positionY} />
