import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import ConfirmationBox from './components/ConfirmationBox/ConfirmationBox';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import SignUp from './components/SignUp/SignUp';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
// const nodemailer = require('nodemailer');

const app = new Clarifai.App({
 apiKey: '<Your Key>'
});

const particleParameters = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
       value: "#000000"
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    },
    move: {
      speed: 6
     }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      boxs: [],
      route: 'Signin',
      isSignedIn: false,
      del: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined:'',
      }
    }


class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }
 
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      
    }});
  }

  calculateFaceLocation = (datas) => {
    const clarifaiFace = datas.outputs[0].data.regions;//[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return (
      clarifaiFace.map(region => {
        const face = region.region_info.bounding_box;
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height),     
        }
      })
    );
  }

  displayFaceBox = (boxs) => {
    //console.log(boxs);
    this.setState({boxs: boxs},() => console.log(boxs));
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))   
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'SignOut')
      this.setState(initialState);
    else if(route === 'Home')
      this.setState({isSignedIn: true});
    else if(route === 'Delete'){      
      this.setState({del: true});
      route='Home';
    } 
    else if(route === 'stayHome') {
      this.setState({del: false});
      route = 'Home';
     } 
    this.setState({route: route});
  }

 /* onForgotPassword = () => {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'omlqdtswao5a4tri@ethereal.email',
            pass: 'KBwjVReDtCQSZwbB1Z'
        }
        });

          // setup email data with unicode symbols
      let mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: 'bar@example.com, baz@example.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

    });
  }*/

  render() {
    const {isSignedIn, imageUrl, route, boxs, del} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particleParameters}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'Home' 
          ? <div> 
              <Logo />
              <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries}
              />
              <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
               boxs={boxs}
               imageUrl={imageUrl}/>
            </div>  
          : 
            (
             route === 'Signin'
             ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
             : <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>

            )
        }
        { del === true
          ? 
          <ConfirmationBox onRouteChange={this.onRouteChange} del={this.state.del}/>
          :
          <div>.</div>
        }
            </div>
    );
  }
}

export default App;