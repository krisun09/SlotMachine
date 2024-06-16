<script lang="ts">
    import Reel from "./Reel.svelte";
    import { Story } from '@storybook/addon-svelte-csf';
    import Game from "./Game.svelte";

    const ICONS = ['bar', 'bell', 'cherry', 'clover', 'coin', 'seven']

    let reels: any = Array.from({
        length: 5
    }, () => []);


    export const meta = {

    }

    const getRandomIcon = () => {
        const randomIndex = Math.floor(Math.random() * ICONS.length);
        const icon = ICONS[randomIndex];
        return icon;
    }

    const generateRandomIcons = () => {
        reels = reels.map(() => Array.from({
            length: 3
        }, getRandomIcon));
    }

    const spinReels = () => {
        generateRandomIcons();
    }


</script>

<div class="flex flex-row justify-center">
    {#each reels as reelIcons}
        <Reel icons={reelIcons} />
    {/each}
</div>

<button on:click={spinReels}>Spin</button>

<style>
    .flex {
        display: flex;
    }

    .flex-row {
        flex-direction: row;
    }

    .justify-center {
        justify-content: center;
        white-space: nowrap;
    }
</style>
