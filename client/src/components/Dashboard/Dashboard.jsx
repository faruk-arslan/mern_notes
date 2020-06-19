import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CreateField from '../CreateField/CreateField';
import Notes from '../Notes/Notes';
import axios from 'axios';
import qs from 'qs';

function Dashboard() {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    axios.get(
      '/notes/all').then(result => {
        setNotes(result.data)
        // console.log(result.data)
      });
  }, []);

  function addNote(title, content) {
    const data = qs.stringify({
      title: title,
      content: content
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.post(
      '/notes/add',
      data,
      headers
    ).then(result => {
      console.log(result);
      if (!result.data.value) {
        console.log("Oops!");
      } else {
        console.log("Yay!");
        // add new note into the notes array thus UI will be updated
        setNotes(prevNotes => {
          return [...prevNotes, result.data.newItem];
        })
      }
    })
  }

  function updateNote(id) {
    console.log(`update- id: ${id}`);
  }

  function deleteNote(id) {
    // console.log(`delete- id: ${id}`);
    const data = qs.stringify({
      noteId: id,
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.delete(
      '/notes/delete',
      data,
      headers
    ).then(result => {
      console.log(result);
      if (!result.data.value) {
        console.log("Oops!");
      } else {
        console.log(result.data.msg);
        setNotes(prevNotes=>{
          return ([...prevNotes].filter(item=> item.id !== id));
        })
      }
    })
  }

  return (
    <div>
      <Header />
      <CreateField add={addNote} />
      {notes.map((note, index) => {
        return (<Notes note={note} key={index} id={index}
          update={updateNote} delete={deleteNote}
        />)
      })}
      <Footer />
    </div>
  );
}

export default Dashboard;
