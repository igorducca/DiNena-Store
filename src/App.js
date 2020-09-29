import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home'
import Estoque from './Pages/Estoque'
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/estoque" component={Estoque} exact/>
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;