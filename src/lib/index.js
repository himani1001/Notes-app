// place files you want to import through the `$lib` alias in this folder.
const BASE_URL = "https://685102b58612b47a2c083527.mockapi.io/api/v1/notes/notes";

export async function fetchNotes(){
    const res = await fetch(BASE_URL);
    return await res.json();
}

export async function createNote(note){
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(note),
    });
    return await res.json();
}

export async function updateNote(id, updateNote){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(updateNote),
    });
    return await res.json();
}

export async function deleteNote(id){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
    return await res.json();
}