import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './TEditor.css'
import Header from '../../Header/Header';
import { useStateValue } from '../../../../StateProvider';
import Login from '../../../Login/Login';
import LandingPage from '../../../LandingPage/LandingPage';
import { useState } from 'react';
import db, { time } from '../../../../firebase';
import { actionTypes } from '../../../../reducer';

const config = {
    toolbar: {
        // items: [ 'bold', 'italic', '|', 'undo', 'redo','|',  'numberedList', 'bulletedList','|','link','insertTable','blockQuote' ],
        shouldNotGroupWhenFull: true
    },
    link: {
        target: "_blank",
    }
};

function TEditor() {
    const [{ user, selectedClass }, dispatch] = useStateValue();
    const [message,setMessage] = useState(null);
    const post = () => {
        if (message != null && message!="")
        db.collection("classes").doc(selectedClass.id).collection("stream").add({
            "message": message,
            "displayName": user.displayName,
            "color": user.photoURL,
            "email": user.email,
            "timeStamp": time
        }).then(()=>{
            setMessage(null)
            dispatch({
                type: actionTypes.SET_ANNOUNCEMENT,
                makeAnnouncement: false,
            })
        })
    }
        return (
            <div className="App">
                {user != null && selectedClass != null ? (
                    <div><CKEditor
                        className="ckeditor"
                        
                        editor={ClassicEditor}
                        config = {config}
                        data=""
                        onReady={editor => {
                            // // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setMessage(editor.getData())
                            console.log(message);
                        }}
                        onBlur={(event, editor) => {
                            const data = editor.getData();
                            setMessage(editor.getData())
                            console.log(message);
                        }}
                        onFocus={(event, editor) => {
                            const data = editor.getData();
                            setMessage(editor.getData())
                            console.log(message);
                        }}
                    />
                    <div className = "button__container">
                        <button className  = "button" className = "announcementButton" onClick = {post}>POST</button>
                    </div>
                    {/* <div dangerouslySetInnerHTML = {{__html: message}}>
                   
                    </div> */}
                    </div>) : (
                    <div>
                        {user == null ? (
                            <Login />
                        ) : (
                            <LandingPage />
                        )}
                    </div>
                )}
            </div>
        );
    
}

export default TEditor;