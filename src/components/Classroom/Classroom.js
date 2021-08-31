import React from 'react'
import './Classroom.css'
import { useStateValue } from '../../StateProvider'
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import Header from './Header/Header';
import { Route } from 'react-router';
import Stream from './Stream/Stream';
import People from './People/People';
import Dashboard from '../Dashboard/Dashboard';


function Classroom() {
    const [{user,selectedClass},dispatch] = useStateValue();
    return (
       
        <div>
             {user != null&&selectedClass != null?(
                 <div className = "classroom">
                     <Header/>
                     <Route exact path="/class/">
						<Stream/>
					</Route>
                    <Route path="/class/classwork">
						Classwork
					</Route>
                    <Route path="/class/dashboard">
						<Dashboard/>
					</Route>
                    <Route path="/class/people">
						<People/>
					</Route>
                    <Route path="/class/doubts">
						Doubts
					</Route>
                    <Route path="/class/evaluate">
						Grades
					</Route>
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
