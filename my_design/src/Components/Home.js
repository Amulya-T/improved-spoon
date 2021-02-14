
import React from 'react';
import axios from 'axios';
import Wallpaper from '../Components/wallpaper';
import QuickSearch from '../Components/Quicksearch';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount(){
        axios({
            method:"GET",
            url:"http://localhost:3456/api/location",
            headers:{'Content-Type':'application/json'}

        }).then(response=>this.setState({locations:response.data.location}))
          .catch(err=>console.log(err))
        
          axios({
            method:"GET",
            url:"http://localhost:3456/api/mealtypes",
            headers:{'Content-Type':'application/json'}

        }).then(response=>this.setState({mealtypes:response.data.location}))
          .catch(err=>console.log(err))

    }
   
    render(){
        const{locations,mealtypes}=this.state;
        return(
            <div>
               <React.Fragment>
               <Wallpaper locations={locations} />
               <QuickSearch mealtypes={mealtypes}/> 
               </React.Fragment>    
                        
            </div>
        )
    }
}
export default Home;