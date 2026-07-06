import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Bovinos from "./pages/Bovinos";
import Bitacora from "./pages/Bitacora";
import Catalogo from "./pages/Catalogo";
import Ventas from "./pages/Ventas";
import Estadisticas from "./pages/Estadisticas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            ZONA DESMILITARIZADA (Pública)
            Vistas que no requieren el HUD (Layout) ni sesión activa
           ========================================= */}
        <Route path="/login" element={<Login />} />

        {/* =========================================
            ZONA SEGURA (Privada)
            Todas estas rutas renderizan el Sidebar y se inyectan en el <Outlet />
           ========================================= */}
        <Route path="/" element={<Layout />}>
          {/* 'index' indica que es la ruta por defecto al entrar a '/' */}
          <Route index element={<Inicio />} />

          <Route path="bovinos" element={<Bovinos />} />
          <Route path="bitacora" element={<Bitacora />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="estadisticas" element={<Estadisticas />} />
        </Route>

        {/* =========================================
            MANEJO DE EXCEPCIONES (Catch-all)
            Si el usuario escribe una URL que no existe, lo expulsa a la raíz
           ========================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
