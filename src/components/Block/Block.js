import { Close, Dashboard,  Forum,  VideoCall } from '@material-ui/icons'
import React from 'react'
import './Block.css'

import { Tooltip } from '@material-ui/core';

function Block({id,myClassName,semester,acadamicYear,displayName,isTeacher,active}) {
    
    return (
        <div className = "block">
            <div className = {`block__title ${isTeacher && 'created'}`}>
                <h1 className = "block__title__header">{myClassName}</h1>
                <p className = "block__title_details">{acadamicYear}</p>
                <p className = "block__title_details">{displayName}</p>

            </div>
            <div className = "block__todo">

            </div>
            <div className = "block__nav">
                <Tooltip title = "Join Meeting" className = {`block__nav__icon ${active&& 'active'}`}><VideoCall/></Tooltip>
                <Tooltip title = "Ask Doubt" className = "block__nav__icon"><Forum/></Tooltip>
                <Tooltip title = "Dashboard"><Dashboard className = "block__nav__icon"/></Tooltip>
                <Tooltip title = "Unenroll"><Close className = "block__nav__icon danger"/></Tooltip>
            </div>
        </div>
    )
}

export default Block
