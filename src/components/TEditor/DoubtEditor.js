import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './TEditor.css'



import { useState } from 'react';
import db, { time } from '../../firebase';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const config = {
    toolbar: {
        // items: [ 'bold', 'italic', '|', 'undo', 'redo','|',  'numberedList', 'bulletedList','|','link','insertTable','blockQuote' ],
        shouldNotGroupWhenFull: true
    },
  
};

function DoubtEditor() {
    const [{ user, selectedClass }, dispatch] = useStateValue();
    const [message,setMessage] = useState(null);
    const post = () => {
      
        if (message != null && message!="")
        db.collection("classes").doc(selectedClass.id).collection("doubts").add({
            "question": message,
            "displayName": user.displayName,
            "color": user.photoURL,
            "email": user.email,
            "status":false,
            "timeStamp": time
        }).then(()=>{
            dispatch({
                type: actionTypes.SET_MODAL,
                doubtModal: false,
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
                        {selectedClass?.isTeacher?(
                            <div className = "doubt__block__answer">
                                <button className="doubt__block__announcementButton">Reply</button>
                                <button className="doubt__block__announcementButton">Stream in Classroom</button>
                            </div>
                        ):(<button className  = "button" className = "doubt__block__announcementButton" onClick = {post}>ASK DOUBT</button>
                   )}
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

export default DoubtEditor;