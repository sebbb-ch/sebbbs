<script>
    import { onMount } from 'svelte';

    onMount(() => {
        /// @note These are staying as buttons for testing but should
        ///     eventually move the +page.server.js

        // Letterboxd button event listener
        const letterboxd_button_DOM = document.getElementById("test-letterboxd-btn");
        letterboxd_button_DOM?.addEventListener('click', async (event) => {
            const res = await fetch("/api/letterboxd");
            console.log(await res.json());
        });

        // Goodreads button event listener
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
