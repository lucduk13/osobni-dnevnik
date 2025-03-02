import { createSignal, onMount } from "solid-js";
import { supabase } from "./supabaseClient";
import AuthPage from "./pages/AuthPage";
import JournalPage from "./pages/JournalPage";

export default function App() {
  const [session, setSession] = createSignal(null);

  onMount(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData.session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
