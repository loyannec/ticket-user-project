import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Account/Login.js';
import { Signup } from './components/Account/Signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';

import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-content">
            <Route exact path="/" component={Login}/>
            <Route exact path ="/signup" component={Signup}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/dashboard/ticket' component={Dashboard} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
