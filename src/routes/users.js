//URL's DE AUTENTICACION:/login /signin
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()

//cuando salte el metodo get, segun ruta, mostrara algo
router.get('/users/signin',(req,res)=>{
    res.send('Login page')
})
router.get('/users/signup',(req,res)=>{
    res.send('Register page')
})
module.exports=router