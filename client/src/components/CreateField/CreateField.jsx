import React, { useState, useEffect } from 'react';
import qs from 'qs';
import './CreateField.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useHistory
} from "react-router-dom";
import 'material-design-icons/iconfont/material-icons.css';

function CreateField(props) {
    const history = useHistory();
    let titleInput, contentInput;

    function createNote(event) {
        titleInput = document.getElementById("title_input");
        contentInput = document.getElementById("content_input");

        console.log(`Title: ${titleInput.value}\nContent: ${contentInput.value}`);
        if (checkInputs()) {
            props.add(titleInput.value, contentInput.value)
        } else {
            console.log("fileds empty.")
        }
        event.preventDefault();
    }
    function checkInputs() {
        return ((titleInput.value || contentInput.value) ? true : false);
    }

    return (
        <form onSubmit={createNote} className="input-form" autocomplete="off">
            <div className="form-group">
                <input type="text" className="form-control" id="title_input" placeholder="Title"></input>
            </div>
            <div className="form-group">
                <textarea className="form-control" id="content_input" placeholder="Content" rows="3"></textarea>
            </div>
            <button type="submit" id="add-button" class="btn btn-primary">
                <span id="fab-add" class="material-icons">
                    add
                </span>
            </button>
        </form>
    );
}

export default CreateField;