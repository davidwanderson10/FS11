import api from "./api";

export const getPedidos = () => api.get("/pedidos");
export const getPedido = (id) => api.get(`/pedidos/${id}`);
export const createPedido = (data) => api.post("/pedidos", data);
export const updatePedido = (id, data) => api.put(`/pedidos/${id}`, data);
export const deletePedido = (id) => api.delete(`/pedidos/${id}`);
