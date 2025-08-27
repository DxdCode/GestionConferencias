import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Plus } from "lucide-react";

import useMatricula from "../../hooks/useReservas";
import useMateria from "../../hooks/useReservas";
import useEstudiantes from "../../hooks/useConferencistas";

import FormMatricula from "./componentes/FormMatricula";
import ModalSelector from "./componentes/ModalSelector";
import CardItem from "./componentes/CardItem";
import SelectedEstudiante from "./componentes/SelectEstudiante";
import SelectedMaterias from "./componentes/SelectMaterias";

function CrearMatricula() {
  const { crearMatricula, loading } = useMatricula();
  const { materia } = useMateria();
  const { estudiantes } = useEstudiantes();
  const navigate = useNavigate();

  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [selectMateria, setSelectMateria] = useState([]);
  const [isOpenEstudiante, setIsOpenEstudiante] = useState(false);
  const [isOpenMaterias, setIsOpenMaterias] = useState(false);

  // Handlers estudiante
  const handleClickEstudiante = (est) => setSelectedEstudiante(est);
  const handleEliminarEstudiante = () => setSelectedEstudiante(null);

  // Handlers materia
  const handleClickMateria = (mat) => {
    setSelectMateria((prev) => {
      if (prev.some((m) => m._id === mat._id)) {
        toast.error("Ya agregaste esa materia");
        return prev;
      }
      return [...prev, mat];
    });
  };
  const handleEliminarMateria = (id) =>
    setSelectMateria((prev) => prev.filter((m) => m._id !== id));

  // Submit
  const crearMatriculaData = (data) => {
    const submitData = {
      ...data,
      estudiante: selectedEstudiante?._id,
      materia: selectMateria.map((m) => m._id),
    };

    crearMatricula(submitData, () => {
      setSelectMateria([]);
      setSelectedEstudiante(null);
      setTimeout(() => navigate("/dashboard/matriculas/gestionar"), 2000);
    });
  };

  return (
    <section>
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-2 text-sec">Crear Matrícula</h2>

      {/* Formulario */}
      <FormMatricula onSubmit={crearMatriculaData} loading={loading} />

      {/* Botones de abrir modales */}
      <div className="flex gap-4 my-4">
        <button
          type="button"
          onClick={() => setIsOpenEstudiante(true)}
          className="bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded hover:bg-blue-600 transition"
        >
          <Plus size={20} /> Agregar Estudiante
        </button>
        <button
          type="button"
          onClick={() => setIsOpenMaterias(true)}
          className="bg-blue-500 px-4 py-2 flex items-center gap-2 text-white rounded hover:bg-blue-600 transition"
        >
          <Plus size={20} /> Agregar Materia
        </button>
      </div>

      {/* Estudiante seleccionado */}
      <SelectedEstudiante
        estudiante={selectedEstudiante}
        onRemove={handleEliminarEstudiante}
      />

      {/* Materias seleccionadas */}
      <SelectedMaterias materias={selectMateria} onRemove={handleEliminarMateria} />

      {/* Modal Estudiantes */}
      <ModalSelector
        isOpen={isOpenEstudiante}
        onClose={() => setIsOpenEstudiante(false)}
        title="Lista de Estudiantes"
        items={estudiantes}
        renderItem={(est) => (
          <CardItem
            key={est._id}
            item={est}
            type="estudiante"
            onClick={handleClickEstudiante}
            isSelected={selectedEstudiante?._id === est._id}
          />
        )}
      />

      {/* Modal Materias */}
      <ModalSelector
        isOpen={isOpenMaterias}
        onClose={() => setIsOpenMaterias(false)}
        title="Lista de Materias"
        items={materia}
        renderItem={(mat) => (
          <CardItem
            key={mat._id}
            item={mat}
            type="materia"
            onClick={handleClickMateria}
            isSelected={selectMateria.some((m) => m._id === mat._id)} // ✅ fix
          />
        )}
      />

    </section>
  );
}

export default CrearMatricula;
