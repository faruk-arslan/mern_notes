import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import store from '../redux/store';
import axios from 'axios';
import qs from 'qs';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useHistory
} from "react-router-dom";

function Login() {
    const history = useHistory();
    let emailInput, passwordInput;

    function login(event) {
        emailInput = document.getElementById('email_input');
        passwordInput = document.getElementById('password_input');
        if (checkForm()) makeRequest();
        event.preventDefault();
    }

    function makeRequest() {
        const data = qs.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        axios.post(
            '/user/login',
            data,
            headers
        ).then(result => {
            if (!result.data.value) {
                document.getElementById('backend-error').style.visibility = 'visible';
                document.getElementById('backend-error').innerHTML = result.data.msg;
            } else {
                history.push("/notes");
            }
            console.log(result);

        });
    }

    function checkForm() {
        const elements = [];
        // check mail
        const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mailFound = emailInput.value.match(mailRegex);
        // check password
        const passwordRegex=/^(?!\s*$).+/;
        const passwordFound=passwordInput.value.match(passwordRegex);

        elements.push(mailFound ? { type: emailInput, status: true } : { type: emailInput, status: false });
        elements.push(passwordFound ? {type:passwordInput,status:true} : {type:passwordInput,status:false});

        changeElementStyle(elements);
        if (mailFound && passwordFound) return true;
        else return false;
    }

    function changeElementStyle(elements) {
        // remove back-end error in case if it exist
        document.getElementById('backend-error').style.visibility = 'hidden';
        // make necessary UI changes with front-end control results
        elements.map(el => {
            switch (el.status) {
                case true:
                    el.type.classList.remove('is-invalid');
                    // el.type.classList.add('is-valid');
                    break;
                case false:
                    el.type.classList.remove('is-valid');
                    el.type.classList.add('is-invalid');
                    break;
                default:
                    el.type.classList.remove('is-valid');
                    el.type.classList.remove('is-invalid');
                    break;
            }
        })
    }


    return (
        <div>
            {/* <form onSubmit={login}> */}
            <div className="container">
                <div className="login-col col-xl-5 col-lg-5 col-md-6 col-sm-8 col-10">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email_input" aria-describedby="emailHelp"></input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            <div class="invalid-feedback" id="email-feedback">
                                Please enter a valid email.
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="password_input"></input>
                            <div class="invalid-feedback">
                                Please provide a password (without whitespace).
                            </div>
                        </div>
                        {/* <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <div id="backend-error"></div>
                        <button type="submit" className="btn btn-primary submitButton">Login</button>
                        <div class="form-bottom-span">
                            <span className="small-text">Don't have an account?</span>&nbsp;
                            <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* </form> */}
        </div>
    );
}

export default Login;
