

const express=require('express');
const mongoose=require('mongoose');
const restaurants=require('../Models/restaurant');

exports.filterSearch = (req, res, next) => {
    const queryParams = req.body;   // capturing all the params from request body

    
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;    // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 2; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {}; 
   
    if(req.body.location_id!=null ){
        payload.location_id=req.body.location_id;
        

    }
    let cuisine_id=[];
    cuisine_id=req.body.cuisine_id;
    if(req.body.cuisine_id!=null&& req.body.cuisine_id!=undefined){
        payload.Cuisine={$elemMatch:{cuisine_id:{$in:cuisine_id}}}
    }
    
   
    if(req.body.mealtype_id!=null && req.body.mealtype_id!=undefined ){
        payload.type={$elemMatch:{mealtype_id:req.body.mealtype_id}}}
    
    if(req.body.hcost!=null &&req.body.lcost!=null ){
        payload.min_price={ $gt: req.body.lcost, $lt: req.body.hcost }}
  
   
    
    restaurants.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 2);
        const pageCountArr = [];
        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant:resultValues, pageCount: pageCountArr, totalCount: result.length, payload:payload })
    }).catch(err => {
        res.status(500).json({ message: err })
    });
}

exports.getRestaurantByCity=(req,res)=>{
    const cityName=req.params.cityName;
    restaurants.find({_id:cityName}).then(response=>{
        res.status(200).json({message:"restaurant fetched seccessfully",restaurant:response})
    }
        ).catch(err=>{
            res.status(500).json({message:err})
        })
        


}
exports.getRestaurantByCityName=(req,res)=>{
    const cityName=req.params.cityName;
    restaurants.find({city_id:cityName}).then(response=>{
        res.status(200).json({message:"restaurant fetched seccessfully",restaurant:response})
    }
        ).catch(err=>{
            res.status(500).json({message:err})
        })
        


}


