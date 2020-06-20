import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

function Header() {

    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/notes">Notes</Link>
            &nbsp;
            <Link to="/noteDetails">Details</Link>
            {/* <a className="navbar-brand" href="/">Notes</a> */}
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/noteDetails">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#">Features</a>
                    <a className="nav-item nav-link" href="#">Pricing</a>
                    <a className="nav-item nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </div>
            </div> */}
        </nav>
    );
}

export default Header;