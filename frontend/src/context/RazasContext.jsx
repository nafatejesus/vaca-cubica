/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState} from "react";

const RazasContext = createContext(null);

const initialRazas = [
  {
    id: 1,
    codigo: "RZ-001",
    nombre: "Angus",
    origen: "Escocia",
    tipo: "Cárnica",
    peso: "550 kg",
    resistencia: "Alta",
    descripcion: "Raza cárnica de élite, sin cuernos",
    estado: "Activa",
  },
  {
    id: 2,
    codigo: "RZ-002",
    nombre: "Hereford",
    origen: "Inglaterra",
    tipo: "Cárnica",
    peso: "520 kg",
    resistencia: "Alta",
    descripcion: "Raza rústica, buena conversión",
    estado: "Activa",
  },
  {
    id: 3,
    codigo: "RZ-003",
    nombre: "Holstein",
    origen: "Países Bajos",
    tipo: "Lechera",
    peso: "650 kg",
    resistencia: "Media",
    descripcion: "Mayor productora de leche",
    estado: "Activa",
  },
];

export const RazasProvider = ({children}) => {
  const [razas, setRazas] = useState(initialRazas);

  const getRazaByNombre = (nombre) => {
    const found = razas.find((r) => r.nombre === nombre);
    return found || {nombre: "—"};
  };

  return (
    <RazasContext.Provider value={{razas, setRazas, getRazaByNombre}}>
      {children}
    </RazasContext.Provider>
  );
};

export const useRazas = () => {
  const ctx = useContext(RazasContext);
  if (!ctx) throw new Error("useRazas debe usarse dentro de <RazasProvider>");
  return ctx;
};
