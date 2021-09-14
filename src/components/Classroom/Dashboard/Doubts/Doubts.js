import { Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../../StateProvider';
import LandingPage from '../../../LandingPage/LandingPage';
import Login from '../../../Login/Login';
import './Doubts.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { CloseSharp } from '@material-ui/icons';
import DoubtEditor from '../../../TEditor/DoubtEditor';
import { actionTypes } from '../../../../reducer';
import db from '../../../../firebase';

function Doubts() {
    const [{ user, selectedClass, dashboard, doubtModal }, dispatch] = useStateValue();
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
    const [myDoubts,setDoubts] = useState([]);
    useEffect(()=>{
        db.collection("classes").doc(selectedClass?.id).collection("doubts").where("email","==",user.email).orderBy('timeStamp', 'desc').onSnapshot((snapshot) => {
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

            {user != null && selectedClass != null && !selectedClass.isTeacher ? (
                <div className="doubts">
                    <div className="doubts__title">
                        <h1 className="doubts__title_header">My Doubts</h1>
                        <Tooltip title="New Doubt"><Add className="doubts__title_add" onClick={() => {

                            dispatch({
                                type: actionTypes.SET_MODAL,
                                doubtModal: true,
                            })
                        }} /></Tooltip>
                    </div>
                    {myDoubts.map(myDoubt => (
                       
                        <div className="doubtBlocks">
                             {console.log(myDoubt)}
                        <div className="doubt__block">
                            <div className="doubt__block__title">
                                {/*  */}
                                <div>Date: {new Date(myDoubt.data?.timeStamp?.toDate()).toDateString()}</div>
                                <div>Status: {myDoubt.data.status?"Solved":"Unsolved"}</div>
                            </div>

                            <div className="doubt__block__question">
                                <div>Question:</div>
                                <div dangerouslySetInnerHTML={{ __html: myDoubt.data.question }}></div>
                            </div>
                            {myDoubt.data.status?(<div className="doubt__block__answer"></div>):null}
                            
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

export default Doubts
