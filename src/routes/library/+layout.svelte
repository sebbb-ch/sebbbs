<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const button_DOM = document.getElementById("test-btn");
        button_DOM?.addEventListener('click', async (event) => {
            const res = await fetch("/library_content/letterboxd");
            console.log(await res.json());
        });
    });

	let { children } = $props();
</script>

<svelte:head>

</svelte:head>

{@render children()}
