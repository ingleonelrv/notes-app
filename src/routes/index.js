//##########AQUI IRAN LAS URLS DE MI PAGINA PRINCIPAL, /about ##########
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()

//cuando salte el metodo get, segun la ruta, mostrara algo
router.get('/',(req,res)=>{
    res.send('index page')
})
router.get('/about',(req,res)=>{
    res.send('about page')
})

module.exports=router