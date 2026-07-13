import {useState, useMemo} from "react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Toast from "../components/Toast";
import StatCard from "../components/StatCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import DynamicForm from "../components/DynamicForm";
import {useBovinos} from "../context/BovinosContext";
import {useRazas} from "../context/RazasContext";
import BovinoIcon from "../assets/bovino.png";
import "./Bovinos.css";

const PAGE_SIZE = 5;

const animalRender = (row) => (
  <div className="bovino-cell">
    <span className="bovino-avatar">
      <img src={BovinoIcon} alt="Bovino" style={{width: 18, height: 18}} />
    </span>
    <div>
      <div className="bovino-name">{row.nombre}</div>
      <div className="bovino-code">{row.codigo}</div>
    </div>
  </div>
);

const columns = [
  {key: "nombre", label: "Animal", render: animalRender},
  {key: "tipoRaza", label: "Raza"},
  {key: "sexo", label: "Sexo", badge: true},
  {key: "edad", label: "Edad"},
  {key: "peso", label: "Peso"},
  {key: "estado", label: "Estado", badge: true},
];

const emptyBovino = {
  nombre: "",
  codigo: "",
  tipoRaza: "",
  sexo: "",
  edad: "",
  peso: "",
  estado: "",
};

const Bovinos = () => {
  const {bovinos, setBovinos} = useBovinos();
  const {razas} = useRazas();

  const formFields = [
    {key: "nombre", label: "Nombre"},
    {key: "codigo", label: "Código", placeholder: "B-006"},
    {
      key: "tipoRaza",
      label: "Raza",
      type: "select",
      options: razas.map((r) => r.nombre),
    },
    {key: "sexo", label: "Sexo", type: "select", options: ["Macho", "Hembra"]},
    {key: "edad", label: "Edad", placeholder: "3 años"},
    {key: "peso", label: "Peso", placeholder: "450 kg"},
    {
      key: "estado",
      label: "Estado",
      type: "select",
      options: ["Saludable", "En Observación", "Enfermo"],
    },
  ];

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newItem, setNewItem] = useState(emptyBovino);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const filters = [
    {key: "sexo", placeholder: "Sexo", options: ["Macho", "Hembra"]},
    {
      key: "estado",
      placeholder: "Estado",
      options: ["Saludable", "En Observación", "Enfermo"],
    },
  ];

  const filteredData = useMemo(() => {
    let result = bovinos;
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(term),
        ),
      );
    }
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) result = result.filter((row) => row[key] === value);
    });
    return result;
  }, [bovinos, search, filterValues]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const pageData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = [
    {label: "Total Animales", value: bovinos.length, variant: "neutral"},
    {
      label: "Saludables",
      value: bovinos.filter((b) => b.estado === "Saludable").length,
      variant: "info",
    },
    {
      label: "En Observación",
      value: bovinos.filter((b) => b.estado === "En Observación").length,
      variant: "warning",
    },
    {
      label: "Enfermos",
      value: bovinos.filter((b) => b.estado === "Enfermo").length,
      variant: "danger",
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({...prev, [key]: value}));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleOpenCreate = () => {
    setNewItem(emptyBovino);
    setShowCreateModal(true);
  };

  const handleNewItemChange = (field, value) => {
    setNewItem((prev) => ({...prev, [field]: value}));
  };

  const handleCreate = () => {
    const nextId = bovinos.length
      ? Math.max(...bovinos.map((b) => b.id)) + 1
      : 1;
    setBovinos((prev) => [...prev, {id: nextId, ...newItem}]);
    setShowCreateModal(false);
    setToast({message: "Bovino registrado correctamente", type: "success"});
  };

  const handleEdit = (row) => setEditingItem(row);

  const handleEditChange = (field, value) => {
    setEditingItem((prev) => ({...prev, [field]: value}));
  };

  const handleSaveEdit = () => {
    setBovinos((prev) =>
      prev.map((b) => (b.id === editingItem.id ? editingItem : b)),
    );
    setEditingItem(null);
    setToast({message: "Bovino actualizado correctamente", type: "success"});
  };

  const handleDeleteClick = (row) => setItemToDelete(row);

  const handleConfirmDelete = () => {
    setBovinos((prev) => prev.filter((b) => b.id !== itemToDelete.id));
    setItemToDelete(null);
    setToast({message: "Bovino eliminado correctamente", type: "success"});
  };

  return (
    <div>
      <div className="bovinos-header-top">
        <div>
          <h1>Registro de Animales</h1>
          <p>Gestión completa del inventario animal de la finca</p>
        </div>
        <Button icon="+" onClick={handleOpenCreate}>
          Agregar Bovino
        </Button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </div>

      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Buscar por nombre o código..."
        filters={filters}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
      />

      <div className="bovinos-card">
        <DataTable
          columns={columns}
          data={pageData}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filteredData.length}
          pageSize={PAGE_SIZE}
        />
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Agregar Bovino"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate}>Guardar</Button>
          </>
        }
      >
        <DynamicForm
          fields={formFields}
          values={newItem}
          onChange={handleNewItemChange}
        />
      </Modal>

      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Editar Bovino"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditingItem(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Guardar</Button>
          </>
        }
      >
        {editingItem && (
          <DynamicForm
            fields={formFields}
            values={editingItem}
            onChange={handleEditChange}
          />
        )}
      </Modal>

      <ConfirmDeleteModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemLabel="registro de bovino"
        itemName={itemToDelete?.nombre}
        itemId={itemToDelete?.codigo}
        itemType={itemToDelete?.tipoRaza}
      />

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Bovinos;
