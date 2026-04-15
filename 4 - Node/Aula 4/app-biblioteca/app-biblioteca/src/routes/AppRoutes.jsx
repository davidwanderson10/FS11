import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import CatalogPage from "../pages/CatalogPage";
import HistoricoPage from "../pages/HistoricoPage";
import AlterarSenhaPage from "../pages/AlterarSenhaPage";
import AutoresPage from "../pages/admin/AutoresPage";
import CategoriasPage from "../pages/admin/CategoriasPage";
import LivrosPage from "../pages/admin/LivrosPage";
import UsuariosPage from "../pages/admin/UsuariosPage";
import PedidosPage from "../pages/admin/PedidosPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/catalogo" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
      <Route path="/historico" element={<PrivateRoute><HistoricoPage /></PrivateRoute>} />
      <Route path="/alterar-senha" element={<PrivateRoute><AlterarSenhaPage /></PrivateRoute>} />

      <Route path="/admin/autores" element={<PrivateRoute adminOnly><AutoresPage /></PrivateRoute>} />
      <Route path="/admin/categorias" element={<PrivateRoute adminOnly><CategoriasPage /></PrivateRoute>} />
      <Route path="/admin/livros" element={<PrivateRoute adminOnly><LivrosPage /></PrivateRoute>} />
      <Route path="/admin/usuarios" element={<PrivateRoute adminOnly><UsuariosPage /></PrivateRoute>} />
      <Route path="/admin/pedidos" element={<PrivateRoute adminOnly><PedidosPage /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/catalogo" replace />} />
    </Routes>
  );
}
