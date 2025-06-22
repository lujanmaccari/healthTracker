import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function RedirectRoute({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user ?? null;
      setAuthUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [location.pathname]);

  if (loading) return <div>Cargando...</div>;

  if (authUser) return <Navigate to="/home" replace />;

  return children;
}

function RedirectRoutes() {
  return (
    <RedirectRoute>
      <Outlet />
    </RedirectRoute>
  );
}

export default RedirectRoutes;
