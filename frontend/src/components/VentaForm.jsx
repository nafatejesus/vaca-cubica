const VentaForm = ({values, onChange, bovinos = [], clientes = []}) => {
  return (
    <>
      <div className="form-row">
        <label>
          Bovino (ID)
          <select
            value={values.idBovino}
            onChange={(e) => onChange("idBovino", e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {bovinos.map((b) => (
              <option key={b.codigo} value={b.codigo}>
                {b.codigo} — {b.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Cliente (Nombre / Empresa)
          <select
            value={values.idCliente}
            onChange={(e) => onChange("idCliente", e.target.value)}
          >
            <option value="">Buscar Cliente...</option>
            {clientes.map((c) => (
              <option key={c.idCliente} value={c.idCliente}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Tipo de Transacción
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="tipoTransaccion"
                checked={values.categoria === "Venta"}
                onChange={() => onChange("categoria", "Venta")}
              />
              Venta
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="tipoTransaccion"
                checked={values.categoria === "Renta"}
                onChange={() => onChange("categoria", "Renta")}
              />
              Renta
            </label>
          </div>
        </label>
        <label>
          Fecha de Transacción
          <input
            type="date"
            value={values.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </label>
      </div>

      <label>
        Monto (en $)
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={values.amount}
          onChange={(e) => onChange("amount", e.target.value)}
        />
      </label>

      <label>
        Comentarios / Notas
        <textarea
          placeholder="Añade observaciones sobre la transacción..."
          value={values.notas || ""}
          onChange={(e) => onChange("notas", e.target.value)}
        />
      </label>
    </>
  );
};

export default VentaForm;
