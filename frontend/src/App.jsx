import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Bovinos from "./pages/Bovinos";
import Bitacora from "./pages/Bitacora";
import Catalogo from "./pages/Catalogo";
import Ventas from "./pages/Ventas";
import Estadisticas from "./pages/Estadisticas";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Inicio />} />

              <Route path="bovinos" element={<Bovinos />} />
              <Route path="bitacora" element={<Bitacora />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route element={<RoleRoute allow={["dueño"]} />}>
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="ventas" element={<Ventas />} />
                <Route path="estadisticas" element={<Estadisticas />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
