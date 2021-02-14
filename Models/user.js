const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders:{
        type:Array
    }
})
module.exports = mongoose.models.users || mongoose.model('users',userSchema);














