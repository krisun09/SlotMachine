<script lang="ts">
    import { slotReels } from "./slot";
    import SlotReels from "./SlotReels.svelte";

    let disabled = false;
</script>

<SlotReels />

<button class="green-button" {disabled} on:click={async () => {
    disabled = true;
    await Promise.all(
        slotReels.map(async (slotReel) => await slotReel.spin())
    );
    disabled = false;
}}>Spin</button>


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

    .green-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>
