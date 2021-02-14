


const users=require('../Models/user');

exports.signUp=(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const signUpData=new user({firstName:firstName,lastName:lastName,email:email,password:password});
    signUpData.save().then(response=>{
        res.status(200).json({message:"user signedUp successfully",user:response})
    }
        ).catch(err=>{
            res.status(500).json({message:err})
        })
}
exports.login=(req,res)=>{
    const credentials={ email:req.body.email,
                        password:req.body.password};
    users.find(credentials).then(response=>
        {
            if(response.length>0){
                res.status(200).json({message:"user loggedIn successfully",user:response,isAuthenticated:true})
            }
            else
            {
                res.status(200).json({message:"login failed!",isAuthenticated:false})
            }
        }).catch(err=>{
            res.status(500).json({message:err})
        })
        
    
}
exports.orders=(req,res)=>{
    users.findOneAndUpdate(
        {_id:req.params.id},
        {$push:{orders:req.body}},
       
        (error,success)=>{
            if(error){
                res.status(500).json({message:error})
                
            }
            else{
                res.status(200).json({message:'item added successfully',success:success})
            }
        }

    )
}
