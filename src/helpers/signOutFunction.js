export const signOut = async (supabase, navigate) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error al cerrar sesión:", error.message);
  } else {
    console.log("Sesión cerrada correctamente");
    navigate("/");
  }
};
