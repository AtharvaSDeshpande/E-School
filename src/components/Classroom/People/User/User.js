import { Avatar } from '@material-ui/core'
import React from 'react'
import './User.css'
function User({isTeacher,displayName,photoURL,isTeacherArea}) {
    return (
        <div className = "user">
            {isTeacher && !isTeacherArea?(
                <input type = "checkbox" className = "user__input"/>
            ):null}
            <div className = "user__left"><Avatar  className={`user__avatar ${photoURL}`}>{displayName.split(' ')[0][0] + displayName.split(' ')[1][0]}</Avatar></div>            
            <p className = "user__name">{displayName}</p>
        </div>
    )
}

export default User
