const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:String
})

const usermodel=mongoose.model('User',userSchema)

module.exports=usermodel