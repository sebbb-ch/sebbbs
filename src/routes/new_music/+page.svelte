<!---------------------------------------------------------------------------->
<!-- Javascript -->
<!---------------------------------------------------------------------------->
<script>

let tel = $state('');
const tel_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * 
 */
async function submit_tel() 
{ 
    console.log(tel);

    // Regex check on telephone input
    const is_valid_tel = (tel.match(tel_regex) !== null);
    if (!is_valid_tel) {
        /// @todo UI output
        console.error("Invalid phone number input");
        return;
    }

    // Write phone number to database
    const res = await fetch("/api/users", { 
        method  : "POST",
        body    : JSON.stringify({
            tel : tel
        })
    });
}

</script>


<!---------------------------------------------------------------------------->
<!-- Markdown -->
<!---------------------------------------------------------------------------->

<h1>June Jams</h1>

<input type="tel" bind:value="{tel}">
<button id="tel-submit-btn" onclick={submit_tel}>Submit</button>

<p>Woah</p>