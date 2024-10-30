// Carregando módulos
// import para utilizar o método path, no curso utilizava somente as const (não utiliza mais nessa versão). O path é utilizado para chamar arquivos no diretório
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

    import express from 'express' // substitui o require express
    import { engine } from "express-handlebars" // substitui o require express-handlebars
    /* não é mais necessário pois foi descontinuado o bodyParser, mas no vídeo é citado
    const bodyParser = require("body-parser") */
    const app = express()
    //import mongoose from "mongoose"
    import admin from './routes/admin.js'
import mongoose from 'mongoose';
import session from "express-session";
import flash from "connect-flash";

// Middleware para lidar com requisições URL-encoded e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurações
    //Sessão
        app.use(session({
            secret: "cursoblogapp",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    // Body Parser
    /* Não é necessário configurar atualmente o bodyparser pois foi descontinuado, as linhas a seguir é somente para seguir o vídeo
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())    */
    // Handlebars
        // app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions:{
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            }
        }))
        app.set('view engine', 'handlebars')
        app.set('views', path.join(__dirname, 'views')); // Definir o diretório de views
    // Mongoose
        mongoose.connect("mongodb://localhost/blogapp").then(() => {
            console.log("Conectado ao MongoDB")
        }).catch((err) => {
            console.log("Erro ao se conectar: "+err)
        })
    // Public    
        app.use(express.static(path.join(__dirname,"public")))


// Rotas
        app.use('/admin', admin) // Todas as rotas no grupo, entrarão na rota admin

// Outros
    const PORT = 8081
    app.listen(PORT, () => {
        console.log("Servidor rodando!")
    })