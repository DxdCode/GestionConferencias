
import {Router} from 'express'
import { actualizarReserva, crearReserva, eliminarReserva, visualizarReservas } from '../controllers/ReservasContoller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router()

router.post("/reserva", verificarTokenJWT, crearReserva);
router.get("/reserva", verificarTokenJWT, visualizarReservas);
router.put("/reserva/:id", verificarTokenJWT, actualizarReserva);
router.delete("/reserva/:id", verificarTokenJWT, eliminarReserva);

export default router