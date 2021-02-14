const locations=require('../Models/city');


exports.getLocation=(req,res)=>{
   locations.find().then(response=>{
      res.status(200).json({message:"location fetched seccessfully",location:response})
  }
      ).catch(err=>{
          res.status(500).json({message:err})
      })
    }
