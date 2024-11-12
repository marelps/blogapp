// Rota para guardar todas as minhas rotas de admin
import express from 'express' // substitui o require express
const router = express.Router() // Componente utilizado para criar rotas em arquivos separados
import mongoose from 'mongoose';
import Categoria from '../models/Categoria.js'
// const Categoria = mongoose.model("categorias")

router.get('/',(req,res) => {
    res.render("admin/index")
})

router.get('/posts', (req,res) =>{
    res.send("Página de posts")
})

router.get('/categorias', (req,res) => {
    Categoria.find().sort({date:'desc'}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.Flash("error_msg", "Houve um erro ao listar categorias")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req,res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome Inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug Inválido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da catagoria é muito pequena"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    }

    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    };

    new Categoria(novaCategoria).save().then(() => {
            console.log('Categoria salva com sucesso!')
            // res.redirect('/admin/categorias'); // Adicione um redirect após salvar
        }).catch((err) => {
            console.log(`Error: ${err}`)
           // res.redirect('/admin/categorias'); // Redirecione mesmo após erro
        });
});

// Exportando as rotas
    // Exporte o router como padrão
    export default router;

/* Código não funciona nessa versão pois está entrando em contradição do o type definido no package.json (ES Modules) Enquanto module.exports pertecem ao CommonJS
module.exports = router */