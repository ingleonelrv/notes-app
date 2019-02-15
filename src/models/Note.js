//La conexion ya esta establecida, usare mongoose para crear schemas
const mongoose = require('mongoose')
const {Schema} = mongoose

//ahora defino como luciran los datos de mis notas en mongoDB
const NoteSchema=new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, default:Date.now},
    user:{type:String}
})
//uso un metodo de model para exportar un nombre y mi schema
module.exports=mongoose.model('Note',NoteSchema)