const supabase = require('../services/supabaseClient');

exports.register = async ({ email, password_hashed, pseudo, localite }) => {
  const { data, error } = await supabase.from('usersCustom').insert({ email, password_hash: password_hashed, pseudo, localite });
  if (error) throw error;
  return data;
};

exports.userMdp = async (email) => {
  const {data, error} = await supabase
  .from('usersCustom')
  .select('password_hash')
  .eq("email", email)
  .single()

  if (error) throw error;
  return data.password_hash; 
};


exports.getUser = async (email) => {
  const {data, error} = await supabase
  .from('usersCustom')
  .select('email, pseudo, localite')
  .eq("email", email)
  .single()

  if (error) throw error;
  return data; 
};

exports.deleteUserByEmail = async (email) => {
  const { error } = await supabase
    .from("usersCustom")
    .delete()
    .eq("email", email);

  if (error) throw error;
};