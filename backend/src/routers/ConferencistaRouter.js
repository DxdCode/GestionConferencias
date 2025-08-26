import {Router} from 'express'
import { actualizarConferencista, crearConferencista, eliminarConferencista, visualizarConferencista } from '../controllers/ConferencistasController';
import { verificarTokenJWT } from '../middlewares/JWT';

const router = Router()

router.post("/conferencista", verificarTokenJWT, crearConferencista);
router.get("/conferencista", verificarTokenJWT,visualizarConferencista);
router.put("/conferencista/:id", verificarTokenJWT, actualizarConferencista);
router.delete("/conferencista/:id",verificarTokenJWT, eliminarConferencista);


export default router