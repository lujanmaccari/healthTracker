import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { UserContext } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const isSigningIn = location.pathname === "/aboutYou";
      setIsSigningIn(isSigningIn);
      if (isSigningIn) {
        setLoading(false);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user ?? null;
      setAuthUser(user);

      if (user) {
        const { data: userTableData, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) {
          console.error("Error fetching user from users table:", error);
        } else {
          setUserData(userTableData);
        }
      }

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

  if (!authUser && !isSigningIn) return <Navigate to="/" replace />;

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export default ProtectedRoute;
