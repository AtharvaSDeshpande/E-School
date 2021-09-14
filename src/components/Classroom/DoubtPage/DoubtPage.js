import React,{useState, useEffect} from 'react'
import './DoubtPage.css'
import LandingPage from '../../LandingPage/LandingPage';
import Login from '../../Login/Login';

import { useStateValue } from '../../../StateProvider';
import Doubts from '../Dashboard/Doubts/Doubts';
import DoubtEditor from '../../TEditor/DoubtEditor';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { actionTypes } from '../../../reducer';
import { CloseSharp } from '@material-ui/icons';
import db from '../../../firebase';

function DoubtPage() {
    const [{ user, selectedClass, doubtModal }, dispatch] = useStateValue();
    const getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: '50%',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }))
    const styles = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const handleModalClose = () => {
        dispatch({
            type: actionTypes.SET_MODAL,
            doubtModal: false,
        })
    }
    const [doubts,setDoubts] = useState([]);
    useEffect(()=>{
        db.collection("classes").doc(selectedClass?.id).collection("doubts").orderBy('timeStamp', 'desc').onSnapshot((snapshot) => {
            setDoubts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
    },[])
    return (
        <div >
            {user != null && selectedClass != null ? (
                <div className="doubtPage">
                    <div className="doubtPage__theme">
                        <h1 className="doubtPage__theme__header">{selectedClass.data.name}</h1>
                        <p className="doubtPage__theme__para">{selectedClass.data.acadamicYear}</p>
                        <p className="doubtPage__theme__para">{selectedClass.data.semester}</p>
                        {selectedClass.isTeacher ? (
                            <p className="doubtPage__theme__para">Class code: {selectedClass.data.displayID}</p>
                        ) : null}
                        <p className="doubtPage__theme__para">{selectedClass.data.displayName}</p>
                    </div>
                    {doubts.map(doubt => (
                    <div className="doubtPage__main">
                        <div className="doubtPage__block">
                            <div className="doubtPage__block__title">
                                <div>Date: {new Date(doubt.data?.timeStamp?.toDate()).toDateString()}</div>
                                <div>Status: {doubt.data.status?"Solved":"Unsolved"}</div>
                            </div>
                            {selectedClass?.isTeacher ? (
                                <div className="doubtPage__block__title">
                                    <div>Name: {doubt.data.displayName}</div>
                                    <div>Email: {doubt.data.email}</div>
                                </div>
                            ) : null}

                            <div className="doubt__block__question">
                                <div>Question:</div>
                                <div dangerouslySetInnerHTML={{ __html: doubt.data.question }}></div>
                            </div>
                            <div className="doubtPage__block__answer">
                                <button className="doubtPage__block__announcementButton" onClick={() => {
                                        dispatch({
                                            type: actionTypes.SET_MODAL,
                                            doubtModal: true,
                                        })}}
                                >Reply</button>
                            </div>
                        </div>
                    </div>
                    ))}
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
            <Modal
                open={doubtModal}
                onClose={handleModalClose}
            >

                <div style={modalStyle} className={styles.paper}>

                    <div className="block__doubtModal__top"><CloseSharp className="block__nav__icon" onClick={handleModalClose} /></div>
                    <DoubtEditor />
                </div>
            </Modal>
        </div>

    )
}

export default DoubtPage
