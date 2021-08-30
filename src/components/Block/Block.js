import { CheckCircle, Close, Dashboard, Forum, VideoCall } from '@material-ui/icons'
import React from 'react'
import './Block.css'

import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import LaunchIcon from '@material-ui/icons/Launch';
function Block({ myClass }) {
    var id = myClass.id;
    var myClassName = myClass?.data.name;
    var semester = myClass?.data?.semester;
    var acadamicYear = myClass?.data?.acadamicYear;
    var displayName = myClass?.data?.displayName;
    var isTeacher = myClass?.isTeacher;
    var active = myClass?.data?.active;
    const [{ selectedClass }, dispatch] = useStateValue();
    const setClass = () => {
        // console.log(myClass)
        dispatch({
            type: actionTypes.SET_CLASS,
            selectedClass: myClass,
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
                            <Link className = "block__nav__link"><Tooltip title="Rejoin Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`}/></Tooltip></Link>
                        ) :
                        (<Tooltip title="Start Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`}/></Tooltip>)
                ) : (
                    active ? (<Tooltip title="Join Meeting" ><VideoCall className={`block__nav__icon ${active && 'active'}`}/></Tooltip>) : (<VideoCall className={`block__nav__icon disabled`}/>)
                )}
                 {isTeacher ? (
                    active ?
                        (
                            <Tooltip title = "End Meeting"><Close className = "block__nav__icon danger"/></Tooltip>
                        ) :
                        null
                ) : null}
                 
                       
                <Tooltip title = "Ask Doubt" className = "block__nav__icon"><Forum/></Tooltip>
               {!isTeacher?(<Link to = "class/dashboard" className = "block__nav__link" onClick={setClass}><Tooltip title="Dashboard"><Dashboard className="block__nav__icon" /></Tooltip></Link>):(<Link className = "block__nav__link" onClick={setClass}><Tooltip title="Evaluate"><CheckCircle className="block__nav__icon" /></Tooltip></Link>)}
                
                <Link to="/class" className="block__nav__link" onClick={setClass}><Tooltip title="Enter Classroom"><LaunchIcon className="block__nav__icon"/></Tooltip></Link>
            </div>
        </div>
    )
}

export default Block
