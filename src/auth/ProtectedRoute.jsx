import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;
