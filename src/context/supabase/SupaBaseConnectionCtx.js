import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 📌 Remplacez ces valeurs par vos propres clés Supabase
const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko';
// Initialiser le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Créer un contexte d'authentification
const AuthContext = createContext();

// ✅ Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer l'utilisateur actuel à l'initialisation
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null);
    });

    // Écouter les changements de session
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook personnalisé pour accéder au contexte
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};
