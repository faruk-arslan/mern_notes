import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory 
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Notes from './components/Notes';
import NoteDetails from './components/NoteDetails';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import qs from 'qs';
import store from './redux/store';

function App() {
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  store.subscribe(() => console.log(store.getState()));

  // axios.get('/user/check').then(res=>{
  //   console.log(res)
  // });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    axios.get(
      '/user/check').then(result => {
        console.log(result.data)
        if (result.data) store.dispatch({ type: 'EXIST' });
        else store.dispatch({ type: 'EMPTY' });
        setLoading(false);
      });
  }, []);


  return (
    <Router>
      <Header/>
        {/* {(!store.getState() && !isLoading) ? <Redirect to="/login" /> : <Notes />} */}
        {!store.getState() && !isLoading && <Redirect to="/login" />}
        {store.getState() && !isLoading && <Redirect to="/notes" />}
      <Footer />
      

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/notes">
        <Notes />
      </Route>
      <Route path="/noteDetails">
        <NoteDetails />
      </Route>

      {/* {store.getState() && !isLoading && [
        <Header />,
        <Switch>,
          <Route path="/login">,
            <Login />,
          </Route>,
          <Route path="/notes">,
            <Notes />,
          </Route>,
          <Route path="/noteDetails">,
            <NoteDetails />,
          </Route>,
        </Switch>,
        <Footer />
      ]} */}


    </Router>
  );
}

export default App;
