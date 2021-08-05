import React from 'react'
import './LandingPage.css'
import Header from '../Header/Header'
import { useStateValue } from '../../StateProvider'
import Login from '../Login/Login';
import Block from '../Block/Block';

function LandingPage() {
    const [{user},dispatch] = useStateValue();
   
    
    return (
        <div className = "landingPage">
            
            {user?(<div>
                <Header/>
                <div className= "blocks">
                   <Block/>
                   <Block active = {true}/>
                   <Block/>
                   <Block/>
                   <Block/>
                   <Block/>
                   <Block/>
                </div>
            </div>):(<div>
                <Login/>
            </div>)}
        </div>
    )
}

export default LandingPage
