import React from 'react'
import './AlertMessage.css'
function AlertMessage({message}) {
    return (
        <div className = "alertDiv">
             <p className = "alertMessage">
            {message}
        </p>
        </div>
       
    )
}

export default AlertMessage
