import React, { useState, useEffect } from 'react';
import './Notes.css';
import 'material-design-icons/iconfont/material-icons.css';

function Notes(props) {
    // console.log(props)


    return (
        <div class="card" id="note_card">
            <div className="card-body" id="note_card_body">
                <h5 className="card-title">{props.note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">{props.note.content}</p>
                <a href="#" onClick={() => props.delete(props.note.id)} class="card-link">
                    <span class="material-icons icon" id="icon_delete">
                        delete_forever
                    </span>
                </a>
                <a href="#" onClick={() => props.openModal(props.note)} class="card-link">
                    <span class="material-icons icon" id="icon_edit">
                        create
                    </span>
                    
                </a>
            </div>
        </div>
    );
}

export default Notes;
