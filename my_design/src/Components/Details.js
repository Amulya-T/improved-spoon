import axios from 'axios';
import React from 'react';
import queryString from 'query-string';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../Styles/Details.css';
import add from '../assets/add.png';
import minus from '../assets/blackminus.png'

const customStyles = {
    content : {
            position            :'absolute',
            top                 :'50%',
            left                : '50%',
            right               :'auto',
            bottom              : 'auto',
            border              : '1px solid rgb(204, 204, 204)',
            background          : '#323232',
            overflow            : 'auto',
            borderRadius        : '4px',
            outline             : 'none',
            padding             : '20px',
            marginRight        : '-50%',
            transform           : 'translate(-50%, -50%)',
            color               : 'gold',
            width               : '50%',
            height              : '90%',
            

    },
    overlay: {zIndex: 1000}
}

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state={
            restaurant:{},
            menuItems:[],
            userSelection:[],
            selectedItem:{},
            qty:0,
            itemsModalIsOpen:false,
            orderConfirmationModal:false,
            loginModalIsOpen:false
           
        }
    }
   
    componentDidMount(){
        const queryParams= queryString.parse(this.props.location.search);
        const restaurantId=queryParams.restaurant;
        
        axios({
            method:'GET',
            url:'http://localhost:3456/api/restbycity/'+restaurantId,
            headers:{'Content-Type':'application/json'}
        }).then(res=>this.setState({restaurant:res.data.restaurant[0]}))
          .catch(err=>console.log(err))
        
        axios({
            method:'GET',
            url:'http://localhost:3456/api/menu/'+restaurantId,
            headers:{'Content-Type':'application/json'},
           
        }).then(res=>this.setState({menuItems:res.data.items[0].items}))
          .catch(err=>console.log(err))
    }
    handleOnlineOrder=()=>{
        this.setState({itemsModalIsOpen:true})
    }
    handleAdd=(event)=>{
       const value=event.target.value;
       
       
        const{menuItems}=this.state;
        let index=menuItems.indexOf(menuItems.find(item=>item.itemId==value))
        let duplicateItems = [...this.state.menuItems]
        
        duplicateItems[index] = {...duplicateItems[index], isSelected: !duplicateItems[index].isSelected,qty:1}
        this.setState({
            menuItems: duplicateItems,
            });

    }
    addItem=(value)=>{
       
        const{menuItems}=this.state;
        let index=menuItems.indexOf(menuItems.find(item=>item.itemId==value))
        let duplicateItems = [...this.state.menuItems]
       
        duplicateItems[index] = {...duplicateItems[index], qty:duplicateItems[index].qty+1}
        this.setState({
            menuItems: duplicateItems,
            }); 
    }
    deleteItem=(value)=>{
    const{menuItems}=this.state;
    let index=menuItems.indexOf(menuItems.find(item=>item.itemId==value))
        let duplicateItems = [...this.state.menuItems]
        
        
        duplicateItems[index] = {...duplicateItems[index], qty:duplicateItems[index].qty-1}
         if(duplicateItems[index].qty==0)
        {
            duplicateItems[index] = {...duplicateItems[index],isSelected:false}
        }
        
        this.setState({
            menuItems: duplicateItems,
            }); 
    }
    handleClose=()=>{
        this.setState({itemsModalIsOpen:false})
    }
    handleProceed=()=>{
        this.setState({orderConfirmationModal:true})
    }
    handleOrderConfrmclose=()=>{
        this.setState({orderConfirmationModal:false})
    }  
    orderPlacement=()=>{
        const{menuItems,restaurant}=this.state;
       const logged= sessionStorage.getItem("isLoggedIn");
      const userId= sessionStorage.getItem("userId");  
      if(logged){
        axios({
            method:'PUT',
            url:'http://localhost:3456/api/order/'+userId,
            headers:{'Content-Type':'application/json'},
            data:{
                restaurantName:`${restaurant.name}`,
                item:menuItems.filter(item=>item.qty!=0),
                totalPrice:`${menuItems.filter(item=>item.qty!=0).reduce( ( sum, item ) => sum + (item.price*item.qty) , 0)}`

                 
            }
            }).then()
            .catch(err=>console.log(err))
            alert("order placed successfully")
        }
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.removeItem('userId')
        {
           alert("please Login!!")
        }
      }
    render(){
        const{restaurant,menuItems,itemsModalIsOpen,orderConfirmationModal}=this.state;
       
        return(
           <div style={{backgroundColor:'#323232'}}> 
               {restaurant!=null? 
               <React.Fragment>
                   <div>
                        <Carousel showThumbs={false}>
                            {restaurant&&restaurant.thumb&&restaurant.thumb.map((item=>{
                                return<div style={{backgroundColor:'#323232'}}>
                                    <img src={item} className="image"/>
                                </div>
                            }))}
                        </Carousel>
                   </div>
               
                        <div className="heading">{restaurant.name}
                        <span><button className="orderBtn" onClick={this.handleOnlineOrder}>Place Online Order</button></span></div>
                <div className="tabs">

                    <div class="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" defaultChecked/>
                        <label for="tab-1">Overview</label>

                            <div className="content">

                                <div className="about">About this place</div>
                                <div className="head">Cuisine</div>
                                <div className="value">Bakery, Fast-food</div>
                                <div className="head">Average Cost</div>
                        <div className="value">&#8377; {restaurant.min_price}</div>
                            </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1"/>
                        <label for="tab-2">Contact</label>
                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">+9111004725435</div>
                            <div className="head">The Big Chill Cakery</div>
                            <div className="value">Shop 1, Plot D, Samruddhi Complex, Chincholi,
                                Mumbai-400002, Maharashtra</div>
                        </div>
                    </div>
                </div>
                </React.Fragment>:null}
            
                    <Modal
                    isOpen={itemsModalIsOpen}
                    style={customStyles}
                    
                    >
                     <div className="container-fluid" >
                          <div className="heading" style={{'textAlign':'center'}}>{restaurant.name}
                          <button type="button" class="close" aria-label="Close" onClick={this.handleClose} style={{'color':'gray'}}>
                                                    <span aria-hidden="true">&times;</span>
                                                    </button></div>
                         {menuItems.map(item=>{
                             return(<div className="row">
                             <div className="itemContainer">
                                    <div className="col-sm-4 col-md-4 col-lg-4" >
                                        <img src={item.image} className="itemImages"/>
                                        <div className="verticalLine"></div>
                                        
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8" >
                                         <h2 className="itemName">{item.name}</h2>
                                           <p className="description">{item.description}</p>
                                          <p className="price"> &#8377;{item.price}</p>
                                          {item.isSelected==false?<button className="addbtn" value={item.itemId} onClick={this.handleAdd}>Add</button>:
                                          <div class="quantity" >
                                                <button class="plus-btn" type="button"  value={item.itemId} onClick={()=>this.addItem(item.itemId)} >
                                                    <img src={add} />
                                                </button>
                                                <input type="text" name="name" value={item.qty}/>
                                                <button class="minus-btn" type="button" name="button" value={item.itemId} onClick={()=>this.deleteItem(item.itemId)}>
                                                    <img src={minus} style={{'height':'16px','width':'16px'}}  alt="" />
                                                </button>
                                             </div>}
                                             
                                          
                                        
                                    </div>
                                </div>
                         </div>)
                         })}
                         <button className="proceedbtn" onClick={this.handleProceed}>proceed</button>
                                             
                                          
                         
                        
                     </div>
                     <Modal
                    isOpen={orderConfirmationModal}
                    style={customStyles}
                    
                    
                    >
                        <button type="button" class="close" aria-label="Close" onClick={this.handleOrderConfrmclose} style={{'color':'gray'}}>
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                        <h2 className="ordpgheading">Something tasty awaits you! &#x1f60b;</h2>
                        <h3 className="yourOrder">your order</h3>
                        <hr></hr>
                        {menuItems.filter(item=>item.qty!=0).map(item=>{
                            return(
                            
                                <div className="slctdItems">
                                {item.name}*{item.qty}={item.price*item.qty}
                                </div>
                                  )
                                }) }  
                            
                                <div className="slctdItems">Total Price={menuItems.filter(item=>item.qty!=0).reduce( ( sum, item ) => sum + (item.price*item.qty) , 0)}</div>
                                <button className="proceedbtn" onClick={this.orderPlacement}>Place Order</button>
                        
                      
                            
                            

                        
                        
                    </Modal>
                        
                       
                   
                        
                    
                   
                </Modal>
            </div>
        )
    }
}
export default Details;