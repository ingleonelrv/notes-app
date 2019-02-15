//creo un objeto de funcioness
const helpers={}

helpers.isAuthenticated=(req,res,next)=>{
    //en passport tenemos un metodo que autentica, revisa si exist una sesion o no
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error_msg','Not authorized')
    res.redirect('/users/signin')
}
module.exports=helpers