import express from 'express';
//IMPORTAR RUTAS
import { rutaProducto } from './routes/productos.js';
import { rutaCarrito } from './routes/carrito.js';
const app = express();
const port = process.env.PORT || 8080;

//LINEAS USO DE JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', rutaProducto);
app.use('/api/carrito', rutaCarrito);

app.use((req, res, next) => {
    if (!req.route) {
        res.status(404).send({ error: -2, descr: `No se encuentra la ruta ${req.url}`});
    } else {
        next();
    }
})

const server = app.listen(port, () => {
    console.log(`Server listening: ${server.address().port}`)
});
server.on('error', error => console.log(`error ${error}`));