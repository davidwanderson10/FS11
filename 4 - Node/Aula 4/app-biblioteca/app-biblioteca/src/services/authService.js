import api from "./api";

export const login = (email, senha) =>
  api.post("/login", { email, senha });

export const validateToken = () =>
  api.get("/validate-token");
