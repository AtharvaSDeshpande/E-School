import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../StateProvider'
import LandingPage from '../../LandingPage/LandingPage';
import Login from '../../Login/Login';
import './Stream.css'
import TEditor from './TEditor/TEditor';
import { Close } from '@material-ui/icons';
import Message from './Message/Message';
import db from '../../../firebase';

function Stream() {


     const [{ user, selectedClass }, dispatch] = useStateValue();
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        db.collection("classes").doc(selectedClass?.id).collection("stream").orderBy('timeStamp','desc').onSnapshot((snapshot)=>{
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
    },[selectedClass?.id])
   

    const [makeAnnouncement, setMakeAnnouncement] = useState(false);
    return (
        <div>
            {user != null && selectedClass != null ? (
                <div className="stream">
                    <div className="stream__theme">
                        <h1 className="stream__theme__header">{selectedClass.data.name}</h1>
                        <p className="stream__theme__para">{selectedClass.data.acadamicYear}</p>
                        <p className="stream__theme__para">{selectedClass.data.semester}</p>
                        {selectedClass.isTeacher ? (
                            <p className="stream__theme__para">Class code: {selectedClass.data.displayID}</p>
                        ) : null}
                        <p className="stream__theme__para">{selectedClass.data.displayName}</p>
                    </div>
                    <div className="stream__main">
                        <div className="stream__main__left">
                            <p className="stream__main__left__title">Upcomming</p>
                            <p className="stream__main__left__work">No work due soon</p>
                            <p className="stream__main__left__link">View all</p>
                        </div>
                        <div className="stream__main__right">
                            {makeAnnouncement?(
                                <div className = "announcement">
                                    <div className = "announcementClose"><Close className = "announcementCloseIcon" onClick = {()=>{setMakeAnnouncement(false)}}/></div>
                                    
                                    <TEditor/>
                                    
                                </div>
                            ):(
                                <div className="stream__main__right__announcement" onClick = {() => {setMakeAnnouncement(true)}}>
                                Announce something to your class
                            </div>
                            )}
                            {messages.map(message => (
                                 <Message email = {message.data.email} message = {message.data.message} photoURL= {message.data.color} displayName = {message.data.displayName} timestamp = {message.data.timeStamp} id = {message.id} />
                            ))}
                           
                            
                            
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {user == null ? (
                        <Login />
                    ) : (
                        <LandingPage />
                    )}
                </div>
            )
            }
           
                    
               
        </div>
    )
}

export default Stream
