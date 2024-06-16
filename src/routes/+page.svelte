<script>
    import { browser } from '$app/environment';
    import {onMount} from "svelte";

    let component = undefined;

    $: if(browser) {
        console.log(browser);

        // (async function () {
        //     await import("./Game.svelte")
        // })();

        onMount(async () => {
            import("./Game.svelte").
            then(data => {
                console.log(data.default)
                component = data.default;

            })

        })

        // import("./Game.svelte")
        //     .then(data => {
        //     console.log(data.default)
        //
        //         if (data.default !== undefined) {
        //             component = data.default;
        //         } else {
        //             console.error('Component default export is undefined');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Failed to load Game.svelte:', error);
        //     });

        // console.log(component)
    }
</script>

{#if browser && component}
    <svelte:component this={component} />
{/if}
