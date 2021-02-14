const express=require("express");
const router=express.Router();
const users=require("../Models/user")

const cityController=require("../Controllers/city");
const restaurantController=require("../Controllers/rest");
const mealtypeController=require("../Controllers/mealtypes");
const userController=require("../Controllers/user")
const itemsController=require("../Controllers/items")


router.get('/location',cityController.getLocation);
router.get('/restbycity/:cityName',restaurantController.getRestaurantByCity);
router.get('/restbycityname/:cityName',restaurantController.getRestaurantByCityName)
router.post('/restaurantfilter',restaurantController.filterSearch);
router.get('/mealtypes',mealtypeController.getMealtype);
router.get('/menu/:restaurant_id',itemsController.getMenuItems);


router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.post('/addmenuitems',itemsController.addMenuItems)
router.put('/order/:id',userController.orders)

module.exports =router;