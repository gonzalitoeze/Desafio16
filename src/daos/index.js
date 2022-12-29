let productos;
let carritos;

switch(process.env.DB) {
    case 'mongodb':
        const{ default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongo.js');
        const{ default: CarritosDaoMongoDb } = await import('./carritos/carritosDaoMongoDb.js');

        productos = new ProductosDaoMongoDb();
        carritos = new CarritosDaoMongoDb();
        break;

    case 'fs':
        const{ default: CarritosDaoArchivo } = await import('./carritos/carritosDaoFs.js');
        const{ default: ProductosDaoArchivo } = await import('./productos/productosDaoFs.js');

        carritos = new CarritosDaoArchivo();
        productos = new ProductosDaoArchivo();
        break;

    default:
        const{ default: CarritosDaoMem } = await import('./carritos/carritosDaoMemoria.js');
        const{ default: ProductosDaoMem } = await import('./productos/productosDaoMemoria.js');

        carritos = new CarritosDaoMem();
        productos = new ProductosDaoMem();
        break;
}
export { productos, carritos };