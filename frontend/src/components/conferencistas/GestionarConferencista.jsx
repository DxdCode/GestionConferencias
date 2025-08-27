import { useState } from "react";
import { ToastContainer } from "react-toastify";
import useConferencistas from "../../hooks/useConferencistas";
import FiltroBusqueda from "../../dashboard/FiltrarBusqueda";
import TablaConferencistas from "./TablaConferencista";
import ModalGestionar from "../../dashboard/ModalGestionar";

function GestionarConferencista() {
  const { conferencistas, loading, eliminarConferencistas, actualizarConferencistas } = useConferencistas();
  const [busqueda, setBusqueda] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("nombre");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    genero: "",
    ciudad: "",
    direccion: "",
    fecha_nacimiento: "",
    telefono: "",
    email: "",
    empresa: "",
  });

  const normalizar = (texto = "") =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const conferencistasFiltrados = conferencistas.filter((est) =>
    normalizar(est[campoFiltro] || "").includes(normalizar(busqueda))
  );

  const handleEdit = (conferencistas) => {
    setEditId(conferencistas._id);
    setFormData({ ...conferencistas });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    actualizarConferencistas(editId, formData);
    setEditId(null);
  };
  const campos = Object.keys(formData)
    .filter((key) => key !== "_id")
    .map((key) => ({
      value: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }));


  return (
    <section className="px-2">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-sec">📝 Gestionar Conferencistas</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />
      <div className="hidden sm:grid sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] text-sec py-2 px-4 ">
        {campos.map((campo) => (
          <div key={campo.value} className="truncate">
            {campo.label}
          </div>
        ))}
        <div className="truncate">Acciones</div>
      </div>

      <TablaConferencistas
        conferencistas={conferencistasFiltrados}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarConferencistas}
      />

      <ModalGestionar
        title="Editar Conferencista"
        editId={editId}
        setEditId={setEditId}
        formData={formData}
        handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleSubmit={handleUpdate}
      />
    </section>
  );
}

export default GestionarConferencista;
