//mongoose es un modulo para trabajar con mongodb
const mongoose=require('mongoose')

//establezco la conexion
mongoose.connect('mongodb://localhost/notes-db-app',{
    //propiedades
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=> console.log('DB is connected'))
.catch(err=>console.error(err))