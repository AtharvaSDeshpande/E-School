import { LinkOff } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'
function PageNotFound() {
    return (
        <div className = "pageNotFound">
            <div className="container" style={{alignItems: 'center', flexDirection:'column', display: 'flex'}}>
                <br /><br /><br /><br />
                <div className = "errorTitle">
                    <LinkOff className="linkOffIcon" />
                <p className="linkOffMessage">Oops, there seems to be an error ...</p>
                </div>
                
                <p style={{lineHeight: '30px'}}>This Page is Currently under development</p>
                <p style={{lineHeight: '30px'}}> Try other links, or </p>
                <Link to="/" >
                    <button className = "backToHome">Go back to Home</button>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound

