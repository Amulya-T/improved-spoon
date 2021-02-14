import React from 'react';

import  wallpaper from '../assets/homepageimg.jpeg';
import logo from '../assets/logo.jpg';
import '../Styles/Home.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class Wallpaper extends React.Component{
    constructor(props){
        super(props)
        this.state={
            suggestions:[],
            text:'',
            restaurants:[]
        }
    }
    handleChange=(event)=>{
        const area=event.target.value.split('-')[0];
        const city=event.target.value.split('-')[0];

        sessionStorage.setItem('area',area);
        sessionStorage.setItem('city',city);
       axios({
           method:'GET',
           url:`http://localhost:3456/api/restbycityName/${city}`,
           headers:{'Content-Type':'application/json'}

       }).then(res=>this.setState({restaurants:res.data.restaurant}))
        .catch(err=>console.log(err))
    }
    onTextChange=(event)=>{
        const value=event.target.value;
        const{restaurants}=this.state;
        let suggestions=[];
        if(value.length>0){
            suggestions=restaurants.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState(()=>({
            suggestions:suggestions,
            text:value
        }))
    }
    selectedText(value){
        this.setState({
            text:value.name,
            suggestions:[]
        },()=>{
            this.props.history.push(`/details/?restaurant=${value._id}`);
        })
    }
    renderSuggestions=()=>{
        let {suggestions}=this.state;
        if (suggestions.length===0){
            return null;
        }
        return(
            <ul className="list-group">
                {
                    suggestions.map((item,index)=>(<li className="list-group-item" key={index} onClick={()=>this.selectedText(item)}>{item.name}</li>))
                }
            </ul>
        )
    }
    handleLocationSelection=()=>{
            const area= sessionStorage.getItem('area')
            
             this.props.history.push(`/filter/?area=${area}`);
             
         
    }
    render(){
        const{locations}=this.props;
        const{text}=this.state;
        return(
            <div>
                <div className="mainimage" style={{
                        backgroundImage: `url(${wallpaper})`,backgroundRepeat: 'no-repeat',height:'800px',backgroundPosition:'center',backgroundSize:'cover',width:'100%'
                    }}>
                        <img src={logo} className='logo'></img>
                        <div className="headings">Find the best restaurants, cafes, bars </div>
                        <div className="locationSelector">
                        <button type="button" class="btn btn-primary btn-sm " style={{'color': 'gray',
                                                                                    'backgroundColor': '#323232',
                                                                                   'borderColor': 'gray',
                                                                                    'margin-left': '10px',
                                                                                    'margin-top': '2px'}} onClick={this.handleLocationSelection}>search</button>
                            <select className="locationDropdown" onChange={this.handleChange}>
                                <option>Please select a city</option>
                                {locations.map((item,index)=>{
                                    return <option key={index} value={`${item.location_id}-${item.city_id}`}>{item.name}</option>
                                })}
                                
                            </select>
                            <div style={{float:'left'}}>
                                <input className="restaurantsinput" type="text"  onChange={this.onTextChange} value={text} placeholder="Type a Restaurant Name"/>
                                {this.renderSuggestions()}
                                <span className="glyphicon glyphicon-search search"></span>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Wallpaper);