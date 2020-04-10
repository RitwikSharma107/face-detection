import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

//Get API key for face detection
const app = new Clarifai.App({
  apiKey: 'd7e92ee3fcf441b58d90791397b50ba5'
 });

//Display Particles 
const particlesOptions = { 
  "particles":{"number":{"value":80,"density":{"enable":true,"value_area":1000}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},
  "interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},
  "retina_detect":true
}

//Initial state of image display
const initialState ={
  input:"",
  imageUrl:"",
  box:{},
  route:"signin",
  isSignedIn: false,
  user:
  {
        "id":"",
        "name":"",
        "email":"",
        "entries":0,
        "joined":"" 
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }


  /* Connect FrontEnd and BackEnd */

  // componentDidMount(){
  //   fetch("http://localhost:3000/")
  //     .then(response => response.json())
  //     .then(console.log);
  // }


  loadUser = (data) => {
    this.setState(
      {user:{
        "id":data.id,
        "name":data.name,
        "email":data.email,
        "entries":data.entries,
        "joined":data.joined 
      }}
    )
  }

  calcFaceLoc = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const height = Number(image.height);
      const width = Number(image.width);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height) 
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => {
      if(response){
        fetch("https://hidden-ridge-54437.herokuapp.com/image" , {
            method:"put",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(
                {
                    id: this.state.user.id
                }
            )
        })
        .then(response => response.json())
        .then(count => {this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }  
      this.displayFaceBox(this.calcFaceLoc(response))
    })
    .catch(err => console.log.err)
}

  onRouteChange = (route) => {
    if(route==="signout"){
      this.setState(initialState)
    }else if(route==="home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route==="home"
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <Logo/>
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div> 
          :
          (
            this.state.route==="register"
          ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
        }
      </div>
    );
  }
  
}

export default App;
