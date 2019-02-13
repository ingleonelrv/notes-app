//URL PARA Q EL SERVER PUEDA CREAR NOTAS: /crear /borrar /update
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()

//cuando salte el metodo get, segun ruta, mostrara algo
router.get('/notes',(req,res)=>{
    res.send('notes page')
})
module.exports=router