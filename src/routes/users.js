//URL's DE AUTENTICACION:/login /signin
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()

//cuando salte el metodo get, segun ruta, mostrara algo
router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})
router.get('/users/signup',(req,res)=>{
    res.render('users/signup')
})
module.exports=router