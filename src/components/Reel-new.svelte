<script lang="ts">
    import {Container} from "pixi-svelte";
    import {centerX, centerY, symbolWidth, visibleYPos, possibleYPos} from "./constants.ts";
    import Symbol from "./Symbol.svelte";
    import {tweened, type Tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";
    import {get, writable} from "svelte/store";
    import {createEventDispatcher} from "svelte";

    export let reelIndex: number;
    export let REEL_MAP: { id: number, name: string, yPos: number, tween: Tweened<any>, lastYPos: number}[] = [];

    export let spinning: boolean;

    // let visibleSymbols = [];
    //
    // for (const symbol of REEL_MAP) {
    //     if (visibleYPos.includes(symbol.yPos)) {
    //         visibleSymbols = [...visibleSymbols, symbol]
    //         console.log(`adding new visible symbol: ${symbol}`)
    //     }
    //     visibleSymbols = []
    // }

    let visibleSymbols = writable(new Array<{ id: number, name: string, yPos: number, tween: Tweened<any>, lastYPos: number}>);

    let tween0 = tweened(0, { duration: 4000, easing: cubicOut });
    let tween1 = tweened(0, { duration: 4000, easing: cubicOut });
    let tween2 = tweened(0, { duration: 4000, easing: cubicOut });

    const dispatch = createEventDispatcher();

    let spinCount = 5; // Number of spins before stopping
    let count = 0;

    const spinReel = () => {
        console.log(`spinning is ${spinning}, spinning reel`)

        count = 0; // Reset count before starting a new spin
        spinning = true; // Set spinning to true

        const spinIteration = () => {
            if (count >= spinCount) {
                spinning = false; // Set spinning to false when the spin stops
                stopReel();
                dispatch('spinComplete');
                updateVisibleSymbols();
                return;
            }

            count++;
            REEL_MAP.forEach((symbol) => {
                const currentIndex = possibleYPos.indexOf(symbol.lastYPos);
                const nextIndex = (currentIndex + 1) % possibleYPos.length;
                symbol.tween.set(possibleYPos[nextIndex]);
                symbol.lastYPos = possibleYPos[nextIndex]; // Update lastYPos to the new position
            });

            updateVisibleSymbols();

            setTimeout(spinIteration, 500);
        };

        spinIteration();

        // const spinInterval = setInterval(() => {
        //     count++;
        //
        //     REEL_MAP.forEach((symbol) => {
        //         const currentIndex = possibleYPos.indexOf(symbol.lastYPos);
        //         const nextIndex = (currentIndex + 1) % possibleYPos.length;
        //         console.log(`next index: ${nextIndex}, tween is ${possibleYPos[nextIndex]}`)
        //         symbol.tween.set(possibleYPos[nextIndex]);
        //         symbol.lastYPos = possibleYPos[nextIndex]; // Update lastYPos to the new position
        //     });
        //
        //     updateVisibleSymbols(); // Update visible symbols after spinning stops
        //
        //     if (count >= spinCount) {
        //         clearInterval(spinInterval);
        //         spinning = false; // Set spinning to false when the spin stops
        //         console.log(`count is ${count}, spinning should be set to false, it's ${spinning}`)
        //         stopReel();
        //     }
        // }, 1000);
    };

    const stopReel = () => {
        console.log('stopping reel')
        REEL_MAP.forEach((symbol, index) => {
            symbol.tween.set(symbol.yPos);
            symbol.lastYPos = symbol.yPos;
            console.log(`stopping, ypos is: ${symbol.yPos}`)
        });
        updateVisibleSymbols();
    };

    const updateVisibleSymbols = () => {
        let updatedSymbols: { id: number, name: string, yPos: number, tween: Tweened<any>, lastYPos: number}[] = [];
        for (const symbol of REEL_MAP) {
            if (visibleYPos.includes(symbol.lastYPos)) {
                updatedSymbols = [...updatedSymbols, symbol]
            }
        }
        visibleSymbols.set(updatedSymbols);
    };

    // This will only run once when the component is initialized
    updateVisibleSymbols();

    const isOutOfView = (pos: number) => {
        return pos < centerY - symbolWidth || pos > centerY + symbolWidth;
    }

    $: if (!spinning) {
        console.log(`spinning: ${spinning}`)
        updateVisibleSymbols();
    }

    $: {
        const symbols = get(visibleSymbols);
        ({ tween: tween0} = symbols[0]);
        ({ tween: tween1} = symbols[1]);
        ({ tween: tween2} = symbols[2]);

        if (spinning) {
            console.log('spinReel is getting called')
            spinReel();
        }

        if ( isOutOfView($tween0)) { // symbol is moving out of the visible symbols range
            console.log(`${$tween0} is out of view`)
            // spinReel();
        }
    }

        // if ( isOutOfView($tween0) || isOutOfView($tween1) || isOutOfView($tween2)) { // symbol is moving out of the visible symbols range
        //     spinReel();
        //     updateVisibleSymbols();
        // }

        // if (spinning) {
        //     spinReel();
        // }

        // visibleSymbols.subscribe((symbols) => {
        //     if (symbols.length > 0) {
        //         ({ tween: tween0} = symbols[0]);
        //         ({ tween: tween1} = symbols[1]);
        //         ({ tween: tween2} = symbols[2]);
        //     }
        //     // console.log(`setting spinning from ${spinning} to false`)
        //     spinning = false;
        // });




    // $: ({ tween: tween0} = $visibleSymbols[0])
    // $: ({ tween: tween1} = $visibleSymbols[1])
    // $: ({ tween: tween2} = $visibleSymbols[2])


    // for (const symbol of visibleSymbols) {
    //     console.log("visible symbol yPos = ${symbol.yPos}")
    // }

</script>

<Container x={centerX + reelIndex * symbolWidth}>
    visible pos: {visibleYPos} <br>
    {#each $visibleSymbols as symbol, symbolIndex}
        {symbol.yPos} <br>
        <Container y={symbolIndex === 0 ? $tween0 : symbolIndex === 1 ? $tween1 : $tween2 }>
            <Symbol symbol={symbol.name} />
        </Container>
    {/each}
</Container>


<style>
</style>
