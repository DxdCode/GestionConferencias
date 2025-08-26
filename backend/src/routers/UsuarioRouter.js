import {Router} from 'express'
import { crearUsuario, login } from '../controllers/UsuarioController.js'

const router = Router()

router.post('/login',login);
router.post('/usuario',crearUsuario)

export default router
