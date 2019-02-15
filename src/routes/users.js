//URL's DE AUTENTICACION:/login /signin
//ocupo express no para crear server sino para crear rutas
const router=require('express').Router()
//instancio el modelo User para crear nuevo User
const User =require('../models/Users')
//importo el modulo passport para la AUTENTICACION
const passport=require('passport')

//cuando salte el metodo get, segun ruta, mostrara algo
router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
})
router.get('/users/signup',(req,res)=>{
    res.render('users/signup')
})
//para AUTENTICAR usare passport, local se da por new LocalStrategy
router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true//poder enviar mensajes
}))
//cuando de click en Register traera aca, se llama igual al GET pero como este es POST no problem
router.post('/users/signup',async (req,res)=>{
    //desestructuro los datos q me llegan en request
    const {name, email,password,confirmPassword}=req.body
    //creo una const para almacenar errores
    const errors=[]
    //validaciones
    if(name.length<=0||email.length<=0){
        errors.push({text:'Please fill all fields'})
    }
    if(password!=confirmPassword){
        errors.push({text:'Password do not match!'})
    }
    if(password.length<6){
        errors.push({text:'Password must be at least 6 characters'})
    }
    //si lanzo algun error direcciono de nuevo al formulario pero con los datos y ademas el error
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirmPassword})
    }else{
        //valido que no me este dando un correo q ya existe
        const emailUser=await User.findOne({email:email})
        if(emailUser){
            req.flash('error_msg','The email is already in use')
            res.redirect('/users/signup')
        }
        //creo un nuevo usuario(objeto) usando el schema
        const newUser=new User({name,email,password})
        //luego cifro la constrasenia llamando al metodo y reemplazo el dato del objeto newUser
        newUser.password=await newUser.encryptPassword(password)
        //ahora lo guardo en la bd
        await newUser.save()
        //luego de guardar envio un msg flash
        req.flash('success_msg','You are registered now')
        res.redirect('/users/signin')
    }
})
module.exports=router