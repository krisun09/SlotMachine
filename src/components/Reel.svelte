<script lang="ts">
  import {Container} from "pixi-svelte";
  import Symbol from "./Symbol.svelte";
  import {tweened, type Tweened} from "svelte/motion";
  import {cubicOut} from "svelte/easing";
  import {writable, get} from "svelte/store";

  export let symbols: string[] = [];
  export let reelIndex: number;
  export let symbolPositions: Tweened<number>[];

  const newPos = [10, 10, 10]
  let inniYPos = 0;
  $: inniYPos = initialPositions[0];

  let symbolPosition = 75;
  let centerX = innerWidth / 2 - 2.5 * symbolPosition;
  let centerY = innerHeight / 2 - 2 * symbolPosition // 1.5*symbolPosition is the proper center. but 2 looks prettier XD

  let initialPositions = symbols.map((_, index) => tweened(centerY + index * symbolPosition, {
    duration: 2000,
    easing: cubicOut
  }));


  const startTweening = () => {
    initialPositions.forEach((yPos, index) => {
      console.log(`oldPos: ${get(yPos)} newPos: ${get(symbolPositions[index])}`)
      // yPos.set(newPos);
      yPos.set(10).then(console.log(`teeeesting, pos = ${get(yPos)}`));
    })
  };

  let yyyPos = 0;
  $: yyyPos = get(initialPositions[0]);

  console.log(`updated initialPositions? initialPositions[0] is ${yyyPos}` )


  // $: startTweening();

</script>

<!--<Container x={centerX + reelIndex * symbolPosition}>-->
<!--  {#each symbols as symbol, symbolIndex}-->
<!--    <Container y={centerY + symbolIndex * symbolPosition}>-->
<!--      {symbol}-->
<!--      <Symbol symbol={symbol} />-->
<!--    </Container>-->
<!--  {/each}-->
<!--</Container>-->

<!--<Container x={centerX + reelIndex * symbolPosition}>-->
<!--  {#each $symbolPositions as symbolPos, symbolIndex}-->
<!--    <Container y={get(symbolPos)}>-->
<!--      &#45;&#45;&#45;&#45;&#45;&#45; symbolIndex: y: {get(symbolPos)} {symbolIndex} <br>-->
<!--      <Symbol symbol={symbols[symbolIndex]} />-->
<!--    </Container>-->
<!--  {/each}-->
<!--</Container>-->

symbols: {symbols} <br>

initialPositions updated? {get(inniYPos)} <br>

<Container x={centerX + reelIndex * symbolPosition}>
  {#each initialPositions as symbolPos, symbolIndex}
    <Container y={get(symbolPos)}>
      symbol pos ======= {get(symbolPos)}
      <Symbol symbol={symbols[symbolIndex]} />
    </Container>
  {/each}
  <button class="green-button" on:click={startTweening}> tweeeeeen</button>
</Container>

<!--<Container x={centerX + reelIndex * symbolPosition}>-->
<!--  {#each symbolPositions as symbolPos, symbolIndex}-->
<!--    <Container y={get(symbolPos)}>-->
<!--      <Symbol symbol={symbols[symbolIndex]} />-->
<!--    </Container>-->
<!--  {/each}-->
<!--</Container>-->



<style>
  .green-button {
    z-index: 999;
    border: none;
    padding: 0.5rem 2rem;
    background-color: #39c41f;
    color: #fff;
    font-size: 1.5rem;
    border-radius: 1rem;
    transition: all 250ms;
    transform-origin: center;
    box-shadow:
            0px 3px 3px rgba(0, 0, 0, 0.25),
            inset 0px -2px 3px rgba(0, 0, 0, 0.25);
    position: absolute;
    bottom: 86px;
    right: 46px;
    margin: 10px;
  }
  .green-button:hover {
    cursor: pointer;
    transform: scale(0.965);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  }
</style>

