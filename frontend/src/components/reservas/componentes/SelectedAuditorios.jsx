import { Trash } from "lucide-react";

function SelectedAuditorios({ auditorios, onRemove }) {
  if (auditorios.length === 0) return null;

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {auditorios.map((mat) => (
        <div key={mat._id} className="bg-card p-4 mt-4 rounded-xl shadow-lg">
          <button
            onClick={() => onRemove(mat._id)}
            className="flex items-center gap-2 text-error cursor-pointer"
          >
            <Trash size={20} /> Eliminar
          </button>
          <p className="font-semibold">{mat.nombre}</p>
          <p>Código: {mat.codigo}</p>
          <p>Créditos: {mat.creditos}</p>
        </div>
      ))}
    </div>
  );
}

export default SelectedAuditorios;
