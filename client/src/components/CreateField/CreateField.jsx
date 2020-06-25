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
            <div className="create-col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-10">
                <form onSubmit={createNote} className="input-form" id="form_create_note" autocomplete="off">
                    <div className="form-group" id="fg-create">
                        <input type="text" className="form-control fc-create" id="title_input" placeholder="Title"></input>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control fc-create" id="content_input" placeholder="Content" rows="3"></textarea>
                    </div>
                    <button type="submit" id="add-button" class="btn btn-primary">
                        <span id="fab-add" class="material-icons">
                            add
                </span>
                    </button>
                </form>
            </div>
    );
}

export default CreateField;