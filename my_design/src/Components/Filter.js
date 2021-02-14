import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import '../Styles/Filter.css';
import lunch from '../assets/lunch.jpg'
class Filter extends React.Component{
    constructor(){
        super();
        this.state={
            locationDropdown:[],
            restaurants:[],
            pageCount:[], 
            location_id:undefined,
            cuisine_id:[],
            mealtype_id:undefined,
            hcost:10000,
            lcost:1,
            page:1,
            sort:1,
            perPageCount:2,

        }
    }
    handleClick=(id)=>{
         
        this.props.history.push(`/details/?restaurant=${id}`);
    }
    back=()=>{
        this.props.history.push('/')
    }
    componentDidMount(){
         /* componentDidMount function to capture the values from URL,
            and then make an API Call to filter the data in UI */

        // Capturing the values from query string and parsing it to fetch individual keys from URL
        const{page,sort}=this.state;
        const queryParams= queryString.parse(this.props.location.search);
        const mealtype_id=queryParams.mealtype_id;
        const location_id=queryParams.area;
        // Creating an Object to pass as an input param to Filter API Call
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            page:page,
            sort:sort
            };
        // Making Filter API Call 
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,
                                    mealtype_id:mealtype_id,
                                    location_id:location_id,
                                    pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
         //API call to fetch the location list for location dropdown
        
        
         axios({
            method:'GET',
            url:"http://localhost:3456/api/location",
            Headers:{'Content-Type':'application/json'}
        }).then(res=>this.setState({locationDropdown:res.data.location}))
        .catch(err=>console.log(err))
    }
    handlelocationchange=(event)=>{
        const {mealtype_id,page, sort } = this.state;
        const area=event.target.value;
        let obj = {
            location_id: area,
            mealtype_id: mealtype_id,
            sort: sort,
            page: page
        };
        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${area}&&mealtype=${mealtype_id}&&page=${page}&&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,location_id:area,pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    }
    
    handleCuisineChange=(Id)=>{
        const { cuisine_id, location_id, mealtype_id,sort, page } = this.state;

        // pushing and poping the cuisines values from array
        if (cuisine_id.indexOf(Id) == -1) {
            cuisine_id.push(Id);
        }
        else {
            var index = cuisine_id.indexOf(Id);
            cuisine_id.splice(index, 1);
        }
        const obj={
            location_id: location_id,
            mealtype_id: mealtype_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id : undefined,
            sort: sort,
            page: page
              
        }
        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&page=${page}&sort=${sort}`);

        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,
                                    cuisine_id:cuisine_id,
                                    pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    }
      
   
    onSortChange=(Id)=>{
        const {mealtype_id,cuisine_id,lcost,hcost,location_id,page}=this.state;
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id : undefined,
            sort:Number(Id),
            lcost:lcost,
            hcost:hcost,
            page:page

        }
        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${Number(Id)}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant, sort:Number(Id),pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    };
    handleCostChange=(lcost,hcost)=>{
        const{cuisine_id,mealtype_id,location_id,page,sort}=this.state
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id : undefined,
            lcost:Number(lcost),
            hcost:Number(hcost),
            page:page,
            sort:sort
        }
        // Update the URL basis the changed selections
        this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,
                                    lcost:Number(lcost),
                                    hcost:Number(hcost),
                                    pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))

    };
    handlepagination=(page)=>{
        const {cuisine_id,mealtype_id,lcost,hcost,sort,location_id}=this.state
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id: undefined,
            lcost:Number(lcost),
            hcost:Number(hcost),
            sort:sort,
            page:page
        }
         // Update the URL basis the changed selections
         this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,page:page,pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    }
    handlePreviousPage=()=>{
        
        const {cuisine_id,mealtype_id,lcost,hcost,sort,page,location_id}=this.state
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id: undefined,
            lcost:Number(lcost),
            hcost:Number(hcost),
            sort:sort,
            page:(page-1)
        }
        this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page-1}&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,page:page-1,pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    }

    
    handleNextPage=()=>{
        const {cuisine_id,mealtype_id,lcost,hcost,sort,page,location_id}=this.state
        const obj={
            mealtype_id:mealtype_id,
            location_id:location_id,
            cuisine_id: cuisine_id.length != 0 ? cuisine_id: undefined,
            lcost:Number(lcost),
            hcost:Number(hcost),
            sort:sort,
            page:page+1
        }
        this.props.history.push(`/filter?area=${location_id}&cuisine=${cuisine_id}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page+1}&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3456/api/restaurantfilter',
            Headers:{'Content-Type':'application/json'},
            data:obj
        }).then(res=>this.setState({restaurants:res.data.restaurant,page:page+1,pageCount:res.data.pageCount}))
        .catch(err=>console.log(err))
    }

   
     
    render(){
        const{restaurants,pageCount,locationDropdown}=this.state;
        return(
            <div>
                        <div style={{backgroundColor:'#323232'}}>
                        <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                                    <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                        data-target="#demo"></span>
                                    <div id="demo" className="collapse show">
                                        <div className="filter-heading">Filters</div>
                                        <div className="Select-Location">Select Location</div>
                                        <select className="Rectangle-2236" onChange={this.handlelocationchange} >
                                            <option>Select</option>
                                            {locationDropdown.map(item=>{
                                                return(
                                                <option value={`${item.location_id}`} >{item.name}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="Cuisine">Cuisine</div>
                                        <div style={{display: 'block'}}>
                                            <input type="checkbox"  onChange={()=>this.handleCuisineChange('1')}/>
                                            <span className="checkbox-items">North Indian</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="checkbox" onChange={()=>this.handleCuisineChange('2')}/>
                                            <span className="checkbox-items">South Indian</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="checkbox" onChange={()=>this.handleCuisineChange('3')} />
                                            <span className="checkbox-items">Chineese</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="checkbox" onChange={()=>this.handleCuisineChange('4')}/>
                                            <span className="checkbox-items">Fast Food</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="checkbox" onChange={()=>this.handleCuisineChange('5')}/>
                                            <span className="checkbox-items">Street Food</span>
                                        </div>
                                        <div className="Cuisine">Cost For Two</div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio" name='cost' onChange={()=>this.handleCostChange('0','500')}/>
                                            <span className="checkbox-items">Less than &#8377; 500</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio"name='cost' onChange={()=>this.handleCostChange('500','1000')} />
                                            <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio" name='cost'onChange={()=>this.handleCostChange('1000','1500')} />
                                            <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio"name='cost' onChange={()=>this.handleCostChange('1500','2000')} />
                                            <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio"name='cost' onChange={()=>this.handleCostChange('2000','2500')} />
                                            <span className="checkbox-items">&#8377; 2000 +</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio"name='cost' onChange={()=>this.handleCostChange('1','10000')} />
                                            <span className="checkbox-items">All</span>
                                        </div>
                                        <div className="Cuisine">Sort</div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio" name='sort' onChange={()=>this.onSortChange('1')}/>
                                            <span className="checkbox-items">Price low to high</span>
                                        </div>
                                        <div style={{display: 'block'}}>
                                            <input type="radio" name='sort'onChange={()=>this.onSortChange('-1')} />
                                            <span className="checkbox-items">Price high to low</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                {restaurants.length>0 ? restaurants.map((item)=>{
                        return(
                            <div className="Item" onClick={()=>this.handleClick(item._id)}>
                        <div className="row pl-1">
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <img className="img" src={lunch} />
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                        <div className="rest-name">{item.name}</div>
                                <div className="res-location">FORT</div>
                        <div className="rest-address">{item.address}</div>
                            </div>
                        </div>
                        <hr />
                        <div className="row padding-left">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="rest-address">CUISINES :{item.Cuisine.map((item) => item.name + ', ')}</div>
                                <div className="rest-address">COST FOR TWO : &#8377; {item.min_price} </div>
                            </div>
                        </div>
                    </div>

                        )
                    }):<div className="nodatadiv">&#128532;Sorry! Try other options</div>}
                    
                    
                    {pageCount.length > 1 &&  <div class="pagination">
                        <a onClick={()=>this.handlePreviousPage()}href="#"  className="pageNo" style={{'border':'solid 1px gold','color':'gold','margin':'5px','borderRadius':'10px','width':'50px','font-size':'30px','padding-left':'10px','padding-right':'10px'}}>&laquo;</a>
                        {pageCount.map(item=>{
                            return(
                            <a onClick={()=>this.handlepagination(item)} href="#" className="pageNo" style={{'border':'solid 1px gold','color':'gold','margin':'5px','borderRadius':'10px','width':'50px','font-size':'30px','padding-left':'10px','padding-right':'10px'}}>{item}</a>
                            )
                        })}
                       
                        <a onClick={()=>this.handleNextPage()} href="#"  className="pageNo" style={{'border':'solid 1px gold','color':'gold','margin':'5px','borderRadius':'10px','width':'50px','font-size':'30px','padding-left':'10px','padding-right':'10px'}}>&raquo;</a>
                    </div>}
                    <button className='homebtn' onClick={this.back}>Back</button>
                </div>
                
                            </div>
                        </div>
                    </div>
               
            </div>
        )
    }
}
export default Filter;