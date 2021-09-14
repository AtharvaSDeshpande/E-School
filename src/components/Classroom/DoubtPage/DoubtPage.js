import React from 'react'
import './DoubtPage.css'
import LandingPage from '../../LandingPage/LandingPage';
import Login from '../../Login/Login';

import { useStateValue } from '../../../StateProvider';
import Doubts from '../Dashboard/Doubts/Doubts';
import DoubtEditor from '../../TEditor/DoubtEditor';


function DoubtPage() {
    const [{ user, selectedClass }, dispatch] = useStateValue();
    return (
        <div >
            {user != null && selectedClass != null ? (
                <div className="doubtPage">
                    <div className="doubtPage__theme">
                        <h1 className="doubtPage__theme__header">{selectedClass.data.name}</h1>
                        <p className="doubtPage__theme__para">{selectedClass.data.acadamicYear}</p>
                        <p className="doubtPage__theme__para">{selectedClass.data.semester}</p>
                        {selectedClass.isTeacher ? (
                            <p className="doubtPage__theme__para">Class code: {selectedClass.data.displayID}</p>
                        ) : null}
                        <p className="doubtPage__theme__para">{selectedClass.data.displayName}</p>
                    </div>
                    <div className="doubtPage__main">
                        <div className="doubtPage__block">
                            <div className="doubtPage__block__title">
                                <div>Date: {"12/12/2020"}</div>
                                <div>Status: {"Solved"}</div>
                            </div>
                            {selectedClass?.isTeacher ? (
                                <div className="doubtPage__block__title">
                                    <div>Name: Atharva Deshpande</div>
                                    {/* <div>Status: {"Solved"}</div> */}
                                </div>
                            ) : null}

                            <div className="doubtPage__block__question">
                                <div>Question:</div>
                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui assumenda quae eius quod voluptatibus. Officiis quae animi quod pariatur ipsa qui sint necessitatibus doloribus blanditiis rem! Tenetur ad corporis odio?</div>
                            </div>
                            <div className="doubtPage__block__answer">
                                <button className = "announcementButton">Reply Privately</button>
                                <button className = "announcementButton">Reply in Classroom</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {user == null ? (
                        <Login />
                    ) : (
                        <LandingPage />
                    )}
                </div>
            )
            }
        </div>

    )
}

export default DoubtPage
