import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID = '542477020345-o59ni398tb0o1ulbf6hsckd85m835mam.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    console.log(response)

    document.getElementById('username').innerHTML = `Prazer em te conhecer, ${response.profileObj.givenName}`
    document.getElementById('googleButtonDiv').hidden = true

    document.getElementById('enterIcon').hidden = false

    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Falha no login!')
  }

  handleLogoutFailure (response) {
    alert('Falha ao sair da conta!')
  }

  render() {
    return (
    <div id="googleButtonDiv">
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }

    </div>
    )
  }
}

export default GoogleBtn;