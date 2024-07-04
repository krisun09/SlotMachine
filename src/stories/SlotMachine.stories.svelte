<script lang="ts">
    import {Meta, Story} from '@storybook/addon-svelte-csf';
    import { Sprite, Spine} from 'pixi-svelte';
    import Game from "./Game.svelte";

    import Reel from "../routes/Reel.svelte";

    import bar from './assets/bar';
    import bell from './assets/bell';
    import cherry from './assets/cherry';
    import clover from './assets/clover';
    import coin from './assets/coin';

    const ICONS = [ bar, bell, cherry, clover, coin ];

    let reels = new Array(5).fill(null).map(() => new Array(3).fill(null));

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
        console.log("reels spun")
        generateRandomIcons();
    }

</script>

<Meta
        title="stories/slotMachine"
        component={Reel}
        argTypes={{
		x: { name: 'x', control: { type: 'number' } },
		y: { name: 'y', control: { type: 'number' } },
		width: { name: 'width', control: { type: 'number' } },
		height: { name: 'height', control: { type: 'number' } },
		zIndex: { name: 'zIndex', control: { type: 'number' } },
		anchor: { name: 'anchor', control: { type: 'object' } }
	}}
        args={{
		x: 50,
		y: 50,
		width: 200,
		height: 200,
		zIndex: 1,
		anchor: { x: 0, y: 0 },
		// key: bar
	}}
/>

<Story let:args name="slotMachine">
    <Game assets={{ bar, bell }}>

        {#each reels as reel}
            <Reel icons={reel} name="" key=""/>
        {/each}

    </Game>
</Story>

<div class="flex flex-row justify-center">
    {#each reels as reelIcons}
        <Reel icons={reelIcons}/>
    {/each}
</div>

<button class="green-button"
        on:click={spinReels}
>Spin
</button>

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
        border: none;
        padding: 0.5rem 2rem;
        background-color: #39c41f;
        color: #fff;
        font-size: 1.5rem;
        border-radius: 1rem;
        transition: all 250ms;
        transform-origin: center;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25),
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
