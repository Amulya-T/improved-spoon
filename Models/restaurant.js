const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const RestaurantSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    location_id:{
        type:Number,
        required:true
    },
    city_id:{
        type:Number,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    thumb:{
        type:Array,
        required:true
    },
    aggregate_rating:{
        type:Number,
        required:true
    },
    rating_text:{
        type:String,
        required:true
    },
    min_price:{
        type:Number,
        required:true
    },
    contact_number:{
        type:Number,
    
    },
    type:{
        type:Array,
        required:true
    },
    cuisine_id:{
        type:Number,
        required:true
    },
    items:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.models.restaurants||mongoose.model('restaurants',RestaurantSchema);
