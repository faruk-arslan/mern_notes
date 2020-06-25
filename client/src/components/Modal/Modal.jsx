import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal(props) {
    let titleInput, contentInput;
    let textarea;

    useEffect(() => {
        // adjust text area
        textarea = document.querySelector("#input_edit_content");
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        // manage click on modal screen
        const modalContainer = document.getElementById('modal_container');
        const modalCard = document.getElementById('modal_card');
        document.onclick = function (event) {
            // console.log(event)
            if (event.target === modalContainer) props.closeModal();

        };
        autoResizeTextArea();
    })

    function editNote(event) {
        titleInput = document.getElementById("input_edit_title");
        contentInput = document.getElementById("input_edit_content");

        console.log(`Title: ${titleInput.value}\nContent: ${contentInput.value}`);
        if (checkInputs()) {
            props.update(props.note.id, titleInput.value, contentInput.value)
        } else {
            console.log("fileds empty.")
        }
        event.preventDefault();
    }
    function checkInputs() {
        return ((titleInput.value || contentInput.value) ? true : false);
    }

    function autoResizeTextArea() {
        textarea = document.querySelector("#input_edit_content");
        textarea.addEventListener('input', autoResize, false);

        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }

    return (
        <div id="modal_container">
            <div class="card col-xl-4 col-lg-4 col-md-5 col-sm-8 col-10" id="modal_card">
                <div className="card-body" id="card_body_edit">
                    <form onSubmit={editNote} className="input-form" id="form_edit_note" autocomplete="off">
                        <h5 className="card-title">
                            <input type="text" className="form-control" id="input_edit_title" spellCheck="false" defaultValue={props.note.title}></input>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">
                            <textarea type="text" className="form-control" autoFocus id="input_edit_content" spellCheck="false" defaultValue={props.note.content}></textarea>
                        </p>
                        <button onClick={() => props.closeModal()} id="btn_modal_close">
                            <span class="material-icons">
                                close
                        </span>
                        </button>
                        <button id="btn_modal_save">
                            SAVE CHANGES
                        </button>
                        {/* <a href="#" onClick={() => props.delete(props.note.id)} class="card-link">
                        <span class="material-icons icon" id="icon_delete">
                            delete_forever
                        </span>
                    </a> */}
                        {/* <a href="#" onClick={() => props.openModal(props.note)} class="card-link">
                    <span class="material-icons icon" id="icon_edit">
                        create
                    </span>

                </a> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;