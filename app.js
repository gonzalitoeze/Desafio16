const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const user = require('./public/user')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//configuramos mongoStore
const mongoStore = require('connect-mongo');

//configuramos mongo
const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};

//configuramos cookie-parser
app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://root:root@cluster0.4tmad3s.mongodb.net/usuarios?retryWrites=true&w=majority',
        mongoOptions: advanceOptions,
        ttl: 600
    }),
    secret: 'mongoSecret',
    resave: false,
    saveUninitialized: false
}))

//función middleware
const auth = (req, res, next) => {
    if (req.session.nombre == 'Juan') {
        return next();
    }
    return res. status(401).send('Acceso no autorizado.')
};

app.get('/', (req, res) => {
    const nombre = req.query.nombre;
    if (!nombre) {
        return res.status(400).send('Nombre no especificado');
    }

    if(req.session.contador) {
        req.session.contador++;
        res.send(`Hola ${nombre} has iniciado sesión ${req.session.contador} veces`);
    } else {
        req.session.nomre = nombre;
        req.session.contador = 1;
        res.send(`Bienvenido ${nombre}!`);
    }
});
app.get('/Admin', auth, (req, res) => {
    const nombre = req.query.nombre;
    if (!nombre) {
        return res.status(400).send('Nombre no especificado');
    }

    if(req.session.contador) {
        req.session.contador++;
        res.send(`Hola ${nombre} has iniciado sesión ${req.session.contador} veces`);
    } else {
        req.session.nomre = nombre;
        req.session.contador = 1;
        res.send(`Bienvenido ${nombre}!`);
    }
});

app.post('/register', (req, res) => {
    const {username, password } = req.body;

    const user = new user({username, password});

    user.save(err =>{
        if (err) {
            res.status(500).send('ERROR AL REGISTRAR USUARIO')
        } else {
            res.status(200).send('USUARIO REGISTRADO CON ÉXITO')
        }
    });
});

app.post('/auth', (req, res) => {
    const {username, password} = req.body;

    user.findOne({username}, (err, user) => {
        if (err) {
            res.status(500).send('ERROR AL AUTENTICAR EL USUARIO')
        } else if (!user) {
            res.status(500).send('EL USUARIO NO EXISTE')
        } /* else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('ERROR AL AUTENTICAR')
                } else if (result) {
                    res.status(200).send('USUARIO VALIDADO CORRECTAMENTE')
                } else {
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTOS')
                }
            });
        } */
    });
});

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server listening from: ${server.address().port}`)
});
module.export = app;