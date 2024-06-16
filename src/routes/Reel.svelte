<script lang="ts">
    import Icon from "./Icon.svelte";
    export let icons: string[] = [];

</script>

<div class="reel">
    {#each icons as icon}
        <Icon icon={icon} />
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
