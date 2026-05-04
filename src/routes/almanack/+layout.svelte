<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const letterboxd_button_DOM = document.getElementById("test-letterboxd-btn");
        letterboxd_button_DOM?.addEventListener('click', async (event) => {
            const res = await fetch("/api/letterboxd");
            console.log(await res.json());
        });

        const goodreads_button_DOM = document.getElementById("test-goodreads-btn");
        goodreads_button_DOM?.addEventListener('click', async (event) => {
            const res = await fetch("/api/goodreads");
            console.log(await res.json());
        });
    });

	let { children } = $props();
</script>

<svelte:head>

</svelte:head>

{@render children()}
