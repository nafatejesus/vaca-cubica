import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BovinosProvider} from "./context/BovinosContext";
import {ClientesProvider} from "./context/ClientesContext";
import {RazasProvider} from "./context/RazasContext";
import {CriasProvider} from "./context/CriasContext";
import {AlimentosProvider} from "./context/AlimentosContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BovinosProvider>
      <ClientesProvider>
        <RazasProvider>
          <CriasProvider>
            <AlimentosProvider>
              <App />
            </AlimentosProvider>
          </CriasProvider>
        </RazasProvider>
      </ClientesProvider>
    </BovinosProvider>
  </StrictMode>,
);
