import {createContext, useContext, useState} from "react";

const BovinosContext = createContext(null);

const initialBovinos = [
  {
    id: 1,
    codigo: "B-001",
    nombre: "Esperanza",
    tipoRaza: "Holstein",
    sexo: "Hembra",
    edad: "3 años",
    peso: "450 kg",
    estado: "Saludable",
  },
  {
    id: 2,
    codigo: "B-002",
    nombre: "Tornado",
    tipoRaza: "Brahman",
    sexo: "Macho",
    edad: "5 años",
    peso: "620 kg",
    estado: "Saludable",
  },
  {
    id: 3,
    codigo: "B-003",
    nombre: "Luna",
    tipoRaza: "Simmental",
    sexo: "Hembra",
    edad: "2 años",
    peso: "380 kg",
    estado: "En Observación",
  },
  {
    id: 4,
    codigo: "B-004",
    nombre: "Dulce",
    tipoRaza: "Angus",
    sexo: "Hembra",
    edad: "4 años",
    peso: "480 kg",
    estado: "Enfermo",
  },
  {
    id: 5,
    codigo: "B-005",
    nombre: "Fuerte",
    tipoRaza: "Brahman",
    sexo: "Macho",
    edad: "6 años",
    peso: "680 kg",
    estado: "Saludable",
  },
];

export const BovinosProvider = ({children}) => {
  const [bovinos, setBovinos] = useState(initialBovinos);

  const getBovinoByCodigo = (codigo) => {
    const found = bovinos.find((b) => b.codigo === codigo);
    return found || {nombre: "—", tipoRaza: "—"};
  };

  return (
    <BovinosContext.Provider value={{bovinos, setBovinos, getBovinoByCodigo}}>
      {children}
    </BovinosContext.Provider>
  );
};

export const useBovinos = () => {
  const ctx = useContext(BovinosContext);
  if (!ctx)
    throw new Error("useBovinos debe usarse dentro de <BovinosProvider>");
  return ctx;
};
