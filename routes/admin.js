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
    res.render("admin/categorias")
})

router.get('/categorias/add', (req,res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req, res) => {
    const novaCategoria = new Categoria({
        nome: req.body.nome,
        slug: req.body.slug
    });

    novaCategoria.save()
        .then(() => {
            console.log('Categoria salva com sucesso!')
            res.redirect('/admin/categorias'); // Adicione um redirect após salvar
        })
        .catch((err) => {
            console.log(`Error: ${err}`)
            res.redirect('/admin/categorias'); // Redirecione mesmo após erro
        });
});

// Exportando as rotas
    // Exporte o router como padrão
    export default router;

/* Código não funciona nessa versão pois está entrando em contradição do o type definido no package.json (ES Modules) Enquanto module.exports pertecem ao CommonJS
module.exports = router */