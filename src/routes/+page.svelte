<script>
  import { onMount } from "svelte";
  import NoteForm from "../components/NoteForm.svelte";
  import NoteCard from "../components/NoteCard.svelte";
  import ToggleTheme from "../components/ToggleTheme.svelte";
  import "../app.css";
  import { fetchNotes, createNote, updateNote, deleteNote } from "$lib/index";

  let notes = [];
  let editingNote = null;
  let loading = false;
  let deletedMessage = "";
  let deletedNoteId = null; 
  let searchBox = "";

  $: filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchBox.toLowerCase())
  );

  const loadNotes = async () => {
  loading = true;
    try{
      notes = await fetchNotes();
    } catch(err){
      console.error("Error fetching notes", err);
    } finally{
      loading = false;
    }
  };

  const handleCreate = async (note) => {
    await createNote(note);
    await loadNotes();
  };

  const handleUpdate = async (note) => {
    await updateNote(note.id, note);
    editingNote = null;
    await loadNotes();
  };

  const handleDelete = async (id) => {
    const deletedNote = notes.find(n => n.id===id);
    await deleteNote(id);
    await loadNotes();
    deletedMessage = `"${deletedNote?.title}" was deleted.`;

    setTimeout(() => {
      deletedMessage = "";
    }, 3000);
  };

  const downloadNotes = () => {
    if(notes.length===0) return;

    const text = notes
      .map(note =>
        `Title: ${note.title}\nContent: ${note.content}\nDate: ${new Date(note.createdAt).toLocaleString()}\n\n`
      )
      .join("");

      const blob = new Blob([text], {type: "text/plain"});
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "my-notes.txt";
      a.click();

      URL.revokeObjectURL(URL);
  }

  onMount(loadNotes);
</script>

<main class="min-h-screen bg-pink-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors px-4 sm:px-6">
  <div class="max-w-2xl mx-auto p-6 space-y-6 ">
    <header class="flex flex-row sm:flex-row sm:items-center sm:justify-between pb-4 border-b dark:border-gray-700">
      <h1 class="text-2xl sm:text-2xl 
      font-bold flex items-center gap-2">
        📝 <span>My Notes</span>
      </h1>

      <div class="flex gap-2">
        <ToggleTheme />
        <button on:click={downloadNotes} 
        class="px-3 py-1 bg-pink-400 text-white rounded hover:bg-pink-600 dark:bg-pink-500 text-sm transition"
        disabled={notes.length===0}>
          Download
        </button>
      </div>
    </header>

    <input 
      type="text"
      placeholder="Search notes by title..."
      bind:value={searchBox}
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 text-gray-900 dark:text-white dark:bg-gray-800"
    />

    {#if editingNote}
      <NoteForm note={editingNote} onSave={handleUpdate} />
    {:else}
      <NoteForm onSave={handleCreate} />
    {/if}

    {#if loading}
      <div class="flex justify-center items-center py-10">
        <svg class="animate-spin h-10 w-10 text-blue-500" 
        xmlns = "http://www.w3.org/2000/svg"
        fill = "none" viewBox = "0 0 24 24">
          <circle class="opacity-25"
          cx = "12"
          cy = "12"
          r = "10"
          stroke = "currentColor" 
          stroke-width = "4"></circle>
          <path class="opacity-75" fill="currentColor" d = "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    {:else if notes.length > 0} 
      <div class="grid gap-4">
        {#each filteredNotes as note(note.id)}
          <NoteCard 
            {note}
            on:edit={() => editingNote = note}
            on:delete={()=> handleDelete(note.id)}
          />
        {/each}
        {#if deletedMessage}
            <div class="bg-blue-200 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200 text-sm text-center px-3 py-2">
              {deletedMessage}
            </div>
        {/if}
      </div>  
    {:else}
      <div class="text-center py-8 col-span-full text-gray-500">
        {
          searchBox ? "No matching note found." : "No notes yet. Create one above!"
        }
      </div>
    {/if}
  </div>
</main>
