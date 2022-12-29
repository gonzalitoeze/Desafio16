import express from 'express';
const rutaCarrito = express.Router();
// import { Contenedor } from '../Contenedor/ContenedorFs.js';
import { productos, carritos } from '../daos/index.js';


rutaCarrito.get('/', async (req, res) => {
    const listaCarrito = await carts.getAll();
    res.json(listaCarrito); 
});

rutaCarrito.delete('/:id', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    await carritos.deleteById(idCarrito);
    res.json({
        status: 'ok'
    });
});

rutaCarrito.get('/:id/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const listaProductos = await carritos.getById(idCarrito);
    res.json(listaProductos.productos)
});

rutaCarrito.post('/', async (req, res) => {
    const carrito = {
        timestamp: Date.now(),
        productos: []
    };
    const id = await carritos.save(carrito);
    res.json(id)
});

rutaCarrito.post('/:id/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = req.body.idProducto;
    const producto = await productos.getById(idProducto);
    const carrito = await carritos.getById(idCarrito);
    carrito.productos.push(producto);
    await carritos.update(idCarrito, carrito);
    res.json({
        status: 'ok'
    });
});

rutaCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    const carrito = await carritos.deleteById(idCarrito);
    let indexToDelete = -1;
    carrito.productos.forEach((producto, index) => {
        if (producto.id == idProducto) {
            indexToDelete = index;
        };
    });
    if (indexToDelete => 0) {
        carrito.productos.splice(indexToDelete, 1);
    }
    await carritos.update(idCarrito, carrito);
    res.json({
        status: 'ok'
    });
});

export { rutaCarrito };