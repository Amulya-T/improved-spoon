 
const items=require('../Models/item');

exports.addMenuItems=(req,res)=>{
    const name=req.body.name;
    const restaurant_id=req.body.restaurant_id;
    const location_id=req.body.location_id;
    const items=req.body.items;
   const addMenuItems=new item({name:name,restaurant_id:restaurant_id,location_id:location_id,items:items});
    addMenuItems.save().then(response=>{
        res.status(200).json({message:"items entered successfully",items:response})
    }
        ).catch(err=>{
            res.status(500).json({message:err})
        })
}
exports.getMenuItems=(req,res)=>{
    const restaurant_id=req.params.restaurant_id;
    items.find({restaurant_id:restaurant_id}).then(response=>{
        res.status(200).json({message:"Menu fetched seccessfully",items:response})
    }
        ).catch(err=>{
            res.status(500).json({message:err})
        })
        


}
