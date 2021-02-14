const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mealtypeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    
})
module.exports = mongoose.models.mealtypes || mongoose.model('mealtypes',mealtypeSchema);














