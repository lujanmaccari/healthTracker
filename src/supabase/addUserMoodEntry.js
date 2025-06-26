const addUserMoodEntry = async (supabase, showToast, user, newEntry) => {
  const { error } = await supabase.from("user_mood").insert([
    {
      user_id: user.id,
      value: newEntry,
      date: new Date().toISOString().slice(0, 10),
    },
  ]);

  if (error) {
    showToast("Error al ingresar el estado de Animo");
    console.error("Error al ingresar el estado de Animo:", error);
    return { success: false, error };
  }

  showToast("Estado de animo ingreado con exito", "success");
  return { success: true, newEntry };
};

export default addUserMoodEntry;
