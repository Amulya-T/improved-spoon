import React from 'react';
import {withRouter}from 'react-router-dom';
import '../Styles/Home.css';

class QuickSearch extends React.Component{
    handleClick(mealtype){
       const area= sessionStorage.getItem('area')
       
        this.props.history.push(`/filter/?mealtype_id=${mealtype}&&area=${area}`);
        
    }
    render(){
        const{mealtypes}=this.props;
        return(
            <div>
                <div className="container" >
                            <div className='row'>
                                {mealtypes.map(item=>{ 
                                  return(
                                    <div  className='col-lg-4 col-md-6 col-sm-4' >
                                        <div className='tileContainer'onClick={()=>{this.handleClick(item.mealtype)}}>
                                            <div className='tileComponent1'>
                                            {item.name}
                                            </div>
                                            <div className='tileComponent2'>
                                                <img src={item.image} className='images'/>
                                            </div>
                                        </div>
                                    </div>)}
                                )}
                                  
                                 
                            </div> 
                </div>
            </div>  
                                  
                                
                            
                               
                    
                    
                
           
           
        )
    }
}
export default withRouter(QuickSearch);