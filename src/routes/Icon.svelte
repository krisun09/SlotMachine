<script lang="ts">
    export let icon: string = '';
    const symbolImages: any = {
        'bar': '/asset/bar.png',
        'bell': '/asset/bell.png',
        'cherry': '/asset/cherry.png',
        'clover': '/asset/clover.png',
        'coin': '/asset/coin.png',
        'seven': '/asset/seven.png',
    };
</script>

<div class="icon">
    <img src={symbolImages[icon]} alt={icon}>
</div>

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
