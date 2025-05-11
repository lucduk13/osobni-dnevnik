import { createSignal, onMount } from "solid-js";
import { supabase } from "./pocketbaseClient";
import AuthPage from "./pages/AuthPage";
import JournalPage from "./pages/JournalPage";

export default function App() {
  const [session, setSession] = createSignal(null);

  onMount(() => {
    const session = pocketbase.authStore.model;
    setSession(session);

    pocketbase.authStore.onChange(() => {
      setSession(pocketbase.authStore.model);
    });
  });


  return (
    <div class="min-h-screen bg-gray-100">
      {!session() ? (
        <AuthPage />
      ) : (
        <div>
          <nav class="bg-blue-500 text-white p-4 flex justify-between">
            <h1 class="text-xl">Personal Journal</h1>
            <button class="btn btn-secondary" onClick={() => supabase.auth.signOut()}>
              Logout
            </button>
          </nav>
          <main class="p-4">
            <JournalPage userId={session()?.user?.id} />
          </main>
        </div>
      )}
    </div>
  );
}
