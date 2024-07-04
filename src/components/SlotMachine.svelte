<script lang="ts">
  import Reel from "./Reel.svelte";

  const SYMBOLS = ["bar", "bell", "cherry", "clover", "coin"];

  const getRandomSymbol = () => {
    const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
    const symbol = SYMBOLS[randomIndex];
    return symbol;
  };

  let reels = new Array(5)
    .fill(null)
    .map(() => new Array(3).fill(getRandomSymbol()));

  const updateSymbols = () => {
    reels.forEach((reel, reelIndex) => {
      reel.forEach((_, symbolIndex) => {
        reels[reelIndex][symbolIndex] = getRandomSymbol();
      });
    });
  };

  const spinReels = () => {
    updateSymbols();
  };
</script>

{#each reels as reel, reelIndex}
  <Reel symbols={reel} {reelIndex} />
{/each}

<button class="green-button" on:click={spinReels}>Spin </button>

<style>
  .flex {
    display: flex;
  }

  .flex-row {
    flex-direction: row;
  }

  .justify-center {
    justify-content: center;
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
    bottom: 46px;
    right: 10px;
    margin: 10px;
  }
  .green-button:hover {
    cursor: pointer;
    transform: scale(0.965);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  }
</style>
