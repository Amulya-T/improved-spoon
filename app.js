const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const appRouter=require('./Routes/router');

const app=express();

const port=3456;
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  next();
});



app.use(bodyParser.json());

app.use('/api', appRouter);





mongoose.connect('mongodb+srv://Amulya_T:shinchan@cluster0.l6iuc.mongodb.net/Edureka_food_app?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(res=>{
    app.listen(port,()=>
     {
         console.log("server is running on "+port);
        
       })
    })
       
    .catch(err=>{console.log(err)
        
    })

  

    
       
  
        
    
