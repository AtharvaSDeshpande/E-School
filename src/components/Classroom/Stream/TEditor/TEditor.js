import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './TEditor.css'
import Header from '../../Header/Header';
import { useStateValue } from '../../../../StateProvider';
import Login from '../../../Login/Login';
import LandingPage from '../../../LandingPage/LandingPage';
import { useState } from 'react';

const config = {
    toolbar: {
        // items: [ 'bold', 'italic', '|', 'undo', 'redo','|',  'numberedList', 'bulletedList','|','link','insertTable','blockQuote' ],
        shouldNotGroupWhenFull: true
    }
};
// const editorConfiguration = {
//     plugins: [ Essentials, Bold, Italic, Paragraph ],
//     toolbar: [ 'bold', 'italic' ]
// toolbarGroups = [
// 	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
// 	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
// 	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
// 	{ name: 'forms' },
// 	'/',
// 	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
// 	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
// 	{ name: 'links' },
// 	{ name: 'insert' },
// 	'/',
// 	{ name: 'styles' },
// 	{ name: 'colors' },
// 	{ name: 'tools' },
// 	{ name: 'others' },
// 	{ name: 'about' }
// ];
// };
function TEditor() {
    const  [{ user, selectedClass }, dispatch] = useStateValue();
    const [message,setMessage] = useState();
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
                        <button className  = "button" className = "announcementButton">POST</button>
                    </div>
                    <div dangerouslySetInnerHTML = {{__html: message}}>
                        {/* {message} */}
                    </div>
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