import React, { useState, useEffect } from 'react';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="footer">
            <h6>FA Tech ⓒ {year}</h6>
        </div>
    );
}

export default Footer;
