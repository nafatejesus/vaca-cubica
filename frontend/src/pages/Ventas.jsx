import {useState} from "react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Toast from "../components/Toast"; // NUEVO

const columns = [
  {key: "idTransaccion", label: "ID Transacción"},
  {key: "idBovino", label: "ID Bovino"},
  {key: "nombreCliente", label: "Nombre Cliente"},
  {key: "categoria", label: "Categoría"},
  {key: "amount", label: "Amount"},
  {key: "date", label: "Date"},
];

const Ventas = () => {
  const [ventas, setVentas] = useState([
    {
      id: 1,
      idTransaccion: "TX-001",
      idBovino: "VC-101",
      nombreCliente: "Agro El Sol",
      categoria: "Venta",
      amount: "$5,500.00",
      date: "20/05/2024",
    },
    {
      id: 2,
      idTransaccion: "TX-002",
      idBovino: "VC-102",
      nombreCliente: "Agro El Sol",
      categoria: "Venta",
      amount: "$6,000.00",
      date: "20/05/2024",
    },
    {
      id: 3,
      idTransaccion: "TX-003",
      idBovino: "VC-103",
      nombreCliente: "Agro El Sol",
      categoria: "Venta",
      amount: "$7,000.00",
      date: "20/05/2024",
    },
    {
      id: 4,
      idTransaccion: "TX-004",
      idBovino: "VC-104",
      nombreCliente: "Agro El Sol",
      categoria: "Venta",
      amount: "$8,000.00",
      date: "20/05/2024",
    },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toast, setToast] = useState(null); // NUEVO: { message, type }

  const handleEdit = (row) => setEditingRow(row);

  const handleDeleteClick = (row) => setRowToDelete(row);

  const handleConfirmDelete = () => {
    setVentas((prev) => prev.filter((v) => v.id !== rowToDelete.id));
    setRowToDelete(null);
    setToast({message: "Registro eliminado correctamente", type: "success"}); // NUEVO
  };

  const handleChange = (field, value) => {
    setEditingRow((prev) => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    setVentas((prev) =>
      prev.map((v) => (v.id === editingRow.id ? editingRow : v)),
    );
    setEditingRow(null);
    setToast({message: "Cambios guardados correctamente", type: "success"}); // NUEVO
  };

  return (
    <div>
      <h1>Ventas</h1>
      <p>Registro de ventas y transacciones</p>

      <div style={{display: "flex", gap: "1rem", marginTop: "1.5rem"}}>
        <Button icon="+">Registrar Venta o Renta de Bovino</Button>
        <Button icon="+">Registrar Catálogo de Clientes</Button>
      </div>

      <h3 style={{marginTop: "2rem"}}>
        Listado General de Movimientos y Clientes
      </h3>

      <DataTable
        columns={columns}
        data={ventas}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <Modal
        isOpen={!!editingRow}
        onClose={() => setEditingRow(null)}
        title="Editar Venta"
      >
        {editingRow && (
          <>
            <label>
              ID Bovino
              <input
                value={editingRow.idBovino}
                onChange={(e) => handleChange("idBovino", e.target.value)}
              />
            </label>
            <label>
              Nombre Cliente
              <input
                value={editingRow.nombreCliente}
                onChange={(e) => handleChange("nombreCliente", e.target.value)}
              />
            </label>
            <label>
              Amount
              <input
                value={editingRow.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </label>
            <Button onClick={handleSave}>Guardar cambios</Button>
          </>
        )}
      </Modal>

      <ConfirmDeleteModal
        isOpen={!!rowToDelete}
        onClose={() => setRowToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemLabel="registro de venta"
        itemName={rowToDelete?.nombreCliente}
        itemId={rowToDelete?.idTransaccion}
        itemType={rowToDelete?.categoria}
      />

      {/* NUEVO: Toast */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Ventas;
