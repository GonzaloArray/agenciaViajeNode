import express from 'express';
import db from './config/db.js';
import router from './routes/index.js';


const app = express();

// conectar la base de datos
db.authenticate()
    .then(()=> console.log("Base de datos conectada"))
    .catch(error => console.log(error))

const port = process.env.PORT || 3000;

// Habilitar pug -> template engine
app.set('view engine', 'pug');

// Vamos a crearnos nuestro propio middleware
// Vamos a obtener el año actual
app.use((req, res, next) => {

    const year = new Date()

    res.locals.newYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";
    return next();
})

// Parsear la informacion que enviamos --> esto es para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);


app.listen(port, () => {
    console.log(`Se creo correctamente en el puerto ${port}`)
})
