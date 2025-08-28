import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Plus } from "lucide-react";

import useReservas from "../../hooks/useReservas";
import useAuditorios from "../../hooks/useAuditorios";
import useConferencistas from "../../hooks/useConferencistas";

import FormReserva from "./componentes/FormReserva";
import ModalSelector from "./componentes/ModalSelector";
import CardItem from "./componentes/CardItem";
import SelectedConferencista from "./componentes/SelectConferencista";
import SelectedAuditorios from "./componentes/SelectedAuditorios";

function CrearReserva() {
  const { crearReserva, loading } = useReservas();
  const { auditorios } = useAuditorios();
  const { conferencistas } = useConferencistas();
  const navigate = useNavigate();

  const [selectedConferencista, setSelectedConferencista] = useState(null);
  const [selectedAuditorios, setSelectedAuditorios] = useState([]);
  const [isOpenConferencista, setIsOpenConferencista] = useState(false);
  const [isOpenAuditorios, setIsOpenAuditorios] = useState(false);

  // Handlers conferencista
  const handleClickConferencista = (conf) => setSelectedConferencista(conf);
  const handleEliminarConferencista = () => setSelectedConferencista(null);

  // Handlers auditorios
  const handleClickAuditorio = (aud) => {
    setSelectedAuditorios((prev) => {
      if (prev.some((a) => a._id === aud._id)) {
        toast.error("Ya agregaste ese auditorio");
        return prev;
      }
      return [...prev, aud];
    });
  };
  const handleEliminarAuditorio = (id) =>
    setSelectedAuditorios((prev) => prev.filter((a) => a._id !== id));

  // Submit
  const crearReservaData = (data) => {
    const submitData = {
      ...data,
      conferencista: selectedConferencista?._id,
      auditorios: selectedAuditorios.map((a) => a._id),
    };

    crearReserva(submitData, () => {
      setSelectedAuditorios([]);
      setSelectedConferencista(null);
      setTimeout(() => navigate("/dashboard/reservas/gestionar"), 2000);
    });
  };

  return (
    <section>
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-2 text-sec">Crear Reserva</h2>

      {/* Formulario */}
      <FormReserva onSubmit={crearReservaData} loading={loading} />

      {/* Botones de abrir modales */}
      <div className="flex gap-4 my-4">
        <button
          type="button"
          onClick={() => setIsOpenConferencista(true)}
          className="bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded hover:bg-blue-600 transition"
        >
          <Plus size={20} /> Agregar Conferencista
        </button>
        <button
          type="button"
          onClick={() => setIsOpenAuditorios(true)}
          className="bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded hover:bg-blue-600 transition"
        >
          <Plus size={20} /> Agregar Auditorio
        </button>
      </div>

      {/* Conferencista seleccionado */}
      <SelectedConferencista
        conferencista={selectedConferencista}
        onRemove={handleEliminarConferencista}
      />

      {/* Auditorios seleccionados */}
      <SelectedAuditorios
        auditorios={selectedAuditorios}
        onRemove={handleEliminarAuditorio}
      />

      {/* Modal Conferencistas */}
      <ModalSelector
        isOpen={isOpenConferencista}
        onClose={() => setIsOpenConferencista(false)}
        title="Lista de Conferencistas"
        items={conferencistas}
        renderItem={(conf) => (
          <CardItem
            key={conf._id}
            item={conf}
            type="conferencista"
            onClick={handleClickConferencista}
            isSelected={selectedConferencista?._id === conf._id}
          />
        )}
      />

      {/* Modal Auditorios */}
      <ModalSelector
        isOpen={isOpenAuditorios}
        onClose={() => setIsOpenAuditorios(false)}
        title="Lista de Auditorios"
        items={auditorios}
        renderItem={(aud) => (
          <CardItem
            key={aud._id}
            item={aud}
            type="auditorio"
            onClick={handleClickAuditorio}
            isSelected={selectedAuditorios.some((a) => a._id === aud._id)}
          />
        )}
      />
    </section>
  );
}

export default CrearReserva;
