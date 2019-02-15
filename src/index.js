//##########Imports##########
const express=require('express')
const path=require('path')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')


//##########Initializations##########
//creo mi servidor express
const app = express()
//inicializo mi base de datos
require('./database')
//importo el archivo config/passport.js
require('./config/passport.js')


//##########Settings##########
//establezco una config para el puerto, y considero si el servicio de nube me lo da o no
app.set('port',process.env.PORT || 3000)
//le digo a node donde(ruta) tengo las vistas, ocupo path. Esto lo hago xq esta dentro de src
app.set('views',path.join(__dirname,'views'))
//configuro handlebars:.hbs(o .html),exphbs({obj de config})
app.engine('.hbs',exphbs({
    defaultLayout:'main',//archivo principal .hbs
    layoutsDir:path.join(app.get('views'),'layouts'),//ya conozco la ruta de views la concateno con layout(nueva carpeta)
    partialsDir:path.join(app.get('views'),'partials'),//pequenias partes html reutilizables, ej un form en muchas vistas
    extname:'.hbs',//tengo q especificar la extension
}))
//configuro el motor de plantilla(vistas), es decir .hbs
app.set('view engine','.hbs')


//##########Middlewares##########
//configuro ciertas cosas del servidor
//urlenconde es un metodo con el cual el server entendera lo q envien los forms{extended: solo datos !img}
app.use(express.urlencoded({extended:false}))
//en el form usare un input oculto(_method)
app.use(methodOverride('_method'))
//usamos session y la configuracion basica para q express pueda autenticar y guardar
app.use(session({
    secret:'mysecretapp',//palabra secreta q solo nosotros sabemos
    resave:true,
    saveUninitialized:true
}))
//debe ir despues de session
app.use(passport.initialize())
//le digo a passport q use session de express
app.use(passport.session())
//flash va al final xq el login va primero
app.use(flash())

//##########Gloval variables##########
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    next()
})


//##########Routes##########
//hago referencia a las rutas(NO deben estar vacios los .js o dara error)
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))


//##########static files##########
//le digo donde esta la carpeta public
app.use(express.static(path.join(__dirname,'public')))



//##########Server Listenning##########
app.listen(app.get('port'),()=>{
    console.log('Server initialized in port ', app.get('port'))
})