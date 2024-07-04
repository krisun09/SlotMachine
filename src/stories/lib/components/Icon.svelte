<script lang="ts">
    import {ICONS} from "./constants"

    let randomIconIndex: number;

    const getRandomIconIndex = () => {
        randomIconIndex = Math.floor(Math.random() * ICONS.length);
        return randomIconIndex;
    }

</script>

<!--<img src={symbolPath(icon)} alt={icon} />-->

<img src={ICONS[getRandomIconIndex()].path} alt={ICONS[randomIconIndex].name} />

<style>
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 66px;
        margin: 0.5rem;
    }
</style>
