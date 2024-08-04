<script lang="ts">
    import {numOfReel, SYMBOLS, centerY, symbolWidth, visibleSymbolsPerReel, possibleYPos} from "./constants.ts";
    import Reel from "./Reel-new.svelte";
    import {type Tweened, tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";

    let spinning = false;

    // Function to rotate the array
    function rotateArray(arr: number[], k: number) {
        // Calculate the actual number of rotations to be done
        k = k % arr.length;

        // Create a temporary array of the same size as the original array
        let tempArr = new Array(arr.length).fill(0);

        // Initialize Index variable to track position in rotated array
        let ri = 0;

        // Copy elements from the original array to the temporary array
        // starting from k to n-1 (the end of original array)
        for (let i = k; i < arr.length; i++) {
            tempArr[ri] = arr[i];
            ri++;
        }

        // Copy the elements from 0 to k-1th index in the original array
        // to the end of rotated array
        for (let i = 0; i < k; i++) {
            tempArr[ri] = arr[i];
            ri++;
        }

        // Copy the contents of the temporary array back into the original array
        for (let i = 0; i < arr.length; i++) {
            arr[i] = tempArr[i];
        }
    }

    const getRandomSymbol = () => {
        const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
        const symbol = SYMBOLS[randomIndex];
        return symbol;
    };

    // Initialize reels with random symbols
    let REELS_MAP = Array.from({ length: numOfReel }, (_, reelIndex) =>
        Array.from({ length: visibleSymbolsPerReel + 3 }, (_, symbolIndex) => ({
            id: reelIndex * (visibleSymbolsPerReel + 3) + symbolIndex,
            name: getRandomSymbol(),
            yPos: centerY + (symbolIndex - 1) * symbolWidth,
            tween: tweened(centerY + (symbolIndex - 1) * symbolWidth, {
                duration: 2000,
                easing: cubicOut
            }),
            lastYPos: centerY + (symbolIndex - 1) * symbolWidth
        }))

    );

    const startSpinning = () => {
        spinning = true;
        console.log(`starting spinning: ${spinning}`)
        startTweening();
    }

    const handleSpinComplete = () => {
        spinning = false;
        console.log(`spinning complete: ${spinning}`);
    };

    const startTweening = () => {

        REELS_MAP.forEach(reel => {

            let possiblePos = possibleYPos;

            let randomNumber = Math.floor(Math.random() * 7);

            rotateArray(possiblePos, randomNumber);

            // console.log(`unique ${uniquePossibleYPos}`)
            reel.forEach((symbol, symbolIndex) => {
                const newPos = possiblePos[symbolIndex]; // Draw unique position

                // console.log(`symbol: ${ symbol.name } current: ${currentPos} new pos: ${newPos} index: ${symbolIndex}`)

                symbol.lastYPos = symbol.yPos;
                symbol.yPos = newPos;
                // symbol.tween.set(newPos);
            });
        });
    };

</script>


{#each REELS_MAP as reel, reelIndex}
    <Reel REEL_MAP={reel} {reelIndex} {spinning} on:spinComplete={handleSpinComplete}/>
{/each}

<button class="green-button" on:click={startSpinning}>Spin</button>


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
        position: fixed;
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
