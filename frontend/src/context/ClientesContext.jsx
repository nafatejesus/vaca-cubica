import {createContext, useContext, useState} from "react";

const ClientesContext = createContext(null);

const initialClientes = [
  {
    id: 1,
    idCliente: "CLI-001",
    nombre: "Agro El Sol",
    tipo: "Agro",
    telefono: "614-123-4567",
    correo: "contacto@agroelsol.com",
  },
];

export const ClientesProvider = ({children}) => {
  const [clientes, setClientes] = useState(initialClientes);

  const getClienteById = (idCliente) => {
    const found = clientes.find((c) => c.idCliente === idCliente);
    return found || {nombre: "—", tipo: "—"};
  };

  return (
    <ClientesContext.Provider value={{clientes, setClientes, getClienteById}}>
      {children}
    </ClientesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useClientes = () => {
  const ctx = useContext(ClientesContext);
  if (!ctx)
    throw new Error("useClientes debe usarse dentro de <ClientesProvider>");
  return ctx;
};
