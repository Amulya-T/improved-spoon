const { ObjectID } = require('mongodb');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ItemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    restaurant_id:{
        type:ObjectID,
        required:true
    },
    location_id:{
        type:Number,
        required:true
    },
    items:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.models.items||mongoose.model('items',ItemSchema);
