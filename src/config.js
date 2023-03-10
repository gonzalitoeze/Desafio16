/* export default {
    fileSystem: {
        path: './db'
    },
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase:{
        "type": "service_account",
        "project_id": "ecommerce-371822",
        "private_key_id": "0b8c38cbd0a02b83d2525d29b58539a64aab9479",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVm9KL1Dc7XbWn\nthfSY/KNgLBPaBJV6TW/5jhe2NIIrtxkPGvHvcivrTbscGv+Z2CtewfXaDVk6JR4\nTJjSeVViMmTC0HOfYApg80BwF5HjScLHe+K2nFWFZDKMQi3XAEPzXMdKAmFY9Um+\njZBJiYZdlCmikSthW8eyECd/xotVW8DffSXUKQ9OY0id41IwUdpk5jwoq0F/CdEP\n0IKS3Ci42LoNs0lTR95fzja88ZlCE9fCRuhm5Cd8+Q5hXhNd+8eD1U/QXrPkz7rt\n1c8XssNkjoDzFwH+EmKlxX6gQEgOas7C2l3mzXTcXkhkiJZFUd2k14SdeNfXDYMY\nydoR36Q/AgMBAAECggEAF7yXVTQgZzzg+3D6qpjM/QJz9sVOU28i5gWC4BmKiXIk\n6Ypkl1ZXJvhWhID5wW1pe1zPy69u+UmldMjCXnJ9x4yzS+2CysCUJPmzOZWjweoM\nC1ZujAaV0woosvQ1Da2vGkeYHvfttg2E28TeJay6MtK1IGPj/BhxwKCrg6xeovYj\nnxV8cL7CUWpdG83085y5kMLJODMTdFDVUID/p8uQkeDugO4W1ypaoq+/aXvDzrc2\n4U4eawBJp/8CX3ScJ3HXD81HIU4qBbAYcY5iG9TDG4DenL5SdqAQ6Rb3+ucsH6+6\ncVC84q+DJm1Az/GJdHzffEEU9RgPH2lLXO8w1PKUcQKBgQDN/zsUsKitpYIMeN8n\n1YAz95evCCV5g/53I/yMxhmjLbnz2haGiw4i5cuP9CWnH9ixNSX+3+1Nw96rZTu3\nva3g3HfsaeGHi/iIKcYs4sOswZDa0GdEpLNN4fOkzk7SNERfS6xHZs0+EbJbOQ3m\nPoea/YdMgu7uG9lDrCNqNcFzxQKBgQC57JcRO0FHT9YxNYjmBRmDCTFaMDkSyqJU\nt9KT12o5lFclF0jcdGOkAzvEi11327488Vtqm4eAisBqaKKwBcngHRcAQ/CPRjmT\nunz0h/sUdqzXx3h2Xt+PcXGb7aMYB0IBu4uwSp1X+ynNoGqNNouHahgBlyQHlXnO\nHfNbIFSEMwKBgQCgIMbMTobQdNei2lKdpFkEDHLcnHiE/RXRhyfKRjOnpOPnqp/X\n9kAG4JpcTGz4fMj091uRxH+y848jrI2/RrLjGH4gSC4IL8YCEnb6bUut/smbTmT3\n9w9qeznp4nVi8T401Z4V4tOobBk40CD92Z2P3YRO9XjFnuBEuorNBPxcAQKBgB9o\nXzCzANkKHJXdhE3PKLshD2w73zhUcM286967sh8d9wa2A0Hyi26GeU8/d7+qqF1l\nLFs7AM3vIogXOvxfTfYFFACgeX/KjilthHROkFSpo5MkCC5+4mc588Yyg62odDcU\ntolGYYQeUraA1d8bCsEKZBnIrXZ2gsgV+Sk4se5PAoGBAJ9ehrv3xB/ThWGoayEl\nD3UiKknZun0YaNLrpddMrE/73qlDQKPkKbzv4vH4LS9/AhkX3E/y+C5SlzgVkBhr\np3I3t0cBSi9uuq97AFJoLEP0w84yY72m+beA2XD4AXqQ9mH3r1agjUQo31TItSiR\nptu/Ri4ZifCD9nl2dU6gCK2R\n-----END PRIVATE KEY-----\n",
        "client_email": "ecommerce@ecommerce-371822.iam.gserviceaccount.com",
        "client_id": "100225627623118042178",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ecommerce%40ecommerce-371822.iam.gserviceaccount.com"
    },
  } */


// import { config } from "dotenv";
// config();

// export const PORT = process.env.PORT || 8080;
// export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/usuarios";

export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/ecommerce'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://root:root@cluster0.7yey2qr.mongodb.net/ecommerce?retryWrites=true&w=majority'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./db/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: '',
            password: '',
            database: ''
        }
    },
    fileSystem: {
        path: './db'
    }
}