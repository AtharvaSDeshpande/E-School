import { Avatar, Tooltip } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React from 'react'
import './Message.css'
function Message({ photoURL, displayName, timestamp, id, message, email }) {
    var date = new Date(timestamp?.toDate()).toDateString()
    return (
        <div className="message">
            <div className="message__top">
                <div className="message__top__avatar">
                    <Tooltip title = {email}>
                        <Avatar className={`${photoURL} pointer`}>
                            {displayName.split(' ')[0][0] + displayName.split(' ')[1][0]}
                        </Avatar>
                    </Tooltip>
                </div>
                <div className="message__top__details" >
                    <p className="message__top__details__name">{displayName}</p>
                    <p className="message__top__details__date">{date}</p>
                </div>
                <MoreVert className="message__top__menu" />
            </div>
            <div className="message__info" dangerouslySetInnerHTML={{ __html: message }}>

            </div>
            <div className="message__comments">

            </div>
            <div className="message__new__content">

            </div>
        </div>
    )
}

export default Message
