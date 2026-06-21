<script>
    let { data } = $props();
</script>

<!-- Almanack page -->

<h1>The Almanack</h1>

<button id="test-letterboxd-btn">Test Letterboxd</button>
<button id="test-goodreads-btn">Test Goodreads</button>
<button id="test-spotify-btn">Test Spotify</button>

{#each data.letterboxd.movie_contents as movie}
    <h2>{movie.title}</h2>
    <ul>
        <li>{movie.rating}</li>
        <li>{movie.date}</li>
    </ul>
    {@html movie.review_html}
{/each}