import { CheckCircle, Close, CloseSharp, Dashboard, Forum, VideoCall } from '@material-ui/icons'
import React, { useState } from 'react'
import './Block.css'

import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { actionTypes } from '../../reducer';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DoubtEditor from '../TEditor/DoubtEditor';
import { useStateValue } from '../../StateProvider';
function Block({ myClass }) {

    var id = myClass.id;
    var myClassName = myClass?.data.name;
    var semester = myClass?.data?.semester;
    var acadamicYear = myClass?.data?.acadamicYear;
    var displayName = myClass?.data?.displayName;
    var isTeacher = myClass?.isTeacher;
    var active = myClass?.data?.active;
    const [{ selectedClass,doubtModal }, dispatch] = useStateValue();
    const setClass = () => {
        // console.log(myClass)
        dispatch({
            type: actionTypes.SET_CLASS,
            selectedClass: myClass,
        })
    }
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
    return (
        <div className="block">
            <div className={`block__title ${isTeacher && 'created'}`}>
                <Link to="/class" className="link" onClick={setClass}><h1 className="block__title__header">{myClassName}</h1></Link>
                <p className="block__title_details">{acadamicYear + " " + semester}</p>
                <p className="block__title_details">{displayName}</p>

            </div>
            <div className="block__todo">

            </div>
            <div className="block__nav">
                {isTeacher ? (
                    active ?
                        (
                            <Link className="block__nav__link"><Tooltip title="Rejoin Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`} /></Tooltip></Link>
                        ) :
                        (<Tooltip title="Start Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`} /></Tooltip>)
                ) : (
                    active ? (<Tooltip title="Join Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`} /></Tooltip>) : (<VideoCall className={`block__nav__icon disabled`} />)
                )}
                {isTeacher ? (
                    active ?
                        (
                            <Tooltip title="End Meeting"><Close className="block__nav__icon danger" /></Tooltip>
                        ) :
                        null
                ) : null}

                {!isTeacher ? (<Tooltip title="Ask Doubt" className="block__nav__icon"  onClick={() => {
                    setClass();
                   
                    dispatch({
                        type: actionTypes.SET_MODAL,
                        doubtModal: true,
                    })
                    }}><Forum /></Tooltip>) : null}

                {!isTeacher ? (<Link to="/class/dashboard" className="block__nav__link" onClick={setClass}><Tooltip title="Dashboard"><Dashboard className="block__nav__icon" /></Tooltip></Link>) : (<Link className="block__nav__link" onClick={setClass}><Tooltip title="Evaluate"><CheckCircle className="block__nav__icon" /></Tooltip></Link>)}

                <Link to="/class" className="block__nav__link" onClick={setClass}><Tooltip title="Enter Classroom"><LaunchIcon className="block__nav__icon" /></Tooltip></Link>
            </div>
            <Modal
                open={doubtModal}
                onClose={handleModalClose}
            >
                
                <div style={modalStyle} className={styles.paper}>
                    
                    <div className="block__doubtModal__top"><CloseSharp className = "block__nav__icon" onClick = {handleModalClose}/></div>
                    <DoubtEditor/>
                </div>
            </Modal>
        </div>
    )
}

export default Block
