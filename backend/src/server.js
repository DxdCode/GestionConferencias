import app from "./app";

app.listen(app.get('port'),()=>{
    console.log("El servidor está corriendo en el puerto", app.get('port'))
})