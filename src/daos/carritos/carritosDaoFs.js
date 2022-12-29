import { Contenedor } from "../../Contenedor/ContenedorFs";

class CarritosDaoFs extends Contenedor {
    constructor() {
        super('src/db/carritos.txt');
    }
}

export default CarritosDaoFs;