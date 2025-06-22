import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { UserContext } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { signOut, updateUser } from "../helpers";

function ProtectedRoute({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
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

  if (!authUser) return <Navigate to="/" replace />;

  const userDataObject = {
    ...userData,
    setUserData,
    updateUser: (data) =>
      updateUser(supabase, setUserData, showToast, userData, data),
    signOut: () => signOut(supabase, navigate),
  };

  return (
    <UserContext.Provider value={userDataObject}>
      {children}
    </UserContext.Provider>
  );
}

export default ProtectedRoute;
