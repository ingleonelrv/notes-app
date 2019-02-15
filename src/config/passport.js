//passport me da metodos para autenticar al usuario, fb, github, twitter, etc
const passport =require('passport')
//en este caso usaremos la local
const localStrategy=require('passport-local').Strategy
//como necesito verificar en la BD si existe traigo el modelo/User
const User=require('../models/Users')

//defino una nueva strategia de autenticacion
passport.use(new localStrategy({
    //parametros para la autenticacion
    usernameField:'email'
},async (email,password,done)=>{
    //AQUI VA LA VALIDACION
    const user=await User.findOne({email:email})
    if(!user){
        //si no existe termino con callback done(error, user, msg)
        return done(null,false,{message:'User not found'})
    }else{
        //intento comparar el password del usuario obtenido
        const match=await user.matchPassword(password)
        if(match){
            //encontrado, no hay error, devuelvo user
            return done(null,user)
        }else{
            return done(null,false,{message:'Incorrect Password'})
        }
    }
}))
//LUEGO DE VALIDADO ALMACENO EN ALGUNA SESION SU ID
passport.serializeUser((user,done)=>{
    //una vez autenticado almaceno el id para futuros casos buscar por id
    done(null,user.id)
})
//PROCESO INVERSO, TOMA EL ID Y GENERA UN USUARIO
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})
