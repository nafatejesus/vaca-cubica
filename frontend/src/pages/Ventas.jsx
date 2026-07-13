import {useState, useMemo} from "react";
import {User, ArrowRight} from "lucide-react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Toast from "../components/Toast";
import Tabs from "../components/Tabs";
import FilterBar from "../components/FilterBar";
import VentaForm from "../components/VentaForm";
import ClienteForm from "../components/ClienteForm";
import {useBovinos} from "../context/BovinosContext";
import {useClientes} from "../context/ClientesContext";
import "./Ventas.css";

const ventaColumns = (getClienteById) => [
  {key: "idTransaccion", label: "ID Transacción"},
  {key: "idBovino", label: "ID Bovino"},
  {
    key: "cliente",
    label: "Nombre Cliente",
    render: (row) => getClienteById(row.idCliente).nombre,
  },
  {key: "categoria", label: "Categoría"},
  {key: "Costo", label: "Costo"},
  {key: "Fecha", label: "Fecha"},
];

const clienteColumns = [
  {key: "idCliente", label: "ID Cliente"},
  {key: "nombre", label: "Nombre / Empresa"},
  {key: "tipo", label: "Tipo"},
  {key: "telefono", label: "Teléfono"},
  {key: "correo", label: "Correo"},
];

const emptyVenta = {
  idBovino: "",
  idCliente: "",
  categoria: "Venta",
  Costo: "",
  Fecha: "",
  notas: "",
};

const emptyCliente = {
  nombre: "",
  rfc: "",
  tipo: "",
  direccion: "",
  telefono: "",
  correo: "",
  notas: "",
};

const filterConfig = {
  movimientos: {
    placeholder: "Buscar por cliente, ID de transacción...",
    filters: [
      {key: "categoria", placeholder: "Categoría", options: ["Venta", "Renta"]},
    ],
  },
  clientes: {
    placeholder: "Buscar por nombre, correo...",
    filters: [
      {
        key: "tipo",
        placeholder: "Tipo",
        options: ["Agro", "Particular", "Distribuidor"],
      },
    ],
  },
};

const Ventas = () => {
  const {bovinos} = useBovinos();
  const {clientes, setClientes, getClienteById} = useClientes();

  const [activeTab, setActiveTab] = useState("movimientos");

  const [ventas, setVentas] = useState([
    {
      id: 1,
      idTransaccion: "TX-001",
      idBovino: "B-001",
      idCliente: "CLI-001",
      categoria: "Venta",
      Costo: "$5,500.00",
      Fecha: "20/05/2024",
    },
    {
      id: 2,
      idTransaccion: "TX-002",
      idBovino: "B-002",
      idCliente: "CLI-001",
      categoria: "Venta",
      Costo: "$6,000.00",
      Fecha: "20/05/2024",
    },
    {
      id: 3,
      idTransaccion: "TX-003",
      idBovino: "B-003",
      idCliente: "CLI-001",
      categoria: "Venta",
      Costo: "$7,000.00",
      Fecha: "20/05/2024",
    },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const [showVentaModal, setShowVentaModal] = useState(false);
  const [newVenta, setNewVenta] = useState(emptyVenta);

  const [showClienteModal, setShowClienteModal] = useState(false);
  const [newCliente, setNewCliente] = useState(emptyCliente);

  const [editingCliente, setEditingCliente] = useState(null);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});

  const tabs = [
    {key: "movimientos", label: "Movimientos", count: ventas.length},
    {key: "clientes", label: "Clientes", count: clientes.length},
  ];

  const filteredVentas = useMemo(() => {
    let result = ventas;
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(term),
          ) ||
          getClienteById(row.idCliente).nombre.toLowerCase().includes(term),
      );
    }
    if (filterValues.categoria) {
      result = result.filter((row) => row.categoria === filterValues.categoria);
    }
    return result;
  }, [ventas, search, filterValues, getClienteById]);

  const filteredClientes = useMemo(() => {
    let result = clientes;
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(term),
        ),
      );
    }
    if (filterValues.tipo) {
      result = result.filter((row) => row.tipo === filterValues.tipo);
    }
    return result;
  }, [clientes, search, filterValues]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearch("");
    setFilterValues({});
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({...prev, [key]: value}));
  };

  const handleEdit = (row) => setEditingRow(row);
  const handleDeleteClick = (row) => setRowToDelete(row);

  const handleConfirmDelete = () => {
    setVentas((prev) => prev.filter((v) => v.id !== rowToDelete.id));
    setRowToDelete(null);
    setToast({message: "Registro eliminado correctamente", type: "success"});
  };

  const handleChange = (field, value) => {
    setEditingRow((prev) => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    setVentas((prev) =>
      prev.map((v) => (v.id === editingRow.id ? editingRow : v)),
    );
    setEditingRow(null);
    setToast({message: "Cambios guardados correctamente", type: "success"});
  };

  const handleNewVentaChange = (field, value) => {
    setNewVenta((prev) => ({...prev, [field]: value}));
  };

  const handleCreateVenta = () => {
    const nextId = ventas.length ? Math.max(...ventas.map((v) => v.id)) + 1 : 1;
    const idTransaccion = `TX-${String(nextId).padStart(3, "0")}`;

    setVentas((prev) => [...prev, {id: nextId, idTransaccion, ...newVenta}]);
    setNewVenta(emptyVenta);
    setShowVentaModal(false);
    setToast({message: "Venta registrada correctamente", type: "success"});
  };

  const handleNewClienteChange = (field, value) => {
    setNewCliente((prev) => ({...prev, [field]: value}));
  };

  const handleCreateCliente = () => {
    const nextId = clientes.length
      ? Math.max(...clientes.map((c) => c.id)) + 1
      : 1;
    const idCliente = `CLI-${String(nextId).padStart(3, "0")}`;

    setClientes((prev) => [...prev, {id: nextId, idCliente, ...newCliente}]);
    setNewCliente(emptyCliente);
    setShowClienteModal(false);
    setToast({message: "Cliente registrado correctamente", type: "success"});
  };

  const handleEditCliente = (row) => setEditingCliente(row);

  const handleChangeCliente = (field, value) => {
    setEditingCliente((prev) => ({...prev, [field]: value}));
  };

  const handleSaveCliente = () => {
    setClientes((prev) =>
      prev.map((c) => (c.id === editingCliente.id ? editingCliente : c)),
    );
    setEditingCliente(null);
    setToast({message: "Cliente actualizado correctamente", type: "success"});
  };

  const handleDeleteClienteClick = (row) => setClienteToDelete(row);

  const handleConfirmDeleteCliente = () => {
    setClientes((prev) => prev.filter((c) => c.id !== clienteToDelete.id));
    setClienteToDelete(null);
    setToast({message: "Cliente eliminado correctamente", type: "success"});
  };

  return (
    <div>
      <div className="ventas-header-top">
        <div>
          <h1>Ventas</h1>
          <p>Registro de ventas y transacciones</p>
        </div>
      </div>

      <div style={{display: "flex", gap: "1rem", marginTop: "1.5rem"}}>
        <Button icon="+" onClick={() => setShowVentaModal(true)}>
          Registrar Venta o Renta de Bovino
        </Button>
        <Button icon="+" onClick={() => setShowClienteModal(true)}>
          Registrar Catálogo de Clientes
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={filterConfig[activeTab].placeholder}
        filters={filterConfig[activeTab].filters}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
      />

      {activeTab === "movimientos" && (
        <div className="ventas-card">
          <div className="ventas-card-header">
            <h3>
              Listado General de Movimientos{" "}
              <span>— {filteredVentas.length} registros</span>
            </h3>
          </div>
          <DataTable
            columns={ventaColumns(getClienteById)}
            data={filteredVentas}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === "clientes" && (
        <div className="ventas-card">
          <div className="ventas-card-header">
            <h3>
              Catálogo de Clientes{" "}
              <span>— {filteredClientes.length} registros</span>
            </h3>
          </div>
          <DataTable
            columns={clienteColumns}
            data={filteredClientes}
            onEdit={handleEditCliente}
            onDelete={handleDeleteClienteClick}
          />
        </div>
      )}

      <Modal
        isOpen={!!editingRow}
        onClose={() => setEditingRow(null)}
        title="Editar Venta"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditingRow(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} iconRight={<ArrowRight size={16} />}>
              Guardar
            </Button>
          </>
        }
      >
        {editingRow && (
          <VentaForm
            values={editingRow}
            onChange={handleChange}
            bovinos={bovinos}
            clientes={clientes}
          />
        )}
      </Modal>

      <Modal
        isOpen={showVentaModal}
        onClose={() => setShowVentaModal(false)}
        title="Registrar Venta o Renta de Bovino"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowVentaModal(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateVenta}
              iconRight={<ArrowRight size={16} />}
            >
              Guardar
            </Button>
          </>
        }
      >
        <VentaForm
          values={newVenta}
          onChange={handleNewVentaChange}
          bovinos={bovinos}
          clientes={clientes}
        />
      </Modal>

      <Modal
        isOpen={showClienteModal}
        onClose={() => setShowClienteModal(false)}
        title="Añadir Nuevo Cliente al Catálogo"
        subtitle="Complete los datos del cliente o empresa"
        icon={<User size={16} />}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowClienteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCliente}
              icon={<User size={16} />}
              iconRight={<ArrowRight size={16} />}
            >
              Crear
            </Button>
          </>
        }
      >
        <ClienteForm values={newCliente} onChange={handleNewClienteChange} />
      </Modal>

      <Modal
        isOpen={!!editingCliente}
        onClose={() => setEditingCliente(null)}
        title="Editar Cliente"
        subtitle="Actualiza los datos del cliente o empresa"
        icon={<User size={16} />}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditingCliente(null)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveCliente}
              iconRight={<ArrowRight size={16} />}
            >
              Guardar
            </Button>
          </>
        }
      >
        {editingCliente && (
          <ClienteForm values={editingCliente} onChange={handleChangeCliente} />
        )}
      </Modal>

      <ConfirmDeleteModal
        isOpen={!!rowToDelete}
        onClose={() => setRowToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemLabel="registro de venta"
        itemName={getClienteById(rowToDelete?.idCliente).nombre}
        itemId={rowToDelete?.idTransaccion}
        itemType={rowToDelete?.categoria}
      />

      <ConfirmDeleteModal
        isOpen={!!clienteToDelete}
        onClose={() => setClienteToDelete(null)}
        onConfirm={handleConfirmDeleteCliente}
        itemLabel="registro de cliente"
        itemName={clienteToDelete?.nombre}
        itemId={clienteToDelete?.idCliente}
        itemType={clienteToDelete?.tipo}
      />

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Ventas;
