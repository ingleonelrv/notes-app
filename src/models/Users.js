const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const {Schema}=mongoose

const UserSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    date:{type:Date, default:Date.now},
})
//creo metodo para encriptar datos usando el modulo bcrypt
UserSchema.methods.encryptPassword=async (password)=>{
    //metodo q genera un hash, le puedo dar mas ciclos
    const salt=await bcrypt.genSalt(10)
    //aplico el hash al password
    const hash=bcrypt.hash(password,salt)
    return hash
}
//tomara la constrasenia signin y lo comparara con lo q este en la DB
UserSchema.methods.matchPassword= async function(password){
    //uso function y no arrow para poder usar this
    return await bcrypt.compare(password,this.password)
}

module.exports=mongoose.model('User',UserSchema)