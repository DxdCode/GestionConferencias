import app from "./app.js";
import connection from "./database.js";

app.listen(app.get('port'),()=>{
    console.log("El servidor está corriendo en el puerto", app.get('port'))
})

connection();