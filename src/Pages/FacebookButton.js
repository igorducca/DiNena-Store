import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import  { Redirect, Switch } from 'react-router-dom'

import Home from './Home'
import './styles/fbButton.css'

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    // console.log(response);

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = console.log("Botão do Facebook Clickado");

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      return (
        document.getElementById('nativeLoginButton').hidden = true
      )
    } else {
      fbContent = (
        <FacebookLogin
          appId="373845040310689"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}