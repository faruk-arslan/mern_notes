import React, { useState, useEffect } from 'react';
import './Notes.css';

function Notes(props) {
    console.log(props)
        

    return (
        <div class="card">
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">{props.note.content}</p>
                <a href="#" onClick={() => props.update(props.id)} class="card-link">Card link</a>
                <a href="#" onClick={() => props.delete(props.id)} class="card-link">Another link</a>
            </div>
        </div>
    );
}

export default Notes;
