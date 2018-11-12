import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; //A reaact component that provides application with the store, which holds the state
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
      <div className="App">
      <Navbar />
        <Route exact path="/" component={ Landing } />
        <div className="container">
        <Route exact path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        </div>
        <Footer />
        <h1>My React App</h1>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
