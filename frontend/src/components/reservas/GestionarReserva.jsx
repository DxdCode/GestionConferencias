import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useReservas from "../../hooks/useReservas";
import useAuditorios from "../../hooks/useAuditorios";
import FiltroBusqueda from "../../dashboard/FiltrarBusqueda";
import TablaReserva from "./TablaReserva";
import ModalGestionarReserva from "./componentes/ModalGestionarReserva";

function GestionarReserva() {
  const { reservas, loading, actualizarReserva, eliminarReserva } = useReservas();
  const { auditorios } = useAuditorios();

  const [busqueda, setBusqueda] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("codigo");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: "",
    auditorios: [],
  });

  useEffect(() => {
    if (editId) {
      const res = reservas.find((r) => r._id === editId);
      if (res) {
        setFormData({
          codigo: res.codigo || "",
          descripcion: res.descripcion || "",
          auditorios: res.auditorios.map((a) => a._id) || [],
        });
      }
    }
  }, [editId, reservas]);

  const handleEdit = (res) => setEditId(res._id);

  const handleUpdate = (e) => {
    e.preventDefault();
    actualizarReserva(editId, formData);
    setEditId(null);
  };

  const campos = [
    { value: "codigo", label: "Código" },
    { value: "descripcion", label: "Descripción" },
    { value: "auditorios", label: "Auditorios" },
    {
      value: "conferencista",
      label: "Conferencista",
      render: (conf) => `${conf?.nombre} ${conf?.apellido}`,
    },
  ];

  const reservasFiltradas = loading
    ? []
    : reservas.filter((res) => {
        if (!busqueda) return true;

        const campo = res[campoFiltro];

        if (typeof campo === "string" || typeof campo === "number") {
          return String(campo)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              busqueda
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            );
        }

        // Para auditorios
        if (Array.isArray(campo)) {
          const texto = campo.map((a) => a.nombre).join(" ");
          return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              busqueda
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            );
        }

        // Conferencista
        if (typeof campo === "object" && campo !== null) {
          const texto = `${campo.nombre || ""} ${campo.apellido || ""} ${
            campo.cedula || ""
          }`;
          return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              busqueda
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            );
        }

        return false;
      });

  return (
    <section className="px-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-sec">📌 Gestionar Reservas</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />
      <div className="hidden sm:grid sm:grid-cols-[100px_1fr_0.8fr_300px] px-6 py-3 text-sec text-sm gap-4">
        {campos.map((valor) => (
          <div key={valor.value} className="text-center">
            {valor.label}
          </div>
        ))}
      </div>
      <TablaReserva
        reservas={reservasFiltradas}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarReserva}
      />

      <ModalGestionarReserva
        editId={editId}
        setEditId={setEditId}
        formData={formData}
        setFormData={setFormData}
        auditoriosDisponibles={auditorios}
        handleSubmit={handleUpdate}
      />
    </section>
  );
}

export default GestionarReserva;
