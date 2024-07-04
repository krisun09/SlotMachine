<script lang="ts">
    import {Container} from "pixi.js-legacy";
    import Icon from "../stories/lib/components/Icon.svelte";
    import {getAppContext, getSpineContext, Spine} from "pixi-svelte";
    import type { ISkeletonData } from 'pixi-spine';


    export let name: string;
    export let key: string;
    export let x = 0;
    export let y = 0;
    export let rotation = 0;


    export let icons: string[] = [];

    // const REEL_WIDTH = 160;
    //
    // const reelContainer = new Container();
    //
    // for (let i = 0; i < 5; i++) {
    //     const rc = new Container();
    //
    //     rc.x = i * REEL_WIDTH;
    //     reelContainer.addChild(rc);
    // }

    const { loadedAssets } = getAppContext();

    $: spineData = $loadedAssets?.[key] as ISkeletonData;

    $: if (!spineData) {
        console.error(`Spine: key "${key}" is not found in $loadedAssets`);
        console.log({ $loadedAssets });
    }

    const spine = new Spine(spineData);

    // const spine = getSpineContext();

    const icon = spine.skeleton.findSlot(name)

    $: if (icon) {
        icon.x = x || icon.x;
        icon.y = -y || icon.y;
        icon.rotation = rotation || icon.rotation;
    }

</script>


<div class="reel">
    {#each icons as icon}
        <Icon />
    {/each}
</div>

<style>
    .reel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 200px;
    }
</style>
