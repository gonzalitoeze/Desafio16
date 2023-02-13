/* const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
app.use(compression());
const path = require('path')

//configuramos mongoStore
const mongoStore = require('connect-mongo');

//configuramos mongo
const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './views')));

app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://root:root@cluster0.4tmad3s.mongodb.net/Users?retryWrites=true&w=majority',
        mongoOptions: advanceOptions,
        ttl: 600
    }),
    secret: 'mongoSecret',
    resave: false,
    saveUninitialized: false
}));

//FUNCIÓN DE MIDDLEWARE --> recibe 3 parámetros
const auth = (req, res, next) => {
    if (req.session.nombre === 'Gon') {
        return next();
    }
    return res. status(401).send('Acceso no autorizado.')
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.get('/nombre', (req, res) => {
    const nombre = req.query.nombre;
    if (!nombre) {
        return res.status(200).send('Nombre no especificado');
    }

    // if (nombre !== 'Gon') {
    //     return res.send('Nombre incorrecto')
    // }

    if (nombre !== 'Gon') {
        res.sendFile(path.join(__dirname + "/views(signup.html"));
    }

    if (nombre === 'Gon') {
        res.sendFile(path.join(__dirname + "/public"))
    

    // if(req.session.contador) {
    //     req.session.contador++;
    //     // res.send(
    //     //     `<div style="background-color: red;"> Hola ${nombre} has iniciado sesión ${req.session.contador} veces</div>`);
    //     res.sendFile(path.join(__dirname + "/views/signup.html"));

    } else {
        req.session.nombre = nombre;
        req.session.contador = 1;
        res.send(`Bienvenido ${nombre}!`);
    }
});

app.get('/loginAdmin', auth, (req, res) => {
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

app.get('/olvidar', (req, res) => {
    const nombre = req.session.nombre;
    if (!nombre) {
        return res.send(`Logout ya efectuado anteriormente`);
    }
    req.session.destroy((err) => {
        if(!err) {
            return res.send(`Hasta luego ${nombre}`);
        }
        res.status(500).json({
            error: 'Ha ocurrido un error durante el logout'
        });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(!err) {
            return res.send('Log Out realizado correctamente');
        }
        res.status(500).send('Ha ocurrido un error durante el logout')
    });
});

app.post('/auth', (req, res) => {
    const nombre = req.body;
    if (nombre === 'Gon') {
    res.sendFile(path.join(__dirname + "/public/index.html"));
    }
});

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server listening from: ${server.address().port}`);
}); */

require('dotenv').config()

const os = require('os')
const cluster = require('cluster');
const modo = process.argv[3] || 'fork';
if (modo == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    })
} else {
    const express = require('express')
    const app = express()

    const morgan = require('morgan');

    const routes = require('./routes/index')

    const path = require('path');

    const {
        Server: IOServer
    } = require('socket.io')
    const http = require('http');
    const httpServer = http.createServer(app)
    const io = new IOServer(httpServer)

    const PORT = parseInt(process.argv[2]) || 8080

    require('./db/dbConnection')
    const sessionDBConnection = require('./db/sessionDBConnection')

    const {getProducts, insertProduct} = require('./controllers/products')
    const {getMessages, insertMessage} = require('./controllers/messages')


    //middlewares

    app.use(morgan('dev'))
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.json())

    app.use(sessionDBConnection)

    app.use(express.static(__dirname + '/public'))

    app.set('views', path.join(__dirname, './public/views'));
    app.set('view engine', 'ejs');


    //rutas

    app.use(routes)



    //socket
    io.on('connection', async (socket) => {
        console.log('New user connected. Socket ID : ', socket.id);

        socket.emit('products', await getProducts());

        socket.on('update-product', async product => {

            await insertProduct(product)
            io.sockets.emit('products', await getProducts())
        })

        socket.emit('messages', await getMessages())

        socket.on('update-message', async message => {
            await insertMessage(message)
            io.sockets.emit('messages', await getMessages());
        })
        socket.on('disconnect', () => {
            console.log('User was disconnected');
        });
    })

    //server
    const server = httpServer.listen(PORT, () =>
        console.log(
            `Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`
        )
    );

    server.on('error', (err) => {
        console.log('Error en el servidor:', err)
    })

}