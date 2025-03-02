import { createSignal, onMount } from "solid-js";
import { supabase } from "../supabaseClient";

export default function JournalPage({ userId }) {
  const [entries, setEntries] = createSignal([]);
  const [searchDate, setSearchDate] = createSignal("");
  const [newEntry, setNewEntry] = createSignal({ title: "", content: "", tags: "" });

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (!error) setEntries(data);
  };

  const addEntry = async () => {
    const { error } = await supabase.from("journal_entries").insert({
      ...newEntry(),
      user_id: userId,
    });
    if (!error) {
      setNewEntry({ title: "", content: "", tags: "" });
      fetchEntries();
    }
  };

  const deleteEntry = async (id) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (!error) fetchEntries();
  };

  onMount(() => {
    fetchEntries();
  });

  return (
    <div>
      <h2 class="text-xl font-bold mb-4">Your Journal</h2>
      <input
        type="date"
        class="input input-bordered mb-4 w-full"
        value={searchDate()}
        onInput={(e) => setSearchDate(e.target.value)}
      />
      <ul class="space-y-4">
        {entries()
          .filter((entry) =>
            searchDate() ? entry.created_at.startsWith(searchDate()) : true
          )
          .map((entry) => (
            <li key={entry.id} class="p-4 bg-white rounded shadow flex justify-between">
              <div>
                <h3 class="font-bold">{entry.title}</h3>
                <p class="text-gray-700">{entry.content}</p>
                <p class="text-sm text-gray-500">Tags: {entry.tags}</p>
                <p class="text-sm text-gray-500">
                  Created at: {new Date(entry.created_at).toLocaleString()}
                </p>
              </div>
              <button class="btn btn-error" onClick={() => deleteEntry(entry.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
      <div class="mt-6">
        <h3 class="text-lg font-bold mb-2">Add New Entry</h3>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full mb-2"
          value={newEntry().title}
          onInput={(e) => setNewEntry({ ...newEntry(), title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          class="textarea textarea-bordered w-full mb-2"
          value={newEntry().content}
          onInput={(e) => setNewEntry({ ...newEntry(), content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          class="input input-bordered w-full mb-2"
          value={newEntry().tags}
          onInput={(e) => setNewEntry({ ...newEntry(), tags: e.target.value })}
        />
        <button class="btn btn-primary" onClick={addEntry}>
          Add Entry
        </button>
      </div>
    </div>
  );
}
