import {createContext, useContext, useState} from "react";

const AlimentosContext = createContext(null);

const initialAlimentos = [
  {
    id: 1,
    codigo: "ALI-001",
    nombre: "Forraje verde",
    tipo: "Forraje",
    proveedor: "Agroinsumos del Valle",
    costoUnitario: "$3.50/kg",
    estado: "Activa",
  },
  {
    id: 2,
    codigo: "ALI-002",
    nombre: "Concentrado 18% PC",
    tipo: "Concentrado",
    proveedor: "Nutrimentos SA",
    costoUnitario: "$8.20/kg",
    estado: "Activa",
  },
];

export const AlimentosProvider = ({children}) => {
  const [alimentos, setAlimentos] = useState(initialAlimentos);

  return (
    <AlimentosContext.Provider value={{alimentos, setAlimentos}}>
      {children}
    </AlimentosContext.Provider>
  );
};

export const useAlimentos = () => {
  const ctx = useContext(AlimentosContext);
  if (!ctx)
    throw new Error("useAlimentos debe usarse dentro de <AlimentosProvider>");
  return ctx;
};
