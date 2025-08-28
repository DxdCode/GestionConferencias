import { Trash } from "lucide-react";

function SelectedConferencista({ conferencista, onRemove }) {
  if (!conferencista) return null;

  return (
    <div className="bg-card p-4 rounded-xl shadow-lg">
      <button onClick={onRemove} className="flex items-center gap-2 text-error cursor-pointer">
        <Trash size={20} /> Eliminar
      </button>
      <p className="font-semibold">{conferencista.nombre} {conferencista.apellido}</p>
      <p>{conferencista.email}</p>
      <p>Cédula: {conferencista.cedula}</p>
      <p>Teléfono: {conferencista.telefono}</p>
    </div>
  );
}

export default SelectedConferencista;
