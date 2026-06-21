 <!--  
 	File: /src/routes/+layout.svelte 

	Description: Shared stlyes/UI elements between all subpages
 -->

<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
