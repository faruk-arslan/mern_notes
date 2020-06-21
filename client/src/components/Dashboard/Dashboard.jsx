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
import Modal from '../Modal/Modal';
import axios from 'axios';
import qs from 'qs';
import store from '../../redux/store';

function Dashboard() {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  const [modalData, setModalData] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    axios.get(
      '/notes/all').then(result => {
        if (!result.data.value && result.data.msg === "Redirect to login.") {
          history.replace("/login");
        } else {
          setNotes(result.data.items)
        }

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
        history.replace("/login");
      } else {
        // add new note into the notes array thus UI will be updated
        setNotes(prevNotes => {
          return [...prevNotes, result.data.newItem];
        })
      }
    })
  }
  function updateNote(id, title, content) {
    const data = qs.stringify({
      noteId: id,
      title: title,
      content: content
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.put(
      '/notes/update',
      data,
      headers
    ).then(result => {
      console.log(result);
      if (!result.data.value) { history.replace("/login"); }
      else {
        setNotes(prevNotes => {
          const updatedArray = prevNotes.map(item => {
            if (item.id === id) {
              item.title = title;
              item.content = content
            }
            return item;
          })
          return (updatedArray);
        })
        exitModal();
      }
    })
  }

  function triggerModal(note) {
    setModalData(note)
    setModalOpen(!isModalOpen)
  }
  function exitModal() {
    setModalOpen(!isModalOpen)
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
      if (!result.data.value) { history.replace("/login"); }
      else {
        setNotes(prevNotes => {
          return ([...prevNotes].filter(item => item.id !== id));
        })
      }
      // // user could not found, redirect to login
      // if (!result.data.value && result.data.msg==="Redirect to login.") {
      //   history.replace("/login");
      // } 
      // // note deleted successfully
      // else if(result.data.value){
      //   setNotes(prevNotes=>{
      //     return ([...prevNotes].filter(item=> item.id !== id));
      //   })
      // }
      // // something went wrong
      // else {
      //   console.log("Something went wron when deleting the note.")
      // }
    })
  }

  function logoutUser() {
    axios.get('/user/logout').then(resp => {
      if (!resp.data.value) {history.replace('/login');}
      else {
        store.dispatch({ type: 'EMPTY' });
        history.replace('/login');
      }
    })
  }

  return (
    <div>
      <Header logout={logoutUser} />
      <CreateField add={addNote} />
      {notes.map((note, index) => {
        return (<Notes note={note} key={index} id={index}
          openModal={triggerModal} delete={deleteNote}
        />)
      })}
      {isModalOpen && <Modal note={modalData} delete={deleteNote}
        update={updateNote} closeModal={exitModal}
      />}
      <Footer />
    </div>
  );
}

export default Dashboard;
