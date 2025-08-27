import {Router} from 'express'
import { actualizarAuditorio, crearAuditorio, eliminarAuditorio, visualizarAuditorio } from '../controllers/AuditorioController.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';
const router = Router()


router.post("/auditorio", verificarTokenJWT, crearAuditorio);
router.get("/auditorio",verificarTokenJWT, visualizarAuditorio);
router.put("/auditorio/:id", verificarTokenJWT,actualizarAuditorio);
router.delete("/auditorio/:id", verificarTokenJWT, eliminarAuditorio);


export default router
