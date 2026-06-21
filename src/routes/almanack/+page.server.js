/**
 * @file /library/+page.server.js
 */


/// @cite https://svelte.dev/docs/kit/load#Making-fetch-requests
export async function load({ fetch, params }) 
{
    const res           = await fetch("/api/letterboxd");
    const letterboxd    = await res.json();

    return { letterboxd };
}
