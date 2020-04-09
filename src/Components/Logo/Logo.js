import React from 'react';
import Tilt from 'react-tilt';
import Image from './Logo.png';
import "./Logo.css";


const Logo = () =>  {
  return (
    <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-5" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> <img alt="logo" src={Image}/> </div>
        </Tilt>
    </div>
  );
}

export default Logo;