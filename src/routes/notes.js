//URL PARA Q EL SERVER PUEDA CREAR NOTAS: /crear /borrar /update
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()
//importo desde models/Note para sacar el schema, con esto puedo gestionar dato:save, update...
const Note=require('../models/Note')

//para ASEGURAR esta ruta importo auth
const {isAuthenticated}= require('../helpers/auth')

//cuando salte el metodo GET, segun ruta, devolvera algo
//listare todas las notas en la bd, es asincrona
router.get('/notes',isAuthenticated,async (req,res)=>{
    //uso el schema para hacer la consulta
    const notes=await Note.find().sort({date:'desc'})
    //renderizare la vista y le paso el objeto de datos
    res.render('notes/all-notes',{notes})
})
//cuando quiera acceder a la ruta notes/add el renderiza la view new-note(el formulario)
router.get('/notes/add',isAuthenticated,(req, res)=>{
    res.render('notes/new-note')
})
//POST recibe datos de un formulario (un objeto json por medio de req.body)
router.post('/notes/new-note',isAuthenticated,async (req,res)=>{
    const {title,description}=req.body//asi recibo los datos
    //podria usar un metodo de express.validator()
    const errors=[]
    if(!title){
        errors.push({text:'Please write a title'})
    }
    if(!description){
        errors.push({text:'Please write a description'})
    }
    //si hay algun error
    if(errors.length>0){
        //le devuelvo los datos nuevamente al view(como 2do parametro) para q no tenga q typear de nuevo
        res.render('notes/new-note',{
            errors,
            title,
            description
        })
    }else{
        //instancio el schema(clase) y crea un nuevo dato para ALMACENAR en la BD
        const newNote=new Note({title,description})
        //ahora ALMACENO ese nuevo dato en la BD pero de forma asincrona
        await newNote.save()
        //Para usar flash() y pasar mensajes
        req.flash('success_msg','Note added Successfully')
        //cuando termine me redireccionara a otra vista donde se listan las notas
        res.redirect('/notes')
    }
})
//cuando de click a edit este ya tiene guardada la ruta q accedera a una nueva view para editar
router.get('/notes/edit/:id',isAuthenticated,async (req, res)=>{
    //hago la consulta a la bd para obtener la nota x id obtenido del url
    const note = await Note.findById(req.params.id)
    //renderizo la vista con el form para editar y le paso la nota especifica
    res.render('notes/edit-note',{note})
})
router.put('/notes/edit-note/:id',isAuthenticated,async (req,res)=>{
    const {title, description}=req.body
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('success_msg','Note updated Successfully')
    res.redirect('/notes')
})
router.delete('/notes/delete/:id',isAuthenticated,async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Note deleted Successfully')
    res.redirect('/notes')
})
module.exports=router