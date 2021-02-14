import React from 'react';
import Modal from 'react-modal';

import axios from 'axios';
import '../Styles/Header.css';
import logo from '../assets/logo.jpg';
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
            width               : '30%',
            height              : '60%',

    }
}

class Header extends React.Component{
    constructor(){
        super();
        this.state={
            signUpModalIsOpen:false,
            loginModalIsOpen:false,
            isLoggedIn:false,
            userData:{},
            FN:"",
            LN:"",
            email:"",
            pwd:""
        }
    }
    signUp=()=>{
        this.setState({signUpModalIsOpen:true})
    }
    login=()=>{
        this.setState({loginModalIsOpen:true})
    }
    onCloseModal = () => {
        this.setState({ signUpModalIsOpen: false });
    };

    onCloseModalclose = () => {
        this.setState({ loginModalIsOpen: false });
    };
    
    handleChange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }
    handleSignUp=()=>{
        const {FN,LN,email,pwd}=this.state;
        const signUpObj={
            firstName:FN,
            lastName:LN,
            email:email,
            password:pwd
        };
        axios({
            method:'POST',
            url:'http://localhost:3456/api/signup',
            headers:{'Content-Type':'application/json'},
            data:signUpObj
        })
        .then(response=>{
            if(response.data.message=="user signedUp successfully"){
                alert(response.data.message)  
                this.setState({
                    signUpModalIsOpen:false,
                    FN:"",
                    LN:"",
                    email:"",
                    pwd:""
                });
                
            }
        }).catch(err=>console.log(err))
    }
    handlingLogin=()=>{
        const{email,pwd,userData}=this.state;
        const loginObj={
            email:email,
            password:pwd
        }
        axios({
            method:"post",
            url:"http://localhost:3456/api/login",
            headers:{'Content-Type':'application/json'},
            data:loginObj
        }).then(res=>{
           
            this.setState({userData:res.data.user[0],
                           isLoggedIn:res.data.isAuthenticated,
                           loginModalIsOpen:false,
                           email:"",
                           pwd:"",})
            alert(res.data.message);
            const{isLoggedIn,userData}=this.state;
           sessionStorage.setItem('isLoggedIn',isLoggedIn)
           sessionStorage.setItem('userId',userData._id)
           
            
         
           
           console.log(userData)
        }).catch(err=>{
            console.log(err)
        })

    } 
    handleLogout=()=>{
        this.setState({isLoggedIn:false })
    }
    
    
    render(){
        const {signUpModalIsOpen,loginModalIsOpen ,FN,LN,email,pwd,isLoggedIn,userData}=this.state;
        return(
            <div>
                <div style={{backgroundColor:'#fdd835',width:'100%',height:'75px'}}>
                    <img src={logo} style={{height:'70px',width:'70px',position:"absolute",left:'3%',borderRadius:'50%'}}></img>
                   {isLoggedIn==false ?  <div className='buttons'>
                    
                            <button onClick={this.login}  className='login'>Login</button>
                            <button onClick={this.signUp} className='create_account'>Create Account</button>
                            
                            </div>:<div className="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle userbtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {userData.firstName}<i class='far fa-user-circle' style={{'width':'30px'}}></i>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{'paddingLeft': '25px',
                                                                                                                            'backgroundColor': 'black',
                                                                                                                           'color': 'gray'}}>
                                            <div>First Name
                                            <div className="dropdown-item" >{userData.firstName}</div>
                                            </div>
                                            <div>Last Name
                                            <div className="dropdown-item"  >{userData.lastName}</div>
                                            </div>
                                            <div>Email
                                            <div className="dropdown-item" >{userData.email}</div>
                                            </div>
                                            <button class="btn btn-primary btn-sm " onClick={this.handleLogout}>Logout</button>
                                        </div>
                                        </div>}
                
                </div>
                
                 {/* Sign up model */}

                 <Modal isOpen={signUpModalIsOpen}
                        style={customStyles} >
                    <div className="modal-body">
                    <button type="button" class="close" aria-label="Close" onClick={this.onCloseModal} style={{'color':'gray'}}>
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                        <h2>Get Started Absolutely Free!</h2>
                        <span className="subtitle">No credit card needed</span>
                        <form className="contact-form form-validate3" novalidate="novalidate">
                            <div className="form-group">
                                <input className="form-control" type="text" name="name" id="name" placeholder="First Name" required  value={FN}  onChange={(event)=>this.handleChange(event,'FN')}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" name="name" id="name" placeholder="Last Name" required   value={LN}  onChange={(event)=>this.handleChange(event,'LN')} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" name="email" placeholder="E-mail" required  value={email}  onChange={(event)=>this.handleChange(event,'email')}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="pass" className="form-control" placeholder="Password" required  value={pwd}  onChange={(event)=>this.handleChange(event,'pwd')} />
                            </div>
                            <input className="btn btn-md btn-primary btn-center" id="sign_up" type="button" value="Sign Up" onClick={this.handleSignUp}  />
                        </form>
                    </div>
                </Modal>

                {/* <!-- signUp End -->
                <!-- login --> */}
               
                <Modal isOpen={loginModalIsOpen} 
                       style={customStyles}>
                
                <div className="modal-body">
                <button type="button" class="close" aria-label="Close" onClick={this.onCloseModalclose} style={{'color':'gray'}}>
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                    <h2>Login and Get Started</h2>
                    <span className="subtitle">Just fill in the form below</span>
                    <form className="contact-form form-validate4" novalidate="novalidate">
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autocomplete="off" aria-required="true" value={email}  onChange={(event)=>this.handleChange(event,'email')} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="pass" className="form-control" placeholder="Password" required="" autocomplete="off" aria-required="true" value={pwd}  onChange={(event)=>this.handleChange(event,'pwd')} />
                        </div>
                        <input className="btn btn-md btn-primary btn-center" id="login_btn" type="button" value="Login"  onClick={this.handlingLogin} />
                    </form>
                </div>
            </Modal>
           
                
            </div>
        )
    }
}
export default Header;