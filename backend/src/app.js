import express from 'express'
import dotenv from 'dotenv'
import routerUsuario from './routers/UsuarioRouter.js'
import cors from 'cors'
const app = express()
dotenv.config()


app.use(express.json())

app.set('port', process.env.PORT || 3000)
app.use(cors())

app.get('/', (req, res) => {
    res.send('El servidor de Gestión de de Conferencias')
})

app.use(routerUsuario)

app.use((req,res) =>{
    res.status(404).json({msg:"Endpoint no encontrado vuelve a intentarlo"})
})

export default app 