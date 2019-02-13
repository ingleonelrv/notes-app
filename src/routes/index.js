//##########AQUI IRAN LAS URLS DE MI PAGINA PRINCIPAL, /about ##########
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()

//cuando salte el metodo get, segun la ruta, mostrara algo
router.get('/',(req,res)=>{
    res.render('index')//renderiza .hbs segun configuracion
})
router.get('/about',(req,res)=>{
    res.render('about')
})

module.exports=router