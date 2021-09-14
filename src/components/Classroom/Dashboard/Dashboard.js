import { AddCircle, Group, Home, LocalDrink, Mail } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { actionTypes } from '../../../reducer';
import { useStateValue } from '../../../StateProvider';
import LandingPage from '../../LandingPage/LandingPage';
import Login from '../../Login/Login';
import Stream from '../Stream/Stream';
import './Dashboard.css'
import Doubts from './Doubts/Doubts';

function Dashboard() {
    const [{ user, selectedClass, dashboard }, dispatch] = useStateValue();
    console.log(dashboard)

    return (

        <div >

            {user != null && selectedClass != null  && !selectedClass.isTeacher? (

                <div className="dashboard">
                    <div className="dashboard__left">
                        <h1 className="dashboard__title">Dashboard</h1>
                        <hr className="dashboard__leftHR" />
                        <div className="dashboard__left__nav">
                            <div className="navButton" onClick={()=>{
                                dispatch({
                                    type: actionTypes.SET_DASHBOARD,
                                    dashboard: "Home",
                                })
                            }}>
                                <div className="navButton__icon"><Home className="icon" /></div>
                                <div className="navButton__title"><p>Home</p></div>
                            </div>
                            <hr className="dashboard__leftHR" />
                            <div className="navButton"  onClick={()=>{
                                dispatch({
                                    type: actionTypes.SET_DASHBOARD,
                                    dashboard: "Grades",
                                })
                            }}>
                                <div className="navButton__icon"><LocalDrink className="icon" /></div>
                                <div className="navButton__title"><p>My Grades</p></div>
                            </div>
                            <hr className="dashboard__leftHR" />
                            <div className="navButton"  onClick={()=>{
                                dispatch({
                                    type: actionTypes.SET_DASHBOARD,
                                    dashboard: "Doubts",
                                })
                            }}>
                                <div className="navButton__icon"><Mail className="icon" /></div>
                                <div className="navButton__title"><p>My Doubts</p></div>
                            </div>
                            <hr className="dashboard__leftHR" />
                            <div className="navButton"  onClick={()=>{
                                dispatch({
                                    type: actionTypes.SET_DASHBOARD,
                                    dashboard: "Team",
                                })
                            }}>
                                <div className="navButton__icon"><Group className="icon" /></div>
                                <div className="navButton__title"><p>Leaderboard</p></div>
                            </div>
                            <hr className="dashboard__leftHR" />

                        </div>


                    </div>
                    <div className="dashboard__right">
                        {(dashboard=="Home")?(
                            <h1>Home</h1>
                        ):(dashboard == "Grades")?(<h1>Grade</h1>):(dashboard == "Doubts")?(<Doubts/>):(<h1>Last</h1>)
                                                   
                        }
                    </div>
                </div>
            ) : (
                <div>
                    {user == null ? (
                        <Login/>
                    ) : (
                        <Stream />
                    )}
                </div>
            )
            }
        </div>

    )
}

export default Dashboard
