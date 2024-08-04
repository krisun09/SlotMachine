<script lang="ts">
  import {Container} from "pixi-svelte";
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import Reel from "./Reel.svelte";
  import {PAYLINES} from './constants.ts';
  import {get, writable} from "svelte/store";
  const SYMBOLS = ["bar", "bell", "cherry", "clover", "coin"];

  const numReels = 5;
  const symbolsPerReel = 3;
  const symbolPosition = 75;
  const centerX = innerWidth / 2 - 2.5 * symbolPosition;
  const centerY = innerHeight / 2 - 2 * symbolPosition;

  // ** reel generation logic **

  const getRandomSymbol = () => {
    const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
    const symbol = SYMBOLS[randomIndex];
    return symbol;
  };

  // Generate a new row of random symbols
  const generateNewRow = () => {
    return Array.from({ length: numReels }, getRandomSymbol);
  };


  // const getRandomSymbolIndex = (): number => {
  //   return Math.floor(Math.random() * SYMBOLS.length);
  // };

  // let reels = new Array(5)
  //   .fill(null)
  //   .map(() => new Array(3).fill(getRandomSymbol()));

  // const updateSymbols = () => {
  //   reels.forEach((reel, reelIndex) => {
  //     reel.forEach((_, symbolIndex) => {
  //       reels[reelIndex][symbolIndex] = getRandomSymbol();
  //     });
  //   });
  // };

  let reels = writable(Array.from({ length: numReels }, () =>
          Array.from({ length: symbolsPerReel }, getRandomSymbol)
  ));

  // const updateSymbols = (reelIndex:number) => {
  //   reels.update(currentReels => {
  //     currentReels[reelIndex] = currentReels[reelIndex].map(() => getRandomSymbol());
  //     return currentReels;
  //   });
  // };

  const updateSymbols = (reelIndex:number) => {
    reels.update(currentReels => {
      console.log("updating symbols....")
      console.log(`index ${reelIndex} ${currentReels}`)
      currentReels[reelIndex].shift(); // Remove the top symbol after tweening
      console.log(currentReels)

      return currentReels;
    });
    resetPositions(); // Reset positions after removing the top symbol
  };

  // Function to reset positions before tweening again
  const resetPositions = () => {
    symbolPositions.update(positions => {
      positions.forEach((reel, reelIndex) => {
        reel.forEach((pos, index) => {
          pos.set(centerY + index * symbolPosition, { duration: 0 }); // Reset without animation
        });
      });
      return positions;
    });
  };


  // ** payout logic **

  const checkWin = (reels: string[][], payline: number[]): boolean => {
    const firstSymbol = reels[0][payline[0]];
    return payline.every((row, col) => reels[col][row] === firstSymbol);
  };

  let wins: number[] = [];

  // const checkWinningCombinations = (): void => {
  //   wins = [];
  //   PAYLINES.forEach((payline, index) => {
  //     if (checkWin(reels, payline)) {
  //       wins.push(index);
  //     }
  //   });
  // };

  let initialPositions = Array.from({ length: numReels }, () =>
          Array.from({ length: symbolsPerReel }, (_, index) => tweened(centerY + index * symbolPosition, {
            duration: 2000,
            easing: cubicOut
          }))
  );

  $: console.log(`tweened centerY + symbolPosition = ${centerY + symbolPosition}` )


  let symbolPositions = writable(initialPositions);
  // $: initialPositions = symbolPositions;

  // Function to start the tween animation for all reels
  const startTweening = () => {
    // Generate a new row of symbols and append it to the bottom of each reel
    const newRow = generateNewRow();
    reels.update(currentReels => {
      currentReels.forEach((reel, reelIndex) => {
        reel.push(newRow[reelIndex]);
      });
      return currentReels;
    });

    // Update the positions to move everything up
    symbolPositions.update(positions => {
      positions.forEach((reel, reelIndex) => {
        reel.forEach((pos, symbolIndex) => {

          pos.set(200).then(console.log('pos updated'))

          const currentPos = get(pos); // Get the current value of the tweened store

          const newPos = currentPos - symbolPosition;

          console.log(`sm line 132: currentPos = ${currentPos} or ${get(pos)}, new pos = ${newPos}`)

          updateTweenArrayPos(reelIndex, symbolIndex, newPos)

          pos.set(newPos).then(() => {
            const updatedPos = get(pos);
            console.log(`After set - Updated Pos: ${updatedPos}`);
          });


          pos.set(currentPos - symbolPosition).then(() => {

            if (symbolIndex === symbolsPerReel) { // Once the last symbol has moved, update the reel
              updateSymbols(reelIndex);
            }
          });
        });
      });
      return positions;
    });
  };

  const updateTweenArrayPos = (reelIndex: number, symbolIndex: number, newYPos: number) => {
    // console.log('line 143:')
    // console.log(reelIndex, symbolIndex, newYPos)
    initialPositions[reelIndex][symbolIndex].set(newYPos).then(console.log('tweenUpdated'));
  }

  const spinReels = () => {
    // updateSymbols();
    startTweening();
    // checkWinningCombinations();
  };

</script>


<Container>
  {#if wins.length > 0}
    <ul>
      {#each wins as winIndex}
        <li>Payline {winIndex + 1} wins!</li>
      {/each}
    </ul>
  {:else}
    <p>No wins this spin.</p>
  {/if}
</Container>

{$symbolPositions[0].forEach(pos => {console.log("passing symbolPositions[ " + get(pos) )})}

{#each Array(numReels) as _, reelIndex}
  <Reel symbols={$reels[reelIndex]} {reelIndex} symbolPositions={$symbolPositions[reelIndex]} />
{/each}


<button class="green-button" on:click={spinReels}>Spin</button>


<style>
  progress {
    display: block;
    width: 100%;
  }

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

  .customButton {
    z-index: 999;
    position: absolute;
  }

</style>
