<script>
    export let note;
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>

<div 
class="p-4 border rounded space-y-3 bg-white dark: bg-gray-800 dark: border-gray-700">
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-800">
        {note.title}
    </h2>
    <p class="text-gray-800 dark:text-gray-800">
        {note.content}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">
        {new Date(note.createdAt).toLocaleString()}
    </p>

    <div class="flex gap-2 mt-2">
        <button on:click={() => dispatch('edit')} class="px-3 py-1 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800">
            Edit
        </button>
        <button on:click={() => dispatch('delete')} class="px-3 py-1 text-red-500 hover:underline">
            Delete
        </button>
    </div>
</div>