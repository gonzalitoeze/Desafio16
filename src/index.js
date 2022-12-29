var admin = require("firebase-admin");

var serviceAccount = require('../ecommerce-371822-0b8c38cbd0a0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

(async() => {
    const db = admin.firestore();
    const productosModel = db.collection('ecommerce');
    //CREATE
    const joystick = await productosModel.add({ nombre: 'Joystick PS4' });
    const cafetera = await productosModel.add({ nombre: 'Nespreso Dolce Gusto' });
    const teclado = await productosModel.add({ nombre: 'Teclado mecánico 60%' });
    const mouse = await productosModel.add({ nombre: 'Wireless Mouse' });

    //READ ALL
    const productos = await productosModel.get();
    productos.forEach(element => {
        console.log({ id: element.id, ...element.data() });
    });

    //UPDATE
    await productosModel.doc(joystick.id).update({ nombre: 'Joystick PS3' });

    //DELETE
    await productosModel.doc(mouse.id).delete();
}) ();