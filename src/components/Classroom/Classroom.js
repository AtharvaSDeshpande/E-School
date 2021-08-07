import React from 'react'
import './Classroom.css'
import { useStateValue } from '../../StateProvider'
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import Header from './Header/Header';

function Classroom() {
    const [{user,selectedClass},dispatch] = useStateValue();
    return (
       
        <div>
             {user != null&&selectedClass != null?(
                 <div className = "classroom">
                     <Header/>
                     Class
                 </div>
             ):(
                <div>
                    {user == null?(
                        <Login/>
                    ):(
                        <LandingPage/>
                    )}
                </div>
             )
                }
        </div>
    )
}


export default Classroom
