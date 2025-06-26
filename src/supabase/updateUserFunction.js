const updateUserFunction = async (
  supabase,
  setUserData,
  showToast,
  user,
  updatedData
) => {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", user.id);

  if (error) {
    showToast("Error al actualizar el usuario");
    console.error("Error al actualizar el usuario:", error);
    return { success: false, error };
  }

  setUserData({ ...user, ...updatedData });
  showToast("Usuario actualizado exitosamente!!", "success");
  return { success: true, data };
};

export default updateUserFunction;
