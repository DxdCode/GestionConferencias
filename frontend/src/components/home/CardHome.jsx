import { Newspaper, Binoculars, Pencil, Trash } from 'lucide-react';

function Card() {
    const cards = [
        { id: 1, dato: "Estudiantes", color: "bg-card text-sec" },
        { id: 2, dato: "Materias", color: "bg-card text-sec" },
        { id: 3, dato: "Matrículas", color: "bg-card text-sec" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center w-full">
            {cards.map(card => (
                <div
                    key={card.id}
                    className={`flex flex-col gap-4 rounded-2xl shadow-lg w-3/4 md:w-full md:max-w-md overflow-hidden ${card.color} hover:scale-105 transition-transform duration-300 cursor-pointer`}
                >
                    <h2 className='bg-secondary text-white text-center py-3 font-bold'>
                        CRUD de {card.dato}
                    </h2>

                    {/* Contenido de la tarjeta */}
                    <div className="flex flex-col gap-4 p-5">
                        <div className="flex items-center gap-3 text-base md:text-lg">
                            <Newspaper size={20} className='text-blue-700' /> Crear {card.dato}
                        </div>
                        <div className="flex items-center gap-3 text-base md:text-lg">
                            <Binoculars size={20} className='text-green-600' /> Visualizar {card.dato}
                        </div>
                        <div className="flex items-center gap-3 text-base md:text-lg">
                            <Pencil size={20} className='text-yellow-500' /> Editar {card.dato}
                        </div>
                        <div className="flex items-center gap-3 text-base md:text-lg">
                            <Trash size={20} className='text-red-600' /> Eliminar {card.dato}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
