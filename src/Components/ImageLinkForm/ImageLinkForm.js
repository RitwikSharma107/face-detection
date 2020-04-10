import React from 'react';
import "./ImageLinkForm.css";


const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>  {
  return (
    <div>
        <p id="indication" className="f3 center">
            Enter any image URL for face detection,
        </p>
        <div className="center">
              <input type='text' onChange={onInputChange}></input>
              &nbsp;&nbsp;&nbsp;
              <button onClick={onButtonSubmit}>Detect</button>  
        </div>
    </div>
  );
}

export default ImageLinkForm;