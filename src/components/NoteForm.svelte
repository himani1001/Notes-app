
<script>
    export let note ={
        title: "",
        content: ""
    };

    export let onSave;
    let localNote = { ...note};

    const handleSubmit = () => {
        onSave(localNote);
        localNote= {
            title: "",
            content: ""
        };
    };
</script>

<form on:submit|preventDefault = {handleSubmit} 
class="space-y-2">
    <input type="text" bind:value={localNote.title} placeholder="Title" 
    class="border p-2 w-full rounded bg-white text-black dark: text-black dark:bg-gray-700 placeholder-gray-500 ark:placeholder-gray-400" 
    required />

    <textarea bind:value={localNote.content} placeholder="Content" class="border p-2 w-full rounded bg-white text-black dark:text-black dark:bg-gray-700 placeholder-gray-500 dark: placeholder-gray-400" required></textarea>

    <button class="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded">
        Save
    </button>
</form>