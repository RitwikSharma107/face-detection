import React from 'react';
import "./Navigation.css";


const Navigation = ({onRouteChange , isSignedIn}) =>  {
  if(isSignedIn){
    return(
      <nav>
        <p 
        id="sign" 
        onClick={() => onRouteChange("signout")}
        className='f3 link black underline pa3 pointer'>Sign Out</p>
    </nav>
    );
  }else{
    return(
      <nav>
        <p 
        id="sign" 
        onClick={() => onRouteChange("signin")}
        className='f3 link black underline pa3 pointer'>Sign In</p>
         <p 
        id="sign" 
        onClick={() => onRouteChange("register")}
        className='f3 link black underline pa3 pointer'>Register</p>
    </nav>
    );
  }
    
  
}

export default Navigation;