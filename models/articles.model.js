const supabase = require('../services/supabaseClient');

exports.getAllArticles = async () => {
  const { data, error } = await supabase.from('articles').select('*').order('date_creation', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getArticleById = async (id) => {
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

exports.createArticle = async (article) => {
  const { data, error } = await supabase.from('articles').insert(article).select().single();
  if (error) throw error;
  return data;
};

exports.updateArticle = async (id, updates) => {
  const { data, error } = await supabase.from('articles').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

exports.deleteArticle = async (id) => {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
  return true;
};
