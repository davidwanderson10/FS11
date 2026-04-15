import api from "./api";

export const getCategorias = () => api.get("/categorias");
export const getCategoria = (id) => api.get(`/categorias/${id}`);
export const createCategoria = (data) => api.post("/categorias", data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);
