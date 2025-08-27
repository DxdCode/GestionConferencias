import { Newspaper, Binoculars, Pencil, Trash } from 'lucide-react';

function Card() {
  const cards = [
    {
      id: 1,
      dato: "Conferencistas",
      bg: "bg-blue-600",         
      iconColor: "text-white"
    },
    {
      id: 2,
      dato: "Auditorios",
      bg: "bg-indigo-500",       
      iconColor: "text-white"
    },
    {
      id: 3,
      dato: "Reservas",
      bg: "bg-green-600",         
      iconColor: "text-white"
    }
  ];

  return (
    <div className="flex flex-col w-full p-8 md:p-8">
      <h2 className="text-2xl font-bold m-6 text-center text-gray-900">¿Qué puedes hacer?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {cards.map(card => (
          <div
            key={card.id}
            className={`flex flex-col gap-4 shadow-lg w-full hover:scale-102 transition-transform duration-300 cursor-pointer rounded-4xl`}
          >
            <h3 className={`${card.bg} ${card.iconColor} text-center py-3 font-bold rounded-t-lg`}>
              CRUD de {card.dato}
            </h3>

            <div className="flex flex-col gap-3 p-4 bg-gray-50">
              <div className="flex items-center gap-3 text-gray-900">
                <Newspaper size={20} className="text-gray-600" /> Crear {card.dato}
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Binoculars size={20} className="text-gray-600" /> Visualizar {card.dato}
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Pencil size={20} className="text-gray-600" /> Editar {card.dato}
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Trash size={20} className="text-gray-600" /> Eliminar {card.dato}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
