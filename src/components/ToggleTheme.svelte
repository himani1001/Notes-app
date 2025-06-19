<script>
    import {onMount} from "svelte";
    let dark = false;

    onMount(() => {
        const saved = localStorage.getItem("theme");
        dark == saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
        updateHTMLClass();
    });

    function toggleTheme(){
        dark = !dark;
        localStorage.setItem("theme", dark ? "dark" : "light");
        updateHTMLClass();
    }

    function updateHTMLClass(){
        const htmlEl = document.documentElement;
        htmlEl.classList.toggle("dark", dark);
    }
</script>

<button on:click={toggleTheme}
class="px-3 py-1 text-white bg-blue-800 rounded hover:bg-blue-900 dark:bg-gray-800 transition">
{dark ? "🌙 Dark" : "☀️ Light"}
</button>