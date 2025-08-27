import { User,Speech ,FileCheck } from 'lucide-react'
import useAuditorios from '../hooks/useAuditorios'
import useConferencistas from '../hooks/useConferencistas'
import useReservas from '../hooks/useReservas'

function InformationCards() {
    const {conferencistas} = useConferencistas()
    const {auditorios} = useAuditorios()
    const {reservas} = useReservas()

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <User className="text-black w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Conferencistas</h3>
                <p className="text-2xl font-bold text-white mt-2">{conferencistas?.length ?? 0}</p>
            </div>

            {/* Card: Auditorios */}
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <Speech  className="text-black w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Auditorios</h3>
                <p className="text-2xl font-bold text-white mt-2">{auditorios?.length?? 0}</p>
            </div>

            {/* Card: Reservas */}
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <FileCheck className="text-black w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Reservas</h3>
                <p className="text-2xl font-bold text-white mt-2">{reservas?.length?? 0}</p>
            </div>
        </div>
    )
}

export default InformationCards
