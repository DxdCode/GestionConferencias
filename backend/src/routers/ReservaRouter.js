
import {Router} from 'express'
import { actualizarReserva, crearReserva, eliminarReserva, visualizarReservas, visualizarUnaReserva } from '../controllers/ReservasContoller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router()

router.post("/reserva", verificarTokenJWT, crearReserva);
router.get("/reserva", verificarTokenJWT, visualizarReservas);
router.get("/reserva/:id", verificarTokenJWT, visualizarUnaReserva);

router.put("/reserva/:id", verificarTokenJWT, actualizarReserva);
router.delete("/reserva/:id", verificarTokenJWT, eliminarReserva);

export default router