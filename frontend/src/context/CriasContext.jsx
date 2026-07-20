import {createContext, useContext, useState} from "react";

const CriasContext = createContext(null);

const initialCrias = [
  {
    id: 1,
    codigo: "CRI-001",
    nombre: "Cría A",
    sexo: "Macho",
    madre: "B-001",
    fechaNacimiento: "2023-01-15",
    pesoNacimiento: "38 kg",
    pesoActual: "112 kg",
    estado: "Desarrollo",
  },
  {
    id: 2,
    codigo: "CRI-002",
    nombre: "Cría B",
    sexo: "Hembra",
    madre: "B-002",
    fechaNacimiento: "2023-01-20",
    pesoNacimiento: "38 kg",
    pesoActual: "95 kg",
    estado: "Destete",
  },
];

export const CriasProvider = ({children}) => {
  const [crias, setCrias] = useState(initialCrias);

  const addCriaFromNacimiento = ({madre, sexo, peso, fecha}) => {
    setCrias((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1;
      const codigo = `CRI-${String(nextId).padStart(3, "0")}`;
      return [
        ...prev,
        {
          id: nextId,
          codigo,
          nombre: "Sin nombre",
          sexo,
          madre,
          fechaNacimiento: fecha,
          pesoNacimiento: peso,
          pesoActual: peso,
          estado: "Lactante",
        },
      ];
    });
  };

  return (
    <CriasContext.Provider value={{crias, setCrias, addCriaFromNacimiento}}>
      {children}
    </CriasContext.Provider>
  );
};

export const useCrias = () => {
  const ctx = useContext(CriasContext);
  if (!ctx) throw new Error("useCrias debe usarse dentro de <CriasProvider>");
  return ctx;
};
