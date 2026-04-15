import api from "./api";

export const getLivros = () => api.get("/livros");
export const getLivro = (id) => api.get(`/livros/${id}`);

export const createLivro = (formData) =>
  api.post("/livros", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updateLivro = (id, formData) =>
  api.put(`/livros/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteLivro = (id) => api.delete(`/livros/${id}`);
