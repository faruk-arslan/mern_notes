import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import './Header.css';

function Header(props) {

    return (
        <nav className="navbar navbar-expand-lg">
            <Link id="dashboard_link" to="/dashboard">Notes</Link>
            &nbsp;
            <a href="#" onClick={props.logout} id="logout_link" >
                <span class="material-icons" id="icon_logout">
                    exit_to_app
                </span>
                Logout
            </a>
        </nav>
    );
}

export default Header;
