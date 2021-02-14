const mealtypes=require('../Models/mealtypes');

exports.getMealtype=(req,res)=>{
    mealtypes.find().then(response=>{
       res.status(200).json({message:"location fetched seccessfully",location:response})
   }
       ).catch(err=>{
           res.status(500).json({message:err})
       })
     }