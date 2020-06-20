import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory 
} from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import axios from 'axios';
import qs from 'qs';
import store from './redux/store';

function App() {
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  store.subscribe(() => console.log(store.getState()));
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    axios.get(
      '/user/check').then(result => {
        // console.log(result.data)
        if (result.data) store.dispatch({ type: 'EXIST' });
        else store.dispatch({ type: 'EMPTY' });
        setLoading(false);
      });
  }, []);


  return (
    <Router>
      {store.getState() && !isLoading && <Redirect to="/dashboard" />}
      {!store.getState() && !isLoading && <Redirect to="/login" />}
      
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>

    </Router>
  );
}

export default App;
