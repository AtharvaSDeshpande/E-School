import { Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react'
import { useStateValue } from '../../../../StateProvider';
import LandingPage from '../../../LandingPage/LandingPage';
import Login from '../../../Login/Login';
import './Doubts.css';
function Doubts() {
    const [{ user, selectedClass, dashboard }, dispatch] = useStateValue();
    return (
        <div >

        {user != null && selectedClass != null && !selectedClass.isTeacher ? (
            <div className = "doubts">
                <div className = "doubts__title">
                    <h1 className = "doubts__title_header">My Doubts</h1>
                    <Tooltip title = "New Doubt"><Add className = "doubts__title_add"/></Tooltip>
                </div>
                <div className = "doubtBlocks">
                    <div className = "doubt__block">
                        <div className = "doubt__block__title">
                            <div>Date: {"12/12/2020"}</div>
                            <div>Status: {"Solved"}</div>
                        </div>
                        {selectedClass?.isTeacher?(
                                                    <div className = "doubt__block__title">
                            <div>Name: Atharva Deshpande</div>
                            {/* <div>Status: {"Solved"}</div> */}
                        </div>
                        ):null}

                        <div className = "doubt__block__question">
                            <div>Question:</div>
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui assumenda quae eius quod voluptatibus. Officiis quae animi quod pariatur ipsa qui sint necessitatibus doloribus blanditiis rem! Tenetur ad corporis odio?</div>
                        </div>
                        <div className = "doubt__block__answer"></div>
                    </div>
                    
                </div>
            </div>
        ) : (
            <div>
                {user == null ? (
                    <Login/>
                ) : (
                    <LandingPage />
                )}
            </div>
        )
        }
    </div>
    )
}

export default Doubts
