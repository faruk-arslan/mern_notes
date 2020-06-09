import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Notes from './components/Notes';
import NoteDetails from './components/NoteDetails';
import Login from './components/Login';
import axios from 'axios';
import qs from 'qs';


function App() {
  const [notes, setNotes] = useState([]);
  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {

    const data = qs.stringify({
      email: 'user1@q.com',
      password: 'pwd123'
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.post(
      '/user/login',
      data,
      headers
    ).then(result => {
      console.log(result);
      axios.get("/notes/all")
        .then(res => console.log(res));
    });

  });




  return (
    <Router>
      <Header />
      
      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/noteDetails">
          <NoteDetails />
        </Route>
      </Switch>

      <Footer />

    </Router>
  );
}

export default App;
