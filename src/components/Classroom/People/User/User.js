import { Avatar, Divider } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React from 'react'
import './User.css'
function User({ isTeacher, displayName, photoURL, isTeacherArea }) {
    return (
        <div>
            {isTeacher && !isTeacherArea ? (
                <div className="user pointer">
                    <input type="checkbox" className="user__input" />
                    <div className="user__left"><Avatar className={`user__avatar ${photoURL}`}>{displayName.split(' ')[0][0] + displayName.split(' ')[1][0]}</Avatar></div>
                    <p className="user__name">{displayName}</p>
                    <MoreVert className = "user__moreVert"/>
                </div>
            ) : (<div className="user">
                <div className="user__left"><Avatar className={`user__avatar ${photoURL}`}>{displayName.split(' ')[0][0] + displayName.split(' ')[1][0]}</Avatar></div>
                <p className="user__name">{displayName}</p>
            </div>)}
            
        </div>
    )
}

export default User
